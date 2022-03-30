import React from 'react'
import Navigation from './navigation/Navigation'
import ModeSwitcher from './modeSwitcher/ModeSwitcher'
import Heading from './heading/Heading'

const Header: React.FC<{ theme: string, setTheme: Function }> = ({theme, setTheme}) => {
    return (
        <>
            <header className="header d-flex justify-content-between align-items-center p-3">
                <div>
                    <Heading/>
                </div>
                <nav>
                    <Navigation/>
                    <ModeSwitcher theme={theme} setTheme={setTheme}/>
                </nav>
            </header>
        </>
    )
}

export default Header
