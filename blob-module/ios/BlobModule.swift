import Foundation
import ExpoModulesCore

public class BlobModule: Module {
    public func definition() -> ModuleDefinition {
        Name("BlobModule")
        
        Class(Blob.self) {
            Constructor { (blobParts: [String], options: [String: String]?) in
                let type = options?["type"] ?? ""
                let endings = EndingType(rawValue: options?["endings"] ?? "") ?? .transparent
                let propetryBag = BlobPropertyBag(type: type, endings: endings)
                
                return Blob(blobParts: blobParts, options: propetryBag)
            }
            
            Property("size") { (blob: Blob) in
                blob.size
            }
            
            Property("type") { (blob: Blob) in
                blob.type
            }
            
            Function("sliceBlob") { (blob: Blob, start: Int64?, end: Int64?, contentType: String?) in
                blob.slice(start: start ?? 0, end: end, contentType: contentType ?? "")
            }
            
        }
        
    }
}
