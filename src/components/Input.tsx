import React from "react";
import {GrAdd} from "react-icons/gr"

export interface Props {
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit: React.FormEventHandler<HTMLFormElement> 
}

export const InputField: React.FC<Props> = ({ input, setInput, handleSubmit }) => {
    return (
        <div className="Header">
            <h1>Find the Art Piece!</h1>
            <h4>Enter an artist name down below:</h4>
            <section className="Input-section">
        <form
            className="Input"
            onSubmit={handleSubmit}
            >
            <input
                type="text"
                placeholder="enter an artist"
                className="Header-input"
                value={input}
                name="name"
                onChange={
                    (e) => setInput(e.target.value)
                }
            />
            <button
                className="Submit-btn"
                ><GrAdd/></button>
        </form>
            </section>

        </div>
    )
}