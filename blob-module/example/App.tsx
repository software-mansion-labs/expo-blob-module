import { Button, SafeAreaView, ScrollView, Text } from "react-native";
import { NativeModules } from "react-native";
import BlobModule from "../src/BlobModule";

export default function App() {
	const handleButtonPress = () => {
		// TODO:
		// 1. Dopisac typy do BlobModule
		// 2. Opisac problem uzywania Class() i konsturktura wewnatrz niego
		// w natywnej implementacji + napisac, ze uzywanie tego i testowanie pochlanelo mi bardzo duzo czasu
		// 3. Sprobowac zmienic, typ na Data, eweneltuanie poszuakc innego dostepengo
		// 4. Objerzec filmik jak sie robi natywne moduly w Expo
		// TODO FUTURE:
		// 1. Zrobic implementacje slice, bardziej optymalna
		const blob = BlobModule.createBlob(["aaa", "bbbb", "ccccc"]);
		console.log("blob_constructor", blob);

		console.log("blobSize:", BlobModule.getBlobSize(blob));
		console.log("blobType:", BlobModule.getBlobType(blob));
		console.log(
			"slice:",
			BlobModule.getBlobSize(BlobModule.sliceBlob(blob, 0, 1))
		);
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
