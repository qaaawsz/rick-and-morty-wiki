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
    loading: boolean
    error: string
}

const EpisodesPage: React.FC<IEpisodesPage> =
    ({
         selectedEpisode,
         episodesAmount,
         currentEpisodeNumber,
         setCurrentEpisodeNumber,
         characters,
         setOpenedPage,
         loading,
         error,
     }) => {

        useEffect(() => {
            setOpenedPage('episodes')
        }, [])

        if (!selectedEpisode) return <div className="container-fluid">Episode does not exist</div>

        if (error) return <div className="container-fluid"><p className="fs-4 text-center">{error}</p></div>

        if (loading) return <div className="container-fluid"><p className="fs-4 text-center">Episode loading in
            progress</p>
        </div>

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
                            <Select amount={episodesAmount} picked={currentEpisodeNumber}
                                    setPicked={setCurrentEpisodeNumber}/>
                        </div>
                        <div className="col-12 col-lg-10">
                            <p className="fs-4 mb-0 ms-4 ps-5">
                                Featured characters:
                            </p>
                            {
                                characters.length === 0
                                    ? <p className="fs-4 text-center">Found no related characters</p>
                                    : <CharactersList characters={characters}/>
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }

export default EpisodesPage
