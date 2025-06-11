import Foundation
import ExpoModulesCore

public class BlobModule: Module {
    public func definition() -> ModuleDefinition {
        Name("BlobModule")

        Class(Blob.self) {
            Constructor { file in
                return Blob(blobParts: file.blobParts, options: file.options)
            }
            
            Property("size") { file in
                file.size
            }
            
            Property("type") { file in
                file.type
            }
            
            Function("slice") { (file: Blob, start: Int64?, end: Int64?, contentType: String?) in
                return file.slice(start: start ?? 0, end: end, contentType: contentType ?? "")
            }
        }
    }
}
