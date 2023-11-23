import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

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
      })
      .catch((error) => {
        console.error("Error fetching posts:");
      });
  }, []);

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5>{item.postedBy.name}</h5>
            <div className="card-image">
              <img src={item.photo} alt="home" />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite_border
              </i>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type="text" placeholder="add comment" />
            </div>
          </div>
        );
      })}
    </div>
    // <></>
  );
};

export default Home;
