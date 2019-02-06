import React from 'react';

const Navigation = (props) => {

	function handleClick (e) {
		e.preventDefault();
		props.showCurrentCity(false);
	}

	return(
		<div>
			<button onClick={handleClick}>back.</button>
		</div>
	);
}

export default Navigation;
