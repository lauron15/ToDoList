import { useEffect, useState } from "react";
import Todo from './components/TodoItem';
import "./App.css";
import Todoform from "./components/Todoform";
import Search from "./components/Search";
import Filter from "./components/Filter";

function App() {

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("All");
    const [sort, setSort] = useState("ASC");

    // inicializei as tafefas como null, ela vai receber nosso objeto do banco, no caso a lista de tarefas
    const [tarefas, setTarefas] = useState(null);
    const [loading, setLoading] = useState(true);

    // precisamos carregar a lista todo, então vamos carregar através do axios
    // 1min
    // beleza vamos continuar.

    const carregarTodo = async () => {
        try {

            // não vamos ter body pois não precisamos enviar nada, na vdd não o token é no header então realmente n precisamos do body
            const queryString = new URLSearchParams({
                pesquisa: search,
                status: filter == "All" ? "" : filter,
                ordem: sort,
            }).toString();

            const response = await fetch(`api/todo/all?${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            // Verifica se a resposta é válida
            // se for valida vamos salvar isso em um novo state
            if (response.ok) {
                const data = await response.json();
                // Adiciona a nova tarefa na lista de tarefas
                // aqui nos recebemos o data que é nosso objeto vindo do banco vamos setar ele no nosso tarefas ou seja o tarefas vai receber o valor do nosso banco
                // beleza já estamos carregando sua lista de tarefas na nossa tarefas
                setTarefas(data);
                setLoading(false);
            } else {
                setLoading(false);
                console.error("Erro: Status inesperado", response.status);
            }
        } catch (error) {
            setLoading(false);
            console.error("Erro ao criar a tarefa:", error.message);
        }
    }

    // Beleza, aqui vamos usar um useEffect para carregar a função assim que a tela for inicializada
    // ok, mas ainda não ta legal, precisamos fazer um loading, para mostrar somente após ser carregado

    useEffect(() => {
        carregarTodo();
    }, [])


    // esse segundo useEffect ele ta só assistindo nosso tarefas, ou seja sempre que tarefas receberu m novo valor ele vai ser atualizado
    // de uma forma assincrona, recomente vc estudar depois o useEffect

    useEffect(() => {
    }, [tarefas])


    // isso aqui é uma propriedade do react, ele chama timeout, vc seta quanto tempo ele vai re executar algo pra vc, como ali ta 5000 significa
    // que depois de 5 segundos que vc pesquisdou algo ele vai chamar sua função
    // 5 segundos ficou muito
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            carregarTodo();
        }, 2000);

        return () => clearTimeout(timeoutId); // Limpa o timeout se o search mudar antes de completar os 5 segundos
    }, [search, filter, sort]);



    const removeTodo = async (id) => {
        // aqui vai funcionar igual os outros, porem nos vamos deletar e
        //depois que deletar nos vamos recarregar a sua lista chamando o carregarTarefas()
        try {
            const response = await fetch(`api/todo/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            // se for ok vamos recarregar a listagem
            if (response.ok) {
                carregarTodo();
            } else {
                console.error("Erro: Status inesperado", response.status);
            }
        } catch (error) {
            console.error("Erro ao criar a tarefa:", error.message);
        }
    };

    const completeTodo = async (id) => {
        try {
            // porque todo/completar? porque eu criei assim la ou seja, sempre vai ser api/[controller] que é o nome do arquivo, ou seja api/todo
            // porem na especificação do put eu falei que ele vai ser completar/id ou seja api/todo/completar/{id}
            const response = await fetch(`api/todo/completar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                carregarTodo();
            } else {
                console.error("Erro: Status inesperado", response.status);
            }
        } catch (error) {
            console.error("Erro ao criar a tarefa:", error.message);
        }
    };

    if (loading)
        return "Carregando..."
    else
        return (
            <div className="app">
                <h1>Lista de Tarefas</h1>
                <Search search={search} setSearch={setSearch} />
                <Filter filter={filter} setFilter={setFilter} setSort={setSort} />

                <div className="todo-list">
                    {// aqui ta reclamando que talvez as tarefas n existem, nos podemos resolver de duas formas
                        // como ela pode ser null, temos que validar que vai fazer o .map só depois dela existir, isso serve para qualquer metodo
                        // que vc vai usar depois de algo, exemplo o toString(), eu não posso colocar algo toString que n existe, toUpper tmb e por ai vai..
                        // maneira 1 tarefas != null && tarefas.map..... ou tarefas?.map
                         tarefas?.map((todo) => (
                            <Todo
                                key={todo.id}
                                todo={todo}
                                removeTodo={removeTodo}
                                completeTodo={completeTodo}
                            />
                        ))}
                </div>
                <Todoform recarregar={carregarTodo} />
            </div>
        );
}

export default App;