import {Link} from 'react-router-dom'
import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import {mobileFriendlyLayout} from '../../../services/globalVariables'
import {link} from '../../../services/types'


const Navigation: React.FC = () => {
    const {screenSize} = useWindowSize()

    const links: link[] = [
        {
            to: '/',
            link: screenSize > mobileFriendlyLayout ? 'Characters' : <i className="bi bi-people fs-1"/>,
        },
        {
            to: '/locations',
            link: screenSize > mobileFriendlyLayout ? 'Locations' : <i className="bi bi-compass fs-1"/>
        },
        {
            to: '/episodes',
            link: screenSize > mobileFriendlyLayout ? 'Episodes' : <i className="bi bi-tv fs-1"/>
        }
    ]

    return (
        <>
            {
                links.map((link: link) =>
                    <Link key={link.to} className="text-semi-bold text-light-secondary mx-2 text-decoration-none" to={link.to}>
                        {link.link}
                    </Link>
                )
            }
        </>
    )
}

export default Navigation
