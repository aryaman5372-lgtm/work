import { useEffect, useState } from "react";
const List = () => {


const [lists, setLists] = useState(null);

useEffect  (()=>{//fetch data from API -- use effect is used for changes in the ui
    fetch('http://localhost:9001/lists')
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

                    <h2 style={{ marginBottom: '8px', color: '#2d3748' }}>{lists.name}</h2>
                    <div style={{ fontSize: '15px', marginBottom: '4px' }}><strong>Email:</strong> {lists.email}</div>
                    <div style={{ fontSize: '15px', marginBottom: '4px' }}><strong>Post ID:</strong> {lists.postId}</div>
                    <div style={{ fontSize: '15px', marginBottom: '4px' }}><strong>ID:</strong> {lists.id}</div>
                    <div style={{ fontSize: '15px', marginTop: '8px', whiteSpace: 'pre-line' }}><strong>Comment:</strong> {lists.body}</div>
                </div>
            ))
            }
    </div>  );
}
 
export default List;