import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CharactersPage from './pages/charactersPage/CharactersPage'
import EpisodesPage from './pages/episodesPage/EpisodesPage'
import LocationsPage from './pages/locationsPage/LocationsPage'
import Header from './components/header/Header'
import useLocalStorage from 'use-local-storage'
import {
    fetchCharacters,
    fetchCharactersByFilters,
    fetchCharactersBySearch,
    fetchInstanceCharacters,
    fetchInstances,
    fetchSelectedInstance,
} from './services/apiHandler'

const App: React.FC = () => {

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [search, setSearch] = useState<string>('')
    const [paginationInfo, setPaginationInfo] = useState<any>()

    const [paginationFilter, setPaginationFilter] = useState<string>('')
    const [paginationFilterType, setPaginationFilterType] = useState<string>('')

    const [episodesAmount, setEpisodesAmount] = useState<number>(0)
    const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState<number>(1)

    const [locationsAmount, setLocationsAmount] = useState<number>(0)
    const [currentLocationNumber, setCurrentLocationNumber] = useState<number>(1)

    const [data, setData] = useState<any>()

    const [openedPage, setOpenedPage] = useState<string>('characters')
    const [characters, setCharacters] = useState<any[]>([])
    const [theme, setTheme] = useLocalStorage('theme', 'light')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const changePage = (page: any) => {
        setCurrentPage(page.selected + 1)
    }

    // Fetches new page of paginated characters according to set filters(search, filter, none) each time page is changed
    useEffect(() => {
        (async () => {
            setLoading(true)
            let response

            if (currentPage && search) {
                response = await fetchCharactersBySearch(currentPage, search)
            } else if (paginationFilter && paginationFilterType) {
                response = await fetchCharactersByFilters(currentPage, paginationFilterType, paginationFilter)
            } else {
                response = await fetchCharacters(currentPage)
            }

            setCharacters(response.results)
            setPaginationInfo(response.info)
            setLoading(false)
        })()
    }, [currentPage])

    // Text paginated search. Uses debouncing with 500ms timeout
    useEffect(() => {
        setLoading(true)
        let searchTimeout = setTimeout(() => {
            setCurrentPage(1)
            setPaginationFilter('')
            setPaginationFilterType('')
            fetchCharactersBySearch(1, search)
                .then(json => {
                    setCharacters(json.results)
                    setPaginationInfo(json.info)
                })
            setLoading(false)
        }, 500)

        return () => {
            clearTimeout(searchTimeout)
        }
    }, [search])

    // Paginated search related to filters
    useEffect(() => {
        (async () => {
            setLoading(true)
            if (paginationFilter && paginationFilterType) {
                setCurrentPage(1)
                const paginatedFilterResponse = await fetchCharactersByFilters(1, paginationFilterType, paginationFilter)
                setCharacters(paginatedFilterResponse.results)
                setPaginationInfo(paginatedFilterResponse.info)
            }
            setLoading(false)
        })()
    }, [paginationFilter])

    // fetch episodes and locations total count. Works only once
    useEffect(() => {
        const fetch = async (instanceType: string, setFn: Function) => {
            setLoading(true)
            const response = await fetchInstances(instanceType)
            setFn(response.info.count)
            setLoading(false)
        }

        fetch('episode', setEpisodesAmount)
        fetch('location', setLocationsAmount)

    }, [])

    // fetch selected episode or location info and its characters, or paginated characters
    useEffect(() => {
        (async () => {
            setLoading(true)
            if (openedPage !== 'characters') {
                const instanceToFetch = openedPage === 'locations' ? currentLocationNumber : currentEpisodeNumber

                const instanceResponce = await fetchSelectedInstance(instanceToFetch, openedPage)
                setData(instanceResponce)

                const instancesToFetch = openedPage === 'locations' ? instanceResponce.residents : instanceResponce.characters
                const charactersResponse = await fetchInstanceCharacters(instancesToFetch)
                setCharacters(charactersResponse)

            } else {
                setCurrentPage(1)
                const paginatedCharactersResponse = await fetchCharacters(1)
                setCharacters(paginatedCharactersResponse.results)
                setPaginationInfo(paginatedCharactersResponse.info)
            }
            setLoading(false)
        })()
    }, [openedPage, currentEpisodeNumber, currentLocationNumber])

    return (
        <div className="app" data-theme={theme}>
            <Router>
                <Header theme={theme} setTheme={setTheme}/>
                <Routes>
                    <Route path="/" element={
                        <CharactersPage
                            search={search}
                            setSearch={setSearch}
                            page={currentPage}
                            changePage={changePage}
                            paginationInfo={paginationInfo}
                            characters={characters || []}
                            setPaginationFilterType={setPaginationFilterType}
                            setPaginationFilter={setPaginationFilter}
                            setOpenedPage={setOpenedPage}
                            loading={loading}
                            error={error}
                        />
                    }/>
                    <Route path="/locations" element={
                        <LocationsPage
                            selectedLocation={data}
                            locationsAmount={locationsAmount}
                            currentLocationNumber={currentLocationNumber}
                            setCurrentLocationNumber={setCurrentLocationNumber}
                            characters={characters}
                            setOpenedPage={setOpenedPage}
                            loading={loading}
                            error={error}
                        />
                    }/>
                    <Route path="/episodes" element={
                        <EpisodesPage
                            selectedEpisode={data}
                            episodesAmount={episodesAmount}
                            currentEpisodeNumber={currentEpisodeNumber}
                            setCurrentEpisodeNumber={setCurrentEpisodeNumber}
                            characters={characters}
                            setOpenedPage={setOpenedPage}
                            loading={loading}
                            error={error}
                        />
                    }/>
                </Routes>
            </Router>
        </div>
    )
}

export default App
