import React from "react"
import "./style.css"

export default function Cell(props) {
    return (
        <div 
            className="cell-design" 
            style={props.style}
            onClick={() => props.handleClick(props.id)}
        ><p>{props.value}</p></div>
    )
};