import React, {useEffect, useState} from 'react'
import {fetchEpisodeCharacters, fetchEpisodes, fetchSelectedEpisode} from '../../services/apiHandler'
import CharactersList from '../../components/characters/charactersList/CharactersList'
import Select from '../../components/select/Select'

const EpisodesPage: React.FC = () => {

    const [episodes, setEpisodes] = useState<number>(0)
    const [selectedNumber, setSelectedNumber] = useState<number>(1)
    const [selectedEpisode, setSelectedEpisode] = useState<any>()
    const [characters, setCharacters] = useState<any[]>([])

    useEffect(() => {
        fetchEpisodes()
            .then(res => {
                setEpisodes(res.info.count)
            })
    }, [])

    useEffect(() => {
        fetchSelectedEpisode(selectedNumber)
            .then(json => {
                setSelectedEpisode(json)
            })
    }, [selectedNumber])

    useEffect(() => {
        if (selectedEpisode) {
            fetchEpisodeCharacters(selectedEpisode.characters)
                .then(json => {
                    setCharacters(json)
                })
        }
    }, [selectedEpisode])

    if (!selectedEpisode) return <p>Loading</p>

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <p className="fs-2 text-center">Episode:
                            <span className="text-light-secondary text-semi-bold"> {selectedEpisode.name}</span>
                        </p>
                        <p className="fs-4 text-center">
                            Air date:
                            <span className="text-semi-bold fs-5"> {selectedEpisode.air_date}</span>
                        </p>
                    </div>
                    <div className="col-12 col-lg-2">
                        <p>Choose episode:</p>
                        <Select episodes={episodes} selectedNumber={selectedNumber}
                                setSelectedNumber={setSelectedNumber}/>
                    </div>
                    <div className="col-12 col-lg-10">
                        <p className="fs-4 mb-0 ms-4 ps-5">
                            Featured characters:
                        </p>
                        <CharactersList characters={characters}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EpisodesPage
