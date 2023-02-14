import { ButtonProps } from './types'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/theme-context'
import { BsFillMoonStarsFill } from "react-icons/bs"

const Button: React.FC<ButtonProps> = ({ handleClick, children }) => {
    const { theme } = useContext(ThemeContext)
    return (
        <BsFillMoonStarsFill className={`Btn-Mode ${theme}-theme`} onClick={handleClick}>
            {children}
        </BsFillMoonStarsFill>
    )
}
export default Button