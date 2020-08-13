import React, { useState } from 'react'
import Link from 'next/link'
import Axios from 'axios'



export default function ConatctSection() {

  return (
    <div className="bg-sec spacer-80 spacer-lg-100">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10 text-center" data-aos="fade-down">
          <h4 className="font-size-2 font-weight-bold text-white pt-0 pb-2 pt-md-4 mx-auto"><i className="fas fa-dot text-sucees-f"></i> AVAILABLE FOR FREELANCE PROJECTS.</h4>
          <h2 className="display-4 font-weight-bold text-white w-lg-75 mx-auto mb-7">Do you have illustration project? Let's talk.</h2>
         <Link href='contact'>
         <a className="btn btn-lg btn-wide cta text-white rounded-pill transition-3d-hover">
            👋 Let's Talk Now</a>
         </Link>
        </div>
      </div>
    </div>
    </div>
  )
}
