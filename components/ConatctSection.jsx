import React, { useState } from 'react'
import Link from 'next/link'
import Axios from 'axios'


export default function ConatctSection() {

  return (
    <div className="bg-sec spacer-80 spacer-lg-100">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10 text-center" data-aos="fade-down">
        <h4 class="font-size-2 text-white-70 pt-0 pb-2 pt-md-4 mx-auto"><i class="fas fa-dot text-sucees-f"></i>Partenaire de confiance de votre succès!</h4>
              <h1 class="font-weight-bold text-white w-lg-75 mx-auto mb-7">Un besoin, un projet ! Notre équipe vous répond rapidement.</h1>
         <Link href='contact'>
         <a className="btn btn-lg btn-wide cta text-white rounded-pill transition-3d-hover">
            👋 Nous Contacter</a>
         </Link>
        </div>
      </div>
    </div>
    </div>
  )
}
