import React, {useEffect, useState} from 'react'
import CharactersList from '../../components/characters/charactersList/CharactersList'
import SearchBar from '../../components/searchBar/SearchBar'
import Filters from '../../components/filters/Filters'
import Pagination from '../../components/pagination/Pagintation'
import {fetchPaginatedCharacters} from '../../services/apiHandler'

const CharactersPage: React.FC = () => {

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [search, setSearch] = useState<string>('')
    const [paginationFilter, setPaginationFilter] = useState<string>('')
    const [paginationFilterType, setPaginationFilterType] = useState<string>('')
    const [paginationInfo, setPaginationInfo] = useState<any>()
    const [characters, setCharacters] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>('')

    const fetchCharacters = async (page: number, search?: string, filterType?: string, filter?: string) => {
        setCharacters([])
        setError(undefined)
        setLoading(true)
        if (page === 1) setCurrentPage(1)
        let response
        if (currentPage && search) {
            response = await fetchPaginatedCharacters(page, search)
        } else if (paginationFilter && paginationFilterType) {
            response = await fetchPaginatedCharacters(page, '', filterType, filter)
        } else {
            response = await fetchPaginatedCharacters(page)
        }
        if (!response) {
            setError('Related characters have not been found')
            return
        }
        setCharacters(response.results)
        setPaginationInfo(response.info)
        setLoading(false)
    }

    const resetFilters = () => {
        setPaginationFilterType('')
        setPaginationFilter('')
        fetchCharacters(1)
    }

    // Fetches new page of paginated characters according to set filters(search, filter, none) each time page is changed
    useEffect(() => {
        fetchCharacters(currentPage, search, paginationFilterType, paginationFilter)
    }, [currentPage])

    // Paginated search related to filters
    useEffect(() => {
        fetchCharacters(1, '', paginationFilterType, paginationFilter)
    }, [paginationFilter])

    // Text paginated search. Uses debouncing with 500ms timeout
    useEffect(() => {
        setLoading(true)
        let searchTimeout = setTimeout(() => {
            (async () => {
                fetchCharacters(1, search)
                setSearch('')
                setLoading(false)
            })()
        }, 500)

        return () => {
            clearTimeout(searchTimeout)
        }
    }, [search])

    let content
    if (loading) content = <p className="fs-4 text-center">Characters loading in progress</p>
    if (characters.length > 0 && !loading) content = <CharactersList characters={characters}/>
    if (error && !loading) content = <p className="fs-4 text-center">{error}</p>

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <SearchBar search={search} setSearch={setSearch}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-xl-2">
                        <Filters
                            setPaginationFilterType={setPaginationFilterType}
                            setPaginationFilter={setPaginationFilter}
                            resetFilters={resetFilters}
                        />
                    </div>
                    <div className="col-12 col-xl-10 ps-0 pe-0">
                        {content}
                        {
                            characters.length > 0 && !loading &&
                            <Pagination
                                page={currentPage}
                                setPage={setCurrentPage}
                                paginationInfo={paginationInfo}
                            />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default CharactersPage
