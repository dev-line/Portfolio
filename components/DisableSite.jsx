import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function DisableSite() {
  return (
    <React.Fragment>
     <div className="vh-100 content-centered bg-flat">
        <div className="container">
            <div className="text-center">
                <h2 className="text-brand font-weight-bold display-lg-3">Site en construction.</h2>
                <h1 className="display-4 text-white font-weight-bold">Notre site est actuellement en maintenance.</h1>
                <p className="lead text-white-70">Nous serons de retour bientôt!</p>
            </div>
        </div>
    </div>
    </React.Fragment>
  );
}
