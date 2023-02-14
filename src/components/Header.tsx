import React from "react";
import { ThemeContext } from "./contexts/theme-context";
import { useContext } from "react";


const Header: React.FC= () => {

    const { theme } = useContext(ThemeContext)
    return (
        <>
           
        <div className={`Header ${theme}-theme`}>
            <h1 className={`title ${theme}-theme`}>ART FINDER!</h1>
        </div>
        
        </>
    )
}

export default Header;

// arrumar essa porra 
// cara n rolou