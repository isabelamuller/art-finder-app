import React from "react";
import { MdDownloadDone } from "react-icons/md"
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
            <section className="Input-section">
                <form
                    className="Input-Form"
                    onSubmit={handleSubmit}
                >
                    <div className="Input-Box">
                        <div className="testezinho">
                    <input
                        type="text"
                        placeholder="enter an artist name"
                        className={`Input ${theme}-theme`}
                        value={input}
                        name="name"
                        onChange={
                            (e) => setInput(e.target.value)
                        }
                    />
                        </div>
                    </div>
                    <button className="Submit-btn">
                        <MdDownloadDone className={`submit-btn-icon ${theme}-theme`} />
                        </button>
                </form>
            </section>


        
        </>


    )
}
