import React, { useEffect, useState } from 'react'
import axios from 'axios';
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'




const CreatePost = () => {
  const history  = useHistory();
  const[title,setTitle] =useState("");
  const[body,setBody] =useState("");
  const[image,setImage] =useState(null);
  const[url,setUrl] =useState("");

//   useEffect(()=>{
//       if(url){
//         fetch("/createpost",{
//           method:"post",
//           headers:{
//             "Content-Type":"application/json",
//             "Authorization":"Bearer "+localStorage.getItem("jwt")
//           },
//           body:JSON.stringify({
//               title,
//               body,
//               pic:url
//           })
//       })
//       // .then(res=>res.json())
//       .then(data=>{
//          if(data.error){
//             M.toast({html: data.error,classes:"#c62828 red darken-3"})
//          }
//          else{
//             M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
//             // console.log("success")
//             history.push('/')
//          }
//       }).catch(err=>{
//         console.log(err);
//       })     




//       }
// },[url])


// const postDetails = ()=>{
//     const data = new FormData()
//     data.append("file",image)
//     data.append("upload_preset","instaclone")
//     data.append("cloud_name","dzokxu7st")
//     fetch("https://api.cloudinary.com/v1_1/dzokxu7st/image/upload",{
//         method:"post",
//         body:data
//     })
//     // .then(res=>res.json())
//     .then(data=>{
//        setUrl(data.url)
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// }
  



const postDetails = async () => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "instaclone");
  data.append("cloud_name", "dzokxu7st");

  const cloudResponse = await fetch("https://api.cloudinary.com/v1_1/dzokxu7st/image/upload",{
    method:"post",
    body:data
})
const cloudinaryData = await cloudResponse.json();
// .then(res=>res.json())
// .then(data=>{
//    console.log(data.url);
// })
// .catch(err=>{
//     console.log(err);
// })


const response = await axios.post("http://localhost:5000/createpost", {
            body,
            title,
            pic:cloudinaryData.url,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
        })
        console.log(response)
        console.log(cloudinaryData.url);

      
        if (!response) {
            M.toast({ html: "went wrong", classes: "#c62828 red darken-3" });
            return;
        } else {
            M.toast({ html: "create post successfully", classes: "#43a047 green darken-1" });
            console.log(response.data);
            history.push("/");
        }
};


  return (
    <div className='card input-filed' style={{
        margin:"30px auto",
        maxWidth:"500px",
        padding:"20px",
        textAlign:"center"
    }}>
        <input type='text' placeholder='title' 
        value={title}
        onChange={(e)=>{setTitle(e.target.value)}}
        />
        <input type='text' placeholder='body'
        value={body}
        onChange={(e)=>{setBody(e.target.value)}}
        />

        <div className="file-field input-field">
      <div className="btn #64b5f6 blue  darken-1">
        <span>Upload Image</span>
        <input type="file" 
        // value={image}
         onChange={(e)=>{setImage(e.target.files[0])}}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
    {/* onClick={()=>{postDetails()}} */}
    <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 darken-1"  name="action" onClick={()=>{postDetails()}} >     
        Submit
    </button>
    </div>
  )
}

export default CreatePost
