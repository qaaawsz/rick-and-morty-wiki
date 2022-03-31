import React, {useState} from 'react'
import EpisodeCard from './episode/EpisodeCard'

interface IEpisodesList {
    episodes: any[]
}

const EpisodesList: React.FC<IEpisodesList> = ({episodes}) => {
    const [loading, setLoading] = useState<boolean>(false)

    if(loading) return <p>Loading data...</p>

    return (
        <>
            <div className="container-fluid p-4">
                <div className="row m-4">
                    {
                        episodes.map(episode =>
                            <EpisodeCard
                                name={episode.name}
                                airDate={episode.air_date}
                                characters={episode.characters}
                                setLoading={setLoading}
                            />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default EpisodesList
