import React from "react";
import { StyledRegisterVideo } from "./style";
import { createClient } from "@supabase/supabase-js"

//Whiteboarding
// Custon Hook
function useForm (propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues)

    return {
        values,
        handleChange(evento) {
            // console.log(evento.target)
            const value = evento.target.value
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value               
            })
        },
        clearForm(){
            setValues({})
        }
    }
}

const PROJECT_URL = "https://bfgrvjqyofoiqodjicgf.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmZ3J2anF5b2ZvaXFvZGppY2dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0MzQzMTksImV4cCI6MTk4NDAxMDMxOX0.VazPhWcInKnLcJeZ5RD3Aki3pJRkCB7Sp1QvfxLO85c"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)


function getThumb (url){
    return `https://img.youtube.com/vi/${url.split('v=')[1]}/hqdefault.jpg`
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: {
            titulo: "Frostpunk - Neve e Steak tartare",
            url: "https://www.youtube.com/watch?v=QsqatJxAUtk",
        }
    })
    const [formVisivel, setFormVisivel] = React.useState(false)

    

    /* 
        Oque precisamos fazer para o nosso formulário funcionar?
        -Pegar os dados, que precisam vir do state
            -Titúlo
            -URL do vídeo
        -Precisamos do onSubmit do nosso form
        -Limpar o formúlario

    */

    // console.log(formVisivel)

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => { setFormVisivel(true) }}>
                +
            </button>
            {/* {ternários} */}
            {/* {Ou operadores de Curto-circuito } */}
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault()
                        console.log(formCadastro.values)

                        //Contrato entre o FrontEnd e BackEnd
                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumb(formCadastro.values.url),
                            playlist: "jogos"
                        }).then((res) => {
                            console.log(res)
                        }).catch((err) => {
                            console.log('ERRO' + err)
                        })
                        
                        setFormVisivel(false)
                        formCadastro.clearForm()
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => { setFormVisivel(false) }}>
                                x
                            </button>
                            <input
                                placeholder="Titúlo do vídeo"
                                value={formCadastro.values.titulo}
                                name="titulo"
                                onChange={formCadastro.handleChange} 
                            />
                            <input 
                            placeholder="URL do vídeo" 
                            value={formCadastro.values.url}
                            name="url"
                            onChange={formCadastro.handleChange}
                            />
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                ) : null
            }
        </StyledRegisterVideo>
    )
}

//Falta o botão
//Modal
// Controlar o state
// E o formulário


// const [video, setVideo] = React.useState('')      
// const [url, setUrl] = React.useState("")


// const [values, setValues] = React.useState({ titulo: "", url: "" }) - (Mesma coisa acima)