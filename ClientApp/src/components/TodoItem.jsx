import React from 'react';

const TodoItem = ({ todo }) => {
    return (
        <div className="todo">
            <div className="content">
                <p>{todo.text}</p>
                <p className="category">{todo.category}</p>
            </div>
            <div>
                <button className="complete">Completar</button>
                <button className="remove">Finalizar</button>
            </div>
        </div>
    );
}

export default TodoItem;
