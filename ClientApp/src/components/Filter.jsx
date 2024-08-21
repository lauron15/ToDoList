

const Filter = ({filter, setFilter, setSort }) => {
    return (
        <div className="filter">
            <h2>Filtrar:</h2>
            <div className='filter-options'>
                <div>
                    <p>Status:</p>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="All">Todas</option>
                        <option value="S">Completas</option>
                        <option value="N">Incompletas</option>
                    </select>
                </div>
                <div>
                    <p>Orderm Alfabética:</p>
                    <button onClick={() => setSort('ASC')}>Asc</button>
                    <button onClick={() => setSort('DESC')}>Desc</button>
                </div>
            </div>
        </div>
    )
}
export default Filter; 