import React from "react";
import LoadingAnimation from "../images/Loading.svg"

export default function LoadingTokenScreen() {
    return (
        <div className="loading__container">
            <img src={LoadingAnimation} className="loading__animation" />
        </div>
    )
}