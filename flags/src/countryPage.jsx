import { useState, useEffect } from "react";
import "./countryPage.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Countrypage = () => {
	const [flag, setFlag] = useState(null);
	const { name } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		fetch("https://restcountries.com/v3.1/independent?status=true")
			// fetch("https://restcountries.com/v3.1/all")

			.then((response) => response.json())
			.then((data) => {
				setFlag(data);
				console.log(data);
			})
			.catch((error) => console.error(error));
	}, []); //!fsf

	return (
		<div className="country-page">
			<button onClick={() => navigate(-1)}>Back</button>
			<button onClick={() => navigate("/")}>Home</button>
			{/* <h1>⬅️</h1> */}
			{flag &&
				flag
					.filter((item) => item.name?.common === name)
					.map((item, idx) => (
						<div key={item.cca3 || idx} className="country-content">
							{/* //!flag */}
							<div className="flag-section">
								<img
									src={item.flags?.png || item.flags?.svg}
									alt={item.name?.common + " flag"}
									className="country-flag"
								/>
							</div>

							<div className="details-section">
								<h1 className="country-name">{item.name?.common}</h1>
								{/* //!Name */}

								<div className="country-details">
									<div className="detail-column">
										<div className="detail-item">
											<span className="detail-label">Native Name:</span>{" "}
											<span className="detail-value">{item.name?.common}</span>
										</div>
										<div className="detail-item">
											<span className="detail-label">Population:</span>{" "}
											<span className="detail-value">
												{item.population?.toLocaleString()}
											</span>
										</div>
										<div className="detail-item">
											<span className="detail-label">Region:</span>{" "}
											<span className="detail-value">{item.region}</span>
										</div>
										<div className="detail-item">
											<span className="detail-label">Sub Region:</span>{" "}
											<span className="detail-value">{item.subregion}</span>
										</div>
										<div className="detail-item">
											<span className="detail-label">Capital:</span>{" "}
											<span className="detail-value">{item.capital}</span>
										</div>
									</div>

									<div className="detail-column">
										<div className="detail-item">
											<span className="detail-label">Top Level Domain:</span>{" "}
											<span className="detail-value">
												{item.tld && item.tld.join(", ")}
											</span>
										</div>
										<div className="detail-item">
											<span className="detail-label">Currency:</span>{" "}
											<span className="detail-value">
												{item.currencies
													? Object.values(item.currencies)
															.map(
																(cur) =>
																	`${cur.name}${
																		cur.symbol ? ` (${cur.symbol})` : ""
																	}`
															)
															.join(", ")
													: "N/A"}
											</span>
										</div>
										<div className="detail-item">
											<span className="detail-label">Languages:</span>{" "}
											<span className="detail-value">
												{item.languages
													? Object.values(item.languages).join(", ")
													: "N/A"}
											</span>
										</div>
									</div>
								</div>

								{item.borders && item.borders.length > 0 && (
									<div className="border-countries">
										<span className="border-countries-label">
											Border Countries:
										</span>
										<div className="border-countries-list">
											{item.borders.map((border, i) => (
												<button key={i} className="border-country-tag">
													{border}
												</button>
											))}
										</div>
									</div>
								)}
							</div>
						</div>
					))}
		</div>
	);
};

export default Countrypage;
