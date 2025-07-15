import { ExpoBlob as Blob } from "blob-module";
import { useEffect, useState } from "react";
import { Text } from "react-native";

const blob = new Blob(["ab", "cd", new Blob(["ef"])])

export default function BytesBlobTestComponent() {
    const [blobBytes, setBlobBytes] = useState<Uint8Array>()
    const [blobArrayBuffer, setBlobArrayBuffer] = useState<ArrayBuffer>()
    const [blobText, setBlobText] = useState<string>()

    useEffect(() => {
        blob.bytes().then(setBlobBytes)
        blob.text().then(setBlobText)
        blob.arrayBuffer().then(setBlobArrayBuffer)
    }, [])

    return <>
        <Text>
            text: {blobText}
        </Text>
        <Text>
            bytes: {blobBytes}
        </Text>
        <Text>
            array buffer decoded: {(new TextDecoder().decode(blobArrayBuffer))}
        </Text>
    </>
}