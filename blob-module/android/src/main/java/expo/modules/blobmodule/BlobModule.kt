package expo.modules.blobmodule

import android.util.Log
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.types.Either
import expo.modules.kotlin.types.EitherOfThree

class BlobModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("ExpoBlob")

        Class(Blob::class) {
            Constructor() { blobParts: List<BlobPart>, options: BlobOptionsBag?->
                var type = BlobOptions().type
                var endings = BlobOptions().endings

                if (options != null) {
                    type = options.type
                    endings = options.endings
                }
                Blob(blobParts.internal(), BlobOptions(type, endings))
            }

            Property("size") { blob: Blob ->
                blob.size
            }

            AsyncFunction("text") { blob: Blob ->
                blob.text()
            }

            Property("type") { blob: Blob ->
                blob.options.type
            }

            Function("slice") { blob: Blob, start: Int?, end: Int?, contentType: String? ->
                blob.slice(start ?: 0, end ?: blob.size, contentType ?: "")
            }
        }
    }
}
