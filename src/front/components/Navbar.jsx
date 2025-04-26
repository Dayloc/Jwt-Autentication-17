import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto ">
					<Link to="/createUser">
						<button className="btn btn-primary m-1">Register</button>
					</Link>
					<Link to="/login">
						<button className="btn btn-primary m-1">Login</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};