import React, {useEffect, useState} from 'react'
import Select from '../../components/select/Select'
import CharactersList from '../../components/characters/charactersList/CharactersList'
import {fetchEpisodeCharacters, fetchLocations, fetchSelectedLocation} from '../../services/apiHandler'

const LocationsPage: React.FC = () => {
    const [locations, setLocations] = useState<number>(0)
    const [selectedNumber, setSelectedNumber] = useState<number>(1)
    const [selectedLocation, setSelectedLocation] = useState<any>()
    const [characters, setCharacters] = useState<any[]>([])

    useEffect(() => {
        fetchLocations()
            .then(res => {
                setLocations(res.info.count)
            })
    }, [])

    useEffect(() => {
        fetchSelectedLocation(selectedNumber)
            .then(json => {
                setSelectedLocation(json)
            })
    }, [selectedNumber])

    useEffect(() => {
        if (selectedLocation) {
            fetchEpisodeCharacters(selectedLocation.residents)
                .then(json => {
                    setCharacters(json)
                })
        }
    }, [selectedLocation])

    if (!selectedLocation) return <p>Loading</p>

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <p className="fs-2 text-center">Location:
                            <span className="text-light-secondary text-semi-bold">{selectedLocation.name}</span>
                        </p>
                        <p className="fs-4 text-center">
                            Dimension:
                            <span className="text-semi-bold fs-5">{selectedLocation.dimension}</span>
                        </p>
                    </div>
                    <div className="col-12 col-lg-2">
                        <p>Choose location:</p>
                        <Select episodes={locations} selectedNumber={selectedNumber}
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

export default LocationsPage
