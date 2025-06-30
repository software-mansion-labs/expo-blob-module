import Foundation
import ExpoModulesCore

public class Blob: SharedObject {
    var blobParts: [String]
    var options: BlobOptions
    
    init(blobParts: [String] = [], options: BlobOptions) {
        self.blobParts = blobParts
        self.options = options
    }

    var size: Int {
        return blobParts.reduce(0) { $0 + $1.count }
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
        
        var dataSlice: [String] = []
        var charsLeft = endIdx - startIdx + 1
        for part in blobParts {
            if part.count <= charsLeft {
                charsLeft -= part.count
                dataSlice.append(part)
            } else if charsLeft > 0 {
                var partToAdd = ""
                for char in part {
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
    
    func stream() -> ReadableStream {
        let dataParts = blobParts.compactMap { $0.data(using: .utf8) }
        return ReadableStream(data: dataParts)
    }
    
    func text() async throws -> String {
        do {
            let stream = stream()
            let reader = stream.getReader()
            var fullData = Data()
            
            while true {
                do {
                    let data = try await reader.read()
                    fullData.append(data);
                } catch {
                    break
                }
            }
            
             guard let resultString = String(data: fullData, encoding: .utf8) else {
                 throw NSError(domain: "UTF8DecodingError", code: 2, userInfo: nil)
             }
             return resultString
        } catch let error {
            throw error
        }
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
