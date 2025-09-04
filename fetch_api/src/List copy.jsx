
import { useEffect, useState } from "react";
const List = () => {


const [lists, setLists] = useState(null);
const [comments, setComments] = useState(null);





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




//this is for comments
useEffect  (()=>{//fetch data from API -- use effect is used for changes in the ui
    fetch('http://localhost:9001/comments')
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
             setComments(data);
            
            // console.log(       
            // comments &&
            //         comments
            //           .filter(comment => comment.postId === lists.id)
            //           .map(comment => (
            //             <h4 key={comment.id}>{comment.body}</h4>
            //           ))
            
// );
                    })
},[lists])//empty dependency array so that it runs only once when the component loads





    return (
    <div className="list">
        
        {
            //map cycles through the list of data
            //key is the id which helps in identifing the data
            lists && lists.map((list)=>(

                <div className="list-view" key={list.id}>
             
             {/* {const newYorkUsers = users.filter(user => user.city === 'New York')} */}
                <h2>{list.title}</h2>
                {/* <p>{lists.body}</p> */}
                    {comments && comments.filter(comment => comment?.postId === list.id).map(comment=>(
                        <h4>{comment.body}</h4>
                    ))}


                        {/* <h4 key={comments.id}>{comments.body}</h4> */}
                  <div>
                  {comments?.filter(comment => comment.postId === lists.id).map(comment => (
                        <h4 key={comment.id}>{comment.body}</h4>
                      ))
                      
                  }
                </div>



                {/* <div>
                    {
                        comments && comments.map((comment)=>(
                            // comment.postId === lists.id &&
                            lists.id === comment.postId &&
                            // <h4>{comment.body}</h4>
                            // <p>{comment.body}</p>
                            <h4>{comment.body}</h4>
                            // <input></input>
                        ))
                    }
                </div> */}

                {/* <div>
                      {comments && comments.filter(comment => comment.postId === lists.id).map(filteredComment => (
                            <div key={filteredComment.id}>
                                <strong>{filteredComment.name}</strong>: {filteredComment.body}
                            </div>
                        ))}
                </div> */}
                {/* <h1>test</h1> */}
                </div>
            ))
            }
    </div>  );
}
 
export default List;