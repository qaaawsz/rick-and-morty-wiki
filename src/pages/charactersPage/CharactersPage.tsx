import React, {useEffect} from 'react'
import CharactersList from '../../components/characters/charactersList/CharactersList'
import SearchBar from '../../components/searchBar/SearchBar'
import Filters from '../../components/filters/Filters'
import Pagination from '../../components/pagination/Pagintation'

interface ICharactersPage {
    loading: boolean
    search: string
    setSearch: Function
    page: number

    changePage: Function

    paginationInfo: any
    characters: any[]
    setPaginationFilterType: Function
    setPaginationFilter: Function

    setOpenedPage: Function
}

const CharactersPage: React.FC<ICharactersPage> =
    ({
         loading,
         search,
         setSearch,
         page,
         changePage,
         paginationInfo,
         characters,
         setPaginationFilterType,
         setPaginationFilter,

         setOpenedPage,
     }) => {

        useEffect(() => {
            setOpenedPage('characters')
        }, [])

        if (!characters || loading) return <p>Loading</p>

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
                            <Filters setPaginationFilterType={setPaginationFilterType}
                                     setPaginationFilter={setPaginationFilter}/>
                        </div>
                        <div className="col col-xl-10">
                            <CharactersList characters={characters}/>
                            <Pagination page={page} changePage={changePage} paginationInfo={paginationInfo}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }

export default CharactersPage
