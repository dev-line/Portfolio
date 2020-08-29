import React, { useState, useRef, useLayoutEffect } from "react";
import DASH from "../../../components/DASHBOARD";
import Axios from "axios";
import { parseCookies } from "nookies";
import {
  WaitingAlerts,
  SeccessAlert,
  ErrorAlert,
} from "../../../components/Alerts";
import Loading from "../../../components/Loading";
const { API_URL } = process.env;
export default function settings() {
  const ThisUser = parseCookies("auth");
  const [Settings, setSettings] = useState();
  const [Status, setStatus] = useState("Loading");
  const Name = useRef();
  const Description = useRef();
  const Title = useRef();
  const SubTitle = useRef();
  const State = useRef();
    const [imgtmp, setimgTmp] = useState();

const CheckImg = (e) => {
    const ImgsExt = ["png", "jpg", "svg"];
    const imgPart = e.target.value.split(".");
    const Ext = imgPart[imgPart.length - 1];
    ImgsExt.indexOf(Ext) >= 0
      ? (setimgTmp(e.target.files), true)
      : (setimgTmp(null), false);
  };

  const GetSettings = async () => {
    await Axios.get(`${API_URL}/settings`, {
      headers: { Authorization: `Bearer ${ThisUser.jwt}` },
    })
      .then((res) => {
        setSettings(res.data);
        setStatus("Done");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const UpdateSettings = async (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    WaitingAlerts();
    const NewSettings = {
      SiteName: Name.current.value.trim(),
      SiteDescription: Description.current.value.trim(),
      SiteStatus: State.current.value,
      HomeTitle: Title.current.value.trim(),
      HomeSubTitle: SubTitle.current.value.trim()
    };
    await Axios.put(`${API_URL}/settings`, NewSettings, {
      headers: { Authorization: `Bearer ${ThisUser.jwt}` },
    })
      .then((res) => {
        if (imgtmp) {
          bodyFormData.append("files", imgtmp[0]);
          bodyFormData.append("ref", "settings");
          bodyFormData.append("refId", res.data.id);
          bodyFormData.append("field", "HomeBg");
          Axios({
            method: "post",
            url: `${API_URL}/upload`,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${ThisUser.jwt}`,
            },
            data: bodyFormData,
          })
            .then((res) => console.log(res.data))
            .catch((err) => {
              console.log(err.response.data.message);
            });
        }
        setSettings(res.data);
        SeccessAlert("Paramètres enregistrés");
      })
      .catch((err) => {
        ErrorAlert("Il y a une erreur dans le serveur.");
      });
  };
  if (!Settings) {
    if (Status !== "Done") {
      GetSettings();
    }
  }
  useLayoutEffect(() => {
    $(".SettingsLink").addClass("active");
  }, []);
  return (
    <DASH title="Paramétres">
      <div className="col-md-10">
        {Settings ? (
          <form onSubmit={UpdateSettings}>
            <div className="container spacer-70">
              <div className="row d-block mb-8">
                <div className="col-12 col-md-6 mb-8">
                  {/* <!-- Name Input --> */}
                  <div className="form-group">
                    <label
                      className="form-control-label font-size-1 text-muted-f font-weight-bold mb-3"
                      for="siteName"
                    >
                      Nom du site
                    </label>
                    <div className="input-group input-group-merge">
                      <input
                        type="text"
                        className="form-control form-control-sm text-muted"
                        id="siteName"
                        placeholder="Nom du site"
                        defaultValue={Settings.SiteName}
                        ref={Name}
                        required=""
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 mb-8">
                  {/* <!-- UserName Input --> */}
                  <div className="form-group">
                    <label
                      className="form-control-label font-size-1 text-muted-f font-weight-bold mb-3"
                      for="siteDescription"
                    >
                      Description du site
                    </label>
                    <div className="input-group input-group-merge">
                      <textarea
                        className="form-control form-control-sm text-muted"
                        id="siteDescription"
                        rows="3"
                        defaultValue={Settings.SiteDescription}
                        ref={Description}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 mb-8">
                  {/* <!-- Name Input --> */}
                  <div className="form-group">
                    <label
                      className="form-control-label font-size-1 text-muted-f font-weight-bold mb-3"
                      for="siteIcon"
                    >
                      Image de fond (Page D'accueil)
                    </label>
                    <div className="d-block">
                      <div
                        className="spacer-80 w-50 rounded bg-cover"
                        style={{
                          background: imgtmp ? `url(${URL.createObjectURL(imgtmp[0])})`:
                          Settings.HomeBg
                            ? `url(${API_URL + Settings.HomeBg.url})`:"url(/assets/img/misc/empty.png)"
                        }}
                      ></div>
                      <div className="my-auto">
                        <label
                          className="btn btn-sm btn-secondary-f text-white file-attachment-btn up-btn mt-3"
                          for="imgInp"
                        >
                          <i className="fas fa-cloud-upload-alt pr-2"></i>changer
                          l'image
                          <input
                            id="imgInp"
                            name="file-attachment"
                            type="file"
                            className="file-attachment-btn-label"
                            onChange={CheckImg}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 mb-8">
                  {/* <!-- Name Input --> */}
                  <div className="form-group">
                    <label
                      className="form-control-label font-size-1 text-muted-f font-weight-bold mb-3"
                      for="homeTitle"
                    >
                      Titre (Page D'accueil)
                    </label>
                    <div className="input-group input-group-merge">
                      <textarea
                        className="form-control form-control-sm text-muted"
                        id="homeTitle"
                        defaultValue={Settings.HomeTitle}
                        placeholder="tapez quelque chose"
                        ref={Title}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 mb-8">
                  {/* <!-- Name Input --> */}
                  <div className="form-group">
                    <label
                      className="form-control-label font-size-1 text-muted-f font-weight-bold mb-3"
                      for="homeSubTitle"
                    >
                      Sous-titre (Page D'accueil)
                    </label>
                    <div className="input-group input-group-merge">
                      <textarea
                        className="form-control form-control-sm text-muted"
                        id="homeSubTitle"
                        placeholder="Sous-titre"
                        defaultValue={Settings.HomeSubTitle}
                        ref={SubTitle}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <h5 className="font-size-2 font-weight-bold font-size-1 text-muted-f mb-3">
                    Etat du site{" "}
                    <span className="brkts">Mode de Maintenance</span>
                  </h5>
                  <div className="form-group w-60">
                    <select
                      className="custom-select custom-select-sm text-muted-f"
                      ref={State}
                    >
                      <option
                        value="Enable"
                        selected={
                          Settings.SiteStatus == "Enable" ? true : false
                        }
                      >
                        Désactiver
                      </option>
                      <option
                        value="Disable"
                        selected={
                          Settings.SiteStatus == "Enable" ? false : true
                        }
                      >
                        Activer
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-sm btn-wide btn-secondary-f text-white"
              >
                Sauvegarder les modifications
              </button>
            </div>
          </form>
        ) : (
          <Loading />
        )}
      </div>
    </DASH>
  );
}
