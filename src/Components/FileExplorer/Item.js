import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import arrowDown from "../../assets/icons/arrowDown";
import arrowRight from "../../assets/icons/arrowRight";
import deleteIcon from "../../assets/icons/x";
import { IconHelper } from "../../helpers/IconHelper";
import ItemList from "./ItemList";

const ItemIconStyles = css`
	height: 25px;
`;

const PointerStyles = css`
	cursor: pointer;
	pointer-events: auto;
`;

const ItemStyled = styled.div`
	${(props) =>
		props.itemHasFocus &&
		`
		font-weight: bold;
	`}

	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 10px;
`;
ItemStyled.displayName = "Item";

const ItemLabel = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: 25px;
	line-height: 1;
`;
ItemLabel.displayName = "ItemLabel";

const ActionableIcon = styled.div`
	${ItemIconStyles}
	${PointerStyles}
`;
ActionableIcon.displayName = "ActionableIcon";

const RegularIcon = styled.div`
	${ItemIconStyles}
`;
RegularIcon.displayName = "RegularIcon";

const EmptyFolderIcon = styled.div`
	padding-left: 25px;
`;
EmptyFolderIcon.displayName = "EmptyFolderIcon";

class FileExplorerItem extends React.Component {
	state = {
		isHovering: false,
		isExpanded: false,
	};

	handleHover = (status) => {
		this.setState((state, props) => {
			return { isHovering: status };
		});
	};

	handleClick = () => {
		this.setState((state, props) => {
			return { isExpanded: !state.isExpanded };
		});
	};

	render() {
		const { value, handleDelete, level } = this.props;
		const { isHovering, isExpanded } = this.state;

		const hasChildItems = value.children && value.children.length > 0;

		return (
			<Fragment>
				<ItemStyled
					onMouseLeave={(e) => this.handleHover(false)}
					onMouseOver={(e) => this.handleHover(true)}
				>
					<ItemLabel>
						{hasChildItems ? (
							<ActionableIcon
								onClick={(e) => this.handleClick(value.id)}
							>
								{isExpanded ? arrowDown() : arrowRight()}
							</ActionableIcon>
						) : value.type === "folder" ? (
							<EmptyFolderIcon>{""}</EmptyFolderIcon>
						) : (
							<RegularIcon>{IconHelper(value.name)}</RegularIcon>
						)}
						<span>{value.name}</span>
					</ItemLabel>

					{isHovering && (
						<ActionableIcon onClick={(e) => handleDelete(value.id)}>
							{deleteIcon()}
						</ActionableIcon>
					)}
				</ItemStyled>
				{hasChildItems && isExpanded && (
					<ItemList
						items={value.children}
						level={level + 1}
						handleDelete={handleDelete}
					/>
				)}
			</Fragment>
		);
	}
}

FileExplorerItem.propTypes = {
	value: PropTypes.object,
	level: PropTypes.number,
	handleDelete: PropTypes.func,
};

export default FileExplorerItem;
