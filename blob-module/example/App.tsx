import { SafeAreaView, ScrollView, Text } from "react-native";

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.container}>
				<Text style={styles.header}>Blob API</Text>
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
