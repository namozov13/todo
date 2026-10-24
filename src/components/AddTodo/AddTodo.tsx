import { useState } from "react";
import type { TodoProp } from "../../App";
import updateLS from "../updateLS";

export default function AddTodo({ todos, setTodos }: TodoProp) {
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    const [isErr, setIsErr] = useState<string>("hidden");

    function handleClick(): void {
        setIsCompleted(prev => !prev);
    };

    function getRandomID(IDArray: number[]) {
        let randID = Math.floor(Math.random() * 5000) + 1;
        if (IDArray.includes(randID)) return getRandomID(IDArray);
        return randID;
    }

    function handleSubmit(e: any) {

        const IDs: number[] = [];
        todos.forEach(todo => {
            IDs.push(todo.id);
        });

        e.preventDefault();
        const form = (document.getElementById("form") as HTMLFormElement);
        const val = (document.getElementById("newTodo") as HTMLInputElement).value.trim();
        if (val.length) {
            form.reset();
            setIsCompleted(false);
            const newTodo = { id: getRandomID(IDs), todoText: val, completed: isCompleted };
            setTodos([newTodo, ...todos]);
        } else {
            setIsErr("")
            setTimeout(() => setIsErr("hidden"), 3000)
        };
    };

    updateLS(todos);
    return (
        <>
            <div className="newTodoBox">
                <form id="form" onSubmit={(e) => { handleSubmit(e) }}>
                    <div onClick={handleClick} className={"radioBox " + (isCompleted ? "active" : "")}></div>
                    <input autoComplete="off" id="newTodo" type="text" placeholder="Create a new todo…" />
                </form >
            </div >
            <span className={"err " + isErr}>Please, don't leave this blank.</span>
        </>
    )
};