import { useState, type Dispatch, type SetStateAction } from "react";
import xSVG from "../../assets/delTodo.svg";
import type { iTodo } from "../../App";
import updateLS from "../updateLS";


interface listProps {
    todoText: string,
    completed: boolean,
    todoId: number,
    todos: iTodo[],
    setTodos: Dispatch<SetStateAction<iTodo[]>>
}

export function List({ todoText, completed, todoId, todos, setTodos }: listProps) {
    const [isCompleted, setIsCompleted] = useState<boolean>(completed);

    function handleClick(): void {
        setIsCompleted(prev => !prev);
        setTodos(todos.map((todo) => {
            if (todo.id === todoId) {
                return { id: todo.id, todoText: todo.todoText, completed: !todo.completed };
            };
            return todo;
        }));
    };

    function handleDel() {
        setTodos(todos.filter(todo => todo.id !== todoId));
    }
    updateLS(todos);

    return (
        <li>
            <label>
                <div onClick={handleClick} className="listmain">
                    <div role="checkbox" className={"radioBox " + (isCompleted ? "active" : "")}></div>
                    <p className="todoVal">{todoText}</p>
                </div>
            </label>
            <button onClick={handleDel} className="x">
                <img src={xSVG} alt="delbutton" />
            </button>
        </li>
    );
};