import React from "react";

const SendDataButton = ({ onClick }) => {
    return (
        <div className="bt-sendData">
            <button className="send-data" onClick={onClick}>Enviar Datos</button>
        </div>
    );
};

export default SendDataButton;