import React, {useEffect, useState} from 'react'
import Select from '../../components/select/Select'
import CharactersList from '../../components/characters/charactersList/CharactersList'
import {fetchInstanceCharacters, fetchSelectedInstance} from '../../services/apiHandler'

interface ILocationsPage {
    locationsAmount: number
}

const LocationsPage: React.FC<ILocationsPage> = ({locationsAmount,}) => {

    const [currentLocationNumber, setCurrentLocationNumber] = useState<number>(1)
    const [selectedLocation, setSelectedLocation] = useState<any>()

    const [characters, setCharacters] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const instanceResponse = await fetchSelectedInstance(currentLocationNumber, 'locations')
            setSelectedLocation(instanceResponse)

            const charactersResponse = await fetchInstanceCharacters(instanceResponse.residents)
            setCharacters(charactersResponse)
            setLoading(false)
        })()
    }, [currentLocationNumber])

    if (loading) return <div className="container-fluid"><p className="fs-4 text-center">Location loading in
        progress</p>
    </div>

    if (!selectedLocation && !loading) return <div className="container-fluid"/>

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <p className="fs-2 text-center">Location:
                            <span className="text-light-secondary text-semi-bold">
                                    {' '}{selectedLocation.name}
                            </span>
                        </p>
                        <p className="fs-4 text-center">
                            Dimension:
                            <span className="text-semi-bold fs-5">
                                    {' '}{selectedLocation.dimension}
                            </span>
                        </p>
                    </div>
                    <div className="col-12 col-lg-2">
                        <p>Choose location:</p>
                        <Select
                            amount={locationsAmount}
                            picked={currentLocationNumber}
                            setPicked={setCurrentLocationNumber}
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

export default LocationsPage
