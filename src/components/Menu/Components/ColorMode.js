import React from "react";

export const ColorModeContext = React.createContext({
    mode: '',
    setMode: () => { alert('Você precisa me configura primeiro')},
    toggleMode: () => { alert('Você precisa me configura primeiro')},
})

export default function ColorModeProvider(props) {
    const [mode, setMode] = React.useState(props.initialMode)
    //Entender por que esta sendo ignorado?

    function toggleMode() {
        if(mode === 'dark') setMode('light')
        if(mode === 'light') setMode('dark')
    }

    return(
        <ColorModeContext.Provider value={{mode: mode, setMode: setMode, toggleMode: toggleMode}}>
            {props.children}
        </ColorModeContext.Provider>
    )
}