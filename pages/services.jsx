import React, { useState, useLayoutEffect, useEffect } from "react";
import VISITOR from "../components/VISITOR";
import ConatctSection from "../components/ConatctSection";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import FindingError from "../components/FindingError";
import Axios from "axios";
import ClacOptions from "../components/ClacOptions";
import MyServices from "../components/MyServices";

const { API_URL } = process.env;
export default function services() {
  const [Services, setServices] = useState([]);
  const [ThisPost, setThisPost] = useState({});
  const [Status, setStatus] = useState("Loading");
  const GetServices = async () => {
    await Axios.get(`${API_URL}/services`)
      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setStatus("Done");
  };
  if (Status == "Loading") {
    GetServices();
  }
  const ShowPost = (data) => {
    return setThisPost(data);
  };
  useEffect(() => {
    $(".ServicesLink").addClass("active");
  }, []);
  return (
    <VISITOR title=" Services">
      {/* <!-- Hero --> */}
      <div className="spacer-200" style={{height: `${80}vh`}}>
        {/* <!-- Cards Section --> */}
        <div className="container space-2">
          <div className="row mx-n2">
            {/* <!-- Card --> */}
            {Status == "Loading" ? (
              <Loading />
            ) : Services.length > 0 ? (
              Services.map((Projet) => {
                return (
                  <MyServices key={Projet.id} data={Projet} onShow={ShowPost} />
                );
              })
            ) : (
              <FindingError />
            )}
            {/* <!-- End Card --> */}
          </div>
        </div>
        {/* <!-- End Cards Section --> */}
      </div>
      {/* <!-- ========== CONTACT ========== --> */}
      <ConatctSection />
      {/* <!-- ========== FOOTER ========== --> */}
      <Footer />
      {/* <!-- Services Option --> */}
      <ClacOptions data={ThisPost} />
    </VISITOR>
  );
}
