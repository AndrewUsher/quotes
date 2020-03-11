// @flow strict-local
import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import Paginate from 'react-paginate'
import styles from './Quotes.module.css'

type Quote = {|
  quoteAuthor?: string,
  quoteNumber: number,
  quoteText: string
|}

type Props = {|
  navigate: string => void,
  pageContext: {
    currentPage: number,
    data: Array<Quote>,
    numberOfPages: number
  }
|}

const Quotes = ({ navigate, pageContext }: Props) => {
  return (
    <Fragment>
      <h1 className={styles.pageTitle}>Quotes</h1>
      <section className={styles.quotesContainer}>
        {pageContext.data.map(({ quoteAuthor, quoteNumber, quoteText }, i) => (
          <article key={quoteText} className={styles.quote}>
            <h2>{quoteText}</h2>
            <h3>{quoteAuthor}</h3>
            <Link to={`/quote/${quoteNumber}`}>Go to Quote</Link>
          </article>
        ))}
      </section>
      <Paginate
        containerClassName={styles.pagination}
        disableInitialCallback
        onPageChange={({ selected }) => {
          navigate(selected === 0 ? '/' : `/quotes/${selected + 1}`)
        }}
        initialPage={pageContext.currentPage}
        nextLinkClassName={styles.paginationBtn}
        pageClassName={styles.pageLink}
        previousLabel="Prev"
        previousLinkClassName={styles.paginationBtn}
        marginPagesDisplayed={2} pageCount={pageContext.numberOfPages}
        pageRangeDisplayed={3}
        hrefBuilder={pageIndex => `/quotes/${pageIndex}`} />
    </Fragment>
  )
}

export default Quotes
