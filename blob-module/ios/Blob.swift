import Foundation
import ExpoModulesCore

public class Blob: SharedObject {
  var blobParts: [BlobPart]
  var options: BlobOptions
  
  init(blobParts: [BlobPart]?, options: BlobOptions?) {
    self.blobParts = blobParts ?? []
    self.options = options ?? BlobOptions()
  }

  var size: Int {
    return blobParts.reduce(0) { $0 + $1.size() }
  }

  var type: String {
    return options.type
  }
  
  func slice(start: Int = 0, end: Int? = nil, contentType: String? = nil) -> Blob {
      let blobSize = self.size
      var relativeStart = start
    
      if relativeStart < 0 {
          relativeStart = max(blobSize + relativeStart, 0)
      } else {
          relativeStart = min(relativeStart, blobSize)
      }

      var relativeEnd = end ?? blobSize
      if relativeEnd < 0 {
          relativeEnd = max(blobSize + relativeEnd - 1, 0)
      } else {
          relativeEnd = min(relativeEnd, blobSize) - 1
      }

      let span = max(relativeEnd - relativeStart, 0)
      if span == 0 {
          let type = normalizedContentType(contentType)
          return Blob(blobParts: [], options: BlobOptions(type: type, endings: self.options.endings))
      }

      var dataSlice: [BlobPart] = []
      var currentPos = 0
      var remaining = span

      for part in blobParts {
          let partSize = part.size()
          if currentPos + partSize <= relativeStart {
              currentPos += partSize
              continue
          }
          if remaining <= 0 {
              break
          }
          let partStart = max(0, relativeStart - currentPos)
          let partEnd = min(partSize, partStart + remaining)
          let length = partEnd - partStart
          if length <= 0 {
              currentPos += partSize
              continue
          }

          switch part {
          case .string(let str):
              let utf8 = Array(str.utf8)
            let subUtf8 = Array(utf8[partStart...partStart+length])
              if let subStr = String(bytes: subUtf8, encoding: .utf8) {
                  dataSlice.append(.string(subStr))
              }
          case .data(let data):
              let subData = data.subdata(in: partStart..<partStart+length+1)
              dataSlice.append(.data(subData))
          case .typedArray(let typedArray):
              if partStart == 0 && length == typedArray.byteLength {
                  dataSlice.append(.typedArray(typedArray))
              } else {
                  let rawPtr = typedArray.rawPointer.advanced(by: partStart)
                  let buffer = UnsafeBufferPointer<UInt8>(start: rawPtr.assumingMemoryBound(to: UInt8.self), count: length)
                  let newData = Data(buffer: buffer)
                  dataSlice.append(.data(newData))
              }
          case .blob(let blob):
              let subBlob = blob.slice(start: partStart, end: partStart + length)
              dataSlice.append(.blob(subBlob))
          }

          currentPos += partSize
          remaining -= length
      }
    
      let type = normalizedContentType(contentType)

      return Blob(blobParts: dataSlice, options: BlobOptions(type: type, endings: self.options.endings))
  }
  
  func text() -> String {
    return blobParts.reduce("") { $0 + $1.text() }
  }
}

enum EndingType: String, Enumerable {
  case transparent = "transparent"
  case native = "native"
}

struct BlobOptions: Record {
  @Field
  var type: String = ""
  @Field
  var endings: EndingType = .transparent
}

private func normalizedContentType(_ type: String?) -> String {
    guard let type = type, !type.isEmpty else { return "" }
    let ascii = type.utf8.allSatisfy { $0 >= 0x20 && $0 <= 0x7E }
    let invalid = type.contains { $0 == "\u{00}" || $0 == "\u{0A}" || $0 == "\u{0D}" }
    if !ascii || invalid {
        return ""
    }
    return type.lowercased()
}

enum BlobPart {
    case string(String)
    case blob(Blob)
    case data(Data)
    case typedArray(TypedArray)
}


extension BlobPart {
    func text() -> String {
        switch self {
        case .string(let str):
            return str
        case .data(let data):
            return String(decoding: data, as: UTF8.self)
        case .blob(let blob):
            return blob.text()
        case .typedArray(let typedArray):
          let buffer = UnsafeBufferPointer<UInt8>(
               start: typedArray.rawPointer.assumingMemoryBound(to: UInt8.self),
               count: typedArray.byteLength
           )
          return String(decoding: buffer, as: UTF8.self)
        }
    }
    
    func size() -> Int {
        switch self {
        case .string(let str):
            return str.lengthOfBytes(using: .utf8)
        case .data(let data):
             return data.count
        case .blob(let blob):
            return blob.size
        case .typedArray(let typedArray):
            return typedArray.byteLength
        }
    }
}
