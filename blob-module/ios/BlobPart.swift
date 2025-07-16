import ExpoModulesCore

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
