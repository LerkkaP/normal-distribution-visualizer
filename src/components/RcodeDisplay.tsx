import { useState } from "react";

const RcodeDisplay = () => {
    const [clipBoard, setClipBoard] = useState("pnorm(value, mean, sd, lower.tail = FALSE)")

    switch() {
        case x:
            setClipBoard("pnorm(value, mean, sd, lower.tail = FALSE)")
            break;
        case y:
            setClipBoard("pnorm(value, mean, sd, lower.tail = TRUE)")
            break;
        case z:
            setClipBoard("pnorm(value, mean, sd, lower.tail = FALSE)")
            break;
        default:
            setClipBoard("pnorm(value, mean, sd, lower.tail = FALSE)")
            break;
    }

    return (
        <div>
            <h1>Corresponding R code</h1>
            <div className="clipboard-container">
                <p>{clipBoard}</p>
                <button 
                    onClick={() =>  navigator.clipboard.writeText(clipBoard)}
                    >
                    Copy
                </button>
            </div>
        </div>
    )
}

export default RcodeDisplay;