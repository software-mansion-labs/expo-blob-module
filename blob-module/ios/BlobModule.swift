import Foundation
import ExpoModulesCore

public class BlobModule: Module {
    public func definition() -> ModuleDefinition {
        Name("BlobModule")

        Function("createBlob"){ (blobParts: [String]) in
           return Blob(blobParts: blobParts)
        }
        
        Function("getBlobSize") {(blob: Blob) -> UInt64 in
           return blob.size
        }

        Function("getBlobType") {(blob: Blob) -> String in
            return blob.type
        }
        
        Function("sliceBlob") { (blob: Blob, start: Int64?, end: Int64?, contentType: String?) -> Blob in
            return blob.slice(start: start ?? 0, end: end, contentType: contentType ?? "")
        }
        
    }
}
