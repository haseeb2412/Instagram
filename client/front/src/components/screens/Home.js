import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import {Link} from 'react-router-dom'

const Home = () => {
  const [data, setData] = useState([]);
  const {state,dispatch} = useContext(UserContext);
  
  // useEffect(() => {
  //   fetch('/allpost', {
  //     headers: {
  //       Authorization: 'Bearer '+localStorage.getItem('jwt'),

  //     },
  //   })
  //     .then((data) => {
  //       console.log(data);
  //       // setData(result.posts);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching posts:', error);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/allpost", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        console.log(response.data.posts);
        setData(response.data.posts);
        // console.log("successfull");

      })
      .catch((error) => {
        console.error("Error fetching posts:");
      });
  }, []);

  // const likePost=(id)=>{
  //   axios
  //   .put("http://localhost:5000/like",{
  //     headers:{
  //       "Content-Type":"application/json",
  //       "Authorization":"Bearer "+localStorage.getItem("jwt")
  //     },
  //     body:JSON.stringify({
  //       postId:id
  //     })
  //   }).then((response)=>{
  //     console.log(response)
  //   })
  // }



  const likePost = (id) => {
    axios
      .put("http://localhost:5000/like", { postId: id }, {
        headers: {
          // "Content-Type": "application/json",
          "Authorization": "Bearer " +localStorage.getItem("jwt")
        }
      })
      .then((response) => {
        // console.log(response);
        const newData = data.map(item=>{
          if (item._id==response._id) {
            return response;
          }else{
            return item;
          }
        })
        setData(newData);
      })
      .catch((error) => {
        console.error("Error liking post:", error);
      });
  };
  const unlikePost = (id) => {
    axios
      .put("http://localhost:5000/unlike", { postId: id }, {
        headers: {
          // "Content-Type": "application/json",
          "Authorization": "Bearer " +localStorage.getItem("jwt")
        }
      })
      .then((response) => {
        // console.log(response);
        const newData = data.map(item=>{
          if (item._id==response._id) {
            return response;
          }else{
            return item;
          }
        })
        setData(newData);
      })
      .catch((error) => {
        console.error("Error liking post:", error);
      });
  };
  
  // const unlikePost=(id)=>{
  //   fetch("/unlike",{
  //     method:"put",
  //     headers:{
  //       "Content-Type":"application/json",
  //       "Authorization":"Bearer "+localStorage.getItem("jwt")
  //     },
  //     body:JSON.stringify({
  //       postId:id
  //     })
  //   }).then((response)=>{
  //     console.log(response)
  //   })
  // }

  const makecomment=(text,postId)=>{
    axios.put('http://localhost:5000/comment',{postId:postId,text},{
      headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer " +localStorage.getItem("jwt")
      },
    })
    .then(response=>{
      console.log(response);
      const newData = data.map(item=>{
        if (item._id==response._id) {
          return response;
        }else{
          return item;
        }
      })
      setData(newData);
    })
    .catch(error=>{
      console.log("fetching data error");
    })
  }

  const deletePost=(postid)=>{
    axios.delete(`http://localhost:5000/deletepost/${postid}`,{
      headers:{
        "Authorization": "Bearer " +localStorage.getItem("jwt")
      }
    }).then(response=>{
      console.log(response);
      const newData=data.filter(item=>{
        return item._id !== response._id
        })
        setData(newData);
    }).catch(error=>{
      console.log("front end error");
    })
  }

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5><Link to={item.postedBy._id !== state._id ? "/profile/"+item.postedBy._id :"/profile"}>{item.postedBy.name}</Link> {item.postedBy._id == state._id
            && 
            <i className="material-icons" style={{float:"right"}} 
            onClick={()=>deletePost(item._id)}
            >delete</i>
            }
            </h5>
            <div className="card-image">
              <img src={item.photo} alt="home" />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite_border
              </i>
              {
                item.likes.includes(state._id)
                ?
                <i className="material-icons" onClick={()=>{unlikePost(item._id)}}>thumb_down</i>
                :
                <i className="material-icons" onClick={()=>{likePost(item._id)}}>thumb_up</i>

              }
              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {
                item.comments.map(record=>{
                  return(
                    <h6><span style={{fontWeight:"700"}}>{record.postedBy.name}</span>   {record.text}</h6>
                  )
                })
              }
              <form onSubmit={(e)=>{
                e.preventDefault();
                makecomment(e.target[0].value,item._id)
                console.log(e.target[0].value,item._id)
              }}>
              <input type="text" placeholder="add comment" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
    // <></>
  );
};

export default Home;
