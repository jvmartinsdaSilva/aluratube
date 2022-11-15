import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu/";
import { StyledBanner } from "../src/components/StyledBanner";
import { StyledTimeline } from "../src/components/StyledTimeline"
import { StyledFavorites } from "../src/components/StyledFavorites";

import { videoService } from "../src/services/videoService";


function HomePage() {
    const service = videoService()
    //console.log(config.playlists)
    const [ValorDoFiltro, setValorDofiltro] = React.useState("")
    // const playlists = {
    //     'jogos': []
    // }
    const [playlists, setPlaylists] = React.useState({})

    React.useEffect(() => {
        service.getAllVideos()
            .then((dados) => {
                console.log(dados.data)
                //Forma imutavvel
                const novasPlaylists = { ...playlists }
                dados.data.forEach((video) => {
                    if (!novasPlaylists[video.playlist]) {
                        novasPlaylists[video.playlist] = []
                    }
                    novasPlaylists[video.playlist].push(video)
                })
                setPlaylists(novasPlaylists)
            })
    }, [])

    return (

        <>

            <div >
                <Menu ValorDoFiltro={ValorDoFiltro} setValorDofiltro={setValorDofiltro} />
                {/* Props Drilling */}
                <Banner />
                <Header />
                <Timeline searchValue={ValorDoFiltro} playlists={playlists}>
                    Conteudo
                </Timeline>
                <Youtubers Favorites={config.Favorites}>

                </Youtubers>
            </div>

        </>
    )
}

export default HomePage

// function Menu() {
//      return (
//          <div>
//              Menu
//          </div>
//      )
// }

const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%
    }

    .userInfo{
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`

function Header() {
    return (
        <StyledHeader>
            {/* <img src="banner" /> */}

            <section className="userInfo">
                <img src={`https://github.com/${config.github}.png`} />

                <div>

                    <h2>{config.name}</h2>
                    <p>{config.job}</p>

                </div>
            </section>

        </StyledHeader>
    )
}

function Banner() {
    return (
        <StyledBanner />
    )
}



function Timeline({ searchValue, ...props }) {
    //console.log('Dentro do componente', props.playlists)
    const playlistsNames = Object.keys(props.playlists)

    // Stateman
    // Retorn por expreção

    return (
        <StyledTimeline>
            {playlistsNames.map((playlistsName) => {
                const videos = props.playlists[playlistsName]
                // console.log(videos)
                return (
                    <section key={playlistsName} >
                        <h2 >{playlistsName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase()
                                const searchValueNormalized = searchValue.toLowerCase()
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {

                                return (
                                    <a key={video.url} href='/video' target='_blank'>
                                        <img src={video.thumb} />
                                        <span>{video.title}</span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}


function Youtubers(props) {
    const Youtubers = props.Favorites

    return (
        <StyledFavorites>
            <h2>Criadores</h2>
            {Youtubers.map((youtuber) => {
                return (

                    <div key={youtuber}>
                        <a href={youtuber.url}>
                            <img src={youtuber.img} />
                            <h3>{youtuber.nome}</h3>
                        </a>
                    </div>
                )
            })}
        </StyledFavorites>
    )
}