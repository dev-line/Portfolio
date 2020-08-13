import React, { useState, useRef, useLayoutEffect } from "react";
import DASH from "../../../components/DASHBOARD";
import Axios from "axios";
import { parseCookies } from "nookies";
import { SeccessAlert, ErrorAlert } from "../../../components/Alerts";
const { API_URL } = process.env;
export default function profile() {
  const ThisUser = parseCookies("auth");
  const [User, setUser] = useState();
  const [Status, setStatus] = useState("Loading");
  const Name = useRef()
  const UserName = useRef()
  const Email = useRef()
  const Password = useRef()
  const NewPassword = useRef()
  const ConfPassword = useRef()
  const GetUser = async () => {
    await Axios.get(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${ThisUser.jwt}` },
    })
      .then((res) => {
        setUser(res.data);
        setStatus("Done");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (!User) {
      if (Status !== 'Done') {
          GetUser()
      }
  }
  useLayoutEffect(() => {
    $(".ProfileLink").addClass("active")
  }, [])
  const UpdateUser = async (e)=>{
    e.preventDefault()
    const NewData = {email: Email.current.value.trim(), Name: Name.current.value.trim(), username: UserName.current.value.trim()}
    await Axios.put(`${API_URL}/users/${User.id}`,NewData, {
      headers: { Authorization: `Bearer ${ThisUser.jwt}` },
    })
      .then((res) => {
        setUser(res.data);
        SeccessAlert('Modifications enregistrées')
      })
      .catch((err) => {
        ErrorAlert('Veuillez vérifier les données saisies')
      });
  }
  const UpdatePassword = async(e)=>{
    e.preventDefault()
    if (NewPassword.current.value == ConfPassword.current.value && Password.current.value) {
			const Editing = await { password: Password.current.value }
		await Axios.post(`${API_URL}/auth/local`, {
			identifier : User.email,
			password   : Password.current.value,
		})
			.then(res => {
				Axios.put(`${API_URL}/users/${User.id}`, Editing, { headers: { Authorization: `Bearer ${ThisUser.jwt}` } })
					.then(res => {
						setUser(res.data)
            SeccessAlert('Mot de passe modifié')
            $('#addService').modal('hide');
					})
					.catch(err => {
            ErrorAlert('Veuillez vérifier les données saisies')
					})
			})
			.catch(err => {
        console.log(err);
				ErrorAlert('Le mot de passe est faux.')
      })
    }
  }
  return (
    <DASH title="profile">
      <div className="col-md-10">
        {User?(
           <form onSubmit={UpdateUser}>
           <div className="container spacer-70">
             <div className="mb-3">
               <h5 className="font-size-2 font-weight-bold text-muted-f mb-0">
                 Votre Profil
               </h5>
             </div>
             <div className="row justify-content-aroudnd">
               {/* <!--  --> */}
               <div className="col-12 col-md-10 mt-5 mt-lg-0 order-1 order-lg-0">
                 <div className="row">
                   <div className="col-12 col-md-6 mb-3">
                     {/* <!-- Name Input --> */}
                     <div className="form-group">
                       <label
                         className="form-control-label small text-muted-f font-weight-bold"
                         for="inputname"
                       >
                         Nom
                       </label>
                       <div className="input-group input-group-merge">
                         <div className="input-group-prepend">
                           <span className="input-group-text">
                             <i className="fal fa-user"></i>
                           </span>
                         </div>
                         <input
                           type="text"
                           className="form-control form-control-sm text-muted"
                           id="inputname"
                           placeholder="John Deo"
                           defaultValue={User.Name}
                           ref={Name}
                           required=""
                         />
                       </div>
                     </div>
                   </div>
                   <div className="col-12 col-md-6 mb-3">
                     {/* <!-- UserName Input --> */}
                     <div className="form-group">
                       <label
                         className="form-control-label small text-muted-f font-weight-bold"
                         for="inputUsername"
                       >
                         Nom d'utilisateur
                       </label>
                       <div className="input-group input-group-merge">
                         <div className="input-group-prepend">
                           <span className="input-group-text">
                             <i className="fal fa-user"></i>
                           </span>
                         </div>
                         <input
                           type="text"
                           className="form-control form-control-sm text-muted"
                           id="inputUsername"
                           placeholder="John Deo"
                           defaultValue={User.username}
                           ref={UserName}
                           required=""
                         />
                       </div>
                     </div>
                   </div>
                   <div className="col-12 col-md-6 mb-3">
                     {/* <!-- Email Input --> */}
                     <div className="form-group">
                       <label
                         className="form-control-label small text-muted-f font-weight-bold"
                         for="inputEmail"
                       >
                         Adresse E-mail
                       </label>
                       <div className="input-group input-group-merge">
                         <div className="input-group-prepend">
                           <span className="input-group-text">
                             <i className="fal fa-envelope"></i>
                           </span>
                         </div>
                         <input
                           type="email"
                           className="form-control form-control-sm text-muted"
                           id="inputEmail"
                           placeholder="name@example.com"
                           defaultValue={User.email}
                           ref={Email}
                           required=""
                         />
                       </div>
                     </div>
                   </div>
                   <div className="col-12 col-md-6 mb-3">
                     {/* <!-- Password Input --> */}
                     <div className="form-group">
                       <label
                         className="form-control-label small text-muted-f font-weight-bold"
                         for="inputPassword"
                       >
                         Mot de passe
                       </label>
                       <div className="input-group input-group-merge">
                         <div className="input-group-prepend">
                           <span className="input-group-text">
                             <i className="fal fa-key"></i>
                           </span>
                         </div>
                         <input
                           type="button"
                           className="form-control form-control-sm text-muted"
                           id="inputPassword"
                           value="Modifier votre mot de passe"
                           data-toggle="modal"
                           data-target="#addService"
                           required=""
                         />
                       </div>
                     </div>
                   </div>
                 </div>
 
                 <button
                   type="submit"
                   className="btn btn-sm btn-wide btn-secondary-f text-white"
                 >
                   Sauvegarder les modifications
                 </button>
               </div>
               {/* <!--  --> */}
             </div>
           </div>
         </form> 
        ):'Loading'}
        {/* <!-- Ajouter une Service --> */}
        <div
            className="modal fade"
            id="addService"
            tabindex="-1"
            role="dialog"
            aria-labelledby="addService"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <form className="modal-content" onSubmit={UpdatePassword}>
                <div className="modal-header border-0">
                  <h5
                    className="modal-title font-weight-semi-bold"
                    id="editService"
                  >
                    Changement de mote de passe
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <input
                    type="password"
                    className="form-control form-control-sm text-muted my-3"
                    id="serviceName"
                    placeholder="Votre mote de passe"
                    ref={Password}
                    required
                  />
                  <input
                    type="password"
                    className="form-control form-control-sm text-muted my-3"
                    id="serviceName"
                    placeholder="Nouveau mote de passe"
                    ref={NewPassword}
                    required
                  />
                  <input
                    type="password"
                    className="form-control form-control-sm text-muted my-3"
                    id="serviceName"
                    placeholder="Confirmé mote de passe"
                    ref={ConfPassword}
                    required
                  />
                </div>
                <div className="modal-footer border-0">
                  <button
                    type="button"
                    className="btn btn-sm text-muted font-weight-semi-bold"
                    data-dismiss="modal"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sm btn-secondary-f text-white"
                  >
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>
      </div>

    </DASH>
  );
}
