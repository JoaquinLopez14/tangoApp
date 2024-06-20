  import React, { useState } from 'react';
  import { HashRouter as Router, Route, Routes} from 'react-router-dom';
  import Home from "./main/Home";
  import ScoreManagement from './main/ScoreManagement';
  import TableOfPoints from './main/TableOfPoints';
  import '@fontsource-variable/manrope';
  import '@fontsource/rye';
  import '@fontsource/poppins';

  function App() {
    const [datos, setDatos] = useState({});

    const enviarDatos = (nuevaData) => {
      setDatos(nuevaData);
    }
    
    const ipcHandle = () => window.electron.ipcRenderer.send('ping')
    
    return (
      <section className="main-sec">
          <Router>
          <Routes>
            <Route path = "/" element={<Home/>}/>
            <Route path = "/score-management" element={<ScoreManagement enviarDatos={enviarDatos} />} />
            <Route path = "/table-of-points" element={<TableOfPoints datos={datos}/>} />
          </Routes>
        </Router>
      </section>
    )
  }

  export default App

