import React, {useEffect, useState} from 'react'
import CharactersList from '../../components/characters/charactersList/CharactersList'
import Select from '../../components/select/Select'
import {
    fetchInstanceCharacters,
    fetchSelectedInstance,
} from '../../services/apiHandler'


interface IEpisodesPage {
    episodesAmount: number
}

const EpisodesPage: React.FC<IEpisodesPage> = ({episodesAmount}) => {
    const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState<number>(1)
    const [selectedEpisode, setSelectedEpisode] = useState<any>()
    const [characters, setCharacters] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        (async () => {
            setLoading(true)
            const instanceResponse = await fetchSelectedInstance(currentEpisodeNumber, 'episodes')
            setSelectedEpisode(instanceResponse)

            const charactersResponse = await fetchInstanceCharacters(instanceResponse.characters)
            setCharacters(charactersResponse)
            setLoading(false)
        })()
    }, [currentEpisodeNumber])


    if (loading) return <div className="container-fluid"><p className="fs-4 text-center">Episode loading in
        progress</p>
    </div>

    if (!selectedEpisode && !loading) return <div className="container-fluid" />

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <p className="fs-2 text-center">Episode:
                            <span className="text-light-secondary text-semi-bold">
                                    {' '}
                                {selectedEpisode.name}
                                </span>
                        </p>
                        <p className="fs-4 text-center">
                            Air date:
                            <span className="text-semi-bold fs-5">
                                    {' '}
                                {selectedEpisode.air_date}</span>
                        </p>
                    </div>
                    <div className="col-12 col-lg-2">
                        <p>Choose episode:</p>
                        <Select
                            amount={episodesAmount}
                            picked={currentEpisodeNumber}
                            setPicked={setCurrentEpisodeNumber}
                        />
                    </div>
                    <div className="col-12 col-lg-10">
                        {
                            characters.length === 0
                                ? <p className="fs-4">Found no related characters</p>
                                :
                                <>
                                    <p className="fs-4 mb-0 ms-4 ps-5">
                                        Featured characters:
                                    </p>
                                    <CharactersList characters={characters}/>
                                </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default EpisodesPage
