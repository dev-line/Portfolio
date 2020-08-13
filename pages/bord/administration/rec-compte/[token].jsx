import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Axios from "axios";
import { parseCookies, setCookie } from "nookies";
import { ErrorAlert, SeccessAlert } from "../../../../components/Alerts";
const { API_URL } = process.env;
export default function login() {
  const router = useRouter();
  const CPass = useRef();
  const Pass = useRef();
  const isAuth = parseCookies("auth");
  const [Status, setStatus] = useState(false);
  const [BtnTxt, setBtnTxt] = useState("S'identifier");
  useEffect(() => {
    isAuth ? console.log(isAuth) : console.log(isAuth);
  }, []);
  const handleReset = async (e) => {
    e.preventDefault();
    const { token } = await router.query;
    setBtnTxt("Chargement...");
    setStatus(true);
    const NewPass =  { code: token, password: Pass.current.value, passwordConfirmation: CPass.current.value }
    return await Axios.post(`${API_URL}/auth/reset-password`,NewPass )
      .then((res) => {
        SeccessAlert('L’opération a été couronnée de succès.')
        return router.push("/bord/administration/se-connecter");
      })
      .catch((err) => {
        console.log(err);
        setBtnTxt("S'identifier");
        setStatus(false);
        ErrorAlert("Une erreur s’est produite au cours de ce processus.");
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
                        <h6 className="h3 mb-1 font-weight-semi-bold">Réinitialisez votre mot de passe</h6>
                        <p className="w-75 mx-auto small text-muted mb-0">Pour votre sécurité, Utilisez un mot de passe <span className="text-success-f font-weight-semi-bold">unique</span> et <span className="text-success-f font-weight-semi-bold">sécurisés</span>.</p>
                    </div>
                    <span className="clearfix"></span>
                    {/* <!-- Form --> */}
                    <form onSubmit={handleReset}>
                        {/* <!-- New Password --> */}
                        <div className="form-group">
                            <label className="form-control-label">Nouveau mot de passe</label>
                            <div className="input-group input-group-merge">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-key"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                                        </span>
                                </div>
                                <input type="password" className="form-control form-control-sm text-muted" id="input-password" placeholder="********"  required  ref={Pass} />
                            </div>
                        </div>
                        {/* <!-- Repeat New Password --> */}
                        <div className="form-group">
                            <label className="form-control-label">Confirmer le nouveau mot de passe</label>
                            <div className="input-group input-group-merge">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-key"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                                        </span>
                                </div>
                                <input type="password" className="form-control form-control-sm text-muted" id="reapeat-input-password" placeholder="********" required ref={CPass} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <button type="submit" className="btn btn-sm btn-block btn-secondary-f text-white">Réinitialiser</button>
                        </div>
                    </form>

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
