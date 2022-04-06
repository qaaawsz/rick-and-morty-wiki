import React from 'react'
import {ICharacterCard} from '../../../services/types'
import CharacterCard from './characterCard/CharacterCard'

const CharactersList: React.FC<{ characters: any[] }> = ({characters}) => {
    return (
        <>
            <div className="container-fluid p-md-4 ps-0 pe-0">
                <div
                    className="row d-flex flex-column flex-md-row justify-content-center align-items-center m-md-4 gap-3">
                    {
                        characters.map((character: ICharacterCard) =>
                            <CharacterCard
                                key={character.id}
                                created={character.created}
                                episode={character.episode}
                                gender={character.gender}
                                id={character.id}
                                image={character.image}
                                location={character.location}
                                name={character.name}
                                origin={character.origin}
                                species={character.species}
                                status={character.status}
                                type={character.type}
                                url={character.url}
                            />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default CharactersList
