import React, { useState, useLayoutEffect } from "react";
import DASH from "../../../../components/DASHBOARD";
import GérerLesProjets from "../../../../components/GérerLesProjets";
import Axios from "axios";
import Loading from "../../../../components/Loading";
import FindingError from "../../../../components/FindingError";
const  {API_URL} = process.env
export default function posts() {
  const [Projects, setProjects] = useState([]);
  const [Status, setStatus] = useState("Loading");
  const GetProjects = async () => {
    await Axios.get(`${ API_URL }/projects?Published=${true}`).then((res) => {
      setProjects(res.data);
    }).catch(err=>{
        console.log(err);
    })
    setStatus("Done")
  };
  if (Status == "Loading") {
    GetProjects()
    }
    const RefreshList = ()=>{
      GetProjects()
    }
    useLayoutEffect(() => {
      $(".Projects").addClass("active")
      $(".Projects").trigger("click")
    }, [])
  return (
    <DASH title="Projets">
      <div className="col-md-10">
        <div className="container spacer-70">
        {Status == 'Loading'?<Loading/>:(
          Projects.length>0?(
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Titre</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
                         
                  {Projects.map(project=>{
                    return <GérerLesProjets key={project.id} data={project} onAction={RefreshList} />
                  })}
              
            </tbody>
          </table>
          ):<FindingError/>)}
        </div>
      </div>
    </DASH>
  );
}
