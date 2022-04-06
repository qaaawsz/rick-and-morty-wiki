import React, {useEffect, useState} from 'react'
import {ICharacterCard} from '../../../../services/types'
import {fetchFirstSeenIn} from '../../../../services/apiHandler'


const CharacterCard: React.FC<ICharacterCard> =
    ({
         created,
         episode,
         gender,
         id,
         image,
         location,
         name,
         origin,
         species,
         status,
         type,
         url
     }) => {

        const statusColor = status === 'Dead' ? 'dead' : status === 'Alive' ? 'alive' : 'unknown'
        const [firstSeen, setFirstSeen] = useState<any>('Unknown')

        useEffect(() => {
            fetchFirstSeenIn(episode[0]).then(json => setFirstSeen(json.name))

        }, [episode[0]])

        return (
            <>
                <div className="cardWrapper col-12 col-xxl-6 py-3 ps-0 pe-0">
                    <div className="basicCard row gx-0 d-flex flex-nowrap flex-column flex-md-row">
                        <div
                            style={{
                                background: `url(${image})`,
                            }}
                            className="cardImage col-4"/>
                        <div className="col-8 p-3 flex-grow-1 flex-shrink-1 w-100">
                            <h4>{name}</h4>
                            <div className="d-flex align-content-center align-items-center">
                                <div className={`circle ${statusColor} me-2`}/>
                                <p className="m-0">{status} - {species}</p>
                            </div>
                            <div/>
                            <h6 className="text-secondary">Last known location:</h6>
                            <p>{location.name}</p>
                            <h6 className="text-secondary">First seen in:</h6>
                            {firstSeen}
                        </div>
                    </div>
                </div>
            </>
        )
    }

export default CharacterCard
