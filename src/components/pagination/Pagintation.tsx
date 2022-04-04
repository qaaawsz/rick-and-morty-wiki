import React, {useEffect} from 'react'
import ReactPaginate from 'react-paginate'

interface IPagination {
    page: number
    changePage: Function
    paginationInfo: any
}

const Pagination: React.FC<IPagination> = ({page, changePage, paginationInfo}) => {

    return (
        <>
            <ReactPaginate
                marginPagesDisplayed={1}
                pageRangeDisplayed={10}
                className="pagination justify-content-center"
                pageCount={paginationInfo?.pages || 1}
                nextLabel=""
                previousLabel=""
                onPageChange={(page) => changePage(page)}
                activeClassName="active"
                forcePage={page === 1 ? 0 : page - 1}

                breakClassName="primary fs-3 align-self-end"
                breakLinkClassName="page-item mx-1 text-decoration-none"

                pageClassName="page-item mx-1"
                pageLinkClassName="page-link"
            />
        </>
    )
}

export default Pagination
