import { useState, useEffect } from "react"

const Page = () => {


    const [flag,setFlag]=useState(null)
console.log(flag);

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
            (item, idx) => 
            <h1 key={item.cca3 || idx}>{item.name?.common}</h1>)}
    </div>
);

}
 
export default Page;