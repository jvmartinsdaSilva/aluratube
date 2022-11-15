import React from "react";
import { ThemeProvider } from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import ColorModeProvider , {ColorModeContext} from "../src/components/Menu/Components/ColorMode";
import RegisterVideo from "../src/components/Menu/Components/RegisterVideo";

// _app.js -> Definições globais de NextJS
// ThemeProvider -> Prover o tema para a App toda
// ColorModeProvider -> Prover o state do light ou dark mode para todo mundo


const theme = {
    light: {
        backgroundBase: "#f9f9f9",
        backgroundLevel1: "#ffffff",
        backgroundLevel2: "#f0f0f0",
        borderBase: "#e5e5e5",
        textColorBase: "#222222",
    },
    dark: {
        backgroundBase: "#181818",
        backgroundLevel1: "#202020",
        backgroundLevel2: "#313131",
        borderBase: "#383838",
        textColorBase: "#FFFFFF",
    }
};

function ProviderWrapper(props) {
    return (
        <ColorModeProvider initialMode={'dark'}>
            {props.children}
        </ColorModeProvider>
    )
}

function Myapp ({ Component, pageProps}){
    const contexto = React.useContext(ColorModeContext)
    // console.log(contexto)
    return (       
        <ThemeProvider theme={theme[contexto.mode]}>
            <CSSReset />
            <Component {...pageProps} />
            <RegisterVideo />
        </ThemeProvider>      
    )
}

export default function _App(props) {
    return(
        <ProviderWrapper>
            <Myapp {...props} />
        </ProviderWrapper>
    )
}