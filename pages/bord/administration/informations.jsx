import React, { useState, useRef, useLayoutEffect } from "react";
import DASH from "../../../components/DASHBOARD";
import Axios from "axios";
const { API_URL } = process.env;
import { parseCookies } from "nookies";
import dynamic from "next/dynamic";
import { WaitingAlerts, ErrorAlert, SeccessAlert } from "../../../components/Alerts";
import Loading from "../../../components/Loading";
const JoditEditor = dynamic(import("jodit-react"), { ssr: false });

export default function info() {
  const ThisUser = parseCookies("auth");
  const [Infos, setInfos] = useState({ id: null });
  const [Status, setStatus] = useState("Load");
  const Facebook = useRef();
  const Instagram = useRef();
  const Twitter = useRef();
  const LinkedIn = useRef();
  const Youtube = useRef();
  const Phone = useRef();
  const Address = useRef();
  const Email = useRef();
  var content = Infos.id? Infos.AboutMe:""

  const config = {
    readonly: false,
    language: "fr",
    uploader: {
      insertImageAsBase64URI: true,
      imagesExtensions: ["jpg", "png", "jpeg", "gif"],
    },
  };
  const GetInfos = async () => {
    await Axios.get(`${API_URL}/informations`)
      .then((res) => {
        setInfos(res.data);
        content = res.data.AboutMe
        setStatus("Done");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (!Infos.id) {
    if (Status !== "Done") {
      GetInfos();
    }
  }
  const UpdateInfos = async (e) => {
    e.preventDefault();
    WaitingAlerts()
    const NewInfos = {
      AboutMe: content,
      Facebook: Facebook.current.value,
      Instagram: Instagram.current.value,
      LinkedIn: LinkedIn.current.value,
      Youtube: Youtube.current.value,
      Twitter: Twitter.current.value,
      Phone: Phone.current.value,
      Address: Address.current.value,
      Email: Email.current.value,
    };
    await Axios.put(`${API_URL}/Informations`, NewInfos, {
      headers: { Authorization: `Bearer ${ThisUser.jwt}` },
    })
      .then((res) => {
        setInfos(res.data);
        SeccessAlert('Vos informations ont été modifiées avec succès')
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert('Veuillez vérifier les données saisies')
      });
  };
  const handleChange = (data) => {
    content = data
  };
  useLayoutEffect(() => {
    $(".InfosLink").addClass("active")
  }, [])
  return (
    <DASH title="Informations">
      <div className="col-md-10">
        {Infos.id ? (
          <form onSubmit={UpdateInfos}>
            <div className="container spacer-70">
              <div className="row justify-content-aroudnd">
                {/* <!--  --> */}
                <div className="col-12 col-md-10 mt-5 mt-lg-0 order-1 order-lg-0">
                  <div className="mb-3">
                    <h5 className="font-size-2 font-weight-bold text-muted-f mb-3">
                      À propos de moi
                    </h5>
                    <JoditEditor
                  value={Infos.id? Infos.AboutMe: ""}
                  onBlur={handleChange}
                  config={config}
                  onChange={handleChange}
                />
                  </div>
                  <div className="mb-3">
                    <h5 className="font-size-2 font-weight-bold text-muted-f mb-0">
                      Réseau social
                    </h5>
                  </div>

                  <div className="row mb-5">
                    <div className="col-12 col-md-6 mb-3">
                      {/* <!-- Name Input --> */}
                      <div className="form-group">
                        <label
                          className="form-control-label small text-muted-f font-weight-bold"
                          for="inputFb"
                        >
                          Facebook
                        </label>
                        <div className="input-group input-group-merge">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fab fa-facebook-f"></i>
                            </span>
                          </div>
                          <input
                            type="url"
                            className="form-control form-control-sm text-muted"
                            id="inputFb"
                            placeholder="Lien de la page Facebook"
                            defaultValue={Infos.Facebook}
                            ref={Facebook}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      {/* <!-- UserName Input --> */}
                      <div className="form-group">
                        <label
                          className="form-control-label small text-muted-f font-weight-bold"
                          for="inputIg"
                        >
                          Instagram
                        </label>
                        <div className="input-group input-group-merge">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fab fa-instagram"></i>
                            </span>
                          </div>
                          <input
                            type="url"
                            className="form-control form-control-sm text-muted"
                            id="inputIg"
                            placeholder="Lien de compte Instagram"
                            defaultValue={Infos.Instagram}
                            ref={Instagram}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      {/* <!-- Email Input --> */}
                      <div className="form-group">
                        <label
                          className="form-control-label small text-muted-f font-weight-bold"
                          for="inputTw"
                        >
                          Twitter
                        </label>
                        <div className="input-group input-group-merge">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fab fa-twitter"></i>
                            </span>
                          </div>
                          <input
                            type="url"
                            className="form-control form-control-sm text-muted"
                            id="inputTw"
                            placeholder="Lien de compte Twitter"
                            defaultValue={Infos.Twitter}
                            ref={Twitter}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      {/* <!-- Password Input --> */}
                      <div className="form-group">
                        <label
                          className="form-control-label small text-muted-f font-weight-bold"
                          for="inputYt"
                        >
                          LinkedIn
                        </label>
                        <div className="input-group input-group-merge">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fab fa-linkedin"></i>
                            </span>
                          </div>
                          <input
                            type="url"
                            className="form-control form-control-sm text-muted"
                            id="inputYt"
                            placeholder="Lien de compte LinkedIn"
                            data-toggle="password"
                            defaultValue={Infos.LinkedIn}
                            ref={LinkedIn}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      {/* <!-- Password Input --> */}
                      <div className="form-group">
                        <label
                          className="form-control-label small text-muted-f font-weight-bold"
                          for="inputYt"
                        >
                          YouTube
                        </label>
                        <div className="input-group input-group-merge">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fab fa-youtube"></i>
                            </span>
                          </div>
                          <input
                            type="url"
                            className="form-control form-control-sm text-muted"
                            id="inputYt"
                            placeholder="Lien de la chaîne YouTube"
                            data-toggle="password"
                            defaultValue={Infos.Youtube}
                            ref={Youtube}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h5 className="font-size-2 font-weight-bold text-muted-f mb-0">
                      autre info
                    </h5>
                  </div>

                  <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                      {/* <!-- Name Input --> */}
                      <div className="form-group">
                        <label
                          className="form-control-label small text-muted-f font-weight-bold"
                          for="inputPhone"
                        >
                          Numéro de téléphone
                        </label>
                        <div className="input-group input-group-merge">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-phone"></i>
                            </span>
                          </div>
                          <input
                            type="number"
                            className="form-control form-control-sm text-muted"
                            id="inputPhone"
                            placeholder="Numéro de téléphone"
                            defaultValue={Infos.Phone}
                            ref={Phone}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      {/* <!-- UserName Input --> */}
                      <div className="form-group">
                        <label
                          className="form-control-label small text-muted-f font-weight-bold"
                          for="inputAdress"
                        >
                          Adresse
                        </label>
                        <div className="input-group input-group-merge">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-map-marker-alt"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm text-muted"
                            id="inputAdress"
                            placeholder="Adresse"
                            defaultValue={Infos.Address}
                            ref={Address}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      {/* <!-- UserName Input --> */}
                      <div className="form-group">
                        <label
                          className="form-control-label small text-muted-f font-weight-bold"
                          for="inputAdress"
                        >
                          Adresse e-mail
                        </label>
                        <div className="input-group input-group-merge">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-envelope"></i>
                            </span>
                          </div>
                          <input
                            type="email"
                            className="form-control form-control-sm text-muted"
                            id="inputAdress"
                            placeholder="Adresse e-mail"
                            defaultValue={Infos.Email}
                            ref={Email}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!--  --> */}
              </div>
              <button
                type="submit"
                className="btn btn-sm btn-wide btn-secondary-f text-white mt-3 mt-md-5"
              >
                Sauvegarder les modifications
              </button>
            </div>
          </form>
        ) : (
          <Loading/>
        )}
      </div>
    </DASH>
  );
}
