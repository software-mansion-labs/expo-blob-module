import Foundation
import ExpoModulesCore

public class BlobModule: Module {
    public func definition() -> ModuleDefinition {
        Name("BlobModule")
        
        Class(Blob.self) {
            Constructor { (blobParts: [String]?, options: BlobOptions?) in
                Blob(blobParts: blobParts ?? [], options: options ?? BlobOptions())
            }
            
            Property("size") { (blob: Blob) in
                blob.size
            }
            
            Property("type") { (blob: Blob) in
                blob.type
            }
            
            Function("slice") { (blob: Blob, start: Int64?, end: Int64?, contentType: String?) in
                blob.slice(start: start ?? 0, end: end, contentType: contentType ?? "")
            }
            
        }
    }
}
