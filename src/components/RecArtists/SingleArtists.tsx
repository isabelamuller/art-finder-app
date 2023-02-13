import React from "react";

export interface ISingle {
    img: string,
    name: string,
    setName:React.SetStateAction<string>,
    onClick?: (selectedArtistName: ISingle["name"]) => Promise<void>
}

const SingleArtists: React.FC<ISingle> = ({ img, name, onClick }) => {

    return (
        <div className="Single-Artist-Wrapper" onClick={() => onClick?.(name)}>
            <img src={img} alt="sla mano" className="Single-Artist-Img"/>
            <h1 className="Single-Artist-Name">{name}</h1>
        </div>
    )
}

export default SingleArtists;