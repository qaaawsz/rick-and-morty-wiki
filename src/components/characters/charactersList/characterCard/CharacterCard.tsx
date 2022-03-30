import React, {useEffect, useState} from 'react'
import {ICharacterCard} from '../../../../services/types'
import {fetchFirstSeenIn} from '../../../../services/apiHandler'


const CharacterCard: React.FC<ICharacterCard> = ({
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
            <div className="col-12 col-xl-6 p-3">
                <div className="characterCard row gx-0">
                    <div style={{background: `url(${image})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} className="col-4"/>
                    <div className="col-8 p-3">
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
