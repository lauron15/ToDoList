import { Button } from "bootstrap";
import { useState } from "react";
import Todo from './components/TodoItem';
import "./App.css";
import Todoform from "./components/Todoform";

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
    ])

    const addTodo = (text, category) => {

        const newTodos = [...todos, {
            id: Math.floor(Math.random() * 1000),
            text,
            category,
            isCompleted: false,
        }]
        setTodos(newTodos);
    };


    const removeTodo = (id) => {
        const newTodos = [...todos]
        const filteredTodos = newTodos.filter((todo) =>
            todo.id !== id ? todo : null)


    setTodos(filteredTodos);
    };

    const completeTodo = (id) => {
        const newTodos = [...todos]
        newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo);
        setTodos(newTodos);
    }; 

    return <div className="app">
        <h1> Lista de Tarefas</h1>
        <div className="todo-list">
            {todos.map((todo) => (
                <Todo key={todo.id} todo={todo} removeTodo={removeTodo} completeTodo={completeTodo} />))} </div>
        <Todoform addTodo={addTodo}/>
</div>;

}

export default App;