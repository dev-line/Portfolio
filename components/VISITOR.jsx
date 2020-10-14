import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import Swiper from "swiper";
import AOS from "aos";
import { useEffect } from "react";
import Axios from "axios";
import DisableSite from "./DisableSite";

const API_URL = process.env.API_URL;

export default function VISITOR({ children,title }) {
  const swiper = new Swiper(".ot-posts");
  const thumb = new Swiper(".thumbs");
  const [Status, setStatus] = useState(true)
  const [SiteName, setSiteName] = useState('')
  useEffect(() => {
    Axios.get(`${API_URL}/settings`).then((res=>{
      setSiteName(res.data.SiteName)
      res.data.SiteStatus == 'Disable'?(setStatus(false)):setStatus(true)
    })).catch(err=>{
      console.log(err);
    })
  }, [])
  useEffect(() => {
    AOS.init();
      $("#navMobile").hide()
      $(".modal-backdrop").remove()
      $("body").css({
        "overflow": "auto",
        "padding":0 
      })
      $('body').scrollTop()
  }, []);
  return (
    <React.Fragment>
      <Head>
        <link rel="shortcut icon" href="/assets/fav.ico" type="image/x-icon"/>
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="stylesheet" href="/assets/css/dark.css" />
        <script src="/assets/js/jquery.min.js"></script>
  <title>{`${SiteName}${SiteName && title ? ' | ' + title: ''}`}</title>
      </Head>
      {Status?(
        <main>
        <div className="position-absolute w-100 sticky z-index-4" id="to-top">
          <nav
            className="navbar navbar-expand-lg navbar-light px-md-8"
          >
            <Link href="/">
              <a className="navbar-brand text-white">
                <img style={{width: "128px"}} src="/assets/img/folio-logo.png" alt="Logo"/>
              </a>
            </Link>
            <button
              className="navbar-toggler border-0 px-0"
              type="button"
              data-toggle="modal"
              data-target="#navMobile"
            >
              <svg
                width="1.2em"
                height="1.2em"
                viewBox="0 0 16 16"
                className="bi bi-list-nested text-white"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
            {/* <!-- Menu --> */}
            <ul className="navbar-nav ml-auto d-none d-lg-flex">
              <li className="nav-item HomeLink">
                <Link href="/">
                  <a className="nav-link">
                    Accueil<span className="sr-only">(current)</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item ProposLink">
                <Link href="propos">
                  <a className="nav-link">À propos</a>
                </Link>
              </li>
              <li className="nav-item ProjectsLink">
                <Link href="projets">
                  <a className="nav-link">Projets</a>
                </Link>
              </li>
              <li className="nav-item ServicesLink">
                <Link href="services">
                  <a className="nav-link">Services</a>
                </Link>
              </li>
              <li className="nav-item ContactLink">
                <Link href="contact">
                  <a className="nav-link">Contact</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {children}
        {/* <!-- Nav Mobile --> */}
        <div
          className="modal fade"
          id="navMobile"
          tabindex="-1"
          role="dialog"
          aria-labelledby="navMobileLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header border-0">
                <button
                  type="button"
                  className="close text-white"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <svg
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 16 16"
                    className="bi bi-x"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="modal-body content-centered">
                <ul className="navbar-nav">
                  <li className="nav-item HomeLink">
                    <Link href="/">
                      <a className="nav-link">
                        Accueil<span className="sr-only">(current)</span>
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item ProposLink">
                    <Link href="propos">
                      <a className="nav-link">À propos</a>
                    </Link>
                  </li>
                  <li className="nav-item ProjectsLink">
                    <Link href="projets">
                      <a className="nav-link">Projets</a>
                    </Link>
                  </li>
                  <li className="nav-item ServicesLink">
                    <Link href="services">
                      <a className="nav-link">Services</a>
                    </Link>
                  </li>
                  <li className="nav-item ContactLink">
                    <Link href="contact">
                      <a className="nav-link">Contact</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      ):<DisableSite/>}
      <script src="/assets/js/jquery.min.js"></script>
      <script src="/assets/js/popper.min.js"></script>
      <script src="/assets/js/bootstrap.min.js"></script>
      <script src="/assets/js/app.js"></script>
    </React.Fragment>
  );
}
