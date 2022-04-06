import React, {useContext} from 'react'
import {ThemeContext} from '../../context/ThemeContext'

interface ISearchBar {
    search: string
    setSearch: Function
}

const SearchBar: React.FC<ISearchBar> = ({search, setSearch}) => {
    const {theme} = useContext(ThemeContext)

    return (
        <>
            <div className="d-flex justify-content-center my-3">
                <div className="searchBox input-group">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        type="text"
                        className={`form-control ${theme === 'light' ? '' : 'bg-dark text-white'}`}
                        placeholder="Enter character name"
                        aria-label="Enter character name" aria-describedby="button-search"
                    />
                    <button disabled={true} className="btn btn-outline-secondary" type="button" id="button-search">
                        <i className="bi bi-search"/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default SearchBar
