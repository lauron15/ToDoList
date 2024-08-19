/* import { useState } from "react";

const Todoform = ({addTodo }) => {
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value || !category) return;
        addTodo(value, category);
        setValue("");
        setCategory("");
    };

    return (
        <div>
            <h2>Criar Tarefa</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Digite o título"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Selecione uma categoria</option>
                    <option value="Trabalho">Trabalho</option>
                    <option value="Pessoal">Pessoal</option>
                    <option value="Estudos">Estudos</option>
                </select>
                <button type="submit">Criar Tarefa</button>
            </form>
        </div>
    );
};

export default Todoform; */

import { useState } from "react";
import axios from "axios";

const Todoform = ({ addTodo }) => {
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica se os campos estão preenchidos
        if (!value || !category) {
            console.error("Preencha todos os campos!");
            return;
        }

        try {
            // Chamada à API para criar a tarefa
            const response = await axios.post('http://localhost:44479/api/ToDoList', {
                text: value,
                category: category,
                isCompleted: false
            });

            // Verifica se a resposta é válida
            if (response.status === 201 || response.status === 200) {
                // Adiciona a nova tarefa na lista de tarefas
                addTodo(response.data.text, response.data.category);
                setValue(""); // Limpa o campo de texto
                setCategory(""); // Limpa o campo de categoria
            } else {
                console.error("Erro: Status inesperado", response.status);
            }
        } catch (error) {
            // Verifica se há uma resposta do servidor
            if (error.response) {
                console.error("Erro ao criar a tarefa:", error.response.data);
            } else {
                console.error("Erro ao criar a tarefa:", error.message);
            }
        }
    };

    return (
        <div>
            <h2>Criar Tarefa</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Digite o título"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Selecione uma categoria</option>
                    <option value="Trabalho">Trabalho</option>
                    <option value="Pessoal">Pessoal</option>
                    <option value="Estudos">Estudos</option>
                </select>
                <button type="submit">Criar Tarefa</button>
            </form>
        </div>
    );
};

export default Todoform;
