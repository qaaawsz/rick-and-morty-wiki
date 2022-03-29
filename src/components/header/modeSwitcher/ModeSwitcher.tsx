import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import {mobileFriendlyLayout} from '../../../services/globalVariables'

const ModeSwitcher: React.FC<{ theme: string, setTheme: Function }> = ({theme, setTheme}) => {
    const {screenSize} = useWindowSize()

    return (
        <i onClick={() => setTheme((prevState: string) => prevState === 'light' ? 'dark' : 'light')}
           className={`text-light-secondary ms-2 text-decoration-none bi ${theme === 'dark' ? 'bi-brightness-high-fill' : 'bi-brightness-high'} 
            ${screenSize > mobileFriendlyLayout ? 'fs-4' : 'fs-1'}`}
        />
    )
}

export default ModeSwitcher
