import React from 'react'

interface IFilterRadio {
    control: string
    name: string
    id: number
    setPaginationFilterType: Function
    setPaginationFilter: Function
}

const FilterRadio: React.FC<IFilterRadio> =
    ({control, name, id, setPaginationFilterType, setPaginationFilter}) => {
        return (
            <>
                <input
                    onClick={() => {
                        setPaginationFilterType(control)
                        setPaginationFilter(name)
                    }}
                    type="radio"
                    className="btn-check"
                    name={control}
                    id={`${name}-${id}`}
                    autoComplete="off"
                />
                <label className="btn btn-primary m-2" htmlFor={`${name}-${id}`}>{name}</label>
            </>
        )
    }

export default FilterRadio
