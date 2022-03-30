import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import {mobileFriendlyLayout} from '../../../services/globalVariables'

const Heading: React.FC = () => {
    const {screenSize} = useWindowSize()

    return (
        screenSize > mobileFriendlyLayout
            ? <p className="text-bold my-0 fs-2">Rick and Morty <span className="text-light-secondary">Wiki</span></p>
            : <img src="./assets/logo.png" alt="logo"/>
    )
}
export default Heading
