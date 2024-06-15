import React, {useState, useEffect} from "react";
import "../assets/DateOfToday.css"

function DatedOfToday() {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const intervalID = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(intervalID);
    }, []);

    const formattedDate = () => {
        const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
        const diaSemana = diasSemana[currentDate.getDay()];
        const diaMes = currentDate.getDate();
        const mes = meses[currentDate.getMonth()];
        const año = currentDate.getFullYear();
    
        return `${diaSemana} ${diaMes} de ${mes} del ${año}`;
    };

    return (
        <div className="date-container">
            <p className="dated">{formattedDate()}</p>
        </div>
    );
}

export default DatedOfToday;