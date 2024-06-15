import React from "react";

const InputOrden = ({ index, orden, handleInputChange }) => {
    return (
        <>
            <div className="input-order-container">
            <h2 className="input-option-name"> Orden </h2>
            <input
                className="input-order"
                type="number"
                value={orden || ""}
                onChange={(e) => handleInputChange(e, index, "orden")}
            />
            </div>
        </>
    )
}

export default InputOrden;