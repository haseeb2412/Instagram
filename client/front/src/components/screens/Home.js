import React, { useEffect, useState } from 'react'

const Home = () => {
  const [data,setData] = useState([]);

  // useEffect(()=>{
  //   fetch('/allpost',{
  //     headers:{
  //       "Authorization":"Bearer "+localStorage.getItem("jwt")
        
  //     }
  //   })
  //   .then(result=>{
  //     console.log(result)
  //     // setData(result.posts)
  // })
  // },[])

  useEffect(() => {
    fetch('/allpost', {
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('jwt'),

      },
    })
      // .then((result) => result.json()) 
      .then((data) => {
        console.log(data);
        // setData(result.posts);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);


  return (
    <div className='home'>
      {
        data.map(item=>{
          return (
            <div className='card home-card'>
        <h5>{item.postedBy.name}</h5>
        <div className='card-image'>
          <img src={item.photo} alt='home'/>
        </div>
        <div className='card-content'>
        <i className="material-icons" style={{color:"red"}}>favorite_border</i>
          <h6>{item.title}</h6>
          <p>{item.body}</p>
          <input type='text' placeholder='add comment'/>
        </div>
          </div>
          )
        })
      }

      

      
     
    </div>
  )
}

export default Home
