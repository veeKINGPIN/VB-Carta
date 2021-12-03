import React, { useMemo, useReducer } from "react";
import styled from "styled-components";
import OrderBook from "./OrderBook";
import OrderForm from "./OrderForm";

const initialState = {
	buyOrders: [],
	sellOrders: [],
};

const OrdersReducer = (state, action) => {
	switch (action.type) {
		case "BUY":
			return {
				...state,
				buyOrders: [
					{
						id: Date.now(),
						size: action.payload.size,
						price: action.payload.price,
					},
					...state.buyOrders,
				],
			};
		case "SELL":
			return {
				...state,
				sellOrders: [
					{
						id: Date.now(),
						size: action.payload.size,
						price: action.payload.price,
					},
					...state.sellOrders,
				],
			};
		case "DELETE_SELL_ORDER":
			return {
				...state,
				sellOrders: state.sellOrders.filter(
					(x) => x.id !== action.payload
				),
			};
		case "DELETE_BUY_ORDER":
			return {
				...state,
				buyOrders: state.buyOrders.filter(
					(x) => x.id !== action.payload
				),
			};
		case "RESET":
			return initialState;
		default:
			return state;
	}
};

const OrdersContainer = styled.div`
	border: 1px solid grey;
	width: 600px;
	max-height: 500px;
	display: flex;
	flex-direction: row;
`;

OrdersContainer.displayName = "OrdersContainer";

export const OrdersContext = React.createContext();

const Orders = () => {
	const [state, dispatch] = useReducer(OrdersReducer, initialState);

	const memoDispatchValue = useMemo(() => {
		return dispatch;
	}, [dispatch]);

	return (
		<OrdersContext.Provider value={{ state, dispatch: memoDispatchValue }}>
			<OrdersContainer>
				<OrderForm></OrderForm>
				<OrderBook></OrderBook>
			</OrdersContainer>
		</OrdersContext.Provider>
	);
};

export default Orders;
