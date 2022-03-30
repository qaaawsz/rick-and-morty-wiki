import React, {useEffect, useState} from 'react'
import {fetchCharacters} from '../../services/apiHandler'
import CharactersList from '../../components/characters/charactersList/CharactersList'
import SearchBar from '../../components/searchBar/SearchBar'
import Filters from '../../components/filters/Filters'
import Pagination from '../../components/pagination/Pagintation'

const CharactersPage: React.FC = () => {
    const [page, setPage] = useState<number>(1)
    const [characters, setCharacters] = useState<any[]>([])
    const [paginationInfo, setPaginationInfo] = useState<any>()

    useEffect(() => {
        fetchCharacters(page)
            .then(json => {
                setCharacters(json.results)
                setPaginationInfo(json.info)
            })
    }, [page])

    if(!characters.length) return <p>Loading</p>

    return (
        <>
            <div className='container-fluid'>
                <div className="row bg-dark">
                    <div className="col">
                        <SearchBar />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-xl-2 bg-info">
                        <Filters />
                    </div>
                    <div className="col col-xl-10 bg-secondary">
                        <CharactersList characters={characters}/>
                        <Pagination />
                    </div>
                </div>
                </div>
        </>
    )
}

export default CharactersPage
