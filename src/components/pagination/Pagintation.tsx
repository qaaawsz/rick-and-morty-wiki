import React, {useContext, useEffect} from 'react'
import ReactPaginate from 'react-paginate'
import {ThemeContext} from '../../context/ThemeContext'

interface IPagination {
    page: number
    setPage: Function
    paginationInfo: any
}

const Pagination: React.FC<IPagination> = ({page, setPage, paginationInfo}) => {
    const {theme} = useContext(ThemeContext)

    return (
        <>
            <ReactPaginate
                marginPagesDisplayed={1}
                pageRangeDisplayed={5}
                className="pagination justify-content-center"
                pageCount={paginationInfo?.pages || 1}
                nextLabel=""
                previousLabel=""
                onPageChange={(page) => setPage(page.selected + 1)}
                activeClassName="active"
                forcePage={page === 1 ? 0 : page - 1}
                breakClassName="primary fs-3 align-self-end"
                breakLinkClassName="page-item mx-1 text-decoration-none"
                pageClassName="page-item mx-1"
                pageLinkClassName={`page-link ${theme === 'light' ? '' : 'bg-dark text-white'}`}
            />
        </>
    )
}

export default Pagination
