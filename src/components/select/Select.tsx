import React from 'react'

const Select: React.FC<{ amount: number, picked: number, setPicked: Function }> =
    ({amount, picked, setPicked}) => {

        const episodesList = () => {
            const resultsArr = []
            for (let i = 1; i <= amount; i++) {
                resultsArr.push(<option key={i} value={i}>{i}</option>)
            }
            return resultsArr
        }

        return (
            <>
                <select value={picked} onChange={(e) => setPicked(e.target.value)}
                        className="form-select" aria-label="Default select example">
                    {episodesList()}
                </select>
            </>
        )
    }

export default Select
