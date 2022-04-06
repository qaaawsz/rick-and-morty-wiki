import React, {useContext} from 'react'
import {ThemeContext} from '../../context/ThemeContext'

interface ISelect {
    amount: number
    picked: number
    setPicked: Function
}

const Select: React.FC<ISelect> = ({amount, picked, setPicked}) => {

    const {theme} = useContext(ThemeContext)

    const episodesList = () => {
        const resultsArr = []
        for (let i = 1; i <= amount; i++) {
            resultsArr.push(<option key={i} value={i}>{i}</option>)
        }
        return resultsArr
    }

    return (
        <>
            <select value={picked}
                    onChange={(e) => setPicked(e.target.value)}
                    className={`form-select ${theme === 'light' ? '' : 'bg-dark text-white'}`} aria-label="Default select example">
                {episodesList()}
            </select>
        </>
    )
}

export default Select
