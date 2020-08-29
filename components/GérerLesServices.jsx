import React, { useState, useRef, useEffect } from "react";
const  {API_URL} = process.env
import Link from "next/link";
import Axios from "axios";
import { parseCookies } from "nookies";
import { WaitingAlerts, SeccessAlert, ErrorAlert } from "./Alerts";
import { T } from "antd/lib/upload/utils";
export default function GérerLesServices({ data, onAction }) {
  const [ThisService, setThisService] = useState(data)
  const [imgtmp, setimgTmp] = useState();
  const [Price, setPrice] = useState(0);
  const [Thumbnail, SetThumbnail] = useState();
  const Title = useRef()
  const ThisUser = parseCookies("auth");
  const CheckImg = (e) => {
    const ImgsExt = ["png", "jpg", "svg"];
    const imgPart = e.target.value.split(".");
    const Ext = imgPart[imgPart.length - 1];
    ImgsExt.indexOf(Ext) >= 0
      ? (setimgTmp(e.target.files), true)
      : (setimgTmp(null), false);
  };
  useEffect(() => {
    GetPrice()
  }, [ThisService])
  const EditService = async(e)=>{
    e.preventDefault()
    WaitingAlerts()
    let bodyFormData = new FormData();
      const NewService = {Title: Title.current.value}
    await Axios.put(`${API_URL}/services/${ThisService.id}`,NewService,{
      headers: { Authorization: `Bearer ${ThisUser.jwt}` },
    })
      .then((res) => {
        setThisService(res.data)
        if (imgtmp) {
          bodyFormData.append("files", imgtmp[0]);
          bodyFormData.append("ref", "services");
          bodyFormData.append("refId", res.data.id);
          bodyFormData.append("field", "Thumbnail");
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
        SeccessAlert('Service modifié avec succès')
      })
      .catch((err) => {
        ErrorAlert('Une erreur s’est produite lors de la modification du service')
      });
      $(`#editServiceInfo${ThisService.id}`).modal('hide');
  }
  const RemoveService = ()=>{
    WaitingAlerts
   Axios.delete(`${API_URL}/services/${data.id}`, {
      headers: { Authorization: `Bearer ${ThisUser.jwt}` },
    })
      .then((res) => {
        $(`#DelServ${ThisService.id}`).modal("hide");
        SeccessAlert('Le service a été supprimé avec succès')
        onAction();
      })
      .catch((err) => {
      ErrorAlert('Une erreur s’est produite lors de la suppression du service')
      });
  }
  const GetPrice = ()=>{
    var Total = 0
    ThisService.Options.map( opt=>{
      Axios.get(`${API_URL}/Options/${opt.id}`).then( res=>{
       res.data.SousOptions.map(SousOpt=>{
         Total += Number(SousOpt.Price)
       })
       setPrice(Total);
     })
    })
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
              <span
                className="u-md-avatar bg-cover rounded-circle mr-3 mt-1"
                style={{
                  background: data.Thumbnail
                    ? `url(${API_URL + data.Thumbnail.url})`
                    : "url('/assets/img/misc/empty.png')",
                }}
              ></span>
              <div className="media-body d-flex justify-content-between my-auto">
                <div>
                  <span className="d-block text-muted-f font-weight-semi-bold pb-1">
                    {ThisService.Title}
                  </span>
                  <small className="d-block text-muted currency">
                    {Price}
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
                      <i className="fal fa-ellipsis-h"></i>
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="serviceOptionsMenu"
                    >
                      <a
                        className="dropdown-item"
                        href="#"
                        data-toggle="modal"
                        data-target={`#editServiceInfo${ThisService.id}`}
                      >
                        <i className="fal fa-edit pr-2"></i>Modification rapide
                      </a>
                      <Link
                        href="/bord/administration/services/modifier/[id]"
                        as={`/bord/administration/services/modifier/${ThisService.id}`}
                      >
                        <a className="dropdown-item my-2">
                          <i className="fal fa-cog pr-2"></i>Modifier
                        </a>
                      </Link>
                      <a
                        className="dropdown-item"
                        href="#"
                        data-toggle="modal"
                        data-target={`#DelServ${ThisService.id}`}
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
        id={`editServiceInfo${ThisService.id}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="editServiceInfo"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form className="modal-content" onSubmit={EditService}>
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
              <div className="form-group">
                <label
                  className="btn u-xl-avatar rounded bg-cover file-attachment-btn"
                  style={{
                    background :imgtmp ? `url(${URL.createObjectURL(imgtmp[0])})`:
                    data.Thumbnail
                      ? `url(${API_URL + data.Thumbnail.url})`:"url(/assets/img/misc/empty.png)"
                          }}
                  for={`service-img${ThisService.id}`}
                >
                  <input
                    id="service-img"
                    name="file-attachment"
                    type="file"
                    className="file-attachment-btn-label"
                    onChange={CheckImg}
                  />
                </label>
              </div>

              <input
                type="text"
                className="form-control form-control-sm text-muted my-3"
                id={`serviceName${ThisService.id}`}
                placeholder="Nom de service"
                defaultValue={ThisService.Title}
                ref={Title}
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
        id={`DelServ${ThisService.id}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="delMedia"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content bg-white">
            <div className="modal-body px-3">
              <div className="pt-5 text-center">
                <i className="fal fa-3x fa-trash-alt text-danger-f"></i>
                <h4 className="font-weight-bold mt-5 mb-3">
                  Supprimer le Service ?
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
                onClick={()=>{RemoveService()}}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modifier le service --> */}
    </React.Fragment>
  );
}
