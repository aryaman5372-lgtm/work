
import { useState, useEffect } from "react"
const Countrypage= () => {


    const [flag,setFlag]=useState(null)
useEffect(() => {

            fetch("https://restcountries.com/v3.1/independent?status=true")
           // fetch("https://restcountries.com/v3.1/all")

        .then(response => response.json())
        .then(data => {setFlag(data)
            console.log(data);
            
        }
    )
        .catch(error => console.error(error))
    }, [])



    
    return (  
    <div>
        {flag && flag.map(
            (item, idx) => (
                <div key={item.cca3 || idx} style={{ marginBottom: '2rem' }}>
                    <img src={item.flags?.png || item.flags?.svg} alt={item.name?.common + ' flag'} style={{ width: '100px', height: 'auto', display: 'block' }} />
                    <h4>Name: {item.name?.common}</h4>
                    <div className="firsthalf">

                    <h4>Native  Name: {item.name?.common}</h4>
                    <h4>Population:           {item.population}</h4>
                    <h4>Region:           {item.region}</h4>
                    <h4>Sub Region: {item.subregion}</h4>
                    <h4>Capital:           {item.capital}</h4>

                    </div>
                    <div className="secondhalf">

                    <h4>Top Level Domain :           {item.tld}</h4>
                    <h4>Currency :           {item.currencies.target   }</h4>
                    console.log( {item.currencies.target}   );
                    
                    {/* <h4>Languages :           {Object.values(item.languages).map((lan)=>(
                        {if (len.length!=Object.values(item.languages).length-1) {
                         lan+","    
                        }
                    else
                         lan
                    }
                       ))}</h4> */}
                    </div>

                    {/* <h4>Border  Countries  :           {item.}</h4> */}
                </div>
            )
        )}
    </div>
    );
}
 
export default Countrypage;