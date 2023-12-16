import {React,useState,useEffect, useContext} from 'react'
import axios from 'axios';
import {UserContext} from "../../App"
import {useParams} from "react-router-dom"

const UserProfile = () => {
    const [userProfile,setProfile] = useState(null);
    const {state,dispatch} = useContext(UserContext);
    const {userid} = useParams();
    console.log(userid)

useEffect(() => {
        axios
          .get(`http://localhost:5000/user/${userid}`, {
            headers: {
              Authorization: "Bearer "+localStorage.getItem("jwt"),
            },
          })
          .then((response) => {
            console.log(response.data);
            // console.log(response.data);
            // console.log(response.data.user.name);
            setProfile(response.data);
          })
          .catch((error) => {
            console.error("Error fetching posts:");
          });
},[]);

  return (
    <>
    {userProfile ? 
    
    <div style={{
      maxWidth:"550px"  ,margin:"0px auto"
      }}>
        <div style={{
          display:"flex",
          justifyContent:"space-around",
          margin:"18px 0px",
          borderBottom:"1px solid grey"
        }}>
          <div>
            <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
            src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8MXwwfHx8MA%3D%3D' alt='profile'/>
          </div>
          <div>
            <h4>{userProfile && userProfile.user.name}</h4>
            <h5>{userProfile && userProfile.user.email}</h5>
            <div style={{
              display:"flex",justifyContent:"space-between",
              width:"108%",
          }}>
            {/* <h6>{userProfile.posts.length} posts</h6> */}
            <h6>{userProfile && userProfile.posts.length} posts</h6>
            <h6>40 followers</h6>
            <h6>35 following</h6>
          </div>
          </div>
          
        </div>
  
  
          <div className='gallery'>
  
            {
              userProfile && userProfile.posts.map((item)=>{
                  return (
            <img className='item' key={item._id} src={item.photo} alt={item.title}/>
  
                  )
              })
            }
            {/* <img className='item'  src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8MXwwfHx8MA%3D%3D' alt='images'/>
            <img className='item' src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8MXwwfHx8MA%3D%3D' alt='images'/>
            <img className='item' src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8MXwwfHx8MA%3D%3D' alt='images'/>
            <img className='item' src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8MXwwfHx8MA%3D%3D' alt='images'/>
            <img className='item' src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8MXwwfHx8MA%3D%3D' alt='images'/>
            <img className='item' src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8MXwwfHx8MA%3D%3D' alt='images'/>
            <img className='item' src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8MXwwfHx8MA%3D%3D' alt='images'/>
            <img className='item' src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8MXwwfHx8MA%3D%3D' alt='images'/>
            <img className='item' src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8MXwwfHx8MA%3D%3D' alt='images'/> */}
            
          
          </div>
  
      </div>
    
    
    : <h2>loading...</h2>}
    
    </>
  )
}

export default UserProfile
