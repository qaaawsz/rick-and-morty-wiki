import React, {useEffect} from 'react'
import Select from '../../components/select/Select'
import CharactersList from '../../components/characters/charactersList/CharactersList'

interface ILocationsPage {
    selectedLocation: any
    locationsAmount: number
    currentLocationNumber: number
    setCurrentLocationNumber: Function
    characters: any[]

    setOpenedPage: Function
}

const LocationsPage: React.FC<ILocationsPage> =
    ({selectedLocation, locationsAmount, currentLocationNumber, setCurrentLocationNumber, characters, setOpenedPage}) => {

        useEffect(() => {
            setOpenedPage('locations')
        }, [])

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
                            <Select amount={locationsAmount} picked={currentLocationNumber}
                                    setPicked={setCurrentLocationNumber}/>
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
