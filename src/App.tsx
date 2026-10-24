import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

import { ModeSwitcher } from "./components/ModeSwitcher/ModeSwitcher";
import AddTodo from "./components/AddTodo/AddTodo";
import Report from "./components/Report/Report";
import Todos from "./components/Todos/Todos";

export interface iTodo {
  id: number,
  todoText: string,
  completed: boolean
}

export interface TodoProp {
  todos: iTodo[],
  setTodos: Dispatch<SetStateAction<iTodo[]>>
}

function App() {
  const [todos, setTodos] = useState<iTodo[]>(() => {
    const localTodos = localStorage.getItem("todos");
    return localTodos ? JSON.parse(localTodos) : [{ id: 0, todoText: "Hello I am your Todo!!!", completed: false }];
  });

  type FilterType = "all" | "active" | "completed";
  const [filter, setFilter] = useState<FilterType>("all");

  const [todoLength, setTodoLength] = useState<number>(() => {
    const activeTodos = todos.filter((todo) => {
      return !todo.completed;
    });
    return activeTodos.length;
  });

  useEffect(() => {
    const activeTodos = todos.filter((todo) => {
      return !todo.completed;
    });
    setTodoLength(activeTodos.length);
  }, [todos]);

  let mode = localStorage.getItem("themeMode");
  if (!mode) mode = "lightMode";

  const [theme, setTheme] = useState(mode);

  return (
    <div className={"container " + theme}>
      <div className="titleBox">
        <h1 className="title">todo</h1>
        <ModeSwitcher theme={theme} setTheme={setTheme} />
      </div>
      <AddTodo todos={todos} setTodos={setTodos} />
      <div className="todos">
        <ul className="todolist">
          <Todos todos={todos} setTodos={setTodos} filter={filter} />
        </ul>
        <Report todoLength={todoLength} todos={todos} setTodos={setTodos} filter={filter} setFilter={setFilter} />
      </div>
      <p className="proTip">Drag and drop to reorder list</p>
    </div>
  )
}

export default App;