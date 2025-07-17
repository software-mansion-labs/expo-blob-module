import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ExpoBlob as Blob } from "blob-module";

export function SliceBlobTestComponent() {
	const [blobText, setBlobText] = useState<string | null>(null);
	const [slicedBlobText, setSlicedBlobText] = useState<string | null>(null);

	const blob1 = new Blob(["squiggle"]);
	const arrayBuffer = new ArrayBuffer(16);
	const int8View = new Int8Array(arrayBuffer);
	for (var i = 0; i < 16; i++) {
		int8View[i] = i + 65;
	}

	const blob = new Blob([new Uint8Array(arrayBuffer, 3, 5), blob1, "foo"], {
		type: "text/plain",
		endings: "native",
	});

	const slicedBlob = blob.slice(0, 8, "tex(t/plain");

	slicedBlob.text().then((text) => {
		setSlicedBlobText(text);
	});

	blob.text().then((text) => {
		setBlobText(text);
	});

	return (
		<View style={styles.container}>
			<Text>Size: {slicedBlob?.size}</Text>
			<Text>Type: {slicedBlob?.type}</Text>
			<Text>Text before slice: {blobText}</Text>
			<Text>Text after slice: {slicedBlobText}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
