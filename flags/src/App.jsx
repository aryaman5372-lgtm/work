import Navbar from "./navbar";
import Countrypage from "./countryPage";
import Card from "./card";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Card />,
		},
		{
			path: "/country/:name",
			element: <Countrypage />,
		},
	]);

	return (
		<>
			<Navbar />
			<RouterProvider router={router} />
			{/* <RouterProvider router={router}/> */}
			{/* <Countrypage /> */}
			{/* <Card /> */}
			{/* <Page/> */}
			{/* <p>fdf */}

			{/* </p> */}
			{/* <h1>fsdf</h1> */}
		</>
	);
};

export default App;
