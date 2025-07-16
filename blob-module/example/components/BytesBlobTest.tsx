import { Text, View } from "react-native";
import { ExpoBlob as Blob } from "blob-module";

export function BytesBlobTest() {
	const input_arr = new TextEncoder().encode("\u08B8\u000a");
	const blob = new Blob([input_arr]);

	blob.bytes().then((arrayBuffer: Uint8Array) => {
		console.log("solution:", arrayBuffer);
		console.log("expected:", input_arr);
	});

	return (
		<View>
			<Text>ArrayBuffer Blob Test - Look at the console log</Text>
		</View>
	);
}
