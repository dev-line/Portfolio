import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Axios from "axios";
import { parseCookies, setCookie } from "nookies";
import { ErrorAlert } from "../../../components/Alerts";
import Link from "next/link";
const { API_URL } = process.env;
export default function login() {
  const Router = useRouter();
  const PASSTYPE = "password";
  const TEXTTYPE = "text";
  const onPass = "Afficher";
  const onText = "Masque";
  const Email = useRef();
  const Password = useRef();
  const [PassVis, setPassVis] = useState(false);
  const isAuth = parseCookies("auth");
  const [Status, setStatus] = useState(false);
  const [BtnTxt, setBtnTxt] = useState("S'identifier");
  useEffect(() => {
    isAuth ? console.log(isAuth) : console.log(isAuth);
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    setBtnTxt("Chargement...");
    setStatus(true);
    return await Axios.post(`${API_URL}/auth/local`, {
      identifier: Email.current.value.trim(),
      password: Password.current.value,
    })
      .then((res) => {
        setCookie("auth", "jwt", res.data.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        setCookie("auth", "id", res.data.user.id, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        return Router.push("/bord/administration");
      })
      .catch((err) => {
        setBtnTxt("S'identifier");
        setStatus(false);
        ErrorAlert("nom d’utilisateur ou mot de passe non valide");
      });
  };
  return (
    <React.Fragment>
      <Head>
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <script src="/assets/js/jquery.min.js"></script>
        <title>Dashboard - Se Connecter</title>
      </Head>
      <div className="container-fluid d-flex flex-column bg-white">
        <div className="row align-items-center justify-content-center min-vh-100">
          <div className="col-md-6 col-lg-5 col-xl-5 py-6 py-md-0">
            <div>
              <div className="mb-5 text-center">
                <h2 className="mb-1 font-weight-semi-bold ">S'identifier</h2>
                <p className="mb-0">Connectez-vous pour continuer</p>
              </div>
              {/* <!-- Form --> */}
              <form id="login" onSubmit={handleLogin}>
                {/* <!-- Email Input --> */}
                <div className="form-group">
                  <label
                    className="form-control-label small  font-weight-bold"
                    for="inputEmail"
                  >
                    Email
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
                      ref={Email}
                      className="form-control form-control-sm"
                      id="inputEmail"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>
                {/* <!-- Password Input --> */}
                <div className="form-group mb-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <label
                        className="form-control-label small  font-weight-bold"
                        for="inputPassword"
                      >
                        Mot de passe
                      </label>
                    </div>
                    <div className="mb-2">
                      <button
                        type="button"
                        className="btn smaller link-muted p-0"
                        onClick={() => {
                          setPassVis(!PassVis);
                        }}
                      >
                        {PassVis ? onText : onPass} le mot de passe
                      </button>
                    </div>
                  </div>
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
                          className="feather feather-key"
                        >
                          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                        </svg>
                      </span>
                    </div>
                    <input
                      type={PassVis ? TEXTTYPE : PASSTYPE}
                      ref={Password}
                      className="form-control form-control-sm"
                      id="inputPassword"
                      placeholder="**********"
                      data-toggle="password"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn btn-sm btn-block btn-secondary-f text-white font-weight-semi-bold"
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
              <div className="text-center mt-3">
              <Link href="/bord/administration/rec-compte">
                <a className="link-muted just">Avez-vous oublié le mot de passe?</a>
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
