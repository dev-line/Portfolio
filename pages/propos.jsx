import React, { useLayoutEffect, useState } from 'react'
import VISITOR from "../components/VISITOR";
import ConatctSection from '../components/ConatctSection'
import Footer from '../components/Footer'
import Axios from 'axios';
import Loading from '../components/Loading';

const {API_URL} = process.env
export default function about() {
  const [Description, setDescription] = useState("")
  const [Status, setStatus] = useState('Loading')
  const GetAbout = ()=>{
    Axios.get(`${API_URL}/Informations`).then(res=>{
      setDescription(res.data.AboutMe)
    }).catch(err=>{
      console.log(err);
    })
    setStatus("Done")
  }
  if (Description == "") {
    if (Status == "Loading") {
      GetAbout()
    }
  }
  useLayoutEffect(() => {
    $(".ProposLink").addClass("active")
  }, [])
  return (
    <VISITOR title="À Propos">
       {/* <!-- ========== HERO ========== --> */}
        <div className="spacer-100 spacer-md-150">
            <div className="container text-light">
               {/* <!-- conatent here --> */}
               {Status == "Loading"?(
                 <Loading/>
               ):<div className="text-light" dangerouslySetInnerHTML={{ __html: Description }} />}
            </div>
        </div>
        {/* <!-- ========== CONTACT ========== --> */}
        <ConatctSection/>
          {/* <!-- ========== FOOTER ========== --> */}
         <Footer/>
        
    </VISITOR>
  )
}
