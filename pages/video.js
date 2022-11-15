import React from "react"
import { ColorModeContext } from "../src/components/Menu/Components/ColorMode"
import config from "../config.json"

export default function Video() {
    const contexto = React.useContext(ColorModeContext)
    return(
        <div>
            Video
            <button onClick={() => {contexto.toggleMode()}}>Mudar estado</button>
            

        </div>
    )
}