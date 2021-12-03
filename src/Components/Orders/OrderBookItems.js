import styled from "styled-components";

export const OrderBookItems = styled.div`
	text-align: center;
	display: flex;
	min-height: 100px;
	max-height: 250px;
	overflow-y: auto;
	${(props) =>
		props.isReverse
			? `flex-direction: column-reverse;
			border-bottom: 1px solid grey;`
			: `flex-direction: column;
			border-top: 1px solid grey;`}
`;

OrderBookItems.displayName = "OrderBookItems";

export const OrderBookSellItem = styled.div`
	color: rgb(249, 103, 45);
`;

OrderBookSellItem.displayName = "OrderBookSellItem";

export const OrderBookBuyItem = styled.div`
	color: rgb(46, 174, 52);
`;
OrderBookBuyItem.displayName = "OrderBookBuyItem";

export default OrderBookItems;
