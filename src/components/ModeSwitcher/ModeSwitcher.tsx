import { useState, type Dispatch, type SetStateAction } from "react";

import lightLogo from "../../assets/light-mode.svg";
import darkLogo from "../../assets/dark-mode.svg";

interface IProps {
    theme: string;
    setTheme: Dispatch<SetStateAction<string>>;
}

export function ModeSwitcher({ theme, setTheme }: IProps) {
    const [whichSvg, setWhichSvg] = useState<string>(lightLogo);
    function handleClick() {
        if (theme === "lightMode") {
            setTheme("darkMode")
            setWhichSvg(lightLogo);
            localStorage.setItem("themeMode", "darkMode");
        }
        else if (theme === "darkMode") {
            setTheme("lightMode")
            setWhichSvg(darkLogo);
            localStorage.setItem("themeMode", "lightMode");
        };
    };

    window.addEventListener("keydown", (e)=>{
        if(e.code==="KeyT" && e.altKey) handleClick();
    });
    
    return (
        <button onClick={handleClick} className="mode">
            <img src={whichSvg} alt="modeImg" />
        </button>
    );
};