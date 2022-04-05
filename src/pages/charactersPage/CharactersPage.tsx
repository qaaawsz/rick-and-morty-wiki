import React, {useEffect} from 'react'
import CharactersList from '../../components/characters/charactersList/CharactersList'
import SearchBar from '../../components/searchBar/SearchBar'
import Filters from '../../components/filters/Filters'
import Pagination from '../../components/pagination/Pagintation'

interface ICharactersPage {
    search: string
    setSearch: Function
    page: number

    changePage: Function

    paginationInfo: any
    characters: any[]
    setPaginationFilterType: Function
    setPaginationFilter: Function

    setOpenedPage: Function
    loading: boolean
    error: string
}

const CharactersPage: React.FC<ICharactersPage> =
    ({
         search,
         setSearch,
         page,
         changePage,
         paginationInfo,
         characters,
         setPaginationFilterType,
         setPaginationFilter,
         setOpenedPage,
         loading,
         error,
     }) => {

        useEffect(() => {
            setOpenedPage('characters')
        }, [])

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
                            {
                                loading
                                    ?
                                    <div className="container-fluid">
                                        <p className="fs-4 text-center">Characters loading in progress</p>
                                    </div>
                                    :
                                    <>
                                        <CharactersList characters={characters}/>
                                        <Pagination
                                            page={page}
                                            changePage={changePage}
                                            paginationInfo={paginationInfo}
                                        />
                                    </>
                            }

                        </div>
                    </div>
                </div>
            </>
        )
    }

export default CharactersPage
