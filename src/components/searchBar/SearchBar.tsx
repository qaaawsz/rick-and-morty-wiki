import React from 'react'

interface ISearchBar {
    search: string
    setSearch: Function
}

const SearchBar: React.FC<ISearchBar> = ({search, setSearch}) => {
    return (
        <>
            <form>
                <div className="d-flex justify-content-center my-3">
                    <div className="w-50 input-group">
                        <input onChange={(e) => setSearch(e.target.value)} value={search} type="text"
                               className="form-control" placeholder="Enter character name"
                               aria-label="Enter character name" aria-describedby="button-search"/>
                        <button disabled={true} className="btn btn-outline-secondary" type="button" id="button-search">
                            <i className="bi bi-search"/>
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SearchBar
