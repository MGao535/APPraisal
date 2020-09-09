import React, { useState } from "react";

function Add() {

	return(
		<div>
			<h1>Have You Done Any Appraisals in the Last 60 Days?</h1>
			<input className="Button" value="Yes" onClick={event => window.location.href='/Add'} />
			<input className="Button" value="No" onClick={event => window.location.href='/Calendar'} />
		</div>
		);

}


export default Add;