import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom'
import Pizarron from './Pizarron.js';
import PacmanGame from './PacmanGame.js'
import NumerosGame from './NumerosGame.js';
import ConjuntosGame from './ConjuntosGame.js'
import Window from './Window.js'
import SopaGame from './SopaGame.js'
import PlataformasGame from './PlataformasGame.js'
import Header from './Header.js';
import iconBuscar from '../img/Menu/iconBuscar.svg';
import iconCaif from '../img/Menu/iconCaif.svg';
import iconClases from '../img/Menu/iconClases.svg';
import iconInscrip from '../img/Menu/iconInscrip.svg';
import iconJugar from '../img/Menu/iconJugar.svg';
import iconRanking from '../img/Menu/iconRanking.svg';
import footer from '../img/Menu/footer.svg';
import Derecha from '../img/Derecha.svg'
import Izq from '../img/Izq.svg'
import titulo_menu from '../img/Menu/menu-titulo.svg'
import search_titulo from '../img/Buscador/search-titulo.svg'
import iconLupa from '../img/Buscador/iconLupa.svg'
import iconLupa2 from '../img/Buscador/iconLupa2.svg'
import iconEquis from '../img/Buscador/iconEquis.svg'
import iconAutor from '../img/Buscador/iconAutor.svg'
import iconFecha from '../img/Buscador/iconFecha.svg'
import iconJuego from '../img/iconJugar.svg'
import iconNacion from '../img/Buscador/iconNacion.svg'
import clases_titulo from '../img/Clases/titulo-clases.svg'
import calif_titulo from '../img/Calificaciones/titulo_calif.svg'
import titulo_jugar from '../img/Jugar/titulo_jugar.svg'
import iconMaintenance from '../Imagenes/iconMantenimiento.png'

import new_icon from '../img/Jugar/new_icon.svg';
import iconTodos from '../img/iconJugar.svg'
import ranking_titulo from '../img/Ranking/Ranking-titulo.svg'

import Instrucciones from './Instrucciones.js'

import ItemRanking from './ItemRanking.js'

import WindowMensaje from './/WindowMensajes.js'


//Iconos modulo "Jugar"
import iconPacman from '../img/Jugar/icon_Pacman.svg'
import iconAlien from '../img/Jugar/icon_Alien.svg'
import iconSopa from '../img/Jugar/icon_Sopa.svg'
import iconPlat from '../img/Jugar/icon_Plat.svg'
import iconPlat2 from '../img/Jugar/iconPlataformas2.svg'

import iconNum from '../img/Jugar/icon_numeros.svg'



import WindowGetOut from './WindowGetOut.js'

import './AppStudent.css'

export default class AppStudent extends Component {


    constructor() {
        super()
        this.code = ""
        this.tareaBuscada = ""
        this.keyTarea = ""
        this.cont = 0
        
        
        
        
      

        this.state = {
            juegoLibre: false,
            estWindow: "none",
            estWindowMensaje:"none",
            titulo:"",
            mensaje:"",
            leiInstruc: false,
            windowIns:(window.screen.width > 768)?"block":"none",
            mensajeBusqueda:"",
            windowEstAvailable:false


        }
    }


    render() {
        return (
            <div>
                {this.EstadoApp()}
            </div>
        )
    }



    EstadoApp() {
        /*variable que recibe valor cuando seleccionamos una tarea <Pizarron> lo cual indica
        que el usuario quiere comenzar a hacer su actividad*/
        if (this.props.tareaHacer.length == 0) {

            return (
                <div className="content-app" >

                    <Router>
                        <Header funcionamiento="Link" DesactivarVentana={this.props.DesactivarVentana} ActivarVentana={this.props.ActivarVentana} imgUser={null}></Header>
                        <Route path="/Menu">
                            <main className="main-menu" onClick={(e)=>{this.props.DesactivarVentana()}}>
                                <img className="titulo-modulo titulo-modulo--menu" src={titulo_menu}></img>
                                <Link style={{ textDecoration: 'none' }} className="link-modulo link-modulo--jugar" to="/Jugar" onClick={()=>{
                                    if(window.screen.width <=1024)
                                    {
                                        this.setState({windowEstAvailable:true})
                                    }
                                    else{
                                        this.setState({windowEstAvailable:false})

                                    }
                                }}>
                                    <div className="main-menu-cont">
                                        <img className="main-menu-cont__menu" src={iconJugar}></img>
                                        <p className="main-menu-cont__name">Jugar</p>
                                    </div>

                                </Link>

                                <Link onClick={() => { this.props.ViweRanking() }} style={{ textDecoration: 'none' }} className="link-modulo link-modulo--ranking" to="/Ranking">
                                    <div className="main-menu-cont">
                                        <img className="main-menu-cont__menu" src={iconRanking}></img>
                                        <p className="main-menu-cont__name">Ranking</p>
                                    </div>
                                </Link>

                                <Link onClick={() => { this.setState({ estWindow: "block" }) }} style={{ textDecoration: 'none' }} className="link-modulo link-modulo--inscrib" to="/Menu">
                                    <div className="main-menu-cont">
                                        <img className="main-menu-cont__menu" src={iconInscrip}></img>
                                        <p className="main-menu-cont__name">Inscribirme</p>
                                    </div>
                                </Link>

                                <Link style={{ textDecoration: 'none' }} className="link-modulo link-modulo--clases" to="/Clases">
                                    <div className="main-menu-cont" onClick={() => {
                                         if(window.screen.width <=1024)
                                            {
                                                this.setState({windowEstAvailable:true})
                                            }
                                            else{
                                                this.setState({windowEstAvailable:false})
                                                console.log(this.props.idUser)
                                                this.props.ConsultaRelacional(this.props.idUser, "InscripcionClase", "Clases", null)
        
                                            }
                                       
                                    }}>
                                        <img className="main-menu-cont__menu" src={iconClases}></img>
                                        <p className="main-menu-cont__name">Clases</p>
                                    </div>
                                </Link>

                                <Link style={{ textDecoration: 'none' }} className="link-modulo link-modulo--buscar" to="/Buscar" onClick={()=>{
                                     if(window.screen.width <=1024)
                                        {
                                            this.setState({windowEstAvailable:true})
                                        }
                                        else{
                                            this.setState({windowEstAvailable:false})
    
                                        }
                                }}>
                                    <div className="main-menu-cont">
                                        <img className="main-menu-cont__menu" src={iconBuscar}></img>
                                        <p className="main-menu-cont__name">Buscar Juego</p>
                                    </div>
                                </Link>

                                <Link style={{ textDecoration: 'none' }} className="link-modulo link-modulo--calif" to="/Logros">
                                    <div className="main-menu-cont" onClick={() => {
                                        console.log(this.props.idUser)
                                        this.props.ConsultaRelacional(this.props.idUser, "InscripcionClase", "Clases", null)
                                    }}>
                                        <img className="main-menu-cont__menu" src={iconCaif}></img>
                                        <p className="main-menu-cont__name">Calificaciones</p>
                                    </div>
                                </Link>



                            </main>
                        </Route>


                        <Route path="/Jugar">

                        <main className="main-menu">
                                <img className="titulo-modulo titulo-modulo--menu" src={titulo_jugar}></img>


                                <div className="link-modulo link-modulo--jugar" onClick={() => {
                                            this.setState({ juegoLibre: true })
                                            if(!this.props.JuegosPorEdad("PacMan")){
                                                console.log("ACTIVAR CENTANA NO HAY JUEGOS")
                                                this.activarWindowMensaje("Aun no hay juegos para jugar de este tipo, espera a que los docentes creen algunos")
                                            }
                                        }}>
                                    <div className="main-menu-cont">
                                        <img className="main-menu-cont__menu" src={iconPacman}></img>
                                        <p className="main-menu-cont__name">Pacman</p>
                                    </div>

                                </div>

                                
            

                                <div className="link-modulo link-modulo--ranking" onClick={() => { 
                                    this.props.ViweRanking() 
                                    this.setState({ juegoLibre: true })
                                    if(!this.props.JuegosPorEdad("Numeros")){
                                        console.log("ACTIVAR CENTANA NO HAY JUEGOS")
                                        this.activarWindowMensaje("Aun no hay juegos para jugar de este tipo, espera a que los docentes creen algunos")
                                    }
                                }}>
                                    <div className="main-menu-cont">
                                        <img className="main-menu-cont__menu" src={iconNum}></img>
                                        <p className="main-menu-cont__name">Numeros</p>
                                    </div>
                                </div>


    

                                <div  className="link-modulo link-modulo--inscrib" onClick={() => { 
                                    this.setState({ juegoLibre: true })
                                    if(!this.props.JuegosPorEdad("Plataformas")){
                                        console.log("ACTIVAR CENTANA NO HAY JUEGOS")
                                        this.activarWindowMensaje("Aun no hay juegos para jugar de este tipo, espera a que los docentes creen algunos")
                                    } 
                                    
                                    }}>
                                    <div className="main-menu-cont">
                                        <img className="main-menu-cont__menu" src={iconPlat2}></img>
                                        <p className="main-menu-cont__name">Plataformas</p>
                                    </div>
                                </div>


                                <div className="link-modulo link-modulo--clases" onClick={() => {
                                        console.log(this.props.idUser)
                                        this.props.ConsultaRelacional(this.props.idUser, "InscripcionClase", "Clases", null)

                                        this.setState({ juegoLibre: true })
                                        if(!this.props.JuegosPorEdad("Conjuntos")){
                                            console.log("ACTIVAR CENTANA NO HAY JUEGOS")
                                            this.activarWindowMensaje("Aun no hay juegos para jugar de este tipo, espera a que los docentes creen algunos")
                                        }

                                    }}>
                                    <div className="main-menu-cont" >
                                        <img className="main-menu-cont__menu" src={iconAlien}></img>
                                        <p className="main-menu-cont__name">Atrapar</p>
                                    </div>
                                </div>



                                <div className="link-modulo link-modulo--buscar" onClick={() => {
                                            this.setState({ juegoLibre: true })
                                            if(!this.props.JuegosPorEdad("Sopa")){
                                                console.log("ACTIVAR CENTANA NO HAY JUEGOS")
                                                this.activarWindowMensaje("Aun no hay juegos para jugar de este tipo, espera a que los docentes creen algunos")
                                            }
                                        }}>
                                    <div className="main-menu-cont">
                                        <img className="main-menu-cont__menu" src={iconSopa}></img>
                                        <p className="main-menu-cont__name">Sopa de letras</p>
                                    </div>
                                </div>

                                

                            </main>


                           {/* <div className="modulo modulo--up">
                                <img className="titulo-modulo" src={titulo_jugar}></img>

                                <div className="content-layout-juego">

                                    <div className="jugar-parte-up" style={{display:"none"}}>
                                        <div className="content-inputs">

                                            <input className="content-inputs__inputs" type="text" onChange={(e) => {
                                                this.props.WriteJuego(e.target.value)
                                                this.tareaBuscada = e.target.value
                                            }} placeholder="Juego...">

                                                                    </input>
                                            <div className="content-icons" onClick={null}>
                                                <img className="icons-inputs" src={iconEquis}></img>
                                            </div>

                                            <div className="content-inputs__linea">
                                            </div>

                                            <div className="content-icons" onClick={(e) => { this.props.BuscarJuego(this.tareaBuscada) }}>
                                                <img className="icons-inputs" src={iconLupa}></img>
                                                
                                                
                                            </div>

                                        </div>

                                        <div className="jugar-parte-up-filtros">
                                            <div className="filtro-button">
                                                <img className="filtro-button__img" src={iconTodos}></img>
                                                <p className="filtro-button__texto">Todos</p>
                                            </div>

                                            <div className="filtro-button">
                                                <img className="filtro-button__img" src={new_icon}></img>
                                                <p className="filtro-button__texto">Nuevos</p>
                                            </div>

                                            <div className="filtro-button">
                                                <img className="filtro-button__img" src={iconRanking}></img>
                                                <p className="filtro-button__texto">Populares</p>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="catalogo-juegos">


                                        <div onClick={() => {
                                            this.setState({ juegoLibre: true })
                                            if(!this.props.JuegosPorEdad("PacMan")){
                                                console.log("ACTIVAR CENTANA NO HAY JUEGOS")
                                                this.activarWindowMensaje("Alerta","Aun no hay juegos para jugar de este tipo, espera a que los docentes creen algunos")
                                            }
                                        }} className="main-menu-cont main-menu-cont--catalogo">
                                            <img className="main-menu-cont__icon" src={iconPacman}></img>
                                            <p className="main-menu-cont__name">Pacman</p>
                                        </div>

                                        <div onClick={() => {
                                            this.setState({ juegoLibre: true })
                                            if(!this.props.JuegosPorEdad("Sopa")){
                                                console.log("ACTIVAR CENTANA NO HAY JUEGOS")
                                                this.activarWindowMensaje("Alerta","Aun no hay juegos para jugar de este tipo, espera a que los docentes creen algunos")
                                            }
                                        }} className="main-menu-cont main-menu-cont--catalogo">
                                            <img className="main-menu-cont__icon" src={iconSopa}></img>
                                            <p className="main-menu-cont__name">Sopa letras</p>
                                        </div>

                                        <div onClick={() => {
                                            this.setState({ juegoLibre: true })
                                            if(!this.props.JuegosPorEdad("Numeros")){
                                                console.log("ACTIVAR CENTANA NO HAY JUEGOS")
                                                this.activarWindowMensaje("Alerta","Aun no hay juegos para jugar de este tipo, espera a que los docentes creen algunos")
                                            }
                                            
                                        }} className="main-menu-cont main-menu-cont--catalogo">
                                            <img className="main-menu-cont__icon" src={iconNum}></img>
                                            <p className="main-menu-cont__name">Numeros</p>
                                        </div>

                                        <div onClick={() => {
                                            this.setState({ juegoLibre: true })
                                            if(!this.props.JuegosPorEdad("Plataformas")){
                                                console.log("ACTIVAR CENTANA NO HAY JUEGOS")
                                                this.activarWindowMensaje("Alerta","Aun no hay juegos para jugar de este tipo, espera a que los docentes creen algunos")
                                            }
                                        }} className="main-menu-cont main-menu-cont--catalogo">
                                            <img className="main-menu-cont__icon" src={iconPlat}></img>
                                            <p className="main-menu-cont__name">Plataformas</p>
                                        </div>

                                        <div onClick={() => {
                                            this.setState({ juegoLibre: true })
                                            if(!this.props.JuegosPorEdad("Conjuntos")){
                                                console.log("ACTIVAR CENTANA NO HAY JUEGOS")
                                                this.activarWindowMensaje("Alerta","Aun no hay juegos para jugar de este tipo, espera a que los docentes creen algunos")
                                            }
                                        }} className="main-menu-cont main-menu-cont--catalogo">
                                            <img className="main-menu-cont__icon" src={iconAlien}></img>
                                            <p className="main-menu-cont__name">Atrapar</p>
                                        </div>




                                    </div>
                                </div>

                            </div>*/}
                        </Route>

                        <Route path="/Ranking">
                            <section className="modulo modulo--up" style={{background:"none"}}>
                                {/*<img className="titulo-modulo" src={ranking_titulo}></img>*/}

                                <div style={{margin:"auto", display:"flex",flexDirection:"column"}}>
                                    <img style={{width:"15em",height:"15em",alignSelf:"center"}} src={iconMaintenance}></img>
                                    <p className="main-menu-cont__name" style={{fontSize:"2em",marginTop:"1em"}}>Modulo en mantenimiento</p>
                                </div>
                                
                                {/*<div className="ui-ranking">
                                    <div className="lista-best-users">
                                        {this.props.usuariosRanking.map(e => {
                                            this.cont++

                                            return (
                                                <ItemRanking modifificador={""} nombre={e.nombre} estrellas={e.estrellas} promedio={e.promedio} cont={this.cont} ></ItemRanking>
                                            )
                                        })}
                                    </div>

                                    <ItemRanking modifificador={"card-user-rank--me"} nombre={"Francisco"} estrellas={3} promedio={4} cont={102} ></ItemRanking>
 

                                    </div>*/}

                            </section>
                        </Route>
                        <Route path="/Inscribirme">
                            {/* <h1>Inscribirme</h1>
                            <p>Codigo de clase:</p>
                            <input onChange={(e) => { this.code = e.target.value }} type="text"></input>
                            <button onClick={() => {
                                console.log(this.code)
                                this.props.ConsultarCodigo(this.code)
                            }
                            }>Aceptar</button> */}



                        </Route>

                        <Route path="/Clases">
                            <Pizarron elementos="clases" tituloModulo={clases_titulo} ReiniciarValores={this.props.ReiniciarValores} queryCorrecta="pendientes" ActualizarEst={this.props.ActualizarEst} ConsultarTarea={this.props.ConsultarTarea} ConsultaRelacional={this.props.ConsultaRelacional} tareasPendientes={this.props.tareasPendientes} ConsultarTareas={this.props.ConsultarTareas} arrayDatos={this.props.clases}></Pizarron>

                        </Route>



                        <Route path="/Buscar">
                            <Router>
                                <Route path="/BuscarTarea">
                                    <section className="modulo" onClick={(e)=>{this.props.clearNombresJuegos()}}>
                                        <img className="titulo-modulo" src={search_titulo}></img>

                            
                                        <div className="content-inputs content-inputs--buscar">
                                            <div className="content-icons content-icons--lupa">
                                                <img className="icons-inputs icons-inputs--lupa" src={iconLupa2}></img>
                                            </div>

                                            <input id="input_busqueda_rapida" className="content-inputs__inputs content-inputs--main" type="text" onChange={(e) => {
                                                this.props.WriteJuego(e.target.value)
                                                this.tareaBuscada = e.target.value
                                            }} placeholder="Juego...">

                                            </input>
                                            <div className="content-icons" onClick={null}>
                                                <img className="icons-inputs" src={iconEquis} onClick={(e=>{
                                                    var input = document.getElementById("input_busqueda_rapida")
                                                    input.value = ""
                                                })}></img>
                                            </div>

                                        </div>

                                        <div className="container-buscadorRapido  content-inputs--buscar">
                                            <div id="busquedas_buscador_rapido" className="buscadorRapido">
                                                {
                                                    
                                                    this.props.nombresJuegos.map(c => {
                                                        return <p onClick={(e)=>{
                                                            var input = document.getElementById("input_busqueda_rapida")
                                                            input.value = e.target.textContent

                                                            this.props.clearNombresJuegos()

                                                        }} className='result_busqueda'>{c.nombre}</p>
                                                    })
                                                }
                                            </div>

                                        </div>
                                       
                                        
                                        <Link to="/TareasEcontradas"  style={{zIndex:0}}><button className="buttons buttons--buscador" onClick={(e) => { 
                                         
                                            var men  =this.props.BuscarJuego(this.tareaBuscada)
                                            console.log("MEN:")
                                            console.log(men)
                                            this.setState({mensajeBusqueda:men})}}>Buscar</button></Link>
                                    </section>
                                </Route>

                                <Route path="/TareasEcontradas">
                                    <section className="modulo modulo--up modulo--search">
                                        <div className="content-inputs content-inputs--search">

                                            <input id="inputLargo" className="content-inputs__inputs" type="text" onChange={(e) => {
                                                this.props.WriteJuego(e.target.value)
                                                this.tareaBuscada = e.target.value
                                            }} placeholder="Juego...">

                                            

                                            </input>
                                            <div className="content-icons" onClick={null}>
                                                <img className="icons-inputs" src={iconEquis} onClick={(e)=>{
                                                    var input = document.getElementById("inputLargo")
                                                    input.value = ""
                                                    this.props.clearNombresJuegos()}}></img>
                                            </div>

                                            <div className="content-inputs__linea">
                                            </div>

                                            <div className="content-icons" >
                                                <img className="icons-inputs" src={iconLupa} onClick={(e) => { 
                                            var men  =this.props.BuscarJuego(this.tareaBuscada)
                                            this.setState({mensajeBusqueda:men})}}></img>
                                            </div>

                                        </div>

                                        <div className="container-buscadorRapido container-buscadorRapido--search">
                                                <div id="busquedas_buscador_rapido" className="buscadorRapido">
                                                {
                                                    
                                                    this.props.nombresJuegos.map(c => {
                                                        return <p onClick={(e)=>{
                                                            var input = document.getElementById("inputLargo")
                                                            input.value = e.target.textContent

                                                            this.props.clearNombresJuegos()

                                                        }} className='result_busqueda'>{c.nombre}</p>
                                                    })
                                                }
                                                </div>

                                            </div>

                                        <div  className="modulo__econtrados">
                                          
                                                {this.resultBusqueda()}

                                        </div>
                                    </section>
                                </Route>



                                <Redirect to="/BuscarTarea"></Redirect>
                            </Router>

                        </Route>
                        <Route path="/Logros">
                            {
                                //Funcion para llamar a pizzaron con el array correcto de acuerdo a lo que se necesite
                                this.PizarronCorrecto()
                            }
                        </Route>

                        <Route path="/VerPerfil">
                            <WindowGetOut windowVisible={"visible"} datosUsuarioActual={this.props.datosUsuarioActual} user={this.props.user} GetOut={this.props.GetOut}></WindowGetOut>
                        </Route>

                        <Redirect to="/Menu"></Redirect>
                    </Router>

                    <img className="fondo-figuras fondo-figuras--der" src={Derecha}></img>
                    <img className="fondo-figuras fondo-figuras--izq" src={Izq}></img>

                    <Window clikIncribirse={this.clikIncribirse} titulo={"Codigo"} layout={"inscribir"} CerrarVentana={this.CerrarVentana} ConsultarCodigo={this.props.ConsultarCodigo} estWindow={this.state.estWindow}></Window>
                    
                    <WindowMensaje titulo={this.state.titulo} mensaje={this.state.mensaje} CerrarVentana={this.CerrarVentanaMensaje} setScrollFunction={this.setScrollFunction}  estWindowMensaje={this.state.estWindowMensaje}></WindowMensaje>
                    {this.windowModuloNoAvailable()}
                    
                    <footer className="footer-menu">
                        <img className="footer-menu__fondo" src={footer}></img>
                    </footer>


                    {this.props.VentanaInfoUserPc()}

           
                </div>
            )
        }
        else {
            return (
                <div>
                    {
                        this.TipoJuego()
                    }
                </div>
            )

        }
    }

    
    windowModuloNoAvailable = () => {
        return (
            <div style={{ display:(this.state.windowEstAvailable==true)?"block":"none",zIndex:"1000" }} className="fondo-window fondo-window--menu">

                <div className="window window--menu" style={{ width: "80%", height: "40%" }}>


                    <div className="window-header" style={(this.props.layout == "instrucciones") ? { height: "20%" } : null}>
                        <p className="window-header__titulo">Alerta</p>
                    </div>

                    <div className="window-contenido" style={{ overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center" }}>
                        <p className="window__act" style={{ margin: "2em 0 1em 0" }} >Modulo disponible solo en Pc</p>

                    </div>

                    <button className="buttons buttons--window" onClick={() => { window.location.reload() }}>Aceptar</button>


                </div>
            </div>
        )

    }


    resultBusqueda=()=>{
        console.log("MENSAJE BUSQUEDA: ")
        console.log(this.state.mensajeBusqueda)

        if(this.state.mensajeBusqueda ==""){
            return(
                <React.Fragment>
                      {
                                               
                        this.props.juegosBuscados.map(k => {
                            return (
                                <div style={{ width: "100%",zIndex:"100"}}>
                                    <div className="card-busqueda" id={k.keyTarea} onClick={(e) => {
                                        this.clickBusqueda(e)
                                    }}>

                                        <h5 id={k.keyTarea}  onClick={(e)=>{this.clickBusqueda(e)}} className="card-busqueda__titulo">{k.nombre}</h5>


                                        <div id={k.keyTarea}  onClick={(e)=>{this.clickBusqueda(e)}} className="info-search">
                                            <img id={k.keyTarea}  onClick={(e)=>{this.clickBusqueda(e)}} className="info-search__icono" src={iconAutor}></img>
                                            <p id={k.keyTarea}  onClick={(e)=>{this.clickBusqueda(e)}} className="info-search__parrafo">Autor: {k.UserName}</p>
                                        </div>

                                        <div id={k.keyTarea}  onClick={(e)=>{this.clickBusqueda(e)}} className="info-search">
                                            <img id={k.keyTarea}  onClick={(e)=>{this.clickBusqueda(e)}} className="info-search__icono" src={iconNacion}></img>
                                            <p id={k.keyTarea}  onClick={(e)=>{this.clickBusqueda(e)}} className="info-search__parrafo">Naconalidad: {k.from}</p>
                                        </div>

                                        <div id={k.keyTarea}  onClick={(e)=>{this.clickBusqueda(e)}} className="info-search">
                                            <img id={k.keyTarea}  onClick={(e)=>{this.clickBusqueda(e)}} className="info-search__icono" src={iconFecha}></img>
                                            <p id={k.keyTarea}  onClick={(e)=>{this.clickBusqueda(e)}} className="info-search__parrafo">Fecha:{k.fecha}</p>
                                        </div>

                                        <div id={k.keyTarea}  onClick={(e)=>{this.clickBusqueda(e)}} className="info-search">
                                            <img id={k.keyTarea}  onClick={(e)=>{this.clickBusqueda(e)}} className="info-search__icono" src={iconJuego}></img>
                                            <p id={k.keyTarea}  onClick={(e)=>{this.clickBusqueda(e)}} className="info-search__parrafo">Tipo juego:{k.tipo}</p>
                                        </div>

                                        <div id={k.keyTarea}  onClick={(e)=>{this.clickBusqueda(e)}} className="linea">
                                            <div id={k.keyTarea}  onClick={(e)=>{this.clickBusqueda(e)}} className="linea-trazo linea-trazo--busqueda"></div>
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }


                </React.Fragment>
            )
        }
        else{
            return(<p style={{fontSize:"2em",padding:"6em 1em"}} className='main-menu-cont__name'>{this.state.mensajeBusqueda}</p>)
        }
    }

    clickBusqueda(e){
        console.log(e.target)
        this.keyTarea = e.target.id
        console.log(`this.keyTarea: ${e.target.id}`)
        this.props.ConsultarTarea(e.target.id)
        this.props.ActualizarEst()
    }

    clikIncribirse=(mensaje)=>{
        this.CerrarVentana()
        this.activarWindowMensaje(mensaje)
    }


    cerrarWindowInscribirse(){
        this.setState({estWindow:"none"})
    }

    setScrollFunction(state){
        window.scroll(0,0)
        document.getElementsByTagName("html")[0].style.overflowX = state;
        document.getElementsByTagName("html")[0].style.overflowY= state;
      }
    


    activarWindowMensaje(mensaje){
        this.setState({estWindowMensaje:"block",titulo:"Respuesta",mensaje:mensaje})
      }
      



    UIBuscarJuego() {
        return (
            <div className="modulo__buscador">

            </div>
        )

    }

    PizarronCorrecto() {

        //Pizarron que muestra las clases 
        //La variable recibe datos cuando hacenmos click sobre un <p> de una clase
        if (this.props.tareasClase.length == 0 && this.props.isClickedClase == false) {
            //La variable array que recibe son los valores de this.props.clases
            return <Pizarron elementos="calificaciones" setEstadoClickClaseFromCalificaciones={this.props.setEstadoClickClaseFromCalificaciones} tituloModulo={calif_titulo} ReiniciarValores={this.props.ReiniciarValores} queryCorrecta="totales" ConsultaRelacional={this.props.ConsultaRelacional} tareasPendientes={this.props.tareasPendientes} arrayDatos={this.props.clases}></Pizarron>


        }
        else {
            console.log(this.isClickedClase)
            //Pizarron que muestra las calpificaiones de la materia
            //La variable array que recibe son los valores de this.props.tareasClase
            return <Pizarron  elementos="calificaciones" tituloModulo={calif_titulo} ReiniciarValores={this.props.ReiniciarValores} queryCorrecta={null} ConsultaRelacional={this.props.ConsultaRelacional} tareasPendientes={this.props.tareasPendientes} arrayDatos={this.props.tareasClase}></Pizarron>

        }
    }
    TipoJuego() {
        if (window.screen.width > 769 || this.state.leiInstruc == true || this.props.tareaHacer.tipo == "PacMan" || this.props.tareaHacer.tipo == "Sopa") {
            if (this.props.tareaHacer.tipo == "PacMan") {
                return (
                    <PacmanGame JuegoLibreFinalizado={this.props.JuegoLibreFinalizado} setScrollFunction={this.setScrollFunction} juegoLibre={this.state.juegoLibre}  Colisiones={this.props.Colisiones} DecidirDireccion={this.props.DecidirDireccion} MoverEnemigos={this.props.MoverEnemigos} idTarea={this.props.idTarea} TareaFinalizada={this.props.TareaFinalizada} tareaHacer={this.props.tareaHacer}></PacmanGame>
                )
            }
            else {
                if (this.props.tareaHacer.tipo == "Sopa") {
                    return (
                        <SopaGame JuegoLibreFinalizado={this.props.JuegoLibreFinalizado} setScrollFunction={this.setScrollFunction} juegoLibre={this.state.juegoLibre} nombreClase={this.props.nombreClase} idTarea={this.props.idTarea} TareaFinalizada={this.props.TareaFinalizada} ImprimirTablero={this.props.ImprimirTablero} CrearTablero={this.props.CrearTablero} tareaHacer={this.props.tareaHacer} ></SopaGame>
                    )
                }
                else {
                    if (this.props.tareaHacer.tipo == "Numeros") {
                        return (<NumerosGame JuegoLibreFinalizado={this.props.JuegoLibreFinalizado} juegoLibre={this.state.juegoLibre} setScrollFunction={this.setScrollFunction}  CloseIns={this.CloseIns} windowIns={this.state.windowIns} idTarea={this.props.idTarea} estWindow={this.state.estWindow} CerrarVentana={this.CerrarVentana} TareaFinalizada={this.props.TareaFinalizada} tareaHacer={this.props.tareaHacer}></NumerosGame>)
                    }
                    else {
                        if (this.props.tareaHacer.tipo == "Conjuntos") {
                            return (<ConjuntosGame JuegoLibreFinalizado={this.props.JuegoLibreFinalizado} juegoLibre={this.state.juegoLibre}  setScrollFunction={this.setScrollFunction}  CloseIns={this.CloseIns} windowIns={this.state.windowIns}  Colisiones={this.props.Colisiones} TareaFinalizada={this.props.TareaFinalizada} idTarea={this.props.idTarea} DecidirDireccion={this.props.DecidirDireccion} MoverEnemigos={this.props.MoverEnemigos} tareaHacer={this.props.tareaHacer}></ConjuntosGame>)

                        }
                        else {
                            if (this.props.tareaHacer.tipo == "Plataformas") {
                                return (<PlataformasGame JuegoLibreFinalizado={this.props.JuegoLibreFinalizado} juegoLibre={this.state.juegoLibre} setScrollFunction={this.setScrollFunction} CloseIns={this.CloseIns} windowIns={this.state.windowIns}  Colisiones={this.props.Colisiones} TareaFinalizada={this.props.TareaFinalizada} idTarea={this.props.idTarea} tareaHacer={this.props.tareaHacer}></PlataformasGame>)
                            }
                        }
                    }
                }

            }
        }
        else {
            if (this.props.tareaHacer.tipo != "") {
                return (<Instrucciones TermineLeer={this.TermineLeer} tipo={this.props.tareaHacer.tipo}></Instrucciones>)
            }
        }

    }


    TermineLeer = () => {
        this.setState({ leiInstruc: true })
    }

    CerrarVentana = () => {
        //Cierra ventana de inscribirse a una clase
        this.setState({ estWindow: "none" })
        this.setScrollFunction("auto")
    }

    CerrarVentanaMensaje = () => {
        //Cierra ventana de inscribirse a una clase
        this.setState({ estWindowMensaje: "none" })
    }

    CloseIns = () => {
        //Funcion que hace que la ventana de instrucciones que aparece en los juegos en resoluciones mayores a 769 se cierre
        this.setState({ windowIns: "none" })
        this.setScrollFunction("auto")
    }

   

}