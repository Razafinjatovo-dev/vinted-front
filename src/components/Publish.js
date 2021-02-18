import axios from "axios";
import { useState } from "react";
import "./Publish.css";

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
  const { Url, tokenCookies } = props;
  const handleBrand = () => {};

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("product_image", picture);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("title", title);

    try {
      const response = await axios.post(`${Url}/offer/publish`, formData, {
        headers: {
          Authorization: "Bearer " + tokenCookies,
          "Content-Type": "multipart/form-data",
        },
      });
      // alert(JSON.stringify(response.data));
      alert("Annonce publiée");
    } catch (err) {
      if (err.response.status === 500) {
        console.error("An error occurred");
      } else {
        console.error(err.response.data.msg);
      }
    }
  };
  return (
    <div className="PublishForm_Wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Vends ton article</h1>
        <p>Photo article</p>
        <input
          required="required"
          type="file"
          onChange={(event) => {
            setPicture(event.target.files[0]);
          }}
        />

        <p>Titre</p>
        <input
          type="text"
          placeholder="titre"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <p>Description</p>
        <input
          type="textarea"
          placeholder="Décris ton article"
          rows="10"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <p>Marque</p>
        <input
          type="text"
          placeholder="Marque"
          onChange={(event) => {
            setBrand(event.target.value);
          }}
        />
        <p>Taille</p>
        <input
          type="text"
          placeholder="Taille"
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <p>Couleur</p>
        <input
          type="text"
          placeholder="Couleur"
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
        <p>Etat</p>
        <input
          type="text"
          placeholder="Etat"
          onChange={(event) => {
            setCondition(event.target.value);
          }}
        />
        <p>Lieu</p>
        <input
          type="text"
          placeholder="Lieu"
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <p>Prix</p>
        <input
          type="number"
          placeholder="Prix"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <div className="Publish_Button">
          <button type="submit">Ajouter</button>
        </div>
      </form>
    </div>
  );
};

export default Publish;
