import { useEffect } from "react";
import type { iTodo } from "../App";

function updateLS(todos: iTodo[]) {
    useEffect(() => {
        const stringifyArr = JSON.stringify(todos)
        localStorage.setItem("todos", stringifyArr)
    }, [todos])
}

export default updateLS;