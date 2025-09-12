
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./countryPage.css"

const Countrypage = () => {
    const [flag, setFlag] = useState(null)
    const [loading, setLoading] = useState(true)
    const { countryName } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/independent?status=true")
            .then(response => response.json())
            .then(data => {
                setFlag(data)
                setLoading(false)
                console.log(data);
            })
            .catch(error => {
                console.error(error)
                setLoading(false)
            })
    }, [])

    const formatNumber = (num) => {
        return new Intl.NumberFormat().format(num)
    }

    const getCurrencies = (currencies) => {
        if (!currencies) return 'N/A'
        return Object.values(currencies).map(currency => currency.name).join(', ')
    }

    const getLanguages = (languages) => {
        if (!languages) return 'N/A'
        return Object.values(languages).join(', ')
    }

    const getNativeName = (nativeNames) => {
        if (!nativeNames) return 'N/A'
        const firstKey = Object.keys(nativeNames)[0]
        return nativeNames[firstKey]?.common || 'N/A'
    }

    const handleBackClick = () => {
        navigate('/')
    }

    if (loading) {
        return (
            <div className="country-page">
                <div className="loading">Loading country information...</div>
            </div>
        )
    }

    return (
        <div className="country-page">
            <button className="back-button" onClick={handleBackClick}>
                <span>←</span> Back
            </button>

            {flag && flag
                .filter(item => item?.name?.common === decodeURIComponent(countryName))
                .map((item, idx) => (
                    <div key={item.cca3 || idx} className="country-content">
                        <div className="flag-section">
                            <img 
                                src={item.flags?.png || item.flags?.svg} 
                                alt={item.name?.common + ' flag'} 
                                className="country-flag"
                            />
                        </div>

                        <div className="details-section">
                            <h1 className="country-name">{item.name?.common}</h1>
                            
                            <div className="country-details">
                                <div className="firsthalf">
                                    <div className="detail-item">
                                        <span className="detail-label">Native Name:</span>
                                        <span className="detail-value">{getNativeName(item.name?.nativeName)}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Population:</span>
                                        <span className="detail-value">{formatNumber(item.population)}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Region:</span>
                                        <span className="detail-value">{item.region}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Sub Region:</span>
                                        <span className="detail-value">{item.subregion}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Capital:</span>
                                        <span className="detail-value">{item.capital?.[0] || 'N/A'}</span>
                                    </div>
                                </div>

                                <div className="secondhalf">
                                    <div className="detail-item">
                                        <span className="detail-label">Top Level Domain:</span>
                                        <span className="detail-value">{item.tld?.[0] || 'N/A'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Currencies:</span>
                                        <span className="detail-value">{getCurrencies(item.currencies)}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Languages:</span>
                                        <span className="detail-value">{getLanguages(item.languages)}</span>
                                    </div>
                                </div>
                            </div>

                            {item.borders && item.borders.length > 0 && (
                                <div className="border-countries">
                                    <span className="border-countries-label">Border Countries:</span>
                                    <div className="border-countries-list">
                                        {item.borders.map((border, index) => (
                                            <button key={index} className="border-country-tag">
                                                {border}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
 
export default Countrypage;