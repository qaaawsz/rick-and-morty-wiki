import React, {useEffect} from 'react'
import CharactersList from '../../components/characters/charactersList/CharactersList'
import Select from '../../components/select/Select'

interface IEpisodesPage {
    selectedEpisode: any
    episodesAmount: number
    currentEpisodeNumber: number
    setCurrentEpisodeNumber: Function
    characters: any[]

    setOpenedPage: Function
}

const EpisodesPage: React.FC<IEpisodesPage> =
    ({selectedEpisode, episodesAmount, currentEpisodeNumber, setCurrentEpisodeNumber, characters, setOpenedPage }) => {

        useEffect(() => {
            setOpenedPage('episodes')
        }, [])

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
                        <Select amount={episodesAmount} picked={currentEpisodeNumber}
                                setPicked={setCurrentEpisodeNumber}/>
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
