import React, { useState } from 'react'
import MyOptions from './MyOptions'
import FindingError from './FindingError'

export default function ClacOptions({data}) {
  const [Price, setPrice] = useState(0)
  const Calc = (event,value)=>{
    console.log(event, value);
    if (event == "Plus") {
      setPrice((Price*1) + (value*1))
    }else{
      setPrice((Price*1) - (value*1))
    }
  }
  return (
<div className="modal fade" id="serviceOptions" tabindex="-1" role="dialog" aria-labelledby="serviceOptionsLabel" aria-hidden="true">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header border-0">
                <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
                  <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                  </svg>
                </button>
              </div>
              <div className="modal-body">
              
                <div className="btn-group-toggle w-100" data-toggle="buttons">
                  <div className="container spacer-20">
                      <div className="row">
                  {data.length>0?(
                data.map(Projet=>{
                  return <MyOptions key={Projet.id} data={Projet} onCheck={Calc} /> 
                })
              ):<FindingError/>}
                      </div>
                  </div>
              </div>

              {/* <!-- Total --> */}
              <div className="position-fixed bottom-0 right-0 w-15 text-center">
                <div className="spacer-10 bg-success py-3">
                  <h6 className="font-size-2 mb-0 font-weight-bold text-white">Total :<span className="currency pl-2 font-size-1">{Price}</span></h6>
                </div>
              </div>

              </div>
            </div>
          </div>
      </div>
  )
}
