import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import FileExplorerItem from "./Item";

const ItemsContainer = styled.div`
	padding-left: ${(props) => props.level * 10}px;
`;
ItemsContainer.displayName = "ItemsContainer";

class ItemList extends React.Component {
	render() {
		const { items, level, handleDelete } = this.props;

		return (
			<ItemsContainer level={level}>
				{items.map((value, index, array) => {
					return (
						<Fragment key={value.id}>
							<FileExplorerItem
								value={value}
								handleDelete={handleDelete}
								level={level}
							></FileExplorerItem>
						</Fragment>
					);
				})}
			</ItemsContainer>
		);
	}
}

ItemList.propTypes = {
	items: PropTypes.array,
	level: PropTypes.number,
	handleDelete: PropTypes.func,
};

ItemList.defaultProps = {
	level: 0, // ALways start at 0
};

export default ItemList;
