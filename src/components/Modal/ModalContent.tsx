import Button from "../Button/Button"
import { useContext } from "react"
import { ThemeContext } from "../contexts/theme-context"

export const HowToContent = () => {
    return (
        <>
            <div className="Modal-HowTo-Content-Wrapper">
                <div className="Modal-HowTo-Title">
                    <h1>What is Art Finder?</h1>
                </div>
                <p>Art Finder is a project created during my internship
                    program at Dentsu World Services. To put it shortly, it's
                    a simple web page that consumes an API that retrieves
                    information. In this case, it retrieves information about
                    an artist submitted by the user. So go ahead and try it!
                    <br/>
                </p>
                <div className="Modal-HowTo-Title">
                    <h1>How do I use it?</h1>
                </div>
                <p>Enter any artist name into the input field and we 
                    will (maybe) retrieve information on their works.
                    we do strongly advise that you do not forget any 
                    accents that the artists’ names might have! 
                    And please try not to make any typos,
                    or else it won't work (at least not properly).
                </p>
            </div>
            <div className="Modal-HowTo-Footer">
                <h2>Made by <a className="Socials-link" href="https://github.com/isabelamuller" target="_blank" rel="noreferrer">@isabelamuller</a> ○
                    API provided by <a className="Socials-link" href="https://metmuseum.github.io" target="_blank" rel="noreferrer">@metmuseum</a>
                </h2>

            </div>
        </>
    )
}

export const SettingsContent = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)
    return (
        <>
            <div className="Modal-Settings-Wrapper">
                <div className={`Modal-Settings-Title ${theme}-mode`}>
                    <h1>Settings</h1>
                </div>
                <div className="Modal-Settings-Content">
                    <div>
                        <h2>Switch Mode</h2>
                        <h2>Language</h2>
                    </div>
                    <div>
                        <Button handleClick={toggleTheme} >teste1</Button>
                        <h2>teste</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

