import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Axios from "axios";
import { parseCookies, setCookie } from "nookies";
import { ErrorAlert, SeccessAlert } from "../../../../components/Alerts";
import Link from "next/link";
const { API_URL } = process.env;
export default function login() {
  const Router = useRouter();
  const Email = useRef();
  const isAuth = parseCookies("auth");
  const [Status, setStatus] = useState(false);
  const [BtnTxt, setBtnTxt] = useState("Envoyer le lien");
  useEffect(() => {
    isAuth ? console.log(isAuth) : console.log(isAuth);
  }, []);
  const handleRequest = async (e) => {
    e.preventDefault();
    setBtnTxt("Chargement...");
    setStatus(true);
    return await Axios.post(`${API_URL}/auth/forgot-password`, { email: Email.current.value })
      .then((res) => {
        setBtnTxt("Envoyer le lien");
        setStatus(false);
        SeccessAlert('Votre lien de récupération de mot de passe a été envoyé à votre e-mail')
      })
      .catch((err) => {
        setBtnTxt("Envoyer le lien");
        setStatus(false);
        ErrorAlert("Veuillez valider votre e-mail");
      });
  };
  return (
    <React.Fragment>
      <Head>
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <script src="/assets/js/jquery.min.js"></script>
        <title>Récupération de compte</title>
      </Head>
      <div className="container-fluid d-flex flex-column bg-light">
        <div className="row align-items-center justify-content-center min-vh-100">
          <div className="col-md-6 col-lg-5 col-xl-5 py-6 py-md-0">
            <div>
              <div className="mb-5 text-center">
                <h6 className="h3 font-weight-semi-bold mb-1">
                  Problèmes de connexion ?
                </h6>
                <p className="small w-75 mx-auto mb-0">
                  Entrez votre adresse e-mail, et nous vous enverrons un lien
                  pour récupérer votre compte.
                </p>
              </div>
              <span className="clearfix"></span>
              {/* <!-- Form --> */}
              <form id="reset" onSubmit={handleRequest}>
                {/* <!-- Email Input --> */}
                <div className="form-group">
                  <label className="form-control-label text-white">
                    Adresse e-mail
                  </label>
                  <div className="input-group input-group-merge">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="feather feather-user"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="input-email"
                      placeholder="name@example.com"
                      ref={Email}
                      disabled={Status}
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn btn-block btn-secondary-f text-white font-weight-semi-bold"
                    disabled={Status}
                  >
                   {BtnTxt == "Chargement..." ? (
                      <React.Fragment>
                        <span
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span class="sr-only">{BtnTxt}</span>
                      </React.Fragment>
                    ) : (
                      BtnTxt
                    )}
                  </button>
                </div>
              </form>
              {/* <!-- End Form --> */}

              {/* <!-- New Account --> */}
              <div className="mt-4 text-center">
                <small className="text-muted">Revenir à l’écran de </small>
                <Link href="/bord/administration">
                  <a className="small font-weight-semi-bold text-secondary-f">
                    connexion
                  </a>
                </Link>
              </div>
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
