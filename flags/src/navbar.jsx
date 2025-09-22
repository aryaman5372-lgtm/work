import { useState, useEffect } from "react";

const Navbar = () => {
	const [dark, setDark] = useState(true);

	useEffect(() => {
		// Set initial dark mode class on body
		if (typeof document !== "undefined") {
			document.body.classList.add("dark-mode");
		}
	}, []);

	const toggleDarkMode = () => {
		setDark((prev) => !prev);
		if (typeof document !== "undefined") {
			document.body.classList.toggle("dark-mode");
		}
	};

	return (
		<nav className="navbar">
			<div className="nav">
				{/*this toggles dark mode and sets the state to true or false  */}
				<h1>Where in the world?</h1>
				<button className="button" onClick={toggleDarkMode}>
					{dark ? "Light Mode" : "Dark Mode"}
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
