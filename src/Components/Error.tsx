import React from "react";
import { Link } from "react-router-dom";

export const Error = () => {
	return (
		<div>
			<h1>Error!</h1>
			<p>Login Again</p>
			<Link to='/login'>Click here</Link>
		</div>
	);
};
