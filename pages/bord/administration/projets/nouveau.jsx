import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import DASH from "../../../../components/DASHBOARD";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
const  {API_URL} = process.env;
import Axios from "axios";
import { parseCookies } from "nookies";
import { WaitingAlerts, SeccessAlert } from "../../../../components/Alerts";
import { useRouter } from "next/router";

const Editor = dynamic(import("@latticejs/froala-editor"),{ssr: false});

export default function newPost() {
  const router = useRouter()

  const Config = {
    language: "fr",
    placeholderText: "créer votre text",
    imageUpload: true,
    imageUploadURL: "http://localhost:1337/upload",
    //imageManagerLoadURL: 'http://localhost:1337/upload/files',
    events: {
      "image.beforeUpload": function (files) {
        var editor = this;
        if (files.length) {
          // Create a File Reader.
          var reader = new FileReader();
          // Set the reader to insert images when they are loaded.
          reader.onload = function (e) {
            var result = e.target.result;
            editor.image.insert(result, null, null, editor.image.get());
          };
          // Read image as base64.
          reader.readAsDataURL(files[0]);
        }
        editor.popups.hideAll();
        // Stop default upload chain.
        return false;
      },
    },
  };
  // States for Craetion Content
  const Title = useRef();
  const [imgtmp, setimgTmp] = useState();
  const [Thumbnail, SetThumbnail] = useState();
  const [isDraft, setIsDraft] = useState(false);
  const [content, setContent] = useState("");
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
    $('a[href^="https://www.froala.com/wysiwyg-editor?k=u"]').remove()
    $('a[href^="https://froala.com/wysiwyg-editor"]').attr("href","#")
    $(".flatpickr-input").addClass(
      "form-control form-control-sm font-size-1 text-muted-f rounded shadow-sm"
    );
    console.log(ThisUser);
  }, []);
  const ResetForm = () => {
    $("form")[0].reset();
    setContent("");
  };
  const handleCreatePost = async (e) => {
    e.preventDefault();
    WaitingAlerts()
    let bodyFormData = new FormData();
    const NewPost = {
      Title: Title.current.value.trim(),
      Content: content,
      Published: !isDraft,
    };
    console.log(NewPost);
    Axios.post(`${API_URL}/projects`, NewPost, {
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
        }
        SeccessAlert('Le projet a été ajouté avec succès')
        router.push('/bord/administration/projets')
      })
      .catch((err) => {
        ErrorAlert('Veuillez vérifier les données saisies')
      });
  };
  //Text Editor Config
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    uploader: {
      url: `${API_URL}/postes`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${ThisUser.jwt}`,
      },
      queryBuild: function (data) {
        return JSON.stringify(data);
      },
      contentType: function () {
        return "application/json";
      },
      buildData: function (data) {
        return { hello: "Hello world" };
      },
    },
    language: "ar",
  };
  const handleChange = (data) => {
    setContent(data);
  };
  useLayoutEffect(() => {
    $(".Projects").addClass("active")
    $(".Projects").trigger("click")
  }, [])
  return (
    <DASH title="Nouveau Projet">
      <form className="col-md-10" onSubmit={handleCreatePost}>
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
                    ref={Title}
                  />
                </div>
                <div className="mt-5 mb-0">
                  <h5 className="font-size-2 font-weight-bold text-muted-f mb-0">
                    Contenu de l'article
                  </h5>
                </div>
                {/* <!-- Content --> */}
                <Editor
                  config={Config}
                  model={content}
                  onModelChange={handleChange}
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
                            src={imgtmp ? `${URL.createObjectURL(imgtmp[0])}`:"/assets/img/person.jpg"}
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
                        />
                        <label
                          className="custom-control-label"
                          for="hidePost"
                          onChange={(e) => {
                            setIsDraft(e.target.checked);
                          }}
                        ></label>
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="list-unstyled d-flex">
                        <li>
                          <button
                            type="submit"
                            className="btn btn-block btn-sm btn-secondary-f font-weight-semi-bold text-white"
                          >
                            <i className="fal fa-file-alt pr-2"></i>Enregistrer
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="btn btn-block btn-sm btn-danger-f font-weight-semi-bold text-white ml-2"
                            onClick={() => {
                              ResetForm();
                            }}
                          >
                            <i className="fal fa-redo-alt pr-2"></i>
                            réinitialisation
                          </button>
                        </li>
                      </div>
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
