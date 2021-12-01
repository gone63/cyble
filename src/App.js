import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  let [dogImages, setDogImages] = useState([]);
  let [dogList, setDogList] = useState([]);

  useEffect(() => {
    fetch(`https://dog.ceo/api/breeds/list/all`)
      .then((success) => success.json())
      .then((response) => {
        console.log("response:", response);

        setDogList((_) => Object.keys(response.message));
      });
  }, []);

  const handleChange = () => {
    let name = document.getElementById("select-box").value;
    fetch(`https://dog.ceo/api/breed/${name}/images`)
      .then((success) => success.json())
      .then((response) => {
        console.log("response:", response);

        setDogImages((_) => response.message.slice(0, 10));
      });
  };

  return (
    <div className="container">
      <select id="select-box" onChange={handleChange}>
        {dogList.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>
      <div id="dog-container">
        {dogImages.map((dog) => (
          <img src={dog} className="dog-item" alt="image" />
        ))}
      </div>
    </div>
  );
}

export default App;
