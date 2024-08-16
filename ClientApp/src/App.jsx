import { useState } from "react";
import Todo from './components/TodoItem';
import "./App.css";
import Todoform from "./components/Todoform";
import Search from "./components/Search";
import Filter from "./components/Filter";

function App() {
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: "criar funcionalidade x no sistema",
            category: "Trabalho",
            isCompleted: false,
        },
        {
            id: 2,
            text: "Ir pra academia",
            category: "Pessoal",
            isCompleted: false,
        },
        {
            id: 3,
            text: "Estudar React",
            category: "Estudos",
            isCompleted: false,
        }
    ]);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("All");
    const [sort, setSort] = useState("Asc");





    const addTodo = (text, category) => {
        const newTodo = {
            id: Math.floor(Math.random() * 1000),
            text,
            category,
            isCompleted: false,
        };
        setTodos([...todos, newTodo]);
    };

    const removeTodo = (id) => {
        const filteredTodos = todos.filter((todo) => todo.id !== id);
        setTodos(filteredTodos);
    };

    const completeTodo = (id) => {
        const newTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        );
        setTodos(newTodos);
    };

    return (
        <div className="app">
            <h1>Lista de Tarefas</h1>
            <Search search={search} setSearch={setSearch} />
            <Filter filter={filter} setFilter={setFilter} setSort={setSort} />

            <div className="todo-list">
                {todos
                    .filter((todo) => {
                        if (filter === "All") return true;
                        if (filter === "Completed") return todo.isCompleted;
                        if (filter === "Incomplete") return !todo.isCompleted;
                        return true; // Default case
                    })

                    .sort((a, b) => sort === "Asc"
                        ? a.text.localeCompare(b.text)
                        : b.text.localeCompare(a.text)
                    )
                    .filter((todo) =>
                        todo.text.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((todo) => (
                        <Todo
                            key={todo.id}
                            todo={todo}
                            removeTodo={removeTodo}
                            completeTodo={completeTodo}
                        />
                    ))}
            </div>
            <Todoform addTodo={addTodo} />
        </div>
    );
}

export default App;