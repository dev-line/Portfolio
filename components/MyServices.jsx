import React, { useEffect, useState } from 'react'

export default function MyServices({data, onShow}) {
  const [Price, setPrice] = useState(0);

  useEffect(() => {
    GetPrice()
  }, [data])
  const GetPrice = ()=>{
    var Total = 0
    data.Options.map(opt=>{
     Total+=opt.Price
    })
    setPrice(Total)
  }
  
  return (
    <div className="col-sm-6 col-md-4 px-2 mb-3">
    <div className="card card-frame shadow-none h-100">
      <a href="#" className="card-body stretched-link" data-toggle="modal" data-target="#serviceOptions" onClick={()=>{onShow(data.Options)}}>
        <div className="media">
            <span className="u-md-avatar bg-cover rounded-circle mr-3 mt-1" style={{background: data.Thumbnail?`url(${API_URL+data.Thumbnail.url})`:"url(/assets/img/misc/empty.png)" }}></span>
          <div className="media-body d-flex justify-content-between my-auto">
            <div>
              <span className="d-block text-white font-weight-semi-bold pb-1">{data.Title}</span>
              <small className="d-block text-white-70 currency">{Price}</small>
            </div>
            <div className="my-auto"><i className="fas fa-chevron-right text-white"></i></div>
          </div>
        </div>
      </a>
    </div>
  </div>
  )
}
