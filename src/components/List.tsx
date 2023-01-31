import React from "react";
import { IItems } from "../services/api";


const Pieces: React.FC<IItems> = ({addressedValues}) => {

    const renderPieces = () => {
        return addressedValues.forEach(() => {
            addressedValues.map((item) => {
                return (
                    <li className="List">
                        <div className="single-art">
                            <img className="art-img" src={item.img} alt="deus no comando" />
                            <h1 className="art-title">{item.title}</h1>
                            <h2 className="art-artist">Artist: {item.artistName}</h2>
                            <h3 className="art-year">Year: {item.year}</h3>
                            <h5 className="art-url">Know more: {item.url}</h5>
                        </div>
                    </li>
                )
            })

        })

    }

    return (
        <>
            {renderPieces()}
        </>
    )


}

export default Pieces;