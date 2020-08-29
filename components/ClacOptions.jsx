import React, { useEffect, useRef, useState } from "react";
import MyOptions from "./MyOptions";
import FindingError from "./FindingError";
import Invoice from "./Invoice";
import Axios from "axios";
import { ErrorAlert, SeccessAlert } from "../components/Alerts";

const API_URL = process.env.API_URL;
export default function ClacOptions({ data }) {
  const [Price, setPrice] = useState(0);
  const [ItemsList, setItemsList] = useState([]);
  const [MyEmail, setMyEmail] = useState("")
  const Email = useRef()
  const FullName = useRef()
  const PhoneNumber = useRef()

  const Calc = () => {
    var Total = 0;
    ItemsList.map((item) => {
      item?Total += item.Price:null
    });
    setPrice(Total);
  };
  const AddToList = (data) => {
    ItemsList.indexOf(data) ? setItemsList([...ItemsList, data]) : null;
  };
  const RemoveItem = (data) => {
    setItemsList(ItemsList.filter((itm) => itm.id != data.id));
  };
  const AddOption = (data)=>{
    setItemsList([...new Set([...ItemsList, ...data])])
  }
  const RemoveOption = (data)=>{
    const List = ItemsList.map((item,index)=>{
      if (data[index] != item) {
        return item
      }
    })
    setItemsList(List.filter(itm=>itm!=undefined))
  }
  const GetMyEmail = ()=>{
    Axios.get(`${API_URL}/Informations`).then(res=>{
      setMyEmail(res.data.Email)
    }).catch(err=>{
      console.log(err);
    })
  }
  const SendRequest = async (e) => {
    e.preventDefault();
    const Msg = {
      from: Email.current.value.trim(),
      to: MyEmail,
      subject: "Nouveau Commande",
      html: Invoice(ItemsList, Price, {From: Email.current.value.trim(), Name:FullName.current.value.trim(), PhoneNumber: PhoneNumber.current.value.trim()})
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
  useEffect(() => {
    GetMyEmail()
  }, [])

  useEffect(() => {
    Calc();
  }, [ItemsList]);
  return (
    <React.Fragment>
      <div
        className="modal fade"
        id="serviceOptions"
        tabindex="-1"
        role="dialog"
        aria-labelledby="serviceOptionsLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                type="button"
                className="close text-white"
                data-dismiss="modal"
                aria-label="Close"
              >
                <svg
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 16 16"
                  className="bi bi-x"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="btn-group-toggle w-100" data-toggle="buttons">
                <div className="container spacer-20">
                  <div className="row">
                    {data.length > 0 ? (
                      data.map((Projet) => {
                        return (
                          <MyOptions
                            key={Projet.id}
                            data={Projet}
                            onCheck={AddToList}
                            Remove={RemoveItem}
                            AddOption={AddOption}
                            RemoveOption={RemoveOption}
                          />
                        );
                      })
                    ) : (
                      <FindingError />
                    )}
                  </div>
                </div>
              </div>

              {/* <!-- Total --> */}
              <div className="position-fixed bottom-0 right-0 w-100 w-lg-40 text-center">
                <div className="d-flex">
                  <div className="spacer-10 bg-primary p-3 my-auto w-50">
                    <h6 className="font-size-2 mb-0 font-weight-bold text-white">
                      Total :
                      <span className="currency pl-2 font-size-1">{Price}</span>
                    </h6>
                  </div>
                  <button
                    type="button"
                    className="btn btn-success rounded-0 font-size-2 mb-0 font-weight-bold text-white w-50"
                    data-toggle="modal"
                    data-target="#order"
                    disabled={Price?false:true}
                  >
                    Commandez
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Order --> */}
      <div
        className="modal fade"
        id="order"
        tabindex="-1"
        role="dialog"
        aria-labelledby="orderLabel"
        aria-hidden="true"
      >
        <form
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          role="document" onSubmit={SendRequest}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-white" id="orderLabel">
                Commandez maintenant
              </h5>
              <button
                type="button"
                className="close text-white-f"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="mt-4">
                {/* <!-- Name --> */}
                <div className="form-group">
                  <label className="form-control-label font-size-1 text-white-70">
                    Nom complet<span className="text-danger-f pl-1">*</span>
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
                      ref={FullName}
                      required
                    />
                  </div>
                </div>
                {/* <!-- Phone --> */}
                <div className="form-group">
                  <label className="form-control-label font-size-1 text-white-70">
                    Numéro de téléphone
                    <span className="text-danger-f pl-1">*</span>
                  </label>
                  <div className="input-group input-group-merge">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-telephone"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3.925 1.745a.636.636 0 0 0-.951-.059l-.97.97c-.453.453-.62 1.095-.421 1.658A16.47 16.47 0 0 0 5.49 10.51a16.471 16.471 0 0 0 6.196 3.907c.563.198 1.205.032 1.658-.421l.97-.97a.636.636 0 0 0-.06-.951l-2.162-1.682a.636.636 0 0 0-.544-.115l-2.052.513a1.636 1.636 0 0 1-1.554-.43L5.64 8.058a1.636 1.636 0 0 1-.43-1.554l.513-2.052a.636.636 0 0 0-.115-.544L3.925 1.745zM2.267.98a1.636 1.636 0 0 1 2.448.153l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.47 17.47 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969z"
                          />
                        </svg>
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control form-control-sm text-muted"
                      id="input-phone"
                      placeholder="123456789"
                      ref={PhoneNumber}
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
                      ref={Email}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-sm text-white"
                data-dismiss="modal"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="btn btn-sm btn-secondary-f text-white"
              >
                <i className="fas fa-shopping-bag pr-1"></i>Commandez
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
