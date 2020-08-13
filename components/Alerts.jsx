import Swal from 'sweetalert2'

export function SeccessAlert(MSG) {
  return (
    Swal.fire({
      icon: 'success',
      title: MSG,
      showConfirmButton: false,
      timer: 1500
    })
  )
}
export function ErrorAlert(MSG) {
  return (
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: MSG,
      })
  )
}

export function WaitingAlerts() {
  return (
    Swal.fire({
      title: 'Vellier patienter',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    }) 

  )
}

// WaitingAlerts()
// SeccessAlert('Le projet a été ajouté avec succès')
// ErrorAlert('Veuillez vérifier les données saisies')
