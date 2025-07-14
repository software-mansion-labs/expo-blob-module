import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ExpoBlob as Blob } from "blob-module";

const blob0 = new Blob(["ccc", "dd", "e"])
const blob1 = new Blob([
	"a",
	"bbb",
	blob0,
	new Blob([
		"fff", 
		new Blob([
			"g", 
			new Blob([
				"hhhH",
				"iii",
				new Blob([
					"jj"
				])
			])
		])
	])
], {
	type: "test/plain",
	endings: "native",
});

export function SliceBlobTestComponent() {
	const [blobText, setBlobText] = useState<string | null>(null);
	const [slicedBlobText, setSlicedBlobText] = useState<string | null>(null);

	const slicedBlob = blob1.slice(17, 19);

	slicedBlob.text().then((text) => {
		setSlicedBlobText(text);
	});

	blob1.text().then((text) => {
		setBlobText(text);
	});

	return (
		<View style={styles.container}>
			<Text>Size: {blob1?.size}</Text>
			<Text>Type: {blob1?.type}</Text>
			<Text>Text before slice: {blobText}</Text>
			<Text>Text after slice [17-19]: {slicedBlobText}</Text>
			<Text>Slice size: {slicedBlob?.size}</Text>
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
