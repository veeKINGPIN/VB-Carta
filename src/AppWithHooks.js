import React from "react";

import Todos from "./Components/Todos/Todos";
import Orders from "./Components/Orders/Orders";

export default function App() {
	return (
		<div className="App">
			<Todos />
			<br />
			<br />
			<Orders />
		</div>
	);
}
