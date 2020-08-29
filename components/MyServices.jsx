import Axios from 'axios';
import React, { useEffect, useState } from 'react'


const { API_URL } = process.env;

export default function MyServices({data, onShow}) {
  const [Price, setPrice] = useState(0);
  const [AllOptions, setAllOptions] = useState([])

  useEffect(() => {
    GetOptions()
  }, [data])
  useEffect(() => {
    GetPrice()
  }, [AllOptions])

  const GetOptions = ()=>{
    data.Options.map(item=>{
      Axios.get(`${API_URL}/Options/${item.id}`).then(res=>{
        const ThisOption = res.data
        setAllOptions([...AllOptions, ThisOption])
      }).catch(err=>{
        console.log(err);
      })
    })
  }
  const GetPrice = ()=>{
    var Total = 0
    data.Options.map( opt=>{
      Axios.get(`${API_URL}/Options/${opt.id}`).then( res=>{
       res.data.SousOptions.map(SousOpt=>{
         Total += Number(SousOpt.Price)
       })
       setPrice(Total);
     })
    })
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
