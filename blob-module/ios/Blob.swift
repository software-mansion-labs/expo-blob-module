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

    func slice(start: Int = 0, end: Int? = nil, contentType: String = "") -> Blob {
        let startIdx = max(start, 0)
        var endIdx = min(end ?? self.size - 1, self.size - 1)
        let options = BlobOptions(type: contentType != "" ? contentType : self.options.type, endings: self.options.endings)
        
        if endIdx < 0 {
            endIdx = self.size - 1 + endIdx;
        }

        if startIdx > endIdx || start == 0 && end == self.size - 1 {
            return self
        }
        
        var dataSlice: [BlobPart] = []
        var charsLeft = endIdx - startIdx + 1
        for part in blobParts {
            if part.text().count <= charsLeft {
                charsLeft -= part.text().count
                dataSlice.append(part)
            } else if charsLeft > 0 {
                var partToAdd = ""
                for char in part.text() {
                    if charsLeft > 0 {
                        charsLeft -= 1
                        partToAdd += String(char)
                    }
                }
                dataSlice.append(.string(partToAdd))
            } else {
                break
            }
        }

        return Blob(blobParts: dataSlice, options: options)
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

enum BlobPart {
    case string(String)
    case data(Data)
    case blob(Blob)
}

extension BlobPart: Convertible {
    public static func convert(from value: Any?, appContext: AppContext) throws -> BlobPart {
        if let string = value as? String {
            print("STRING")
            return .string(string)
        }
        if let data = value as? Data {
            print("DATA")
            return .data(data)
        }
        if let blob = value as? [String: Any] {
            print("BLOB")
            print(blob)
            return .string("")
        }
        throw Conversions.ConvertingException<BlobPart>(value)
    }
}

extension BlobPart {
    func text() -> String {
        switch self {
        case .string(let str):
            return str
        case .data(let data):
            return String(data: data, encoding: .utf8) ?? data.map { String(format: "%02x", $0) }.joined()
        case .blob(let blob):
            return blob.text()
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
        }
    }
}
