import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ExpoBlob as Blob } from "blob-module";

export function CreateBlobTestComponent() {
	const [blobText, setBlobText] = useState<string | null>(null);
	const blob = new Blob(["a", "bbb", "d", ["edf", ["aaaa"]]], {
		type: "test/plain",
		endings: "native",
	});

	const mixedBlob = new Blob([blob, "abc"], {
		type: "test/plain",
		endings: "native",
	});

	mixedBlob?.text().then((text: string) => {
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
