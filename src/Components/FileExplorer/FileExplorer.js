import React from "react";

import api from "../../api.js";
import ItemList from "./ItemList";

const styles = {
	fileExplorerContainer: {
		width: "300px",
		minHeight: "500px",
		maxHeight: "500px",
		border: "1px solid grey",
		overflowY: "auto",
	},
	directoryName: {
		backgroundColor: "grey",
	},
};

class FileExplorer extends React.Component {
	state = {
		directoryTree: {},
	};

	componentDidMount = () => {
		api.getDirectoryTree()
			.then((result) => {
				this.setState((state, props) => {
					return { directoryTree: result };
				});
			})
			.catch((error) => console.log(error));
	};

	handleDelete = (id) => {
		api.deleteById(id)
			.then((result) => {
				this.setState((state, props) => {
					return { directoryTree: result };
				});
			})
			.catch((error) => console.log(error));
	};

	render() {
		// Get the directoryTree from the state
		// Check if the tree at least has a project type element
		// If not - show a missing directory message
		// If the internal files/folders are empty say 'No files to show'
		const { directoryTree } = this.state;

		const directoryTreeIsValid =
			directoryTree && directoryTree.type === "project";
		const showDirectoryItems =
			directoryTree.children && directoryTree.children.length > 0;

		return directoryTreeIsValid ? (
			<div style={styles.fileExplorerContainer}>
				<div style={styles.directoryName}>{directoryTree.name}</div>
				{showDirectoryItems && (
					<ItemList
						items={directoryTree.children}
						handleDelete={this.handleDelete}
					/>
				)}
			</div>
		) : (
			<h3>No Directory to show</h3>
		);
	}
}

export default FileExplorer;
