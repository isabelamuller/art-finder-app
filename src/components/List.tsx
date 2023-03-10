import React from "react";
import { IItems } from "../services/api";
import { useContext } from "react";
import { ThemeContext } from "./contexts/theme-context";


const Pieces: React.FC<IItems> = ({ addressedValues }) => {
    console.log(addressedValues, "pieces")
    const { theme } = useContext(ThemeContext)
    const renderPieces = () => {

        return addressedValues.map((item) => {
            return (
                <>
                    <div key="1" className={`wrapper  ${theme}-theme`}>
                        <div className={`single-art ${theme}-theme`}>
                            <div className={`img-wrapper ${theme}-theme`} >
                                <img className="art-img" alt="not found" src={item.img} />
                            </div>
                            <div className="card-text-wrapper">
                                <div className="card-text-content">
                                    <h1 className={`art-title ${theme}-mode`}>{item.title}</h1>
                                    <h2 className={`art-artist ${theme}-mode`}>{item.artistName}</h2>
                                    <h3 className={`art-year ${theme}-mode`}>{item.year}</h3>
                                    <a className={`art-url  ${theme}-theme`} href={item.url} target="_blank" rel="noreferrer">
                                        <button className={`Btn-Url ${theme}-theme`}>Know More</button>
                                    </a>
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