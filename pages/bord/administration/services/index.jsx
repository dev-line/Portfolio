import React,{useState, useRef, useLayoutEffect} from "react";
import DASH from "../../../../components/DASHBOARD";
import GérerLesServices from "../../../../components/GérerLesServices";
import Axios from "axios";
const  {API_URL} = process.env
import { parseCookies } from "nookies";
import { WaitingAlerts, SeccessAlert, ErrorAlert } from "../../../../components/Alerts";
import FindingError from "../../../../components/FindingError";
import Loading from "../../../../components/Loading";

export default function Services() {
  const [ServicesList, setServicesList] = useState([])
  const [Status, setStatus] = useState("Loading")
  const [imgtmp, setimgTmp] = useState();
  const [Thumbnail, SetThumbnail] = useState();
  const Title = useRef()
  const ThisUser = parseCookies("auth");

  const GetServices = async()=>{
    await Axios.get(`${API_URL}/services`).then(res=>{setServicesList(res.data)}).catch(err=>{console.log(err)})
    setStatus("Done")
  }
  if (ServicesList.length == 0) {
    if (Status == 'Loading') {
      GetServices()
    }
  }
  const CheckImg = (e) => {
    const ImgsExt = ["png", "jpg", "svg"];
    const imgPart = e.target.value.split(".");
    const Ext = imgPart[imgPart.length - 1];
    ImgsExt.indexOf(Ext) >= 0
      ? (setimgTmp(e.target.files), true)
      : (setimgTmp(null), false);
  };

  const AddService = async(e)=>{
    e.preventDefault()
    $('#addService').modal('hide');
    WaitingAlerts()
    let bodyFormData = new FormData();
    const NewService = {Title: Title.current.value}
    await Axios.post(`${API_URL}/services`,NewService,{
      headers: { Authorization: `Bearer ${ThisUser.jwt}` },
    })
      .then((res) => {
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
            .catch((err) => {
              console.error(err);
            });
        }
        SeccessAlert('Le service a été ajouté avec succès')
      })
      .catch((err) => {
        ErrorAlert('Veuillez vérifier les données saisies')
      });
      GetServices()
      $("form")[0].reset();
      $('#addService').modal('hide');

  }
  const refreshList=()=>{
    GetServices()
  }
  useLayoutEffect(() => {
    $(".ServicesLink").addClass("active")
  }, [])
  return (
    <DASH title="Services">
      <div className="col-md-10">
        <div>
          <div className="container spacer-70">
            <div className="row">
                {Status == "Loading"?<Loading/>:(
                  ServicesList.length > 0 ? ServicesList.map(Service=>{
                    return <GérerLesServices key={Service.id} data={Service} onAction={refreshList} />
                  }):<FindingError/>
                )}
            </div>
            <div className="position-fixed bottom-0 right-0 w-100 w-md-15 text-center">
              <button
                type="button"
                className="btn btn-light w-100 spacer-10 shadow-sm bg-white py-3"
                data-toggle="modal"
                data-target="#addService"
              >
                <h6 className="font-size-2 mb-0 font-weight-bold text-muted-f">
                  Ajouter une Service
                </h6>
              </button>
            </div>
          </div>
          {/* <!-- Ajouter une Service --> */}
          <div
            className="modal fade"
            id="addService"
            tabindex="-1"
            role="dialog"
            aria-labelledby="addService"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <form className="modal-content" onSubmit={AddService}>
                <div className="modal-header border-0">
                  <h5
                    className="modal-title font-weight-semi-bold"
                    id="editService"
                  >
                    Ajouter une Service
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
                      style={{ background: imgtmp ? `url(${URL.createObjectURL(imgtmp[0])})`:"url(/assets/img/misc/empty.png)" }}
                      for="service-img"
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
                    id="serviceName"
                    placeholder="Nom de service"
                    ref={Title}
                    required
                  />
                  
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
                    type="submit"
                    className="btn btn-sm btn-secondary-f text-white"
                  >
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </DASH>
  );
}
