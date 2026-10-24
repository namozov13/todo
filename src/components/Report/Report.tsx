import type { iTodo } from "../../App";
import { useEffect, type Dispatch, type SetStateAction } from "react";

type FilterType = "all" | "active" | "completed";


interface ReportProp {
  todos: iTodo[],
  setTodos: Dispatch<SetStateAction<iTodo[]>>,
  todoLength: number,
  filter: string,
  setFilter: Dispatch<SetStateAction<FilterType>>
};

export default function Report({ todos, setTodos, todoLength, filter, setFilter }: ReportProp) {

  useEffect(() => {
    console.log(filter);
  }, [filter])

  return (
    <div className="report">
      <div className="itemsLength">
        <span>{todoLength}</span>
        <span> items left</span>
      </div>
      <div className="filter">
        <form>
          <label>
            <p>All</p>
            <input onChange={() => setFilter("all")} type="radio" name="filterType" defaultChecked />
          </label>
          <label>
            <p>Active</p>
            <input onChange={() => setFilter("active")} type="radio" name="filterType" />
          </label>
          <label>
            <p>Completed</p>
            <input onChange={() => setFilter("completed")} type="radio" name="filterType" />
          </label>
        </form>
      </div>
      <button onClick={() => { setTodos(todos.filter(todo => todo.completed === false)) }} className="clearComp">Clear Completed</button>
    </div>
  );
};