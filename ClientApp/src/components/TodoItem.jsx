import React from 'react';

const TodoItem = ({ todo, removeTodo, completeTodo }) => {
    console.log(todo)

    return (
        <div className="todo" style={{ textDecoration: todo.completo == "S" ? "line-through": "" }}>
            <div className="content">
            
                <p>{todo.nome}</p>
                <p className="category">{todo.tarefas}</p>
            </div>
            <div>
                <button className="complete" onClick={() => completeTodo(todo.id)}>Completar</button>
                <button className="remove" onClick={() => removeTodo(todo.id)}>X</button>
            </div>
        </div>
    );
}

export default TodoItem;
