import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import DASH from "../../../../../components/DASHBOARD";
const  {API_URL} = process.env
import Axios from "axios";
import { useRouter, Router } from 'next/router'
import { parseCookies } from "nookies";
import { WaitingAlerts, ErrorAlert, SeccessAlert } from "../../../../../components/Alerts";

dynamic(import("jodit"), { ssr: false });
const JoditEditor = dynamic(import("jodit-react"), { ssr: false });
export default function newPost() {
  const router = useRouter()

  
  // States for Craetion Content
  const [Project, setProject] = useState({})
  const editor = useRef();
  const Title = useRef();
  const [imgtmp, setimgTmp] = useState();
  const [Thumbnail, SetThumbnail] = useState({url: null});
  const [CurrentTitle, setCurrentTitle] = useState()
  const [isDraft, setIsDraft] = useState(false);
  var content = Project.id? Project.Content:""
  //UserInfo
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
    setCurrentTitle(Project.Title)
    content = Project.Content
    SetThumbnail(Project.Thumbnail)
    setIsDraft(!Project.Published)
  }, [Project]);
  const ResetForm = () => {
    $("form")[0].reset();
    setContent("");
  };
  const GetProject = async () => {
		const { id } = await router.query

		if (ThisUser.jwt) {
      if (id) {
        const res = await Axios.get(`${API_URL}/projects/${id}`, {
          headers : { Authorization: `Bearer ${ThisUser.jwt}` },
        })
        const CurrentProject = await res.data
        return await setProject(CurrentProject)
      }
		} else {
			router.push('/login')
		}
	}
  const handleSubmit = async (e) => {
    e.preventDefault();
    WaitingAlerts()
    const { id } = await router.query
    let bodyFormData = new FormData();
    const NewPost = {
      Title: Title.current.value.trim(),
      Content: content,
      Published: !isDraft,
    };
await Axios.put(`${API_URL}/projects/${id}`, NewPost, {
      headers: { Authorization: `Bearer ${ThisUser.jwt}` },
    })
      .then((res) => {
        if (imgtmp) {
          bodyFormData.append("files", imgtmp[0]);
          bodyFormData.append("ref", "projects");
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
        }else{
          console.log(res);
        }
        SeccessAlert('Le projet a été modifié avec succès')
        router.push('/bord/administration/projets')
      })
      .catch((err) => {
        ErrorAlert('Veuillez vérifier les données saisies')
      });
  };
  const config = {
    readonly: false,
    language: "fr",
    uploader: {
      insertImageAsBase64URI: true,
      imagesExtensions: ["jpg", "png", "jpeg", "gif"],
    },
  };
  const handleChange = (value) => {
    content = value
  };
  if (!Project.id) {
		GetProject()
	}
  return (
    <DASH title={`Modifier - ${Project.Title}`}>
      <form className="col-md-10" onSubmit={handleSubmit}>
        <div className="container spacer-70">
          <div className="mb-0">
            <h5 className="font-size-2 font-weight-bold text-muted-f mb-0">
              Le titre de l'article
            </h5>
          </div>
          <div className="row justify-content-between mt-n3">
            <div className="col-12 col-md-8">
              <div className="mt-5 mb-0 mb-md-3">
                <div className="input-group input-group-merge">
                  <input
                    type="text"
                    className="form-control form-control-lg font-size-1 text-muted-f border-0 rounded-lg shadow"
                    id="Ds-articleTitle"
                    placeholder="ajouter un titre"
                    defaultValue={CurrentTitle}
                    ref={Title}
                  />
                </div>
                <div className="mt-5 mb-0">
                  <h5 className="font-size-2 font-weight-bold text-muted-f mb-3">
                    Contenu de l'article
                  </h5>
                </div>
                {/* <!-- Content --> */}
                <JoditEditor
                  value={Project.id? Project.Content: ""}
                  onBlur={handleChange}
                  config={config}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="sticky-top mt-5 mb-3">
                <div className="card border-0 rounded-lg shadow-sm">
                  <div className="card-body">
                    <div className="mb-4">
                      <div className="mb-2">
                        <h6 className="small test-muted-f font-weight-bold mb-0">
                          Image de l'article
                        </h6>
                      </div>

                      <label
                        className="form-control form-control-sm font-size-1 text-muted-f rounded shadow-sm file-attachment-btn"
                        for="article-img"
                      >
                        <div className="media mt-n1">
                          <img
                            src={imgtmp ? `${URL.createObjectURL(imgtmp[0])}`:Thumbnail?`${API_URL + Thumbnail.url}`: "/assets/img/person.jpg"}
                            className="u-sm-avatar rounded"
                            alt="..."
                          />
                          <div className="media-body my-auto pl-2 text-left">
                            <h5 className="small text-muted-f font-weight-bold mb-0">
                              Ajouter une image
                            </h5>
                          </div>
                        </div>
                        <input
                          id="article-img"
                          name="file-attachment"
                          type="file"
                          className="file-attachment-btn-label"
                          onChange={CheckImg}
                        />
                      </label>
                    </div>

                    <div className="mb-4">
                      <div className="mb-2">
                        <h6 className="small text-muted-f font-weight-bold mb-0">
                          Cacher l'article
                        </h6>
                      </div>
                      <span className="custom-control custom-switch mr-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="hidePost"
                          checked={isDraft}
                          onChange={(e) => {
                            setIsDraft(e.target.checked);
                          }}
                        />
                        <label
                          className="custom-control-label"
                          for="hidePost"
                                                  ></label>
                      </span>
                    </div>

                    <div className="mb-4">
                      <ul className="list-unstyled d-flex">
                        <li>
                          <button
                            type="submit"
                            className="btn btn-wide btn-sm btn-secondary-f font-weight-semi-bold text-white"
                          >
                            <i className="fal fa-file-alt pr-2"></i>Enregistrer
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="btn btn-wide btn-sm btn-danger-f font-weight-semi-bold text-white ml-2"
                            onClick={() => {
                              ResetForm();
                            }}
                          >
                            <i className="fal fa-redo-alt pr-2"></i>
                            réinitialisation
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </DASH>
  );
}
