import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/ScoreManagement.css";
import DatedOfToday from "../hooks/DatedOfToday";
import EditableJudgeName from "../hooks/EditableJudgeName";
import RemoveDancer from "../hooks/RemoveDancer";
import AddCouple from "../hooks/AddCouple";
import InputOrden from "../hooks/InputOrden"
import InputDancerName from "../hooks/InputDancerName";
import JudgeButtons from "../hooks/InputJudges";
import AverageScore from "../hooks/InputAverange";
import SendDataButton from "../hooks/SendDataButton";

function ScoreManagement({ enviarDatos }) {
  const [parejas, setParejas] = useState([]);
  const [numPuntajes, setNumPuntajes] = useState(3);
  const [judgeNames, setJudgeNames] = useState([]);

  // Guardar los datos de los inputs en LocalStorage
  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem("datosParejas")) || [];
    if (datosGuardados.length > 0) {
      setParejas(datosGuardados);
      setNumPuntajes(datosGuardados[0].puntajes.length);
    }
  }, []);

  // Guardar los datos de las parejas en LocalStorage
  useEffect(() => {
    localStorage.setItem("datosParejas", JSON.stringify(parejas));
  }, [parejas]);

  // Guardar los datos de los jueces en LocalStorage
  useEffect(() => {
    const storedJudges = JSON.parse(localStorage.getItem('judgeNames'));
    if (storedJudges) {
      setJudgeNames(storedJudges);
    } else {
      setJudgeNames([
        { id: 'juez1', name: 'Jurado 1' },
        { id: 'juez2', name: 'Jurado 2' },
        { id: 'juez3', name: 'Jurado 3' }
      ]);
    }
  }, []);

  // Manejo del cambio de nombre en los Jueces
  const handleJudgeNameChange = (index, newName) => {
    const updatedJudges = judgeNames.map((judge, i) =>
      i === index ? { ...judge, name: newName } : judge
    );
    setJudgeNames(updatedJudges);
    localStorage.setItem('judgeNames', JSON.stringify(updatedJudges));
  }

  // Manejo de los inputs
  const handleInputChange = (e, index, key) => {
    const { value } = e.target;
    setParejas((prevState) => {
      const updateParejas = [...prevState];
      updateParejas[index][key] = value;
      return updateParejas;
    });
  };

  // Manejo del puntaje
  const handlePuntajeChange = (e, parejaIndex, puntajeIndex) => {
    let { value } = e.target;
    value = value.slice(0, 5);
    setParejas((prevState) => {
      const updateParejas = [...prevState];
      updateParejas[parejaIndex].puntajes[puntajeIndex] = value;
      return updateParejas;
    });
  };

  // Añadir un Juez
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
        const newJudgeName = `Juez ${prevState.length + 1}`;
        const updatedNames = [...prevState, newJudgeName];
        return updatedNames;
      }
      return prevState;
    });
  };

  // Quitar un juez
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
      if (prevState.length > 1) {
        const updatedNames = prevState.slice(0, -1);
        return updatedNames;
      }
      return prevState
    });
  };

  // Añadir una Pareja
  const addCouple = () => {
    const newCouple = {
      nombreBailarina: "",
      nombreBailarin: "",
      puntajes: Array(numPuntajes).fill(""),
    };
    const updatedParejas = [...parejas, newCouple];
    setParejas(updatedParejas);
  };

  // Eliminar una Pareja 
  const removeDancer = (index) => {
    setParejas((prevState) => prevState.filter((_, i) => i !== index));
  };

  //Enviar Datos a TableOfPoints
  const handleSubmit = () => {
    const datos = {
      parejas: parejas.map((pareja, index) => ({
        ...pareja,
        orden: pareja.orden,
        puntajes: pareja.puntajes,
        total: AverageScore.calcularPromedioPareja(pareja.puntajes),
      })),
    };

    enviarDatos(datos);
    setParejas([]);
  };


  return (
    <section className="pr-sc">
      <nav className="title-container">
        <h1 className="sc-title"> Gestionar Puntajes </h1>
      </nav>
      <div className="bt-container">
        <Link to="/" className="backHome"> Volver Atrás </Link>
      </div>
      <DatedOfToday />
      <AddCouple onClick={addCouple} />
      {parejas.map((pareja, index) => (
        <div key={index} className="inputs-container">
          <InputOrden
            key={index}
            index={index}
            orden={pareja.orden || ""}
            handleInputChange={handleInputChange}
          />
          <InputDancerName
            index={index}
            nombreBailarina={pareja.nombreBailarina}
            nombreBailarin={pareja.nombreBailarin}
            handleInputChange={handleInputChange}
          />
          {pareja.puntajes.map((puntaje, puntajeIndex) => (
            <div key={puntajeIndex} className="input-option-container">
              <EditableJudgeName
                id={judgeNames[puntajeIndex].id}
                label={judgeNames[puntajeIndex].name || ""}
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
          <JudgeButtons
            index={index}
            onAddJudge={addJudge}
            onRemoveJudge={removeJudge}
          />
          <AverageScore puntajes={pareja.puntajes} />
          <RemoveDancer onRemove={removeDancer} index={index} />
        </div>
      ))}
      <SendDataButton onClick={handleSubmit} />
    </section>
  );
}

export default ScoreManagement;