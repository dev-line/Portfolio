import React from "react";
import { parseCookies } from "nookies";
const  {API_URL} = process.env
import Axios from "axios";
import { saveAs } from 'file-saver';
import { WaitingAlerts, SeccessAlert,ErrorAlert } from "./Alerts";

export default function MediaContent({data}) {
  const ThisUser = parseCookies("auth");

  const Dowload = ()=>{
    saveAs(API_URL+data.url, data.name+data.ext)
  }
  const DeleteMedia = ()=>{
    WaitingAlerts()
    Axios.delete(`${API_URL}/upload/files/${data.id}`,{
      headers: { Authorization: `Bearer ${ThisUser.jwt}`}
    }).then(res=>{
      $(`#delMedia${data.id}`).modal('hide')
      SeccessAlert('Supprission terminé')
    }).catch(err=>{
      ErrorAlert('Il y a eu un problème pendant le processus de suppression')
    })
  }

  return (
    <div className="col-6 col-lg-2 mb-5">
      <div className="card card-media text-center">
        <div className="text-left">
          <div className="dropdown">
            <button
              className="btn pb-0 pt-1"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fal fa-ellipsis-v"></i>
            </button>
            <div
              className="dropdown-menu text-left shadow-lg"
              aria-labelledby="dropdownMenuButton"
            >
              <button className="dropdown-item mb-2" onClick={()=>{Dowload()}}>
                <i className="fal fa-download pr-2"></i>Télécharger
              </button>
              <button
                className="dropdown-item"
                data-toggle="modal"
                data-target={`#delMedia${data.id}`}
              >
                <i className="fal fa-trash-alt pr-2"></i>Supprimer
              </button>
            </div>
          </div>
        </div>
        <img src={`${API_URL+data.url}`} className="py-2 px-3" alt="..." />
        <div className="card-body pt-1 pb-2">
  <p className="small font-weight-semi-bold mb-0">{data.name}</p>
        </div>
      </div>
       {/* <!-- Delete Media --> */}
       <div className="modal fade" id={`delMedia${data.id}`} tabindex="-1" role="dialog" aria-labelledby="delMedia" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content bg-white">

                    <div className="modal-body px-3">
                        <div className="pt-5 text-center">
                            <i className="fal fa-3x fa-trash-alt text-danger-f"></i>
                            <h4 className="font-weight-bold mt-5 mb-3">Supprimer le fichier ?</h4>
                            
                        </div>
                    </div>
                    <div className="modal-footer border-0">
                        <button type="button" className="btn btn-sm text-muted font-weight-semi-bold" data-dismiss="modal">Annuler</button>
                        <button type="button" className="btn btn-sm btn-danger-f text-white font-weight-semi-bold" onClick={()=>{DeleteMedia()}}>Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
