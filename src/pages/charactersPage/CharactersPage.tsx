import React, {useEffect, useState} from 'react'
import {fetchCharacters, searchByName} from '../../services/apiHandler'
import CharactersList from '../../components/characters/charactersList/CharactersList'
import SearchBar from '../../components/searchBar/SearchBar'
import Filters from '../../components/filters/Filters'
import Pagination from '../../components/pagination/Pagintation'

const CharactersPage: React.FC = () => {
    const [page, setPage] = useState<number>(1)
    const [search, setSearch] = useState<string>('')
    const [characters, setCharacters] = useState<any[]>([])
    const [paginationInfo, setPaginationInfo] = useState<any>()

    useEffect(() => {
        fetchCharacters(page)
            .then(json => {
                setCharacters(json.results)
                setPaginationInfo(json.info)
            })
    }, [page])

    useEffect(() => {
        setPage(1)
        searchByName(search)
            .then(json => {
                setCharacters(json.results)
                setPaginationInfo(json.info)
            })
    }, [search])

    if (!characters.length) return <p>Loading</p>

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <SearchBar search={search} setSearch={setSearch}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-xl-2 bg-info">
                        <Filters/>
                    </div>
                    <div className="col col-xl-10">
                        <CharactersList characters={characters}/>
                        <Pagination page={page} setPage={setPage} paginationInfo={paginationInfo}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CharactersPage
