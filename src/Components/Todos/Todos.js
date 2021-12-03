import React, {
	useReducer,
	useContext,
	Fragment,
	useState,
	memo,
	useMemo,
} from "react";
import styled from "styled-components";

const TodosStyled = styled.div`
	background-color: white;
	padding: 5px;
	max-width: 400px;
`;

TodosStyled.displayName = "TodosStyled";

const TodoItemStyled = styled.div`
	margin-bottom: 5px;
	border: 1px solid grey;
	background-color: peach;
	color: black;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
`;

TodoItemStyled.displayName = "TodoItemStyled";

const TodosReducer = (state, action) => {
	switch (action.type) {
		case "add":
			// Find the last id and add a new item with the iterated id
			return [
				...state,
				{
					id: state[state.length - 1].id + 1,
					text: action.payload,
					isCompleted: false,
				},
			];
		case "delete":
			return state.filter((x) => x.id !== action.payload);
		case "complete":
			return state.map((value, index, array) => {
				if (value.id === action.payload) {
					return {
						...value,
						isCompleted: !value.isCompleted,
					};
				}

				return value;
			});
		default:
			return state;
	}
};

const initialState = [
	{ id: 1, text: "Learn Hooks", isCompleted: false },
	{ id: 2, text: "Clear Interview", isCompleted: false },
	// { id: 3, text: "Get Rich", isCompleted: false },
];

const TodosContext = React.createContext();

const TodoItem = ({ item }) => {
	const { dispatch } = useContext(TodosContext);

	return (
		<div
			style={{
				marginBottom: "5px",
				border: "1px solid grey",
				backgroundColor: "peach",
				color: "black",
				cursor: "pointer",
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<input
				type="checkbox"
				checked={item.isCompleted}
				onChange={(e) =>
					dispatch({ type: "complete", payload: item.id })
				}
			/>
			<div>{item.text}</div>
			<button
				onClick={(e) => dispatch({ type: "delete", payload: item.id })}
			>
				Delete
			</button>
		</div>
	);
};

TodoItem.displayName = "TodoItem";

const Todos = () => {
	const [state, dispatch] = useReducer(TodosReducer, initialState); // args: the reducer function and initial value (initial state).
	// const providerValue = { state, dispatch }; // This is the 'value' that gets passed down to all the child components.

	const handleKeyUp = (e) => {
		if (e.keyCode === 13) {
			dispatch({ type: "add", payload: e.target.value });
		}
	};

	return (
		<TodosContext.Provider value={dispatch}>
			<div
				style={{
					backgroundColor: "white",
					padding: "5px",
					maxWidth: "400px",
				}}
			>
				{state.map((value) => {
					return <TodoItem key={value.id} item={value}></TodoItem>;
				})}
				<br></br>
				<input
					type="text"
					placeholder="Add a new todo item and hit Enter"
					onKeyUp={(e) => {
						handleKeyUp(e);
					}}
				/>
			</div>
		</TodosContext.Provider>
	);
};

export default Todos;
