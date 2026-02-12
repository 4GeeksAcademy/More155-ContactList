import { Contact } from "../components/Contact.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

	return (
		<>
		<div className="text-end p-5">
          	<Link to="/addContact">
			<button className="btn btn-success">Add new contact</button>
			</Link>
		</div>
		
		    
			<div className="text-center mt-5">
			<Contact/>
		    </div>
		</>
	
	);
}; 