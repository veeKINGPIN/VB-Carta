import React, { useContext, useEffect } from "react";

import "./OrderBook.css";
import {
	OrderBookBuyItem,
	OrderBookItems,
	OrderBookSellItem,
} from "./OrderBookItems";
import { OrdersContext } from "./Orders";

/**
 * one container,
 * two boxes
 * 1 - container -> buttons, align items to center
 * 2 - container flex direction: column
 * 		2.1: list of items, column-reverse
 * 		2.2: list of items, column
 *
 */

const OrderBook = () => {
	const { state: ordersState, dispatch: ordersDispatch } = useContext(
		OrdersContext
	);

	useEffect(() => {
		if (ordersState.sellOrders && ordersState.sellOrders.length > 0) {
			const timeout = setTimeout(() => {
				ordersDispatch({
					type: "DELETE_SELL_ORDER",
					payload: ordersState.sellOrders[0].id,
				});
			}, 3000);

			return () => {
				clearTimeout(timeout);
			};
		}
	}, [ordersState.sellOrders, ordersDispatch]);

	useEffect(() => {
		if (ordersState.buyOrders && ordersState.buyOrders.length > 0) {
			const timeout = setTimeout(() => {
				ordersDispatch({
					type: "DELETE_BUY_ORDER",
					payload: ordersState.buyOrders[0].id,
				});
			}, 3000);

			return () => {
				clearTimeout(timeout);
			};
		}
	}, [ordersState.buyOrders, ordersDispatch]);

	return (
		<div className="order-book">
			<OrderBookItems isReverse={true}>
				{ordersState.sellOrders.map((item) => {
					return (
						<OrderBookSellItem key={item.id}>
							{item.size}
						</OrderBookSellItem>
					);
				})}
			</OrderBookItems>
			<OrderBookItems isReverse={false}>
				{ordersState.buyOrders.map((item) => {
					return (
						<OrderBookBuyItem key={item.id}>
							{item.size}
						</OrderBookBuyItem>
					);
				})}
			</OrderBookItems>
		</div>
	);
};

export default OrderBook;
