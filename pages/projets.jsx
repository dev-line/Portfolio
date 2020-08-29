import React,{useState, useLayoutEffect} from 'react'
import VISITOR from "../components/VISITOR";
import ProjetCotenu from '../components/ProjetCotenu'
import MesProjets from '../components/MesProjets'
import ConatctSection from '../components/ConatctSection'
import Footer from '../components/Footer'
import Loading from "../components/Loading";
import FindingError from '../components/FindingError'
import Axios from "axios";
const {API_URL} = process.env
export default function projects() {
  const [Projects, setProjects] = useState([]);
  const [ThisPost, setThisPost] = useState({})
  const [Status, setStatus] = useState("Loading");
  const GetProjects = async () => {
    await Axios.get(`${ API_URL }/projects?Published=${true}&_sort=title:desc`).then((res) => {
      setProjects(res.data);
    }).catch(err=>{
        console.log(err);
    })
    setStatus("Done")
  };
  if (Status == "Loading") {
    GetProjects()
    }
    const ShowPost = (data)=>{
      return setThisPost(data)
    }
    useLayoutEffect(() => {
      $(".ProjectsLink").addClass("active")
    }, [])
  return (
    <VISITOR title=" Projets">
      {/* <!-- ========== HERO ========== --> */}
        <div className="spacer-100 spacer-lg-200 content-centered work">
            <div className="container">
              <div className="row">
              {Status == 'Loading'?<Loading/>:(
              Projects.length>0?(
                Projects.map(Projet=>{
                  return <MesProjets key={Projet.id} data={Projet} onShow={ShowPost} /> 
                })
              ):<FindingError/>
            )} 
              </div>
            </div>
        </div>
        {/* <!-- ========== CONTACT ========== --> */}
         <ConatctSection/>
          {/* <!-- ========== FOOTER ========== --> */}
         <Footer/>
    
          {/* <!-- ========== WORK DETAILS ========== --> */}
          <ProjetCotenu data={ThisPost}/>
    </VISITOR>
  )
}
