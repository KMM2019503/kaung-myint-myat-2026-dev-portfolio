import { Button, HStack } from "@chakra-ui/react"

function App() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<h1 className="text-4xl font-bold">Kaung Myint Myat — Dev Portfolio</h1>
			<HStack>
				<Button>Click me</Button>
				<Button>Click me</Button>
			</HStack>
		</div>
	);
}

export default App;
