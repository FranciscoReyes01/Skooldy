import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import ConfigShare from './ConfigShare.js';
import SopaConfig from './SopaConfig.js';
import ListaAlumnos from './ListaAlumnos.js';
import NumerosConfig from './NumerosConfig.js';
import ConjuntosConfig from './ConjuntosConfig.js'
import Header from './Header.js';
import WindowGetOut from './WindowGetOut.js'
import Derecha from '../img/Derecha.svg'
import Izq from '../img/Izq.svg'
import footer from '../img/Menu/footer.svg';
import titulo_menu from '../img/Menu/menu-titulo.svg'
import iconClases from '../img/AppTeacher/Menu/iconClases.svg'

import iconNewAct from '../img/AppTeacher/Menu/IconNewAct.svg'
import iconNewClas from '../img/AppTeacher/Menu/iconNewClas.svg'
import iconPerfil from '../img/AppTeacher/Menu/iconPerfil.svg'
import tituloNewClase from '../img/AppTeacher/NewClase/tituloNewClase.svg'
import tituloClases from '../img/AppTeacher/Clases/tituloClases.svg'
import tituloNewAct from '../img/AppTeacher/NewAct/titulo_newAct.svg'
import iconPacman from '../img/AppTeacher/NewAct/icon_Pacman.svg'
import iconSopa from '../img/AppTeacher/NewAct/icon_Sopa.svg'
import iconConj from '../img/AppTeacher/NewAct/icon_Conj.svg'
import iconPlat from '../img/AppTeacher/NewAct/icon_Plat.svg'
import iconNum from '../img/Jugar/icon_numeros.svg'
import iconMaintenance from '../Imagenes/iconMantenimiento.png'
import WindowMensaje from './/WindowMensajes.js'




import './AppTeacher.css'





export default class AppTeacher extends Component {

  constructor() {
    super()
    this.state = {
      className: "",
      desc: "",
      fondo: "none",
      estWindowMensaje:"none",
      titulo:"",
      mensaje:"",
    }


  }

componentDidMount(){
  console.log("DID MOUNT");

  window.addEventListener("popstate",(e)=>{
    console.log("HOLIIIIIIIIIIII") 
    this.CambiarFondo("#FFFFFF")
  })

}

  render() {
    return (
      <div className="content-app" style={{ background: `${this.state.fondo}` }}>
        <Router>
          <Header funcionamiento="Link" DesactivarVentana={this.props.DesactivarVentana} ActivarVentana={this.props.ActivarVentana} imgUser={null}></Header>

          <Route path="/Menu">
            <main className="main-menu main-menu--teacher" onClick={(e)=>{this.props.DesactivarVentana()}}>
              <img className="titulo-modulo titulo-modulo--menu" src={titulo_menu}></img>

              <Link style={{ textDecoration: 'none' }} className="link-modulo link-modulo--newClase" to="/Create">
                <div className="main-menu-cont">
                  <img className="main-menu-cont__menu" src={iconNewClas}></img>
                  <p className="main-menu-cont__name">Nueva clase</p>
                </div>
              </Link>

              <Link style={{ textDecoration: 'none' }} className="link-modulo link-modulo--clases" to="/Clases">
                <div onClick={() => {
                  this.props.ConsultaRelacional(this.props.idUser, "ClasesCreadas", "Clases",)
                  this.CambiarFondo("#EFF7FD")
                }} className="main-menu-cont">
                  <img className="main-menu-cont__menu" src={iconClases}></img>
                  <p className="main-menu-cont__name">Clases</p>
                </div>
              </Link>

              <Link style={{ textDecoration: 'none' }} className="link-modulo link-modulo--perfil" to="/Perfil">
                <div className="main-menu-cont">
                  <img className="main-menu-cont__menu" src={iconPerfil}></img>
                  <p className="main-menu-cont__name">Perfil</p>
                </div>
              </Link>

              <Link style={{ textDecoration: 'none' }} className="link-modulo link-modulo--newAct" to="/Actividad">
                <div className="main-menu-cont" >
                  <img className="main-menu-cont__menu" src={iconNewAct}></img>
                  <p className="main-menu-cont__name">Crear actividad</p>
                </div>
              </Link>

            </main>

          </Route>


          <Route path="/Create">

            <div className="modulo modulo--up">
              <img className="titulo-modulo titulo-modulo--newClase" src={tituloNewClase}></img>

              <div className="inputs-clase">
                <input id="inputNombreClase" className="login-form-input login-form-input--nameClase" onChange={this.Writting} name="className" placeholder="Nombre de clase..."></input>
                <textarea id="inputDescripClase"className="login-form-input login-form-input--descClase" onChange={this.Writting} name="desc" placeholder="Descripcion..."></textarea>
              </div>

              <button className="buttons buttons--app-techaer" onClick={() => { 
          
                var isValidData = this.validateNewClassData()
                if(isValidData){
                  var mensaje =this.props.CrearClases(this.state.className, this.state.desc)
                  this.activarWindowMensaje(mensaje)

                }
                else{
                  this.activarWindowMensaje("No se ha posido crear la clase, inserta los datos solicitados para poder hacerlo")
                }
                
                 }}>Crear</button>
            </div>


          </Route>

          <Route path="/Clases">
            <div className="modulo modulo--up" style={{ background: "none" }}>
              <img className="titulo-modulo" src={tituloClases}></img>

              <div className="table-clases" style={{overflow:(this.props.clases.length==0)?"hidden":"auto"}}>
                <div className="header-table">Materias</div>
                <Router>
                  {
                    //Variable llenadad cuando se hace click sobre el link correspondiente a la ruta
                    this.props.clases.map(e => {
                      return (
                        <React.Fragment>

                          <Route path="/HomeClases">


                            <Link style={{ textDecoration: 'none' }} to={`/${e.key}`}>
                              <div className="item-clase" onClick={(r) => {
                                 let obj =document.getElementById(e.key)
                                 console.log("PACO: "+obj.id)
                                
                                this.props.ConsultaRelacional(obj, "ListaAlumnos", "Alumno")
                                this.props.ConsultaRelacional(obj, "TareasDeClases", "Tareas", "allHomework")
                              }} id={e.key} >

                                <p className="info-item info-item--big">{e.nombre}</p>
                                <p className="info-item info-item--small">Descripcion: {e.descripcion}</p>
                                <p className="info-item info-item--small">Id clase:{e.id}</p>
                                <div className="item-clase__linea">
                                </div>
                              </div>
                            </Link>

                          </Route>

                          <Route path={`/${e.key}`}>
                            <ListaAlumnos CambiarFondo={this.CambiarFondo} tareasClase={this.props.tareasClase} studentIncritos={this.props.studentIncritos} numStudents={this.props.studentIncritos.length} numTareas={this.props.tareasClase.length} NombreClase={e.nombre}></ListaAlumnos>
                          </Route>

                        </React.Fragment>
                      )
                    }
                    )
                  }
                  <div style={{display:(this.props.clases.length==0)?"flex":"none",width:"100%",height:"100%",flexDirection:"column"}}>
                    <p className="window__act" style={{fontSize:"1.5em",margin:"auto"}}>Todavia no tienes clases creadas...</p>
                  </div>

                  <Redirect to="/HomeClases"></Redirect>
                </Router>
              </div>

            </div>


            {/*  <Link to="/Menu">Atras</Link> */}
          </Route>


          <Route path="/Perfil">
          <section className="modulo modulo--up" style={{background:"none"}}>

              <div style={{margin:"auto", display:"flex",flexDirection:"column"}}>
                  <img style={{width:"13em",height:"13em",alignSelf:"center"}} src={iconMaintenance}></img>
                  <p className="main-menu-cont__name" style={{fontSize:"2em",marginTop:"1em"}}>Modulo en mantenimiento</p>
              </div>
          </section>
          </Route>

          <Route path="/Actividad">

            <div className="main-menu menu-menu--act">
              <img className="titulo-modulo titulo-modulo--newClase" src={tituloNewAct}></img>

              <Link className="link-modulo link-modulo--pacman" to="/PacMan">
                <div className="main-menu-cont" onClick={()=>{
                  this.CambiarFondo("#5C5C5C")
                  this.ListaTareas()
                  }}>
                  <img className="main-menu-cont__menu sizeNew" src={iconPacman}></img>
                  <p className="main-menu-cont__name">Pacman</p>
                </div>
              </Link>
              

              <Link className="link-modulo link-modulo--num" to="/Numeros">
                <div className="main-menu-cont" onClick={()=>{
                  this.CambiarFondo("#5C5C5C")
                  this.ListaTareas()
                }
              }>
                  <img className="main-menu-cont__menu sizeNew" src={iconNum}></img>
                  <p className="main-menu-cont__name">Numeros</p>
                </div>
              </Link>

              <Link className="link-modulo link-modulo--sopa" to="/Sopa">
                <div className="main-menu-cont" onClick={()=>{
                  this.CambiarFondo("#5C5C5C")
                  this.ListaTareas()
                  }}>
                  <img className="main-menu-cont__menu sizeNew" src={iconSopa}></img>
                  <p className="main-menu-cont__name">Sopa</p>
                </div>
              </Link>


              <Link className="link-modulo link-modulo--conj" to="/Conjuntos">
                <div className="main-menu-cont" onClick={()=>{
                  this.CambiarFondo("#5C5C5C")
                  this.ListaTareas()
                  }}>
                  <img className="main-menu-cont__menu sizeNew" src={iconConj}></img>
                  <p className="main-menu-cont__name">Conjuntos</p>
                </div>
              </Link>

              <Link className="link-modulo link-modulo--plat" to="/Plataformas">
                <div className="main-menu-cont" onClick={()=>{
                  this.CambiarFondo("#5C5C5C")
                  this.ListaTareas()
                  }}>
                  <img className="main-menu-cont__menu sizeNew" src={iconPlat}></img>
                  <p className="main-menu-cont__name">Plataformas</p>
                </div>
              </Link>
            </div>



            {/*Controladores para setear el juego */}

          </Route>



          <Route path="/PacMan">
            <ConfigShare activarWindowMensaje={this.activarWindowMensaje} Clases={this.props.clases}  tipoJuego="PacMan" CrearTareaPacMan={this.props.CrearTareaPacMan}></ConfigShare>
          </Route>



          <Route path="/Sopa">
            <SopaConfig  activarWindowMensaje={this.activarWindowMensaje} Clases={this.props.clases} ImprimirTablero={this.props.ImprimirTablero} CrearTablero={this.props.CrearTablero} CrearTarea={this.props.CrearTarea}></SopaConfig>
            {/*iMPORTANTE MANDAR A LLAMAR A LA FUNCION DE CREAR TAREA*/}

          </Route>

          <Route path="/Numeros">
            <NumerosConfig activarWindowMensaje={this.activarWindowMensaje} Clases={this.props.clases} CrearTareaNumeros={this.props.CrearTareaNumeros}></NumerosConfig>

          </Route>


          <Route path="/Conjuntos">
            <ConjuntosConfig activarWindowMensaje={this.activarWindowMensaje} Clases={this.props.clases} CrearTareaConjuntos={this.props.CrearTareaConjuntos}></ConjuntosConfig>

          </Route>

          <Route path="/Plataformas">
            <ConfigShare activarWindowMensaje={this.activarWindowMensaje} Clases={this.props.clases} CrearTareaPlataformas={this.props.CrearTareaPlataformas} tipoJuego="Plataformas"></ConfigShare>
          </Route>






          <Route path="/VerPerfil">
            <WindowGetOut windowVisible={"visible"} datosUsuarioActual={this.props.datosUsuarioActual} user={this.props.user} GetOut={this.props.GetOut}></WindowGetOut>
          </Route>


          <Redirect to="/Menu"></Redirect>
        </Router>
        {this.props.VentanaInfoUserPc()}


        <img className="fondo-figuras fondo-figuras--der" src={Derecha}></img>
        <img className="fondo-figuras fondo-figuras--izq" src={Izq}></img>

        <footer className="footer-menu">
          <img className="footer-menu__fondo" src={footer}></img>
        </footer>

        <WindowMensaje titulo={this.state.titulo} mensaje={this.state.mensaje} CerrarVentana={this.CerrarVentanaMensaje} setScrollFunction={this.props.setScrollFunction}  estWindowMensaje={this.state.estWindowMensaje}></WindowMensaje>


      </div>
    )
  }




  validateNewClassData(){
    var isValidData = false
    var inpuName = document.getElementById("inputNombreClase")
    var inpuDesc= document.getElementById("inputDescripClase")

    console.log(`INPUT NAME: ${inpuName.value}`)

    if(inpuName.value =! "" && inpuDesc.value != ""){
      isValidData = true
      inpuName.value =""
      inpuDesc.value = ""
    }

    return isValidData
    

  }

  activarWindowMensaje=(mensaje)=>{
    this.setState({estWindowMensaje:"block",titulo:"Respuesta",mensaje:mensaje})
  }
  

  CerrarVentanaMensaje = () => {
    //Cierra ventana de inscribirse a una clase
    this.setState({ estWindowMensaje: "none" })
}



  Writting = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }


  CambiarFondo = (color) => {
    console.log("CAMBIAR FONDO")
    this.setState({ fondo: color })
  }


  ListaTareas=()=>
  {
    this.props.ConsultaRelacional(this.props.idUser, "ClasesCreadas", "Clases",)
  }


}