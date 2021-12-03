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

const TodosContext = React.createContext();

const TodosReducer = (state, action) => {};

const initialState = [
	{ id: 1, text: "Learn Hooks", isCompleted: false },
	{ id: 2, text: "Clear Interview", isCompleted: false },
	{ id: 3, text: "Get Rich", isCompleted: false },
];

const TodoItem = ({ item }) => {};

TodoItem.displayName = "TodoItem";

const Todos = () => {
	const [state, dispatch] = useReducer(TodosReducer, initialState);

	return (
		<TodosContext.Provider value={dispatch}>
			<div></div>
		</TodosContext.Provider>
	);
};

export default Todos;
