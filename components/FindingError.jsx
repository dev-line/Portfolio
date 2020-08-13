import React from 'react'

function FindingError() {
	return (
		<div className='spacer-50 text-center w-100 content-centered'>
			<div className='text-center' id='noResults'>
				<img src='/assets/img/svg/error.svg' className='u-xl-avatar img-fluid' alt='' />
				<p className='text-center mb-0 mt-2'>Aucun résultat trouvé</p>
			</div>
		</div>
	)
}

export default FindingError
