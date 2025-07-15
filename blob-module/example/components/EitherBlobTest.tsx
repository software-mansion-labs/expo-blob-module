import { ExpoBlob as Blob} from "blob-module"
import { Button, Text } from "react-native"


// const es : string = new Blob(["hejo"]).eithers(["hej", Int32Array.from([1, 2, 3])])

// const ee : string = new Blob(["hej"]).eithereither(Int32Array.from([1, 2, 3]))

// const ees : string = new Blob(["hej"]).eithereithers(["string", new Blob(["geag"]), Int32Array.from([1, 2, 3])])

export default function EitherBlobTestComponent() {
    return <Button title="sadas" onPress={() => {
        const e : string = new Blob(["hejo"]).eithers(["s"])
    }} />
}