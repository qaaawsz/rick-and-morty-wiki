import FilterItem, {IFilterItem} from './FilterItem'
import React from 'react'

const filters: IFilterItem[] = [
    {
        heading: 'Status',
        collapse: 'status',
        filters: ['Alive', 'Dead', 'Unknown'],
    },
    {
        heading: 'Species',
        collapse: 'species',
        filters: ['Human', 'Alien', 'Humanoid', 'Poopybutthole', 'Mythological',
            'Unknown', 'Animal', 'Disease', 'Robot', 'Cronenberg', 'Planter'
        ],
    },
    {
        heading: 'Gender',
        collapse: 'gender',
        filters: ['Male', 'Female', 'Genderless', 'Unknown'],
    }
]

interface IFilters {
    setPaginationFilterType: Function,
    setPaginationFilter: Function,
    resetFilters: Function

}

const Filters: React.FC<IFilters> = ({setPaginationFilterType, setPaginationFilter, resetFilters}) => {

    return (
        <>
            <div className="py-lg-4">
                <div className="text-center my-2">
                    <p className="my-0 fs-3">Filters</p>
                    <button
                        onClick={() => {
                            resetFilters()
                        }}
                        className="my-0 fs-6 mt-0 btn text-decoration-underline text-primary"
                    >
                        Clear filters
                    </button>
                </div>
                <div className="accordion accordion-flush" id="filtersAccordion">
                    {
                        filters.map((filter) =>
                            <FilterItem
                                key={filter.heading}
                                heading={filter.heading}
                                collapse={filter.collapse}
                                filters={filter.filters}
                                setPaginationFilterType={setPaginationFilterType}
                                setPaginationFilter={setPaginationFilter}
                            />
                        )}
                </div>
            </div>
        </>
    )
}

export default Filters
