package expo.modules.blobmodule

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL

class BlobModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("BlobModule")

    Constants(
      "PI" to Math.PI
    )

    Events("onChange")

    Function("hello") {
      "Hello world! 👋"
    }

    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

  }
}
