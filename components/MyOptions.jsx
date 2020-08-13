import React, { useState } from 'react'

export default function MyOptions({data, onCheck}) {
  const [Check, setCheck] = useState(true)
  const UpdateList = ()=>{
    setCheck(!Check)
    Check?onCheck("Plus", data.Price): onCheck("Moin", data.Price)
  }
  return (              
    <div className="col-sm-6 col-md-4 px-2 mb-5">
    <div className="card card-frame shadow-none h-100">
      <a href="#" className="op-list btn card-body" onClick={()=>{UpdateList()}}>
        <div className="media">
          <div className="media-body d-flex justify-content-between my-auto">
            <div>
              <span className="d-block text-white font-weight-semi-bold">{data.Name}</span>
              <small className="d-block smaller text-white-50 text-left currency">{data.Price}</small>
            </div>
            <div className="custom-control custom-checkbox my-auto">
              <input type="checkbox" className="custom-control-input" id="op-list1"/>
              <label className="custom-control-label" for="op-list1"></label>
            </div>
          </div>
        </div>


      </a>
    </div>
  </div>
  )
}
