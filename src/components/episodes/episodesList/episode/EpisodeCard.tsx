import React, {useEffect, useState} from 'react'
import {fetchEpisodeCharacters} from '../../../../services/apiHandler'

interface IEpisodeCard {
    name: string
    airDate: string
    characters: any[]
    setLoading: Function
}

const EpisodeCard: React.FC<IEpisodeCard> = ({name, airDate, characters, setLoading}) => {
    const [chars, setChars] = useState<any[]>([])

    useEffect(() => {
        setLoading(true)
        // fetchEpisodeCharacters(characters)
        //     .then((res) => {
        //         setChars(res)
        //     })
        setLoading(false)
    }, [characters])

    return (
        <>
            <div className="col-12 p-3 m-3 basicCard">
                <div className="row gx-0">
                    <div className="col-4">
                        <p className="text-light-secondary fs-4">{name}</p>
                        <p>Air date:<span className="text-semi-bold"> {airDate}</span></p>
                    </div>
                    <div className="col-8 p-3">
                        <p className="">Featured characters:</p>
                        <div>
                            {
                                chars.map((char) =>
                                    <span style={{
                                        width: 30, height: 30, display: 'inline-block',
                                        background: `url(${char.image}) center`, backgroundSize: 'cover',
                                        borderRadius: '50%'}}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default EpisodeCard
