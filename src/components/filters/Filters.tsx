import FilterItem, {IFilterItem} from './FilterItem'
import React from 'react'

const filters: IFilterItem[] = [
    {
        heading: 'Status',
        collapse: 'status',
        filters: ['Alive', 'Dead', 'unknown'],
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
        filters: ['Male', 'Female', 'genderless', 'unknown'],
    }
]

const Filters: React.FC<{ setPaginationFilterType: Function, setPaginationFilter: Function }> =
    ({setPaginationFilterType, setPaginationFilter}) => {

        return (
            <>
                <div className="py-lg-4">
                    <div className="text-center my-2">
                        <p className="my-0 fs-3">Filters</p>
                        <button
                            onClick={() => {
                                setPaginationFilterType('')
                                setPaginationFilter('')
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


/*
    <b-form-group label="Radios using sub-components" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="radio-group-2"
        v-model="selected"
        :aria-describedby="ariaDescribedby"
        name="radio-sub-component"
      >
        <b-form-radio value="first">Toggle this custom radio</b-form-radio>
        <b-form-radio value="second">Or toggle this other custom radio</b-form-radio>
        <b-form-radio value="third" disabled>This one is Disabled</b-form-radio>
        <b-form-radio :value="{ fourth: 4 }">This is the 4th radio</b-form-radio>
      </b-form-radio-group>
    </b-form-group>
 */
