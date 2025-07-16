import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ExpoBlob as Blob } from "blob-module";

export function SliceBlobTestComponent() {
	const [blobText, setBlobText] = useState<string | null>(null);
	const [slicedBlobText, setSlicedBlobText] = useState<string | null>(null);

	const blob = new Blob(["PASS"], {
		type: "text/plain",
		endings: "native",
	});

	const slicedBlob = blob.slice(0, 4, "tex\x09t/plain");

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
