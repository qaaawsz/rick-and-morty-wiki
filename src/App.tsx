import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CharactersPage from './pages/charactersPage/CharactersPage'
import EpisodesPage from './pages/episodesPage/EpisodesPage'
import LocationsPage from './pages/locationsPage/LocationsPage'
import Header from './components/header/Header'
import useLocalStorage from 'use-local-storage'
import {
    charactersFilterSearch, fetchBySearch,
    fetchCharacters, fetchInstanceCharacters, fetchInstances, fetchSelectedInstance,
    searchByName
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

    // fetches new page of characters each time page is changed
    useEffect(() => {
        if (currentPage && search) {
            fetchBySearch(currentPage, search)
                .then(json => {
                    setCharacters(json.results)
                    setPaginationInfo(json.info)
                })
        } else if (paginationFilter && paginationFilterType) {
            charactersFilterSearch(currentPage, paginationFilterType, paginationFilter)
                .then(res => {
                    setCharacters(res.results)
                    setPaginationInfo(res.info)
                })
        } else {
            fetchCharacters(currentPage)
                .then(json => {
                    setCharacters(json.results)
                    setPaginationInfo(json.info)
                })
        }
    }, [currentPage])

    // resets page to 1 and searches for characters according to search bar at the top. Uses debouncing with 500ms timeout
    useEffect(() => {
        let searchTimeout = setTimeout(() => {
            setCurrentPage(1)
            setPaginationFilter('')
            setPaginationFilterType('')
            searchByName(search)
                .then(json => {
                    setCharacters(json.results)
                    setPaginationInfo(json.info)
                })
        }, 500)

        return () => {
            clearTimeout(searchTimeout)
        }

    }, [search])

    // filters search
    useEffect(() => {
        if (paginationFilter && paginationFilterType) {
            setCurrentPage(1)
            charactersFilterSearch(1, paginationFilterType, paginationFilter)
                .then(res => {
                    setCharacters(res.results)
                    setPaginationInfo(res.info)
                })
        }
    }, [paginationFilter])

    // fetch episodes and locations total count. Should be used only once, memoize later
    useEffect(() => {
        fetchInstances('episode')
            .then(res => {
                setEpisodesAmount(res.info.count)
            })
        fetchInstances('location')
            .then(res => {
                setLocationsAmount(res.info.count)
            })
    }, [])

    // fetch selected episode or location info, or characters
    useEffect(() => {
        setCurrentPage(1)
        if (openedPage !== 'characters') {
            const instanceToFetch = openedPage === 'locations' ? currentLocationNumber : currentEpisodeNumber

            fetchSelectedInstance(instanceToFetch, openedPage)
                .then(json => {
                    setData(json)
                })
        } else {
            fetchCharacters(currentPage)
                .then(json => {
                    setCharacters(json.results)
                    setPaginationInfo(json.info)
                })
        }

    }, [openedPage, currentEpisodeNumber, currentLocationNumber])

    // fetch all characters of episode or location
    useEffect(() => {
        if (openedPage !== 'characters') {
            const instancesToFetch = openedPage === 'locations' ? data.residents : data.characters

            fetchInstanceCharacters(instancesToFetch)
                .then(json => {
                    setCharacters(json)
                })
        }
    }, [data])

    return (
        <div className="app" data-theme={theme}>
            <Router>
                <Header theme={theme} setTheme={setTheme}/>
                <Routes>
                    <Route path="/" element={
                        <CharactersPage
                            loading={loading}
                            search={search}
                            setSearch={setSearch}
                            page={currentPage}
                            changePage={changePage}
                            paginationInfo={paginationInfo}
                            characters={characters || []}
                            setPaginationFilterType={setPaginationFilterType}
                            setPaginationFilter={setPaginationFilter}
                            setOpenedPage={setOpenedPage}
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
                        />
                    }/>
                </Routes>
            </Router>
        </div>
    )
}

export default App
