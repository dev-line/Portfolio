import React, { useState, useLayoutEffect } from "react";
import DASH from "../../../components/DASHBOARD";
import MediaContent from "../../../components/MediaContent";
import Axios from "axios";
import { parseCookies } from "nookies";
import FindingError from "../../../components/FindingError";
import Loading from "../../../components/Loading";
export default function media() {
  const  {API_URL} = process.env
  const ThisUser = parseCookies("auth");
  const [Files, setFiles] = useState([]);
  const [Status, setStatus] = useState("Loading");

  const GetMedia = async () => {
    await Axios.get(`${API_URL}/upload/files?mime_contains=image`)
      .then((res) => {
        console.log(res.data);
        setFiles(res.data);
        setStatus("Done");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (Files.length == 0) {
    if (Status !== "Done") {
      GetMedia();
    }
  }
  useLayoutEffect(() => {
    $(".MediaLink").addClass("active")
  }, [])
  return (
    <DASH title="Media">
      <div className="col-md-10">
        <div className="container spacer-70">
          <div className="row">
            {Status == 'Loading'?(
              <Loading/>
            ):(
              Files.length > 0
              ? Files.map((file) => {
                  return <MediaContent key={file.id} data={file} />;
                })
              : <FindingError/>
            )}
          </div>
        </div>
      </div>
    </DASH>
  );
}
