import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ExpoBlob as Blob } from "blob-module";

export function CreateBlobTestComponent() {
	const [blobText, setBlobText] = useState<string | null>(null);

	const blob = new Blob(["a", "b", "c"], {
		type: "test/plain",
		endings: "native",
	});

	const blob2 = new Blob([blob], {
		type: "test/plain",
		endings: "native",
	});

	// blob2?.text().then((text) => {
	// 	setBlobText(text);
	// });

	return (
		<View style={styles.container}>
			<Text>Size: {blob?.size}</Text>
			<Text>Type: {blob?.type}</Text>
			{/* <Text>Text: {blobText}</Text> */}
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
