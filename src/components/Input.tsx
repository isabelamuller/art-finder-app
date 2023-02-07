import React from "react";
import { CgAddR } from "react-icons/cg"
import { ThemeContext } from "./contexts/theme-context";
import { useContext } from "react";


export interface Props {
    input: string,
    oldInput: string,
    validObjects: Array<Object>,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit: React.FormEventHandler<HTMLFormElement>
}


export const InputField: React.FC<Props> = ({ input, setInput, handleSubmit }) => {
    const { theme } = useContext(ThemeContext)
    return (
        <>
         <div className="content">
                <div className={`Header ${theme}-theme`}>
                    <h1 className={`title ${theme}-theme`}>ART FINDER!</h1>
                    {/* <h4>Enter an artist name down below:</h4> */}
                </div>
            <section className="Input-section">
                <form
                    className="Input"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        placeholder="enter an artist"
                        className={`Header-input ${theme}-theme`}
                        value={input}
                        name="name"
                        onChange={
                            (e) => setInput(e.target.value)
                        }
                    />
                    <button className="Submit-btn">
                        <CgAddR className={`submit-btn-icon ${theme}-theme`} />
                        </button>
                </form>
            </section>

        </div>
        
        </>


    )
}
