import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CharactersPage from './pages/charactersPage/CharactersPage'
import EpisodesPage from './pages/episodesPage/EpisodesPage'
import LocationsPage from './pages/locationsPage/LocationsPage'
import Header from './components/header/Header'
import useLocalStorage from 'use-local-storage'

const App: React.FC = () => {
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light')

    return (
        <div className="app" data-theme={theme}>
            <Router>
                <Header theme={theme} setTheme={setTheme}/>
                <Routes>
                    <Route path="/" element={<CharactersPage/>}/>
                    <Route path="/locations" element={<LocationsPage/>}/>
                    <Route path="/episodes" element={<EpisodesPage/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App
