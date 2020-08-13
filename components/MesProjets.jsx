import React from "react";
import ProjetCotenu from"./ProjetCotenu"
const  {API_URL} = process.env

export default function MesProjets({ data, onShow }) {
  return (
    <div className="col-12 col-md-4 mb-3 mb-lg-5">
      <div className="card">
        <a
          href=""
          className="bg-cover rounded transition-3d-hover"
          style={{ background: data.Thumbnail?`url(${API_URL+data.Thumbnail.url})`:"url(/assets/img/misc/empty.png)" }}
          data-toggle="modal"
          data-target="#workInfo"
          onClick={()=>{onShow(data)}}
        ></a>
        <div className="card-body">
          <p href="#" className=" font-size-2 font-weight-semi-bold text-white">
            {data.Title}
          </p>
        </div>
      </div>
    </div>
  );
}
