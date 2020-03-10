// @flow
import React, { Fragment } from 'react'
import Paginate from 'react-paginate'
import styles from './Quotes.module.css'

type Quote = {
  quoteAuthor: string,
  quoteText: string
}

type Props = {
  navigate: string => void,
  pageContext: {
    currentPage: number,
    data: Array<Quote>,
    numberOfPages: number
  }
}

const Quotes = ({ navigate ,pageContext }: Props) => {
  console.log(pageContext)
  return (
    <Fragment>
      <h1>Quotes</h1>
      {pageContext.data.map(quote => (
        <article>
          <h2>{quote.quoteText}</h2>
          <h3>{quote.quoteAuthor}</h3>
        </article>
      ))}
      <Paginate
        containerClassName={styles.pagination}
        onPageChange={({ selected }) => {
          navigate(selected === 0 ? '/' : `/quotes/${selected}`)
        }}
        initialPage={pageContext.currentPage}
        nextClassName={styles.paginationBtn}
        pageClassName={styles.pageLink}
        previousClassName={styles.paginationBtn}
        marginPagesDisplayed={2} pageCount={pageContext.numberOfPages}
        pageRangeDisplayed={3}
        hrefBuilder={pageIndex => `/quotes/${pageIndex}`} />
    </Fragment>
  )
}

export default Quotes
