import { SafeAreaView, ScrollView, Text, View, StyleSheet } from "react-native";
import { TestContainer } from "./components/TestContainer";
import { CreateBlobTestComponent } from "./components/CreateBlobTest";
import { SliceBlobTestComponent } from "./components/SliceBlobTest";
import { StreamBlobTestComponent } from "./components/StreamBlobTest";
import BytesBlobTestComponent from "./components/BytesBlobTest";

export default function App() {
	return (
		<SafeAreaView style={styles.main}>
			<ScrollView>
				<Text style={styles.header}>Blob API</Text>
				<View>
					<TestContainer title={"Create Blob Test"}>
						<CreateBlobTestComponent />
					</TestContainer>
					<TestContainer title={"Slice Blob Test"}>
						<SliceBlobTestComponent />
					</TestContainer>
					<TestContainer title={"Stream Blob Test"}>
						<StreamBlobTestComponent />
					</TestContainer>
					<TestContainer title={"Bytes Blob Test"}>
						<BytesBlobTestComponent />
					</TestContainer>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: "#eee",
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		fontSize: 30,
		margin: 20,
	},
});
