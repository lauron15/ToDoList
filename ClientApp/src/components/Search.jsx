const Search = ({ search, setSearch }) => {
    return (
        <div className="search">
            <h2>Pesquisar</h2>
            <input
                type="text"
                value={search} // Use the `search` prop
                onChange={(e) => setSearch(e.target.value)} // Update search with the input value
                placeholder="Digite para Pesquisar..."
            />
        </div>
    );
};

export default Search;
