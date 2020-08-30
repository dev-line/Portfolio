import React, { useState, useRef } from "react";
import DASH from "../../../../../../components/DASHBOARD";
import GérerLesSousOptions from "../../../../../../components/GérerLesSous-Option";
import Axios from "axios";
const { API_URL } = process.env;
import { useRouter, Router } from "next/router";
import { parseCookies } from "nookies";
import { ErrorAlert, SeccessAlert, WaitingAlerts } from "../../../../../../components/Alerts";
import Loading from "../../../../../../components/Loading";
import FindingError from "../../../../../../components/FindingError";
export default function EditOption() {
  const router = useRouter();
  const ThisUser = parseCookies("auth");
  const [Status, setStatus] = useState("Loading");
  const [Options, setOptions] = useState([]);
  const Name = useRef();
  const Price = useRef();
  const [Title, setTitle] = useState('')
  const GetOptions = async () => {
    const { id } = await router.query;
    if (id) {
      await Axios.get(`${API_URL}/options/${id}`)
        .then((res) => {
          setOptions(res.data.SousOptions);
          setTitle(res.data.Name)
        })
        .catch((err) => {
          console.log(err);
        });
      setStatus("Done");
    }
  };
  const AddOption = async (e) => {
    e.preventDefault();
    WaitingAlerts()
    const { id } = await router.query;
    const NewOption = {
      Name: Name.current.value,
      Price: Price.current.value,
      Option: id
    };
    console.log(NewOption);
    await Axios.post(`${API_URL}/Sous-Options`, NewOption, {
      headers: { Authorization: `Bearer ${ThisUser.jwt}` },
    })
      .then((res) => {
        setOptions([...Options, res.data]);
        SeccessAlert("L'option a été ajouté avec succès")
      })
      .catch((err) => {
        ErrorAlert("Veuillez vérifier les données saisies");
      });
    $("form")[0].reset();
    $("#addOption").modal("hide");
  };
  const RefrechList = () => {
    GetOptions();
  };
  if (Options.length == 0) {
    if (Status == "Loading") {
      GetOptions();
    }
  }
  return (
    <DASH title={`${Title} Option`}>
      <div className="col-md-10">
        <div className="container spacer-70">
          <div className="row">
            {Status == "Loading"?<Loading/>:(
              Options.length > 0
              ? Options.map((option) => {
                  return (
                    <GérerLesSousOptions
                      key={option.id}
                      data={option}
                      onAction={RefrechList}
                    />
                  );
                })
              : <FindingError/>
            )}
          </div>
          <div className="position-fixed bottom-0 right-0 w-100 w-md-15 text-center">
            <button
              type="button"
              className="btn btn-light w-100 spacer-10 shadow-sm bg-white py-3"
              data-toggle="modal"
              data-target="#addOption"
            >
              <h6 className="font-size-2 mb-0 font-weight-bold text-muted-f">
                Ajouter une sous-option
              </h6>
            </button>
          </div>
        </div>
        {/* <!-- Ajouter une option --> */}
        <div
          className="modal fade"
          id="addOption"
          tabindex="-1"
          role="dialog"
          aria-labelledby="addOption"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <form className="modal-content" onSubmit={AddOption}>
              <div className="modal-header border-0">
                <h5
                  className="modal-title font-weight-semi-bold"
                  id="editService"
                >
                  Ajouter une Option
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
                  ref={Name}
                />
                <input
                  type="number"
                  className="form-control form-control-sm text-muted"
                  id="servicePrice"
                  placeholder="Prix d'option"
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
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DASH>
  );
}
