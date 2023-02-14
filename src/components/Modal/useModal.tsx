import { useState } from "react";

export const useModalHowTo = () => {
    const [isOpenHowTo, setisOpenHowTo] = useState(false)

    const toggleHowTo = () => {
        setisOpenHowTo(!isOpenHowTo)
    }

    return {
        isOpenHowTo,
        toggleHowTo
    }
}

export const useModalSettings = () => {
    const [isOpenSettings, setIsOpenSettings] = useState(false)

    const toggleSettings = () => {
        setIsOpenSettings(!isOpenSettings)
    }
    
    return {
        isOpenSettings, 
        toggleSettings
    }
}