import { Button, SafeAreaView, ScrollView, Text } from "react-native";
import { NativeModules } from "react-native";
import BlobModule from "../src/BlobModule";

export default function App() {
	const handleButtonPress = () => {
		const blob = new BlobModule.Blob(["aaa", "bbbb", "ccccc"], {
			type: "data from table",
			endings: "native",
		});
		console.log("blob_constructor:", blob);

		console.log("slice_size:", blob.sliceBlob(1, 2).size);

		console.log("slice_type:", blob.sliceBlob(1, 2, "sliced data").type);
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.container}>
				<Text style={styles.header}>Blob API</Text>
				<Button onPress={handleButtonPress} title={"SliceTest"}></Button>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = {
	header: {
		fontSize: 30,
		margin: 20,
	},
	container: {
		flex: 1,
		backgroundColor: "#eee",
	},
};
