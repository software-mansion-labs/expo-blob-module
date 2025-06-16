import Foundation
import ExpoModulesCore

public class Blob: SharedObject {
    var blobParts: [String]
    var options: BlobOptions
    
    init(blobParts: [String] = [], options: BlobOptions) {
        self.blobParts = blobParts
        self.options = options
    }

    var size: UInt64 {
        return blobParts.reduce(0) { $0 + UInt64($1.count) }
    }

    var type: String {
        return options.type
    }

    func slice(start: Int64 = 0, end: Int64? = nil, contentType: String = "") -> Blob {
        let startIdx = Int(max(start, 0))
        let endIdx = min(end.map { Int($0) } ?? blobParts.count, blobParts.count)
        let options = BlobOptions(type: contentType != "" ? contentType : self.options.type, endings: self.options.endings)

        if startIdx > endIdx {
            return self
        }

        var dataSlice: [String] = []
        for part in blobParts[startIdx...endIdx] {
            dataSlice.append(part)
        }

        return Blob(blobParts: dataSlice, options: options)
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
