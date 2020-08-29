import React, { useRef, useLayoutEffect, useState } from "react";
import VISITOR from "../components/VISITOR";
import Footer from "../components/Footer";
import Axios from "axios";
import { ErrorAlert, SeccessAlert } from "../components/Alerts";

const API_URL = process.env.API_URL;

export default function contact() {
  const Name = useRef();
  const SenderMail = useRef();
  const Subject = useRef();
  const Text = useRef();
const [MyEmail, setMyEmail] = useState("")
  const GetMyEmail = ()=>{
    Axios.get(`${API_URL}/Informations`).then(res=>{
      setMyEmail(res.data.Email)
    }).catch(err=>{
      console.log(err);
    })
  }
  const sendEmail = async (e) => {
    e.preventDefault();
    const Msg = {
      from: SenderMail.current.value.trim(),
      to: MyEmail,
      subject: Subject.current.value.trim(),
      html: Name.current.value.trim() + `<br/>` + Text.current.value,
    };
    await Axios.post(`${API_URL}/email`, Msg,{headers: { 'Content-Type': 'application/json'}})
      .then((res) => {
        console.log(res)
        return SeccessAlert("Le message a été envoyé");
      })
      .catch((err) => {
        console.log(err);
        return ErrorAlert("S’ll vous plaît, essayez plus tard.");
      });
  };
  useLayoutEffect(() => {
    $('.ContactLink').addClass('active')
    GetMyEmail()
  }, [])
  return (
    <VISITOR title=" Contact">
      {/* <!-- Content --> */}
      <div className="spacer-100 content-centered">
        <div className="container">
          <div className="row">
            <form className="d-lg-flex justify-md-content-between" onSubmit={sendEmail}>
              <div className="col-md-6 col-lg-5" data-aos="fade-up">
                <div className="card border-0 rounded p-3">
                  <div className="card-body py-2">
                    <h4 className="h2 text-white font-weight-bold">
                      Vous avez une question ou une idée à partager ?
                    </h4>
                    <p className="small mb-0 text-white-70">
                      N'hésitez pas à nous contacter. Nous aimerions recevoir de
                      vos nouvelles.
                    </p>
                    <form className="mt-4">
                      {/* <!-- Name --> */}
                      <div className="form-group">
                        <label className="form-control-label font-size-1 text-white-70">
                          Nom<span className="text-danger-f pl-1">*</span>
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
                            type="text"
                            className="form-control form-control-sm text-muted"
                            id="input-text"
                            placeholder="John Deo"
                            ref={Name}
                            required
                          />
                        </div>
                      </div>
                      {/* <!-- Email --> */}
                      <div className="form-group">
                        <label className="form-control-label font-size-1 text-white-70">
                          Email<span className="text-danger-f pl-1">*</span>
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
                                className="feather feather-at-sign"
                              >
                                <circle cx="12" cy="12" r="4"></circle>
                                <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
                              </svg>
                            </span>
                          </div>
                          <input
                            type="email"
                            className="form-control form-control-sm text-muted"
                            id="input-email"
                            placeholder="John@gmail.com"
                            ref={SenderMail}
                            required
                          />
                        </div>
                      </div>
                      {/* <!-- Email --> */}
                      <div className="form-group">
                        <label className="form-control-label font-size-1 text-white-70">
                          Sujet<span className="text-danger-f pl-1">*</span>
                        </label>
                        <div className="input-group input-group-merge">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 16 16"
                                class="bi bi-chat-left-text"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M14 1H2a1 1 0 0 0-1 1v11.586l2-2A2 2 0 0 1 4.414 11H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                                />
                                <path
                                  fill-rule="evenodd"
                                  d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
                                />
                              </svg>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm text-muted"
                            id="subject"
                            placeholder="Sujet"
                            ref={Subject}
                            required
                          />
                        </div>
                      </div>
                      {/* <!-- Message --> */}
                      <div className="form-group">
                        <label className="form-control-label font-size-1 text-white-70">
                          Comment pouvons-nous vous aider?
                          <span className="text-danger-f pl-1">*</span>
                        </label>
                        <textarea
                          className="form-control small text-muted"
                          id="contact"
                          rows="4"
                          placeholder="Dites-nous quelques mots..."
                          ref={Text}
                          required
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-sm btn-block btn-secondary-f text-white font-weight-semi-bold"
                      >
                        Envoyer
                      </button>
                    </form>
                    <p className="small mb-0 text-center pt-2"></p>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-6 my-auto mx-auto d-none d-md-block"
                data-aos="fade-down"
              >
                {/* <!-- Info --> */}
                <div className="mb-5">
                  <h2 className="text-white">
                    Nous sommes prêts à vous aider.
                  </h2>
                  {/* <!-- <p className="text-white-70">See why leading organizations choose US for Business as their destination for development services.</p> --> */}
                </div>

                <img
                  src="assets/img/svg/office.svg"
                  className="mx-auto"
                  alt=""
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <!-- ========== FOOTER ========== --> */}
      <Footer />
    </VISITOR>
  );
}
