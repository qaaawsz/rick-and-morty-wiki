import React from 'react'
import Navigation from './navigation/Navigation'
import ModeSwitcher from './modeSwitcher/ModeSwitcher'
import Heading from './heading/Heading'

const Header: React.FC<{ theme: string, setTheme: Function }> = ({theme, setTheme}) => {
    return (
        <>
            <div className="header container-fluid p-3">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <Heading/>
                    </div>
                    <nav>
                        <Navigation/>
                        <ModeSwitcher theme={theme} setTheme={setTheme}/>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Header
