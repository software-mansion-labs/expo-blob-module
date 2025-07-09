import { useState } from "react";
import { Button, View, StyleSheet } from "react-native";

export function TestContainer({
	children,
	title,
}: {
	children: any;
	title: string;
}) {
	const [testStarted, setTestStarted] = useState(false);
	return (
		<View style={styles.container}>
			<Button
				disabled={testStarted}
				onPress={() => setTestStarted(true)}
				title={title}
			/>
			{testStarted && children}
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
