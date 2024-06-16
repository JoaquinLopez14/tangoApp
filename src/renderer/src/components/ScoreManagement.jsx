import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/ScoreManagement.css";
import { DatedOfToday, RemoveDancer, AddCouple, InputOrden, InputDancerName, JudgeButtons, AverageScore, SendDataButton, JudgeScoreInput, EditableJudgeName } from "../Components"

function ScoreManagement({ enviarDatos }) {
  const [parejas, setParejas] = useState([]);
  const [numPuntajes, setNumPuntajes] = useState(3);
  const [judgeNames, setJudgeNames] = useState(["Juez 1", "Juez 2", "Juez 3"]);

  // Carga los datos al inicio
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

  // Guardar el nombre de los jueces
  useEffect(() => {
    const storedJudges = JSON.parse(localStorage.getItem('judgeNames'));
    if (storedJudges) {
      setJudgeNames(storedJudges);
    }
  }, []);
  
  // Cambiar el nombre de un Juez
  const handleJudgeNameChange = (index, newName) => {
    setJudgeNames((prevState) => {
      const updatedNames = [...prevState]
      updatedNames[index] = newName
      localStorage.setItem('judgeNames',JSON.stringify(updatedNames))
    return updatedNames
    });
  };
  
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
        setJudgeNames((prevState) => [...prevState, `Juez ${prevState.length + 1}`]);
      }
      return updatedParejas;
    });
  };

  // Quitar un juez
  const removeJudge = (index) => {
    setParejas((prevState) => {
      const updatedParejas = [...prevState];
      if (updatedParejas[index].puntajes.length > 1) {
        updatedParejas[index].puntajes.pop();
        setNumPuntajes(updatedParejas[index].puntajes.length);
        setJudgeNames((prevState) => prevState.slice(0, -1));
      }
      return updatedParejas;
    });
  };

  // Añadir una Pareja
  const addCouple = () => {
    const newCouple = {
      id: Date.now(),
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
        <h1 className="sc-title">Gestionar Puntajes</h1>
      </nav>
      <div className="bt-backhome-container">
        <Link to="/" className="backhome">Volver Atrás</Link>
      </div>
      <DatedOfToday />
      <AddCouple onClick={addCouple} />
      {parejas.map((pareja, index) => (
        <div key={pareja.id || index} className="inputs-container">
          <InputOrden
            index={index}
            orden={pareja.orden || ""}
            handleInputChange={handleInputChange}
            showlabel= {index===0}
          />
          <InputDancerName
            index={index}
            nombreBailarina={pareja.nombreBailarina}
            nombreBailarin={pareja.nombreBailarin}
            handleInputChange={handleInputChange}
            showlabel= {index===0}
          />
            <div className="inputs-score-container">
          {pareja.puntajes.map((puntaje, puntajeIndex) => (
            <JudgeScoreInput
              key={puntajeIndex}
              judgeLabel={
                index === 0 ? (
                  <EditableJudgeName
                    label={judgeNames[puntajeIndex] || `Juez ${puntajeIndex + 1}`}
                    onLabelChange={(newName) => handleJudgeNameChange(puntajeIndex, newName)}
                  />
                ) : null
              }
              puntaje={puntaje}
              onChange={(e) => handlePuntajeChange(e, index, puntajeIndex)}
            />
          ))}
          </div>
          <JudgeButtons
            index={index}
            onAddJudge={addJudge}
            onRemoveJudge={removeJudge}
          />
          <AverageScore puntajes={pareja.puntajes} showlabel= {index===0}/>
          <RemoveDancer onRemove={removeDancer} index={index} />
        </div>
      ))}
      <SendDataButton onClick={handleSubmit} />
    </section>
  );
}

export default ScoreManagement;