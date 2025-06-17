import {
	Button,
	SafeAreaView,
	ScrollView,
	Text,
	View,
	StyleSheet,
} from "react-native";
import BlobModule from "../src/BlobModule";
import { Blob } from "blob-module/BlobModule.types";
import { useState } from "react";

export default function App() {
	const handleCreateBlob = () => {
		const blob = new BlobModule.Blob(["aaa", "bbbb", "ccccc"], {
			type: "test/plain",
			endings: "native",
		});
		return blob;
	};

	const handleSliceBlob = () => {
		const blob = new BlobModule.Blob(["aaa", "bbbb", "ccccc", "dddddddddd"], {
			type: "test/plain",
			endings: "native",
		});
		const slicedBlob = blob.slice(0, -2);
		return slicedBlob;
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.container}>
				<Text style={styles.header}>Blob API</Text>
				<TestContainer onPress={handleCreateBlob} title={"Create Blob Test"} />
				<TestContainer onPress={handleSliceBlob} title={"Slice Blob Test"} />
			</ScrollView>
		</SafeAreaView>
	);
}

function TestContainer({
	onPress,
	title,
}: {
	onPress: () => Blob;
	title: string;
}) {
	const [blob, setBlob] = useState<Blob>();

	return (
		<View style={styles.test}>
			<Button
				onPress={() => {
					const blob = onPress();
					setBlob(blob);
				}}
				title={title}
			/>
			<Text>Size: {blob?.size}</Text>
			<Text>Type: {blob?.type}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		fontSize: 30,
		margin: 20,
	},
	test: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	container: {
		flex: 1,
		backgroundColor: "#eee",
	},
});
