import React, { useEffect, useLayoutEffect, useState } from "react";
import MesProjets from "../components/MesProjets";
import ProjetCotenu from "../components/ProjetCotenu";
import ConatctSection from "../components/ConatctSection";
import VISITOR from "../components/VISITOR";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import FindingError from '../components/FindingError'
import Axios from "axios";
import Link from "next/link";
const {API_URL} = process.env
export default function index() {
  const [Projects, setProjects] = useState([]);
  const [ThisPost, setThisPost] = useState({})
  const [Status, setStatus] = useState("Loading");
  const [Infos, setInfos] = useState();
  const GetProjects = async () => {
    await Axios.get(`${ API_URL }/projects?Published=${true}&_limit=3&_sort=title:desc`).then((res) => {
      setProjects(res.data);
    }).catch(err=>{
        console.log(err);
    })
    setStatus("Done")
  };
  const GetInfos = ()=>{
    Axios.get(`${API_URL}/settings`).then((res=>{
      setInfos(res.data)
    })).catch(err=>{
      console.log(err);
    })
  }
  useEffect(() => {
    GetInfos()
    $(".HomeLink").addClass("active")
  }, [])
  if (Status == "Loading") {
    GetProjects()
    }
    const ShowPost = (data)=>{
      return setThisPost(data)
    }
  return (
    <VISITOR>
      {/* <!-- ========== HERO ========== --> */}
        <div className="vh-100 content-centered bg-cover" style={{background: Infos? `url(${Infos.HomeBg?API_URL + Infos.HomeBg.url:""})`:""}}>
          <div className="hero"></div>
            <div className="container">
               <div className="hero-content text-left">
                <h2 className="text-white font-weight-bold w-100 w-lg-60" data-aos="fade-right">{Infos?Infos.HomeTitle:""}</h2>
                <span className="text-white pt-0 pb-5 pt-md-4 pb-md-7 d-block w-100 w-md-65 w-lg-50" data-aos="fade-left">{Infos?Infos.HomeSubTitle:""}</span>
                    <div data-aos="fade-up">
                      <Link href="#wrk">
                      <button type="button" className="btn btn-lg text-white d-flex">
                        <span>check My work</span>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"/>
                            <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"/>
                        </svg>
                      </button>
                      </Link>
                    </div>
               </div>
            </div>
        </div>
        {/* <!-- ========== CONTENT ========== --> */}
        <section className="container spacer-50 spacer-lg-100 work" id="wrk">
           {/* <!-- Title --> */}
          <div className="d-flex justify-content-between mb-7" data-aos="fade-down-right">
            <h2 className="text-white mb-0">Mes Projets</h2>
            <p className="d-block font-weight-bold my-auto">
              <Link href='projets'>
              <a className="link-light">Voir tous les projets<i className="fas fa-chevron-right pl-2"></i></a>
              </Link>
            </p>
          </div>
          {/* <!-- End Title --> */}
          <div className="row text-center" data-aos="zoom-in">
            {Status == 'Loading'?<Loading/>:(
              Projects.length>0?(
                Projects.map(Projet=>{
                  return <MesProjets key={Projet.id} data={Projet} onShow={ShowPost} /> 
                })
              ):<FindingError/>
            )} 
          </div>
        </section>
        {/* <!-- ========== CONTACT ========== --> */}
        <ConatctSection/>
          {/* <!-- ========== FOOTER ========== --> */}
         <Footer/>
        {/* <!-- ========== WORK DETAILS ========== --> */}
<ProjetCotenu data={ThisPost}/>
    </VISITOR>
  );
}
