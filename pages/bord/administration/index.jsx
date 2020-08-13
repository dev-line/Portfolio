import React, { useLayoutEffect } from "react";
import DASH from "../../../components/DASHBOARD";

export default function index() {
  useLayoutEffect(() => {
    $(".HomeLink").addClass("active")
  }, [])
  return (
    <DASH title="Accueil">
      <div className="col-md-10">
        <div className="container vh-100 content-centered">
          <div className="d-lg-flex flex-lg-column w-100">
            <div className="d-block">
              <div className="w-md-75 w-lg-50 mx-auto">
                <img
                  className="img-fluid"
                  src="/assets/img/svg/creative_team.svg"
                  alt="Image Description"
                />
              </div>
              <div className="w-md-75 mx-auto mt-5 text-center">
                <h2>
                  Do it better, fancy &amp; modern with
                  <a
                    href="https://linktr.ee/hax.codes"
                    target="_blank"
                    className="text-secondary-f"
                  >
                    Hax Codes<span>&trade;</span>.
                  </a>
                </h2>
                <p className="w-100 w-md-65 mx-auto font-size-2 mb-0">
                  We provide content-oriented, clean, modular and mobile-first
                  design, which you can easily customize.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DASH>
  );
}
