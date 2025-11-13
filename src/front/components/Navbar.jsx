import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();
    const { isLogged, user } = store;
	const navigate = useNavigate();

	const handleLogOut = () => {
	localStorage.removeItem('token');
	dispatch({
		type: "set_Logged",
		payload: false
	});
	navigate("/");
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					
				</Link>
				{isLogged ? (
					<>
					 <button 
						className="btn logout justify-content-end mt-5 btn-danger"
						onClick={handleLogOut}
					>
					Cerrar Sesión
					</button>
					</>
					) : (
					<div className="ml-auto">
						<Link to="/demo">
							<button className="btn btn-warning">Check the Context in action</button>
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
};