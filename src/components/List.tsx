import React from "react";
import { IItems } from "../services/api";


const Pieces: React.FC<IItems> = ({ addressedValues }) => {
    const renderPieces = () => {
        return addressedValues.map((item) => {
            return (
                <>
                    <div className="wrapper">
                        <div>
                        </div>
                        <div className="single-art">
                            <div className="img-wrapper">
                                <img className="art-img" src={item.img} alt="deus no comando" />
                            </div>
                            <div className="card-text-wrapper">
                                <div className="card-text-content">
                                    <h1 className="art-title">{item.title}</h1>
                                    <h2 className="art-artist">{item.artistName}</h2>
                                    <h3 className="art-year">{item.year}</h3>
                                    <h5 className="art-url">Know more: {item.url} ARRUMAR</h5> 
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            )
        })
    }

    return (
        <>
            {renderPieces()}
        </>
    )


}

export default Pieces;