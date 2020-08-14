import React, { useLayoutEffect } from 'react'
import Head from 'next/head'

export default function ProjetCotenu({data}) {
  useLayoutEffect(() => {
    setInterval(() => {
      $('p[data-f-id="pbf"]').remove()
    }, 100);
  }, [])
  return (
    <React.Fragment>
      <Head>
    <script src="/assets/js/jquery.min.js"></script>
  </Head>
    <div className="modal fade" id="workInfo" tabindex="-1" role="dialog" aria-labelledby="workInfoLabel" aria-hidden="true">
    <div className="modal-dialog modal-fullscreen">
      <div className="modal-content">
        <div className=" border-0 text-center pt-3 pb-2">
          <h5 className="modal-title text-white-70 mx-auto mb-0" id="workInfoLabel">{data.Title}</h5>
        </div>
        <div className="modal-body spacer-50">
          <div className="container" dangerouslySetInnerHTML={{ __html: data.Content }} />
        </div>
        <div className="modal-footer border-0 py-3">
          <button type="button" className="btn mx-auto text-white" data-dismiss="modal" aria-label="Close">
            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
              <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
            </svg>
          </button>  
        </div>
      </div>
    </div>
  </div>
  <script src="/assets/js/jquery.min.js"></script>
    </React.Fragment>
  )
}
