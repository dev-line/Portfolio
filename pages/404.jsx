import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <React.Fragment>
      <Head>
        <link rel="shortcut icon" href="/assets/fav.ico" type="image/x-icon" />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="stylesheet" href="/assets/css/dark.css" />
        <script src="/assets/js/jquery.min.js"></script>
      </Head>
      <div className="vh-100 content-centered">
        <div className="container">
          <div className="row">
            <div className="col-md-6 my-auto">
              <div className="mt-n5">
                <h2 className="text-brand font-weight-bold">Oups...</h2>
                <h1 className="display-4 text-white">
                  <span className="font-weight-bold pr-1">Désolé!</span>Page non
                  trouvée.
                </h1>
                <p className="lead text-white-70">
                  La page que vous avez demandée est introuvable,
                  <br />
                  Vous avez peut-être mal saisi l'adresse ou la page a peut-être
                  été déplacée.
                </p>
                <div className="d-flex mt-4">
                  <Link href='/'>
                  <a
                    
                    className="btn btn-sm btn-brand rounded-pill btn-wide mr-4 mr-xs-0 transition-3d-hover"
                  >
                    <i className="fal fa-home pr-2"></i>Accueil
                  </a>
                  </Link>
                  <Link href='contact'>
                  <a
                    className="btn btn-sm btn-soft-brand rounded-pill btn-wide"
                  >
                    <i className="fal fa-file-alt pr-2"></i>Signaler une erreur
                  </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-none d-md-block">
              <img src="/assets/img/svg/404.svg" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
      <script src="/assets/js/jquery.min.js"></script>
      <script src="/assets/js/popper.min.js"></script>
      <script src="/assets/js/bootstrap.min.js"></script>
      <script src="/assets/js/app.js"></script>
    </React.Fragment>
  );
}
