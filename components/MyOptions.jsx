import React, { useEffect, useState } from "react";

import Axios from "axios";

const { API_URL } = process.env;
export default function MyOptions({ data, onCheck, Remove, AddOption, RemoveOption }) {
  const [Check, setCheck] = useState(false);
  const [Price, setPrice] = useState(0);
  const [AllOptions, setAllOptions] = useState([]);
  const [Boxes, setBoxes] = useState([]);
  const UpdateList = () => {
    if (!Check) {
      setBoxes(Boxes.flatMap(x=>[true]));
      AddOption(AllOptions)
    } else {
      setBoxes(Boxes.flatMap(x=>[false]));
      RemoveOption(AllOptions)
    }
    setCheck(!Check);
  };
  const GetOptions = () => {
    Axios.get(`${API_URL}/Options/${data.id}`)
      .then((res) => {
        setAllOptions(res.data.SousOptions);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const GetPrice = () => {
    var Total = 0;
    AllOptions.map((data) => {
      Total += data.Price;
    });
    setPrice(Total);
    setBoxes(Array.from({ length: AllOptions.length }, () => false));
  };

  const UpdateCheking = (index, value) => {
    var List = Boxes;
    const NewList = List.map((item, key) => {
      const price = value;
      if (key == index) {
        return (item = !item);
      } else {
        return item;
      }
    });
    setBoxes(NewList);
  };
 
  useEffect(() => {
    GetOptions();
  }, []);
  useEffect(() => {
    GetPrice();
  }, [AllOptions]);

  useEffect(() => {
    if (Boxes.indexOf(false) < 0) {
      setCheck(true);
    } else if (Boxes.indexOf(false) >= 0) {
      setCheck(false);
    }

  }, [Boxes]);

  return (
    <div className="col-sm-6 col-md-4 px-2 mb-5">
      <div className="card card-frame shadow-none h-100">
        <a
          href="#"
          className={`op-list btn card-body ${Check ? "active" : ""}`}
          onClick={() => {
            UpdateList();
          }}
        >
          <div className="media">
            <div className="media-body d-flex justify-content-between my-auto">
              <div>
                <span className="d-block text-white font-weight-semi-bold">
                  {data.Name}
                </span>
                <small className="d-block smaller text-white-50 text-left currency">
                  {Price}
                </small>
              </div>

              <div className="d-flex">
                {AllOptions.length > 0 ? (
                  <button
                    type="button"
                    className="btn btn-xs btn-white card-btn collapsed clpsd"
                    data-toggle="collapse"
                    data-target={`#MenuCollapseSubOption${data.id}`}
                    aria-expanded="false"
                    aria-controls={`MenuCollapseSubOption${data.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <span className="card-btn-toggle">
                      <span className="card-btn-toggle-default">
                        <i className="fal fa-plus"></i>
                      </span>
                      <span className="card-btn-toggle-active">
                        <i className="fal fa-minus"></i>
                      </span>
                    </span>
                  </button>
                ) : (
                  ""
                )}
                <div className="custom-control custom-checkbox cs-cbox my-auto ml-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="op-list1"
                    checked={Check}
                  />
                  <label
                    className="custom-control-label"
                    for="op-list1"
                  ></label>
                </div>
              </div>
            </div>
          </div>
          <div id="MenuAccordion">
            <div className="card" role="tablist">
              <div
                className="card-header card-collapse rounded"
                id="MenuSubOption"
              >
                <div className="mb-0">
                  <div
                    id={`MenuCollapseSubOption${data.id}`}
                    className="position-absolute w-100 left-0 mt-3 collapse z-index-1050"
                    aria-labelledby="MenuSubOption"
                    data-parent="#MenuAccordion"
                    data-toggle="buttons"
                  >
                    <div className="card-body">
                      <nav
                        className="list-group bg-white rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {AllOptions.map((option, index) => {
                          return (
                            <li className="list-group-item" key={index}>
                              <label
                                className="position-absolute w-100 h-100 top-0 left-0 mb-0 z-index-1050"
                                for={option.Name + index}
                              ></label>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  id={option.Name + index}
                                  className="custom-control-input"
                                  checked={Boxes[index]}
                                  onChange={(e) => {
                                    UpdateCheking(index, option.Price);
                                    e.currentTarget.checked?onCheck(option):Remove(option)
                                  }}
                                />
                                <label className="custom-control-label d-flex justify-content-between">
                                  <span>{option.Name}</span>
                                  <span className="currency text-muted">
                                    {option.Price}
                                  </span>
                                </label>
                              </div>
                            </li>
                          );
                        })}
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
