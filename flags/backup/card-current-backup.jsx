
import { useState, useEffect } from "react"
import './card.css'

const Card  = () => {
    const [flag, setFlag] = useState(null)
    
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/independent?status=true")
        .then(response => response.json())
        .then(data => {setFlag(data)
            console.log(data);
        })
        .catch(error => console.error(error))
    }, [])

    return (  
        <div className="app-container">
            <div className="cards-container">
                {flag && flag.map(
                    (item, idx) => (
                        <div key={item.cca3 || idx} className="country-card">
                            <div className="flag-container">
                                <img 
                                // added the image like this
                                    src={item.flags?.png || item.flags?.svg} 
                                    alt={item.name?.common + ' flag'} 
                                    className="flag-image"
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="country-name">{item.name?.common}</h3>
                                <div className="country-info">
                                    <p><span className="info-label">Population:</span> {item.population?.toLocaleString()}</p>
                                    {/* //toLocaleString is used to make it more readable as it adds commas to the population number */}
                                    <p><span className="info-label">Region:</span> {item.region}</p>
                                    <p><span className="info-label">Capital:</span> {item.capital?.[0]}</p>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
 
export default Card;