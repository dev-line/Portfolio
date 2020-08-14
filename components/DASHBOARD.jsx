import React, { useState, useEffect, useLayoutEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import Swiper from "swiper";
import { destroyCookie, parseCookies } from "nookies";
import Axios from "axios";
const  {API_URL} = process.env 
export default function DASH({ children, title }) {
  const ThisUser = parseCookies("auth");
  const Routing = "/bord/administration";
  const openNav = () => {
    setSidebar("sidebar");
  };

  const closeNav = () => {
    setSidebar("sidebar-hidden");
  };
  const [UserId, setUserId] = useState("user_id");
  const [sidebar, setSidebar] = useState("sidebar-hidden");
  useEffect(() => {
    $("body").addClass("bg-light-f");
  }, [API_URL]);
  const CheckUser = async()=>{
   if (ThisUser.jwt) {
    await Axios.get(`${API_URL}/users/me`,{headers: { Authorization: `Bearer ${ThisUser.jwt}`}}).then(
      res=>{console.log(res)}
    ).catch(err=>{
      LogOut()
    })
   }else{
     LogOut()
   }
  }
  const LogOut =()=>{
      destroyCookie('auth', 'jwt', {maxAge: 30 * 24 * 60 * 60,
        path: '/',})
      destroyCookie('auth', 'id', {maxAge: 30 * 24 * 60 * 60,
        path: '/',})
      Router.push(`${Routing}/se-connecter`)
  }
  useEffect(() => {
    CheckUser()
  }, [API_URL])
  return (
  <React.Fragment>
  <Head>
  <link rel="shortcut icon" href="/assets/fav.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/assets/css/main.css" />
    <script src="/assets/js/jquery.min.js"></script>
    {ThisUser.jwt?<title>Dashboard - {title}</title>:"Not Found"}
  </Head>
  {ThisUser.jwt?(
  <div className="bg-light-f">
    <div className="container-fluid">
      <div className="fixed-top w-100 bg-light-f z-index-2 shadow-sm">
        <button
          type="button"
          className="btn btn-sm d-lg-none left-0 p-3"
          onClick={() => {
            openNav();
          }}
        >
          <svg
            width="1.5em"
            height="1.5em"
            viewBox="0 0 16 16"
            className="bi bi-list-nested"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z"
            ></path>
          </svg>
        </button>
      </div>
      <div className="row vh-100">
        <div className="col-md-2 d-md-block px-0" id={sidebar}>
          <div
            className="vh-100 sticky-top d-flex align-content-between bg-secondary-f flex-wrap pt-4 pb-5"
            id="dash-sidebar"
          >
            <div className="container">
              <button
                type="button"
                className="close d-flex d-lg-none"
                aria-label="Close"
                onClick={() => {
                  closeNav();
                }}
              >
                <svg
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 16 16"
                  className="bi bi-x text-white"
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
              <div className="spacer-10 spacer-lg-30 text-center border-bottom">
                <img src="/assets/img/folio-logo.png" style={{width: "128px"}} alt="Site Name"/>
              </div>
              <div className="my-5" id="MenuAccordion">
                {/* <!-- Card --> */}
                <div className="card mb-3">
                  <div className="card-header card-collapse">
                    <div className="mb-0">
                      <Link href={Routing}>
                        <a className="btn btn-block text-muted-f d-flex justify-content-between card-btn p-3 HomeLink">
                          <span>
                            <i className="fal fa-home-alt pr-2"></i>Tableau
                            de bord
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* <!-- Card --> */}
                <div className="card mb-3" role="tablist">
                  <div
                    className="card-header card-collapse"
                    id="MenuHeadingLang"
                  >
                    <div className="mb-0">
                      <button
                        type="button"
                        className="btn btn-block text-muted-f d-flex justify-content-between card-btn p-3 Projects collapsed clpsd"
                        data-toggle="collapse"
                        data-target="#MenuCollapseLang"
                        aria-expanded="false"
                        aria-controls="MenuCollapseLang"
                      >
                        <span>
                          <i className="fal fa-file-alt pr-2"></i>Articles
                        </span>
                        <span className="card-btn-toggle">
                          <span className="card-btn-toggle-default">
                            <i className="fal fa-chevron-down"></i>
                          </span>
                          <span className="card-btn-toggle-active">
                            <i className="fal fa-chevron-up"></i>
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                  <div
                    id="MenuCollapseLang"
                    className="collapse"
                    aria-labelledby="MenuHeadingLang"
                    data-parent="#MenuAccordion"
                  >
                    <div className="card-body">
                      <nav className="list-group bg-white rounded">
                        <li className="list-group-item ProjectsLink">
                          <Link href={`${Routing}/projets`}>
                            <a className="stretched-link text-reset">
                              Tous les articles
                            </a>
                          </Link>
                        </li>
                        <li className="list-group-item NewProjectLink">
                          <Link href={`${Routing}/projets/nouveau`}>
                            <a className="stretched-link text-reset">
                              Ajouter
                            </a>
                          </Link>
                        </li>
                        <li className="list-group-item TrashLink">
                          <Link href={`${Routing}/projets/corbeille`}>
                            <a className="stretched-link text-reset">
                              Corbeille
                            </a>
                          </Link>
                        </li>
                      </nav>
                    </div>
                  </div>
                </div>
                {/* <!-- Card --> */}
                <div className="card mb-3">
                  <div className="card-header card-collapse">
                    <div className="mb-0">
                      <Link href={`${Routing}/services`}>
                        <a className="btn btn-block text-muted-f d-flex justify-content-between card-btn p-3 ServicesLink">
                          <span>
                            <i className="fal fa-folders pr-2"></i>Services
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* <!-- Card --> */}
                <div className="card mb-3">
                  <div className="card-header card-collapse">
                    <div className="mb-0">
                      <Link href={`${Routing}/media`}>
                        <a className="btn btn-block text-muted-f d-flex justify-content-between card-btn p-3 MediaLink">
                          <span>
                            <i className="fal fa-photo-video pr-2"></i>
                            Médias
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* <!-- Card --> */}
                <div className="card mb-3">
                  <div className="card-header card-collapse">
                    <div className="mb-0">
                      <Link href={`${Routing}/profile`}>
                        <a className="btn btn-block text-muted-f d-flex justify-content-between card-btn p-3 ProfileLink">
                          <span>
                            <i className="fal fa-user pr-2"></i>Profil
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* <!-- Card --> */}
                <div className="card mb-3">
                  <div className="card-header card-collapse">
                    <div className="mb-0">
                      <Link href={`${Routing}/informations`}>
                        <a className="btn btn-block text-muted-f d-flex justify-content-between card-btn p-3 InfosLink">
                          <span>
                            <i className="fal fa-info-circle pr-2"></i>Info
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* <!-- Card --> */}
                <div className="card mb-3">
                  <div className="card-header card-collapse">
                    <div className="mb-0">
                      <Link href={`${Routing}/params`}>
                        <a className="btn btn-block text-muted-f d-flex justify-content-between card-btn p-3 SettingsLink">
                          <span>
                            <i className="far fa-sliders-v pr-2"></i>
                            Paramètres
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="card mb-3">
                  <div className="card-header card-collapse">
                    <div className="mb-0">
                      <button
                        type="button"
                        className="btn btn-block text-muted-f d-flex justify-content-between card-btn p-3 LogoutLink"
                        onClick={()=>{LogOut()}}
                      >
                        <span>
                          <i className="far fa-sign-out pr-2"></i>Se
                          Déconnecter
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  </div>
   ):""}
  <script src="/assets/js/jquery.min.js"></script>
  <script src="/assets/js/popper.min.js"></script>
  <script src="/assets/js/bootstrap.min.js"></script>
  <script src="/assets/js/app.js"></script>
</React.Fragment>

  );
}
