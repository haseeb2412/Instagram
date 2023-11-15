import {React,useState} from "react";
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
import axios from 'axios';




const Signin = () => {
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
        console.log(response)

      
        if (!response) {
            M.toast({ html: "went wrong", classes: "#c62828 red darken-3" });
            return;
        } else {
            M.toast({ html: "successfull", classes: "#43a047 green darken-1" });
            console.log(response.data);
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
    <a href='/signup'>Dont have account?</a>
    </h5>
      
            
    </div>
    </div>
  );
};



export default Signin;
