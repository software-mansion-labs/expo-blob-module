import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { ExpoBlob as Blob } from "blob-module";

export function CreateBlobTestComponent() {
	const [blobText, setBlobText] = useState<string | null>(null);
	const [blob1, setBlob1] = useState<Blob | null>(null)

	const [bytes, setBytes] = useState(Uint8Array.from([]))

	// useEffect(() => {
	// 	blob1?.text().then((text) => {
	// 		setBlobText(text);
	// 	});
	// }, [])

	return (
		<View style={styles.container}>
			<Button title="RUN" onPress={() => {
				const blob0 = new Blob(["ccc", "dd", "e"])
				const blob1 = new Blob([
					"a",
					"bbb",
					blob0,
					Int32Array.from([1, 13, 15]),
					Int32Array.from([1, -1, 2]),
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

				const blob2 = new Blob([Int32Array.from([1, 2, 3, 256])])
				blob2.bytes().then(setBytes)
				
				
				setBlob1(blob1)
				blob1.text().then(setBlobText)
			}}/>
			<Text></Text>
			<Text>Size: {blob1?.size}</Text>
			<Text>Type: {blob1?.type}</Text>
			<Text>Text: {blobText}</Text>

			<Text>int32 list: 1, 2, 3, 256</Text>
			<Text>int32 list bytes: {bytes}</Text>
			<Text></Text>
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
