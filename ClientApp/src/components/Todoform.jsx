
import { useState } from "react";

const Todoform = ({ recarregar }) => {
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");
    const [completo, setCompleto] = useState("N");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica se os campos estão preenchidos
        if (!value || !category) {
            console.error("Preencha todos os campos!");
            return;
        }

        try {
            // Chamada à API para criar a tarefa
            const response = await fetch('api/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tarefas: category,
                    Nome: value,
                    Completo: completo
                })
            });

            // Verifica se a resposta é válida
            if (response.ok) {
                const data = await response.json();
                // Adiciona a nova tarefa na lista de tarefas
                // não precisamos mais disso, ao inves disso vou trocar o nome para "recarregar" 
                // então quando a respota for "OK" vamos recarregar nossa lista de tarefas no component pai
                recarregar();
                setValue(""); // Limpa o campo de texto
                setCategory(""); // Limpa o campo de categoria
            } else {
                console.error("Erro: Status inesperado", response.status);
            }
        } catch (error) {
            console.error("Erro ao criar a tarefa:", error.message);
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
                <select
                    value={completo}
                    onChange={(e) => setCompleto(e.target.value)}
                >
                    <option value="N">Não</option>
                    <option value="S">Sim</option>
                </select>
                <button type="submit">Criar Tarefa</button>
            </form>
        </div>
    );
};

export default Todoform;