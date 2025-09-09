
import { useState, useEffect } from "react"
import './card.css'

const Card  = () => {
    const [flag, setFlag] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedRegion, setSelectedRegion] = useState("")
    
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/independent?status=true")
        .then(response => response.json())
        .then(data => {setFlag(data)
            console.log(data);
        })
        .catch(error => console.error(error))
    }, [])

    // Filter countries based on search term and selected region
    const filteredCountries = flag?.filter(country => {
        const matchesSearch = country.name?.common.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesRegion = selectedRegion === "" || country.region === selectedRegion
        return matchesSearch && matchesRegion
    })

    return (  
        <div className="app-container">
            <div className="search-filter-container">
                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input 
                        type="text"
                        placeholder="Search for a country..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select 
                    className="filter-dropdown"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                >
                    <option value="">Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
            
            <div className="cards-container">
                {filteredCountries && filteredCountries.map(
                    (item, idx) => (
                        <div key={item.cca3 || idx} className="country-card">
                            <div className="flag-container">
                                <img 
                                    src={item.flags?.png || item.flags?.svg} 
                                    alt={item.name?.common + ' flag'} 
                                    className="flag-image"
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="country-name">{item.name?.common}</h3>
                                <div className="country-info">
                                    <p><span className="info-label">Population:</span> {item.population?.toLocaleString()}</p>
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