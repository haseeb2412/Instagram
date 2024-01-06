import {React,useState,useEffect,useContext} from "react";
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import axios from 'axios';
import {UserContext} from '../../App'




const Signin = () => {
const {state,dispatch} = useContext(UserContext);
  const history = useHistory();
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")


    const PostData = async () => {
        try {
            if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
                M.toast({ html: "invalid email", classes: "#c62828 red darken-3" })
                return;
            }
    
            const response = await axios.post("http://localhost:5000/signin", {
                password,
                email,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            console.log(response);
            console.log(response.data.token);
            // console.log(response.data.user);
    
          
            if (!response) {
                M.toast({ html: "went wrong", classes: "#c62828 red darken-3" });
                return;
            } else {
                localStorage.setItem("jwt",response.data.token);
                localStorage.setItem("user",JSON.stringify(response.data.user));
                dispatch({type:"USER",payload:response.user})
                M.toast({ html: "successfull", classes: "#43a047 green darken-1" });
                // console.log("My whole data",response.data);
                history.push('/');
            }
        } catch (error) {
            console.error("Error:", error);
            M.toast({ html: "Error occurred", classes: "#c62828 red darken-3" });
        }
    };




  return (
    <div className="mycard">
      <div className="card auth-card input-field">
       <h2>Instagram</h2>
    
       <input  value={email} onChange={(e)=>{setEmail(e.target.value)}}
     type="text" placeholder="email"/>

     <input  value={password} onChange={(e)=>{setPassword(e.target.value)}}
     type="password" placeholder="password"/>

    <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 darken-1"  name="action" onClick={()=>{PostData()}}>
        Login
    </button>
    <h5>
    <Link to='/signup'>Dont have account?</Link>
    </h5>
      
            
    </div>
    </div>
  );
};



export default Signin;
