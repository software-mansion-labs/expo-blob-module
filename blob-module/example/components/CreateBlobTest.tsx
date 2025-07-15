import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ExpoBlob as Blob } from "blob-module";

export function CreateBlobTestComponent() {
	const [blobText, setBlobText] = useState<string | null>(null);
	const blob = new Blob(["a", "bbb", "d", ["edf", ["aaaa"]]], {
		type: "test/plain",
		endings: "native",
	});

	const non_unicode = "\u0061\u030A";
	const input_arr = new TextEncoder().encode(non_unicode);

	const mixedBlob = new Blob([input_arr], {
		type: "test/plain",
		endings: "native",
	});

	mixedBlob?.text().then((text) => {
		console.log(text);
		setBlobText(text);
	});

	return (
		<View style={styles.container}>
			<Text>Size: {mixedBlob?.size}</Text>
			<Text>Type: {mixedBlob?.type}</Text>
			<Text>Text: {blobText}</Text>
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
