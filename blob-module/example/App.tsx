import {
	Button,
	SafeAreaView,
	ScrollView,
	Text,
	View,
	StyleSheet,
} from "react-native";
import { BlobModule as Blob } from "blob-module";
import { useState } from "react";

export default function App() {
	const handleCreateBlob = () => {
		const blob = new Blob(["a", "bbb", "d"], {
			type: "test/plain",
			endings: "native",
		});

		return (
			<View style={styles.container}>
				<Text>Size: {blob?.size}</Text>
				<Text>Type: {blob?.type}</Text>
				<Text>Text: {blob?.text()}</Text>
			</View>
		);
	};

	const handleSliceBlob = () => {
		const blob = new Blob(["aaa", "bbbb", "ccccc", "dddddddddd"], {
			type: "test/plain",
			endings: "native",
		});

		const slicedBlob = blob.slice(0, 8);

		return (
			<View style={styles.container}>
				<Text>Size: {blob?.size}</Text>
				<Text>Type: {blob?.type}</Text>
				<Text>Text before slice: {blob?.text()}</Text>
				<Text>Text after slice [0-8]: {slicedBlob?.text()}</Text>
			</View>
		);
	};

	const handleStreamBlob = () => {
		const blob = new Blob(["aaa", "bbbb", "ccccc", "dddddddddd"], {
			type: "test/plain",
			endings: "native",
		});

		readStream(blob.stream()).then((data: Uint8Array) => {
			console.log(data);
		});

		return (
			<View style={styles.container}>
				<Text>Size: {blob?.size}</Text>
				<Text>Type: {blob?.type}</Text>
				<Text>Text: {blob?.text()}</Text>
			</View>
		);
	};

	async function readStream(
		stream: ReadableStream<Uint8Array>
	): Promise<Uint8Array> {
		const reader = stream.getReader();
		const chunks: Uint8Array[] = [];
		while (true) {
			const { value, done } = await reader.read();
			if (done) break;
			chunks.push(value);
		}

		let totalLength = chunks.reduce((sum, arr) => sum + arr.length, 0);
		let result = new Uint8Array(totalLength);
		let offset = 0;
		for (const chunk of chunks) {
			result.set(chunk, offset);
			offset += chunk.length;
		}
		return result;
	}

	return (
		<SafeAreaView style={styles.main}>
			<ScrollView>
				<Text style={styles.header}>Blob API</Text>
				<View>
					<TestContainer
						content={handleCreateBlob}
						title={"Create Blob Test"}
					/>
					<TestContainer content={handleSliceBlob} title={"Slice Blob Test"} />

					<TestContainer
						content={handleStreamBlob}
						title={"Stream Blob Test"}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

function TestContainer({ content, title }: { content: any; title: string }) {
	const [testStarted, setTestStarted] = useState(false);
	return (
		<View style={styles.container}>
			<Button
				disabled={testStarted}
				onPress={() => setTestStarted(true)}
				title={title}
			/>
			{testStarted && content()}
		</View>
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
