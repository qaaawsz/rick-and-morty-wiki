import React from 'react'
import FilterRadio from './FilterRadio'

export interface IFilterItem {
    heading: string
    collapse: string
    filters: any[]
}

const FilterItem: React.FC<IFilterItem & { setPaginationFilterType: Function, setPaginationFilter: Function }> =
    ({heading, collapse, filters, setPaginationFilterType, setPaginationFilter}) => {
        return (
            <>
                <div className="accordion-item">
                    <h2 className="accordion-header" id={heading}>
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${collapse}`}
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                        >
                            {heading}
                        </button>
                    </h2>
                    <div
                        id={collapse}
                        className="accordion-collapse collapse"
                        aria-labelledby={heading}
                        data-bs-parent="#filtersAccordion"
                    >
                        <div className="accordion-body">
                            <div className="btn-group d-flex flex-wrap">
                                {filters.map((filter, i) =>
                                    <FilterRadio
                                        key={filter}
                                        setPaginationFilterType={setPaginationFilterType}
                                        setPaginationFilter={setPaginationFilter}
                                        control={heading}
                                        name={filter} id={i}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

export default FilterItem
