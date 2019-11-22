import React, { useState, useMemo } from "react";
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

const New = ({ history }) => {
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(
    () => {
      return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('techs', techs);
    data.append('price', price);
    data.append('company', company);

    await api.post('/spots', data, {
      headers: { user_id }
    })

    history.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label 
        id="thumbnail" 
        style={{backgroundImage: `url(${preview})`}}
        className={thumbnail ? 'has-thumbnail' : ''}
        >
        <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
        <img src={camera} alt="Select img" />
      </label>
      <label htmlFor="company"> EMPRESA * </label>
      <input
        id="company"
        placeholder="Insira a sua empresa"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />
      <label htmlFor="techs">
        TECNOLOGIAS * <span> (separadas por vírgula) </span>
      </label>
      <input
        id="techs"
        placeholder="Que tecnologias usam?"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />
      <label htmlFor="price">
        VALOR DIÁRIO * <span> (caso GRATUITO deixar em branco) </span>
      </label>
      <input
        id="price"
        placeholder="Valor cobrado por dia?"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />
      <button className="btn" type="submit">
        Registar
      </button>
    </form>
  );
};

export default New;
