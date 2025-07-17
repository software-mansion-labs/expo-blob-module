import { Text, View } from "react-native";
import { ExpoBlob as Blob } from "blob-module";
import { useEffect } from "react";

export function ArrayBufferBlobTest() {
	const input_arr = new TextEncoder().encode("\u08B8\u000a");
	const blob = new Blob([input_arr]);

	blob.arrayBuffer().then((arrayBuffer: ArrayBuffer) => {
		const result = new Uint8Array(arrayBuffer);
		console.log("solution:", result);
		console.log("expected:", input_arr);
	});

	return (
		<View>
			<Text>ArrayBuffer Blob Test - Look at the console log</Text>
		</View>
	);
}
