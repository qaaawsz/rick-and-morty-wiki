import React from 'react'

const Select: React.FC<{ episodes: number, selectedNumber: number, setSelectedNumber: Function }> =
    ({episodes, selectedNumber, setSelectedNumber}) => {

        const episodesList = () => {
            const resultsArr = []
            for (let i = 1; i <= episodes; i++) {
                resultsArr.push(<option key={i} value={i}>{i}</option>)
            }
            return resultsArr
        }

        return (
            <>
                <select value={selectedNumber} onChange={(e) => setSelectedNumber(e.target.value)}
                        className="form-select" aria-label="Default select example">
                    {episodesList()}
                </select>
            </>
        )
    }

export default Select
