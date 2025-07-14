import Foundation
import ExpoModulesCore

public class BlobModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoBlob")
        
        Class(Blob.self) {
            Constructor { (blobParts: [BlobPart]?, options: BlobOptions?) in
                return Blob(blobParts: blobParts ?? [], options: options ?? BlobOptions())
            }
            
            Property("size") { (blob: Blob) in
                blob.size
            }
            
            Property("type") { (blob: Blob) in
                blob.type
            }
            
            Property("endings") { (blob: Blob) in
                blob.options.endings
            }
            
            Function("slice") { (blob: Blob, start: Int?, end: Int?, contentType: String?) in
                blob.slice(start: start ?? 0, end: end ?? blob.size - 1, contentType: contentType ?? "")
            }
                
            Function("text") { (blob: Blob) in
                blob.text()
            }
            
            Function("self") { (blob: Blob) in
                blob
            }
        }
    }
}
