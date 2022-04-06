import React, {useContext, useEffect, useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CharactersPage from './pages/charactersPage/CharactersPage'
import EpisodesPage from './pages/episodesPage/EpisodesPage'
import LocationsPage from './pages/locationsPage/LocationsPage'
import Header from './components/header/Header'
import {setTotalCount} from './services/apiHandler'
import {ThemeContext} from './context/ThemeContext'

const App: React.FC = () => {

    const {theme, changeTheme} = useContext(ThemeContext)

    const [episodesAmount, setEpisodesAmount] = useState<number>(0)
    const [locationsAmount, setLocationsAmount] = useState<number>(0)

    // sets episodes and locations total count. Works only once
    useEffect(() => {
        setTotalCount('episode', setEpisodesAmount)
        setTotalCount('location', setLocationsAmount)
    }, [])



    return (
        <div className="app" data-theme={theme}>
            <Router>
                <Header theme={theme} setTheme={changeTheme}/>
                <Routes>
                    <Route path="/" element={
                        <CharactersPage/>
                    }/>
                    <Route path="/locations" element={
                        <LocationsPage locationsAmount={locationsAmount}/>
                    }/>
                    <Route path="/episodes" element={
                        <EpisodesPage episodesAmount={episodesAmount}/>
                    }/>
                </Routes>
            </Router>
        </div>
    )
}

export default App
