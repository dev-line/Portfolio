import React, { useState, useRef } from "react";
import Axios from "axios";
import { parseCookies } from "nookies";
import { WaitingAlerts, ErrorAlert, SeccessAlert } from "./Alerts";
const  {API_URL} = process.env

export default function GérerLesSousOptions({ data, onAction }) {
  const ThisUser = parseCookies("auth");
  const [ThisOption, setThisOption] = useState(data);
  const Name = useRef();
  const Price = useRef();
  const EditOption = async (e) => {
    e.preventDefault();
    WaitingAlerts()
    const ThisOption = { Name: Name.current.value, Price: Price.current.value };
    await Axios.put(`${API_URL}/options/${data.id}`, ThisOption, {
      headers: { Authorization: `Bearer ${ThisUser.jwt}` },
    })
      .then((res) => {
        setThisOption(res.data);
        SeccessAlert('Cette option a été modifiée avec succès')
      })
      .catch(err=>{ErrorAlert('Veuillez vérifier les données saisies')});
  };
  const RemoveOption = ()=>{
    WaitingAlerts()
    Axios.delete(`${API_URL}/options/${data.id}`, {
      headers: { Authorization: `Bearer ${ThisUser.jwt}` },
    })
      .then((res) => {
        onAction()
        $(`#delOption${data.id}`).modal('hide');
        SeccessAlert('cette option a été supprimée.')
      })
      .catch(err=>{ErrorAlert('Une erreur s’est produite lors de la suppression s’il vous plaît essayer à nouveau')
    });
  }
  return (
    <React.Fragment>
      <div className="col-sm-6 col-md-4 px-2 mb-3">
        <div className="card card-frame shadow-none h-100">
          <div
            className="card-body"
            data-toggle="modal"
            data-target="#serviceOptions"
          >
            <div className="media">
              <div className="media-body d-flex justify-content-between my-auto">
                <div>
                  <span className="d-block text-muted-f font-weight-semi-bold pb-1">
                    {ThisOption.Name}
                  </span>
                  <small className="d-block text-muted currency">
                    {ThisOption.Price}
                  </small>
                </div>
                <div className="my-auto">
                  <div className="dropdown">
                    <button
                      className="btn py-1"
                      type="button"
                      id="serviceOptionsMenu"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fal fa-cog"></i>
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="serviceOptionsMenu"
                    >
                      <a
                        className="dropdown-item mb-3"
                        href="#"
                        data-toggle="modal"
                        data-target={`#editServiceInfo${data.id}`}
                      >
                        <i className="fal fa-edit pr-2"></i>Modifier
                      </a>
                      <a
                        className="dropdown-item"
                        href="#"
                        data-toggle="modal"
                        data-target={`#delOption${data.id}`}
                      >
                        <i className="fal fa-trash-alt pr-2"></i>
                        Supprimer
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modifier Info --> */}
      <div
        className="modal fade"
        id={`editServiceInfo${data.id}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="editServiceInfo"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form className="modal-content" onSubmit={EditOption}>
            <div className="modal-header border-0">
              <h5
                className="modal-title font-weight-semi-bold"
                id="editService"
              >
                Modification Rapide
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control form-control-sm text-muted my-3"
                id="serviceName"
                placeholder="Nom d'option"
                defaultValue={ThisOption.Name}
                ref={Name}
              />
              <input
                type="number"
                className="form-control form-control-sm text-muted"
                id="servicePrice"
                placeholder="Prix d'option"
                defaultValue={ThisOption.Price}
                ref={Price}
              />
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-sm text-muted font-weight-semi-bold"
                data-dismiss="modal"
              >
                Fermer
              </button>
              <button
                type="submit"
                className="btn btn-sm btn-secondary-f text-white"
              >
                Sauvgarder
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <!-- Delete Service --> */}
      <div
        className="modal fade"
        id={`delOption${data.id}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="delOption"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content bg-white">
            <div className="modal-body px-3">
              <div className="pt-5 text-center">
                <i className="fal fa-3x fa-trash-alt text-danger-f"></i>
                <h4 className="font-weight-bold mt-5 mb-3">
                  Supprimer l'Option ?
                </h4>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-sm text-muted font-weight-semi-bold"
                data-dismiss="modal"
              >
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-sm btn-danger-f text-white font-weight-semi-bold"
                onClick={()=>{RemoveOption()}}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
