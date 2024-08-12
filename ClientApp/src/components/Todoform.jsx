import React from "react";


const Todoform = () => {
    return <div>Todoform
        <h2>Criar Tarefa</h2>
        <form>
            <input type="text" placeholder="Digite o título">
            </input>
            <select>
                <option value= "">Selecione uma categoria</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Pessoal">Pessoal</option>
                <option value="Estudos">Selecione uma categoria</option>

            </select>
            <button type="submit"> Criar Tarefa </button>

        </form>
    </div>;
};

export default Todoform;