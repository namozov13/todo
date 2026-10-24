import type { Dispatch, SetStateAction } from "react";
import type { iTodo } from "../../App";
import { List } from "../List/List";

interface renderProp {
    todos: iTodo[],
    setTodos: Dispatch<SetStateAction<iTodo[]>>,
    filter: "all" | "active" | "completed"
}


function RenderTodos({ todos, setTodos, filter }: renderProp) {
    const filteredTodos = todos.filter((todo) => {
        if (filter === "all") return todo;
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
    });

    return (
        <>
            {
                filteredTodos.map((todo) => (
                    <List todoText={todo.todoText} todoId={todo.id} key={todo.id} completed={todo.completed} todos={todos} setTodos={setTodos} />
                ))
            }
        </>
    );
};
export default RenderTodos;