import React, { memo, useContext } from "react";

import "./OrderForm.css";
import { OrdersContext } from "./Orders";

const getRandomSizeAndPrize = () => {
	const precision = 100; // 2 decimals

	return {
		size:
			Math.floor(
				Math.random() * (10 * precision - 1 * precision) + 1 * precision
			) /
			(1 * precision),
		price:
			Math.floor(
				Math.random() * (10 * precision - 1 * precision) + 1 * precision
			) /
			(1 * precision),
	};
};

const OrderForm = memo(
	() => {
		const { dispatch: ordersDispatch } = useContext(OrdersContext);

		return (
			<div className="order-form">
				<div className="buy-sell-buttons-container">
					<div
						className="buy-sell-button"
						onClick={() => {
							ordersDispatch({
								type: "BUY",
								payload: getRandomSizeAndPrize(),
							});
						}}
					>
						Buy
					</div>
					<div
						className="buy-sell-button"
						onClick={() => {
							ordersDispatch({
								type: "SELL",
								payload: getRandomSizeAndPrize(),
							});
						}}
					>
						Sell
					</div>
					<div
						className="buy-sell-button"
						onClick={() => {
							ordersDispatch({
								type: "RESET",
							});
						}}
					>
						Reset
					</div>
				</div>
			</div>
		);
	},
	(prevProps, nextProps) => {
		return false;
	}
);

export default OrderForm;
