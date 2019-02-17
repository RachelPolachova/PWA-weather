import React from 'react';

const Navigation = (props) => {

	function handleClick (e) {
		e.preventDefault();
		props.showCurrentCity(false);
	}

	return(
		<div className="navbar">
			<button onClick={handleClick}><i class="fas fa-chevron-left">Back</i></button>
		</div>
	);
}

export default Navigation;
