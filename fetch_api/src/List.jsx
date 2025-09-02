import { useEffect, useState } from "react";
const List = () => {


const [lists, setLists] = useState(null);

useEffect  (()=>{//fetch data from API -- use effect is used for changes in the ui
    fetch('http://localhost:9000/lists')
        .then(
            res =>{
                return res.json();
            }
        //this is a 2 step process 
        //first we get the res --response object 
        ///this also returns a promise 
        //so we use another then ---- the data we get is the json data from res.json 
        //we use that data to change the state of lists
        )
        .then(data => {
            setLists(data);
        })
},[])//empty dependency array so that it runs only once when the component loads
    return (
    <div className="list">
        
        {
            //map cycles through the list of data
            //key is the id which helps in identifing the data
            lists && lists.map((lists)=>(
                <div className="list-view" key={lists.id}>

                <h2>{lists.title}</h2>
                <p>{lists.body}</p>
                </div>
            ))
            }
    </div>  );
}
 
export default List;