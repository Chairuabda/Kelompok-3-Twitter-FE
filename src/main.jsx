import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./themes/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</BrowserRouter>
);
