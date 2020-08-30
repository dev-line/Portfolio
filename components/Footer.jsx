import React, { useState } from 'react'
import Link from 'next/link'
import Axios from 'axios'
const {API_URL} = process.env

export default function Footer() {
  const [Links, setLinks] = useState({})
  const [Status, setStatus] = useState('Loading')
  const GetAbout = ()=>{
    Axios.get(`${API_URL}/Informations`).then(res=>{
      setLinks(res.data)
    }).catch(err=>{
      console.log(err);
    })
    setStatus("Done")
  }
  if (!Links.id) {
    if (Status == "Loading") {
      GetAbout()
    }
  }
  return (
    <footer className="container spacer-50 text-center">
    {/* <!-- Logo --> */}
   <Link href='/'>
   <a className="d-inline-flex align-items-center mb-3" aria-label="Front">
    <img style={{width: "128px"}} src="/assets/img/folio-logo.png" alt="Logo"/>
    </a>
   </Link>
    {/* <!-- End Logo --> */}

    <p className="font-size-1 mb-1">© Front 2020. Tous les droits sont réservés.</p>
    <p className="font-size-1">Made With <i className="fas fa-heart text-danger-f"></i> By <a href="https://linktr.ee/hax.codes">Hax Codes<span>™</span></a></p>

    {/* <!-- Social Networks --> */}
    {Status == "Done"?(
      <ul className="list-inline mb-0">
      {Links.Facebook?(
      <li className="list-inline-item mb-2 mb-sm-0">
        <a target="_blank" className="btn btn-icon btn-sm btn-secondary-f text-white rounded-circle" href={Links.Facebook}>
          <i className="fab fa-facebook-f"></i>
        </a>
      </li>):""}

      {Links.Twitter?(
        <li className="list-inline-item mb-2 mb-sm-0">
        <a target="_blank" className="btn btn-icon btn-sm btn-secondary-f text-white rounded-circle" href={Links.Twitter}>
          <i className="fab fa-twitter"></i>
        </a>
      </li>
      ):""}
     {Links.Instagram?(
        <li className="list-inline-item mb-2 mb-sm-0">
        <a target="_blank" className="btn btn-icon btn-sm btn-secondary-f text-white rounded-circle" href={Links.Instagram}>
          <i className="fab fa-instagram"></i>
        </a>
      </li>
     ):""}
      {Links.LinkedIn?(
        <li className="list-inline-item mb-2 mb-sm-0">
        <a target="_blank" className="btn btn-icon btn-sm btn-secondary-f text-white rounded-circle" href={Links.LinkedIn}>
          <i className="fab fa-linkedin"></i>
        </a>
      </li>
      ):""}
      {Links.Youtube?(
        <li className="list-inline-item mb-2 mb-sm-0">
        <a target="_blank" className="btn btn-icon btn-sm btn-secondary-f text-white rounded-circle" href={Links.Youtube}>
          <i className="fab fa-youtube"></i>
        </a>
      </li>
      ):""}
    </ul>
    ):"..."}
    {/* <!-- End Social Networks --> */}
  </footer>
  )
}
