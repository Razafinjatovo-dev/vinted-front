import axios from "axios";
import { useState } from "react";

const Publish = (props) => {
  const [params, setParams] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState();
  const [city, setCity] = useState();
  const [brand, setBrand] = useState();
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [picture, setPicture] = useState();
  const { tokenCookies } = props;
  const handleBrand = () => {};

  const handleSubmit = async (event) => {
    console.log("submitted");
    console.log(tokenCookies);
    event.preventDefault();
    const formData = new FormData();
    console.log("form data content" + formData);
    formData.append("picture", picture);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("title", title);
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + tokenCookies,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(JSON.stringify(response.data));
    } catch (err) {
      if (err.response.status === 500) {
        console.error("An error occurred");
      } else {
        console.error(err.response.data.msg);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Vends ton article</h1>
      <input
        type="file"
        onChange={(event) => {
          setPicture(event.target.files[0]);
        }}
      />
      <hr />
      <input
        type="text"
        placeholder="titre"
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <hr />
      <input type="textarea" placeholder="Décris ton article" />
      <hr />
      <input
        type="text"
        placeholder="Marque"
        onChange={(event) => {
          setBrand(event.target.value);
        }}
      />
      <hr />
      <input
        type="text"
        placeholder="Taille"
        onChange={(event) => {
          setSize(event.target.value);
        }}
      />
      <hr />
      <input
        type="text"
        placeholder="Couleur"
        onChange={(event) => {
          setColor(event.target.value);
        }}
      />
      <hr />
      <input
        type="text"
        placeholder="Etat"
        onChange={(event) => {
          setCondition(event.target.value);
        }}
      />
      <hr />
      <input
        type="text"
        placeholder="Lieu"
        onChange={(event) => {
          setCity(event.target.value);
        }}
      />
      <hr />
      <input
        type="number"
        placeholder="Prix"
        onChange={(event) => {
          setPrice(event.target.value);
        }}
      />
      <hr />
      <button type="submit">Ajouter</button>
      <hr />
    </form>
  );
};

export default Publish;
