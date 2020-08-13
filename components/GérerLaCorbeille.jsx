import React, { useState } from "react";
import Link from "next/link";
import Axios from "axios";
const  {API_URL} = process.env
import { parseCookies } from "nookies";
import { ErrorAlert, SeccessAlert, WaitingAlerts } from "./Alerts";

export default function GérerLaCorbeille({ data, onAction }) {
  const ThisUser = parseCookies("auth");
  const [DateIn, setDateIn] = useState(new Date(data.created_at));
  const RemoveProject = async () => {
    WaitingAlerts()
    Axios.delete(`${API_URL}/projects/${data.id}`, {
      headers: { Authorization: `Bearer ${ThisUser.jwt}` },
    })
      .then((res) => {
        $(`#delPost${data.id}`).modal("hide");
        SeccessAlert('Le projet a été supprimé.')
        onAction();
      })
      .catch((err) => {
        ErrorAlert('Une erreur s’est produite lors de la suppression s’il vous plaît essayer à nouveau')
      });
  };
  const RestoreProject = async () => {
    WaitingAlerts()
    const Published = { Published: true };
    Axios.put(`${API_URL}/projects/${data.id}`, Published, {
      headers: { Authorization: `Bearer ${ThisUser.jwt}` },
    })
      .then((res) => {
        $(`#RecoverPost${data.id}`).modal('hide')
        SeccessAlert('Le projet a été récupéré avec succès')
        onAction()
      })
      .catch((err) => {
        ErrorAlert('Une erreur s’est produite lors de la récupération s’il vous plaît essayer à nouveau')
      });
  };
  return (
    <tr>
      <td className="w-70 w-lg-50">
        <p className="font-size-1 font-weight-semi-bold mb-0">{data.Title}</p>
        <ul className="list-unstyled d-flex mb-0">
          <li>
            <Link
              href="/bord/administration/projets/modifier/[id]"
              as={`/bord/administration/projets/modifier/${data.id}`}
            >
              <a className="btn text-primary-f p-0">Modifier</a>
            </Link>
          </li>
          <li className="mx-3">
            <button
              type="button"
              className="btn text-primary-f p-0"
              data-toggle="modal"
              data-target={`#RecoverPost${data.id}`}
            >
              Rétablir
            </button>
          </li>
          <li>
            <button
              type="button"
              className="btn text-danger-f p-0"
              data-toggle="modal"
              data-target={`#delPost${data.id}`}
            >
              Supprimer définitivement
            </button>
          </li>
        </ul>
      </td>
      <td>
        <p className="font-size-1 font-weight-semi-bold mb-0">{`${DateIn.getFullYear()}-${parseInt(
          DateIn.getMonth() + 1,
          10
        )
          .toString()
          .padStart(2, 0)}-${DateIn.getDate()}`}</p>
      </td>
      {/* //  <!-- Delete Post --> */}
      <div
        className="modal fade"
        id={`delPost${data.id}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="delPost"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body px-3">
              <div className="pt-5 text-center">
                <i className="fal fa-3x fa-trash-alt text-danger-f"></i>
                <h4 className="font-weight-bold mt-5 mb-3">Êtes-vous sûr ?</h4>
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
                onClick={() => {
                  RemoveProject();
                }}
              >
                Supprimer définitivement
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* //  <!-- Delete Post --> */}
      <div
        className="modal fade"
        id={`RecoverPost${data.id}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="delPost"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body px-3">
              <div className="pt-5 text-center">
                <i className="fal fa-3x fa-undo-alt text-warning-f"></i>
                <h4 className="font-weight-bold mt-5 mb-3">Êtes-vous sûr ?</h4>
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
                onClick={() => {
                  RestoreProject();
                }}
              >
                Rétablir
              </button>
            </div>
          </div>
        </div>
      </div>
    </tr>
  );
}
