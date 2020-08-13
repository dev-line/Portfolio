import React, {useState, useRef, useLayoutEffect} from "react";
import DASH from "../../../components/DASHBOARD";
import Axios from "axios";
import { parseCookies } from "nookies";
import { WaitingAlerts, SeccessAlert, ErrorAlert } from "../../../components/Alerts";
import Loading from "../../../components/Loading";
const { API_URL } = process.env;
export default function settings() {
  const ThisUser = parseCookies("auth");
  const [Settings, setSettings] = useState();
  const [Status, setStatus] = useState("Loading");
  const Name = useRef()
  const Description = useRef()
  const State = useRef()
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
    e.preventDefault()
    WaitingAlerts()
    const NewSettings = {
      SiteName: Name.current.value.trim(),
      SiteDescription: Description.current.value.trim(),
      SiteStatus: State.current.value
    }
    await Axios.put(`${API_URL}/settings`,NewSettings, {
      headers: { Authorization: `Bearer ${ThisUser.jwt}` },
    })
      .then((res) => {
        setSettings(res.data);
        SeccessAlert('Paramètres enregistrés')
      })
      .catch((err) => {
        ErrorAlert('Il y a une erreur dans le serveur.')
      });
  };
  if (!Settings) {
      if (Status !== 'Done') {
          GetSettings()
      }
  }
  useLayoutEffect(() => {
    $(".SettingsLink").addClass("active")
  }, [])
  return (
    <DASH title="Paramétres">
      <div className="col-md-10">
        {Settings?(
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
                      className="form-control"
                      id="siteDescription"
                      rows="3"
                      defaultValue={Settings.SiteDescription}
                      ref={Description}
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
                  <select className="custom-select custom-select-sm text-muted-f" ref={State}>
                    <option value="Enable" selected={Settings.SiteStatus == 'Enable'?true: false}>
                      Désactiver
                    </option>
                    <option value="Disable" selected={Settings.SiteStatus == 'Enable'?false: true}>Activer</option>
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
        ):<Loading/>}
      </div>
    </DASH>
  );
}
