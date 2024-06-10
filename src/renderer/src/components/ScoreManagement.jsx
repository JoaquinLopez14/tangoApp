import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/ScoreManagement.css";
import DatedOfToday from "./DatedOfToday";
import Trash from "./Icons";
import EditableJudgeName from "./EditableJudgeName"

function ScoreManagement({ enviarDatos }) {
  const [parejas, setParejas] = useState([]);
  const [numPuntajes, setNumPuntajes] = useState(3);
  const [judgeNames, setJudgeNames] = useState(["Juez 1", "Juez 2", "Juez 3"])

  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem("datosParejas")) || [];
    if (datosGuardados.length > 0) {
      setParejas(datosGuardados);
      setNumPuntajes(datosGuardados[0].puntajes.length);
    }

    const saveNames = JSON.parse(localStorage.getItem("nameJudge")) || ["Juez 1", "Juez 2", "Juez 3"]
    setJudgeNames(saveNames)
  }, []);

  useEffect(() => {
    localStorage.setItem("datosParejas", JSON.stringify(parejas));
    localStorage.setItem("nameJudge", JSON.stringify(judgeNames));
  }, [parejas, judgeNames]);

  const calcularPromedioPareja = (puntajes) => {
    const puntajesSinExtremos = puntajes
      .map((puntaje) => parseFloat(puntaje.replace(",", ".")))
      .sort((a, b) => a - b)
      .slice(1, -1);
    const promedio = puntajesSinExtremos.reduce((acc, puntaje) => acc + puntaje, 0) / puntajesSinExtremos.length;
    return isNaN(promedio) ? "" : promedio.toFixed(3);
  };

  const handleInputChange = (e, index, key) => {
    const { value } = e.target;
    setParejas((prevState) => {
      const updateParejas = [...prevState];
      updateParejas[index][key] = value;
      return updateParejas;
    });
  };

  const handlePuntajeChange = (e, parejaIndex, puntajeIndex) => {
    let { value } = e.target;
    value = value.slice(0, 5);
    setParejas((prevState) => {
      const updateParejas = [...prevState];
      updateParejas[parejaIndex].puntajes[puntajeIndex] = value;
      return updateParejas;
    });
  };

  const addJudge = (index) => {
    setParejas((prevState) => {
    const updatedParejas = [...prevState];
      if (updatedParejas[index].puntajes.length < 5) {
        updatedParejas[index].puntajes.push("");
        setNumPuntajes(updatedParejas[index].puntajes.length);
      }
      return updatedParejas;
    });
    setJudgeNames((prevState) => {
      if (prevState.length < 5) {
        return [...prevState, `Juez ${prevState.length + 1}`];
      }
      return prevState;
    });
  };

  const removeJudge = (index) => {
    setParejas((prevState) => {
      const updatedParejas = [...prevState];
        if (updatedParejas[index].puntajes.length > 1) {
          updatedParejas[index].puntajes.pop();
          setNumPuntajes(updatedParejas[index].puntajes.length);
        }
        return updatedParejas;
    });
    setJudgeNames((prevState) => {
      if(prevState.length > 1) {
        return prevState.slice(0, -1);
      }
      return prevState
    });
  };

  const addCouple = () => {
    const newCouple = {
      nombreBailarina: "",
      nombreBailarin: "",
      puntajes: Array(numPuntajes).fill(""),
  };

  const updatedParejas = [...parejas, newCouple];
  setParejas(updatedParejas);
  };

  const handleSubmit = () => {
    const datos = {
      parejas: parejas.map((pareja, index) => ({
        ...pareja,
        orden: pareja.orden,
        puntajes: pareja.puntajes,
        total: calcularPromedioPareja(pareja.puntajes),
    })),
  };

    enviarDatos(datos);
    setParejas([]);
  };

  const removeDancer = (index) => {
    setParejas((prevState) => {
      const newParejas = prevState.filter((_, i) => i !== index);
      return newParejas;
    });
  };

  const handleJudgeNameChange = (index, newName) => {
    setJudgeNames((prevState) => {
      const updatedNames = [...prevState];
      updatedNames[index] = newName
      return updatedNames
    });
  };

  return (
    <section className="pr-sc">
      <nav className="title-container">
        <h1 className="sc-title"> Gestionar Puntaje </h1>
      </nav>
      <div className="bt-container">
        <Link to="/" className="backHome"> Volver Atrás </Link>
      </div>
      <div className="current-date">
        <DatedOfToday />
      </div>
      <div className="bt-newPair">
        <button className="addPair" onClick={addCouple}> Añadir Pareja </button>
      </div>
      {parejas.map((pareja, index) => (
        <div key={index} className="inputs-container">
          <div className="input-order-container">
            <h2 className="input-option-name"> Orden </h2>
            <input
              className="input-order"
              type="number"
              value={pareja.orden || ""}
              onChange={(e) => handleInputChange(e, index, "orden")}
            />
          </div>
          <div className="input-name-container">
            <h2 className="input-option-name"> Nombre de la bailarina </h2>
            <input
              className="input-name"
              type="text"
              value={pareja.nombreBailarina || ""}
              onChange={(e) => handleInputChange(e, index, "nombreBailarina")}
            />
          </div>
          <div className="input-name-container" id="name2">
            <h2 className="input-option-name"> Nombre del bailarín </h2>
            <input
              className="input-name"
              type="text"
              value={pareja.nombreBailarin || ""}
              onChange={(e) => handleInputChange(e, index, "nombreBailarin")}
            />
          </div>
          {pareja.puntajes.map((puntaje, puntajeIndex) => (
            <div key={puntajeIndex} className="input-option-container">
              <EditableJudgeName
              label={judgeNames[puntajeIndex]}
              onLabelChange={(newName) => handleJudgeNameChange(puntajeIndex, newName)}
              />
              <input
                className="input-point"
                type="number"
                maxLength="5"
                value={puntaje}
                onChange={(e) => handlePuntajeChange(e, index, puntajeIndex)}
              />
            </div>
          ))}
          <div className="judge-container">
          <button className="addJudge" onClick={() => addJudge(index)}> + </button>
          <button className="addJudge" onClick={() => removeJudge(index)}> - </button>
          </div>
          <div className="input-option-container" id="promedio">
            <h2 className="input-option-name"> Promedio </h2>
            <input className="input-point" type="number" id="total" value={calcularPromedioPareja(pareja.puntajes)} readOnly />
          </div>
          <div className="bt-remove-dancers">
            <button className="remove-dancer" onClick={() => removeDancer(index)}> <Trash /> </button>
          </div>
        </div>
      ))}
      <div className="bt-sendData">
        <button className="send-data" onClick={handleSubmit}> Enviar Datos</button>
      </div>
    </section>
  );
}

export default ScoreManagement;