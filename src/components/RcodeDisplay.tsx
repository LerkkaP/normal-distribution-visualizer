import React, { useState, useEffect } from "react";
import { ClipBoard } from "../types";
import copyIcon from "../assets/copy.svg"


const RcodeDisplay: React.FC<ClipBoard> = ({ zBelow, zAbove, zBetweenBelow, zBetweenAbove, mean, sd, label }) => {
    const [clipBoard, setClipBoard] = useState("pnorm(value, mean, sd, lower.tail = FALSE)");

    useEffect(() => {
        let newClipBoard = "";
        
        switch(label) {
            case "below":
                newClipBoard = `pnorm(${zBelow}, ${mean}, ${sd})`;
                break;
            case "between":
                newClipBoard = `diff(pnorm(c(${zBetweenBelow}, ${zBetweenAbove}), ${mean}, ${sd}))`
                break;
            case "above":
                newClipBoard = `pnorm(${zAbove}, ${mean}, ${sd}, lower.tail = FALSE)`;
                break;
            default:
                newClipBoard = `pnorm(${zBelow}, ${mean}, ${sd})`;       
                break;
        }

        setClipBoard(newClipBoard);
    }, [zBelow, zAbove, zBetweenBelow, zBetweenAbove, mean, sd, label]);

    return (
        <div className="rcode-section">
            <h2>Corresponding R code</h2>
            <div className="clipboard-container">
                <p>{clipBoard}</p>
                <button 
                    onClick={() =>  navigator.clipboard.writeText(clipBoard)}
                    >                
                    <img src={copyIcon}/>
                </button>
            </div>
        </div>
    )
}

export default RcodeDisplay;

// props: value, mean, sd, area