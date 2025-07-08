import Foundation
import ExpoModulesCore

public class Blob: SharedObject, BlobPart {
    var blobParts: [BlobPart]
    var options: BlobOptions
    
    init(blobParts: [BlobPart]?, options: BlobOptions?) {
        self.blobParts = blobParts ?? []
        self.options = options ?? BlobOptions()
    }

    var size: Int {
        return blobParts.reduce(0) { $0 + $1.size }
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
                dataSlice.append(partToAdd)
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

protocol BlobPart {
    var size: Int { get }
    func text() -> String
}

extension String: BlobPart {
    var size: Int {
        return self.count
    }
    func text() -> String {
        return self
    }
}
