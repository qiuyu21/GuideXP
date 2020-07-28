import React, { useState } from "react";
import "./dropdown.css"

const COLORS = [
    { label: "rgba(0, 0, 0, 1.0)", style: "BLACK" },
    { label: "rgba(255, 0, 0, 1.0)", style: "RED" },
    { label: "rgba(0,255, 0, 1.0)", style: "GREEN" },
    { label: "rgba(0, 0, 255, 1.0)", style: "BLUE" }
];


export default function ControlDropdown(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");

    const toggleOpen = () => {
        console.log("toggle");
        setIsOpen(!isOpen);
    }

    return (
        <div className="color-select">
            <span className="inline-block color-black" onClick={toggleOpen}></span>
            <div className={isOpen ? "color-select-div" : "display-none"}>
                <span className="inline-block color-black"></span>
                <span className="inline-block color-black"></span>
                <span className="inline-block color-black"></span>
                <span className="inline-block color-black"></span>
                <span className="inline-block color-black"></span>
                <span className="inline-block color-black"></span>
                <span className="inline-block color-black"></span>
                <span className="inline-block color-black"></span>
            </div>
        </div>
    )
}