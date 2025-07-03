import Foundation
import ExpoModulesCore

public class BlobModule: Module {
    public func definition() -> ModuleDefinition {
        Name("BlobModule")
        
        Class(Blob.self) {
            Constructor { (blobParts: Either<[String], Blob>, options: BlobOptions?) in
                if let blobPartsList: [String] = blobParts.get() {
                    return Blob(blobParts: blobPartsList, options: options ?? BlobOptions())
                }
                else if let blobPartsSingleBlob: Blob = blobParts.get() {
                    return Blob(blobParts: [blobPartsSingleBlob], options: options ?? BlobOptions())
                }
                return Blob(blobParts: [], options: options ?? BlobOptions())
            }
            
            Property("size") { (blob: Blob) in
                blob.size
            }
            
            Property("type") { (blob: Blob) in
                blob.type
            }
            
            Function("slice") { (blob: Blob, start: Int?, end: Int?, contentType: String?) in
                blob.slice(start: start ?? 0, end: end ?? blob.blobParts.count, contentType: contentType ?? "")
            }
                
            Function("text") { (blob: Blob) in
                blob.text()
            }
        }
    }
}
