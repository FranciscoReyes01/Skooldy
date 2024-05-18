import React from 'react';
import firebase, { database, storage } from 'firebase'

import "./App.css"
import 'firebase/database';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import AppTeacher from './Components/AppTeacher.js';
import AppStudent from './Components/AppStudent.js';
import Header from './Components/Header.js';
import WindowMensaje from '././Components/WindowMensajes.js'


import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import control from './img/control.svg'
import Section1 from './img/Section1.svg'
import Alumno from './img/Alumno.svg'
import iconLapiz from './img/iconLapiz.svg'
import iconLupa from './img/iconLupa.svg'
import iconItem from './img/iconItem.svg'
import iconVer from './img/iconoVer.svg'
import iconJugar from './img/iconJugar.svg'
import iconCorreo from './img/iconCorreo.svg'
import iconYoutube from './img/iconYoutube.svg'
import iconFacebook from './img/iconFacebook.svg'
import Derecha from './img/Derecha.svg'
import Izq from './img/Izq.svg'
import Back from './img/Back.svg'
import movil_fondoDER from './img/movil_fondoDER.svg'
import movil_fondoIZQ from './img/movil_fondoIZQ.svg'
import fondoMainIzq from './img/fondoPC1.svg'
import fondoMainDer from './img/fondoPC2.svg'
import WindowGetOut from './Components/WindowGetOut.js'


class App extends React.Component {
  constructor() {
    super()
    //Varibales para hacer referencia a rutas de la BD
    this.addUser = null
    this.tipoUsuario = null
    this.addClase = firebase.database().ref().child("Clases")
    this.queryTareas = null
    this.addTarea = firebase.database().ref().child("Tareas")
    //Variables que almacenan valores para crar querys 
    this.idUserDB = null
    this.idClase = null
    this.idClaseTarea = null
    this.idTarea = null
    //this.keysTareas=[]
    this.codeQuery = null
    this.queryJuego = null
    this.hola = null
    this.nombreClase = ""
    this.codigoClase = ""
    this.ranking = null
    this.estGrados = "none"
    this.datosForm = ["","","","","","","",""]
    this.keys = {37: 1, 38: 1, 39: 1, 40: 1};


    this.ayudad = null

    this.state = {
      user: null,
      userName: '',
      pass: '',
      newUserInfo: [],
      datosUsuarioActual: null,
      estWindowMensaje:"none",
      mensaje:"",
      titulo:"",

      //Variable utilizada por alumno y maestro
      clases: [],
      studentIncritos: [],
      tareasPendientes: [],
      tareaHacer: [],
      tareasClase: [],
      juegosBuscados: [],
      nombresJuegos: [],
      infoSkooldy: true,
      usuariosRanking: [],
      windowVisible: "none",
      isClickedClase:false



    }
  }





  componentDidMount() {
    let cont = 0
    firebase.auth().onAuthStateChanged(e => {
      this.setState({ user: firebase.auth().currentUser }, () => {
        console.log("Asignar tipo User")

        try {
          /*En caso de que el usuario creado o logueado no este verificado se le 
          enviara un correo de verificacion con una URL de continuacion*/
          if (this.state.user.emailVerified === false) {
            console.log(this.state.user.emailVerified)

            var URL = { url: "http://localhost:3000/" }
            this.state.user.sendEmailVerification()
              .then(p => { 
                
                console.log("Enviando verificacion..")
                })
              .catch(t => { console.log("Error al enviar notificacion") })


            /*  this.AsignarTipoUser("Alumno")
             this.AsignarTipoUser("Docente") */

          }
          else {
            //Se busca en que nodo esta el usuario para saber que tipo de cuenta tiene
            this.AsignarTipoUser("Alumno")/*  */
            this.AsignarTipoUser("Docente")
            console.log("ELSE")
          }
        }
        catch (e) {
          console.log("Hola")
        }
      })
    })

    this.addClase.on("child_added", e => {
      if (this.idClase !== null) {
        this.idClase = e.key
        //Linea 85 a 88 se genera el id de la clase que le maestro crea para despues darselo al alumno y as se incriba
        this.GenerarCodigo(this.idClase)
        this.addClase = firebase.database().ref().child(`Clases/${this.idClase}/id`)
        this.addClase.set(this.codigoClase)
        this.codigoClase = ""

        this.addClase = firebase.database().ref().child(`ClasesCreadas/${this.idUserDB}/${this.idClase}`)
        this.addClase.set({ hora: 3434, fecha: 34 })
        this.addClase = firebase.database().ref().child(`Clases`)
      }
    })

    this.addTarea.on("child_added", t => {
      this.idTarea = t.key
    })

  }

  render() {
    return (
      <React.Fragment>

        {
          /*Funcion que determina que UI mostrar con base en el valor de la variable de 
          estado "user"*/
          this.AppEstado()
        }

      </React.Fragment>
    );
  }

  AppEstado() {
    if (this.state.user === null ||  this.state.user.emailVerified === false) {
      return (
        <div className="App">
          <Router>
            <Route path="/Main">
              <Header></Header>

              <main className="layout">
                <img className="layout__logo" src={control} />
                <h2 className="layout__eslogan">Aprender jugando</h2>
                <Link to="/Inicio"><button className="buttons">Ya tengo una cuenta</button></Link>
                <Link to="/Formulario"><button className="buttons">Crear una cuenta</button></Link>


                <img className="fondo-figuras fondo-figuras--der fondo-figuras--small-main" src={Derecha}></img>
                <img className="fondo-figuras fondo-figuras--izq fondo-figuras--small-main" src={Izq}></img>
                <img className="fondo-figuras fondo-figuras--der fondo-figuras--large-main" src={fondoMainDer}></img>
                <img className="fondo-figuras fondo-figuras--izq fondo-figuras--large-main" src={fondoMainIzq}></img>
              </main>


              <section className="layout-grid">
                <h2 className="layout-grid__titulos">Estudiar nunca fue tan divertido</h2>

                <p className="layout-grid__desc">
                  Aprende al mismo que juegas,  y conviértete en el mejor estudiante superando los
                  retos que tu maestro te ponga en cada juego
                </p>
                <img className="layout-grid__image layout-grid__image--der" src={Section1}></img>

                <img className="fondo-figuras fondo-figuras--der" src={Derecha}></img>
                <img className="fondo-figuras fondo-figuras--izq" src={Izq}></img>
              </section>

              <div className="linea">
                <div className="linea-trazo"></div>
              </div>

              <section className="layout-grid layout--area-inversa">
                <h2 className="layout-grid__titulos">Que es Skooldy?</h2>
                <img className="layout-grid__image" src={control}></img>
                <p className="layout-grid__desc">
                  Skooldy es una herramienta para alumnos de nivel básico  de entre 4 - 10 años de
                  edad que  quieren divertirse al mismo tiempo que estudian. Asi como también para
                  docentes innovadores que entienden a sus alumnos y que buscan que ellos aprendan
                  de una mejor forma con el uso de los juegos
                </p>

                <img className="fondo-figuras fondo-figuras--der" src={Derecha}></img>
                <img className="fondo-figuras fondo-figuras--izq" src={Izq}></img>
              </section>

              <div className="linea">
                <div className="linea-trazo"></div>
              </div>

              <section className="layout layout--color">
                <h2 className="layout__titulos">Funciones de Skooldy</h2>
                <div className="layout__selector-buttons">
                  <button onClick={() => { this.setState({ infoSkooldy: true }) }} className="buttons buttons--section3">Alumno</button>
                  <button onClick={() => { this.setState({ infoSkooldy: false }) }} className="buttons buttons--section3">Docente</button>
                </div>
                {
                  this.Alumno_Docente()
                }
                <img className="fondo-figuras fondo-figuras--der" src={Derecha}></img>
                <img className="fondo-figuras fondo-figuras--izq" src={Izq}></img>
              </section>

              <div className="linea">
                <div className="linea-trazo"></div>
              </div>

              <section className="layout layout--color">
                <h2 className="layout__titulos">Precio</h2>
                <p className="layout__desc">
                  Skooldy tiene un unico precio de $1 dolar que te da acceso de por vida a la plataforma
                  y a las actualizaciones de cada mes
                </p>
                <img className="fondo-figuras fondo-figuras--der" src={Derecha}></img>
                <img className="fondo-figuras fondo-figuras--izq" src={Izq}></img>
              </section>



              <footer className="footer">

                <div className="footer__contacto">
                  <h5 className="footer__titulo">Contactanos</h5>

                  <ul className="footer__lista">
                    <li className="lista-footer-item">
                      <img className="lista-footer-item__imagen" src={iconCorreo}></img>
                       <p style={{color:"white",fontSize:"1.2em"}}>skooldyprogram@gmail.com</p>
                    </li>

                    <li className="lista-footer-item">
                      <img className="lista-footer-item__imagen" src={iconYoutube}></img>
                      <p style={{color:"white",fontSize:"1.2em"}}>skooldy</p>

                    </li>

                    <li className="lista-footer-item">
                      <img className="lista-footer-item__imagen" src={iconFacebook}></img>
                      <p style={{color:"white",fontSize:"1.2em"}}>skooldy</p>
                    </li>
                  </ul>
                </div>

                <div className="footer__about">
                  <div>
                    <h5 className="footer__titulo">Nosotros</h5>

                    <ul className="footer__lista">
                      <li className="lista-footer-item">
                        <p style={{color:"white",fontSize:"1.2em"}}>Quienes Somos</p>
                      </li>
                      <li className="lista-footer-item">
                        <p style={{color:"white",fontSize:"1.2em"}}>Mision</p>
                      </li>
                      <li className="lista-footer-item">
                        <p style={{color:"white",fontSize:"1.2em"}}>Vision</p>   
                      </li>
                    </ul>
                  </div>


                </div>
              </footer>



            </Route>

            <Route path="/Inicio">


              <Link to="/Main" onClick={()=>{
                this.setState({pass:"",userName:""})
              }}><img className="login__back" src={Back}></img></Link>

              <div className="login">
                <form className="login-form">
                  <h2 className="login-form-titulo">Iniciar sesion</h2>
                  <img className="login-form__logo" src={control}></img>
                  <input placeholder="Usuario" className="login-form-input" name="userName" onChange={this.WrittingLogin}></input>
                  <input placeholder="Password" className="login-form-input" name="pass" onChange={this.WrittingLogin}></input>
                  <div className="login-form__buttons">
                    <button className="buttons buttons--login" onClick={this.Login}>Ingresar</button>
                    <Link theme="info" to="/Formulario"><button className="buttons buttons--login">Crear cuenta</button></Link>
                  </div>
                </form>

                <img className="fondo-figuras fondo-figuras--der fondo-figuras--pc2" src={movil_fondoDER}></img>
                <img className="fondo-figuras fondo-figuras--izq fondo-figuras--pc1" src={movil_fondoIZQ}></img>
              </div>



            </Route>

            <Route path="/Formulario">
              <Link to="/Main" 
              onClick={()=>{
                this.setState({pass:"",userName:"",newUserInfo: []})
                this.datosForm = ["","","","","","","",""]
              }}><img className="login__back" src={Back}></img></Link>

              <div className="login">
                <form className="login-form login-create-new" >
                  <h2 className="login-form-titulo">Nueva cuenta</h2>
                  <img className="login-form__logo" src={control}></img>

                  <select id="OPTIONS" className="login-form-input login-form-input--new-user" onChange={(e) => {
                    this.SelectTipo(0, "OPTIONS") 
                    e.target.disabled = true
                    
                    }} name="select">
                    <option value="" selected>Tipo de cuenta</option>
                    <option value="Alumno" >Alumno</option>
                    <option value="Docente">Docente</option>
                  </select>


                  <input className="login-form-input login-form-input--new-user" onChange={this.WrittingCreating} name="1" placeholder="Nombre..."></input>
                  <input className="login-form-input login-form-input--new-user" onChange={this.WrittingCreating} name="2" placeholder="Apellidos..."></input>

                  <div className="inputs-linea">
                    {/*                     <input className="login-form-input login-form-input--cortos" onChange={this.WrittingCreating}  name="3" placeholder="Nacionalidad..."></input>
                  
                    <input className="login-form-input login-form-input--cortos" onChange={this.WrittingCreating} name="3" placeholder="Nivel de estudios..."></input>*/}
                    <select style={{ display: this.estGrados }} id="GRADOS" className="login-form-input login-form-input--new-user" onChange={() => { this.SelectTipo(3, "GRADOS") }} name="select">
                      <option value="" selected>Selecciona un grado</option>
                      <option value="1" >1° grado</option>
                      <option value="2">2° grado</option>
                      <option value="3">3° grado</option>
                      <option value="4">4° grado</option>
                      <option value="5">5° grado</option>
                      <option value="6">6° grado</option>
                    </select>


                  </div>
                  <input className="login-form-input" onChange={this.WrittingCreating} name="4" type="hidden" value={this.state.userName}></input>

                  <input className="login-form-input login-form-input--new-user" onChange={this.WrittingCreating} name="4" type="number" placeholder="Edad..."></input>
                  <input className="login-form-input login-form-input--new-user" id="5" name="userName" type="email" placeholder="Correo electronico..." onChange={(e)=>{
                    this.saveValueInput(e)
                    this.WrittingLogin(e)
                  }
                    }></input>

                  <div className="inputs-linea">
                    <input className="login-form-input login-form-input--cortos" type="password" name="pass" placeholder="Password..." onChange={(e)=>{
                      this.saveValueInput(e)
                      this.WrittingLogin(e)
                    }} id="6"></input>
                    <input className="login-form-input login-form-input--cortos" type="password" name="pass" placeholder="Password..." onChange={(e)=>{
                      this.saveValueInput(e)
                      this.WrittingLogin(e)
                    }} id="7"></input>
                  </div>

                  <div className="login-form__buttons">
                  <button className="buttons buttons--login" onClick={(e)=>{
                    e.preventDefault()
                    this.CreateUser()
                  }}>Crear Cuenta</button>
                    <Link id="verifButton"  to="/Verificando"/>
                  </div>

                </form>

                <img className="fondo-figuras fondo-figuras--der fondo-figuras--pc2" src={movil_fondoDER}></img>
                <img className="fondo-figuras fondo-figuras--izq fondo-figuras--pc1" src={movil_fondoIZQ}></img>
              </div>


            </Route>

            <Route path="/Verificando">
              <div className="layout" style={{ background: "white" }}>
                <img className="layout__logo" src={control} />

                <h1 style={{ textAlign: "center", fontSize: "1.5em", color: "#CDCDCD" }}>
                  Se ha enviado una notificacion a tu correo
                  electronico para validar que realmente eres tu. 
                  Despues de validar actualiza la pagina
                </h1>
                <img className="fondo-figuras fondo-figuras--der" src={Derecha}></img>
                <img className="fondo-figuras fondo-figuras--izq" src={Izq}></img>
              </div>
            </Route>

            <Redirect to="/Main"></Redirect>

          </Router>

          <WindowMensaje titulo={this.state.titulo} mensaje={this.state.mensaje} CerrarVentana={this.CerrarVentanaMensaje} setScrollFunction={this.setScrollFunction}  estWindowMensaje={this.state.estWindowMensaje}></WindowMensaje>

        </div>

        
      )

    }
    else {
      return (
        <div className="app-usar">
          {
            /*Funcion que determina que tipo de usuario(Alumno/Docente) ha iniciado 
            sesion*/
            this.UserEstado()
          }
          {/*  <button onClick={this.GetOut}>Get Out</button> */}

        </div>

      )

    }
  }

  CerrarVentanaMensaje = () => {
    //Cierra ventana de inscribirse a una clase
    this.setState({ estWindowMensaje: "none" })
  }

  UserEstado() {
    /*En este punto ya podemos acceder a la info de un usuario logueado
    ya que estos datos se obtiene en el listent onAuthStateChanged*/
    try {
      if (this.state.datosUsuarioActual.cuenta === "Alumno") {
        return (
          <AppStudent isClickedClase={this.state.isClickedClase} setEstadoClickClaseFromCalificaciones= {this.setEstadoClickClaseFromCalificaciones} clearNombresJuegos={this.clearNombresJuegos} VentanaInfoUserPc={this.VentanaInfoUserPc} ActivarVentana={this.ActivarVentana} DesactivarVentana={this.DesactivarVentana} windowVisible={this.state.windowVisible} usuariosRanking={this.state.usuariosRanking} ViweRanking={this.ViweRanking} datosUsuarioActual={this.state.datosUsuarioActual} user={this.state.user} Colisiones={this.Colisiones} DecidirDireccion={this.DecidirDireccion} MoverEnemigos={this.MoverEnemigos} JuegoLibreFinalizado={this.JuegoLibreFinalizado} JuegosPorEdad={this.JuegosPorEdad} nombreClase={this.nombreClase} nombresJuegos={this.state.nombresJuegos} juegosBuscados={this.state.juegosBuscados} WriteJuego={this.WriteJuego} BuscarJuego={this.BuscarJuego} ReiniciarValores={this.ReiniciarValores} tareasClase={this.state.tareasClase} idTarea={this.idTarea} TareaFinalizada={this.TareaFinalizada} ImprimirTablero={this.ImprimirTablero} CrearTablero={this.CrearTablero} ActualizarEst={this.ActualizarEst} tareaHacer={this.state.tareaHacer} ConsultarTarea={this.ConsultarTarea} tareasPendientes={this.state.tareasPendientes} clases={this.state.clases} idUser={this.idUserDB} ConsultaRelacional={this.ConsultaRelacional} GetOut={this.GetOut} ConsultarCodigo={this.ConsultarCodigo}></AppStudent>
        )
      }
      else {
        return (
          <div>
            <AppTeacher setScrollFunction={this.setScrollFunction} datosUsuarioActual={this.state.datosUsuarioActual} user={this.state.user} GetOut={this.GetOut} VentanaInfoUserPc={this.VentanaInfoUserPc} ActivarVentana={this.ActivarVentana} DesactivarVentana={this.DesactivarVentana} windowVisible={this.state.windowVisible} CrearTareaPlataformas={this.CrearTareaPlataformas} CrearTareaConjuntos={this.CrearTareaConjuntos} CrearTareaNumeros={this.CrearTareaNumeros} tareasClase={this.state.tareasClase} ImprimirTablero={this.ImprimirTablero} CrearTablero={this.CrearTablero} studentIncritos={this.state.studentIncritos} AlumnosIncritos={this.AlumnosIncritos} CrearTareaPacMan={this.CrearTareaPacMan} CrearTarea={this.CrearTarea} datosUsuarioActual={this.state.datosUsuarioActual} clases={this.state.clases} ConsultaRelacional={this.ConsultaRelacional} CrearClases={this.CrearClases} idUser={this.idUserDB}></AppTeacher>
            {/*     <button onClick={this.GetOut}>Salir</button> */}

          </div>

        )
      }

    }
    catch (e) {
      //console.log("Hola:",e)

    }


  }

  GetOut = () => {

    firebase.auth().signOut()
      .then(e => {
        console.log(`Usuario cerro session`)
        this.setState({ tareasPendientes: [], tareasClase: [], clases: [],pass:"",userName:"",datosUsuarioActual: null })
      })
      .catch(f => { console.log(`Error al cerrar sesion ${f.code}`) })
  }


  WrittingLogin = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    /*var isNameNumber = Number.isNaN(e.target.name)

    if(isNameNumber){
      var pos= e.target.name
      this.datosForm[pos] =  e.target.value
    }
    else{
      var pos= e.target.id
      this.datosForm[pos] =  e.target.value
    }   */
  }

  saveValueInput = (e) => {

    var pos= e.target.id
    this.datosForm[pos] =  e.target.value
  }

  WrittingCreating = (obj) => {
    /*Esta funcion se comprota diferente a la de WrittingLogin ya que se setea una
    variable de tipo estado array  */
    const { newUserInfo } = this.state
    newUserInfo[obj.target.name] = obj.target.value

    this.setState({ newUserInfo })
    var posDato = obj.target.name
    this.datosForm[posDato] =  obj.target.value
  }

  isAllDataComplete(){

    console.log(`datosForm: ${this.datosForm}}`)

    var isDataComplete = true


    for (let i = 0; i < this.datosForm.length; i++) {
      if(this.datosForm[i] ==""){
        if(!(i==3 && this.datosForm[0] =="Docente")){
          isDataComplete = false
        }
        break
      }
      
    }
    return isDataComplete
  }
  

  passwordsMatched()
  {
    return this.datosForm[6] == this.datosForm[7]
  }

  clickVirtualToVerificando(){
    console.log("VERIFICANDO....")

    var bt = document.getElementById("verifButton")
      console.log(`BOTON: ${bt}`)
      bt.click()

  }

  CreateUser = () => {
    const { newUserInfo } = this.state

    console.log("CreateUser"+this.datosForm)

    console.log("DATOS FORM: "+this.datosForm)

    var isAllDataComplete = this.isAllDataComplete()

    if(isAllDataComplete){

      var passwordMatched = this.passwordsMatched()
      if(passwordMatched){
        
        console.log("TODOS LOS DATOS INSERTADOS")
        firebase.auth().createUserWithEmailAndPassword(this.state.userName, this.state.pass)
        .then(e => {

        /*Una vez creado el usuario, creamos un ruta en la BD para este*/
        this.addUser = firebase.database().ref().child(`${newUserInfo[0]}`)

        /*Condicion necesaria para porque en alumnos los datos que se tienen que almacenar en la BD
        son diferentes*/
        if (newUserInfo[0] == "Docente") {
          /*e inmeditamente insertamos la informacion dl usuario creado*/
          this.addUser.push().set({
            /*newUserInfo variable que obtiene valores al escribir en el fiormulario 
            de crear usuario*/
            cuenta: newUserInfo[0],
            nombre: newUserInfo[1],
            apellidos: newUserInfo[2],
            estudios: newUserInfo[3],
            edad: newUserInfo[4],
            /*Es importante almacenar el uid porque de esa forma podemos vincular los
             datos del usurio creado con su respectivo nodo en la BD*/
            uid: e.user.uid

          })
        }
        else {
          if (newUserInfo[0] == "Alumno") {
            this.addUser.push().set({
              /*newUserInfo variable que obtiene valores al escribir en el fiormulario 
              de crear usuario*/
              cuenta: newUserInfo[0],
              nombre: newUserInfo[1],
              apellidos: newUserInfo[2],
              estudios: newUserInfo[3],
              edad: newUserInfo[4],
              //Se añadio edad para poder jugar despues a juegos acorde a una edad

              estrellas: 0,
              juegosJugados: 0,
              promedio: 0,
              /*Es importante almacenar el uid porque de esa forma podemos vincular los
               datos del usurio creado con su respectivo nodo en la BD*/
              uid: e.user.uid

            })
          }
        }
        this.clickVirtualToVerificando()
      }
      )
        .catch(f => { this.activarWindowMensaje("Datos no validos","Contraseña o correo invalidos")})

      }
      else{
        this.activarWindowMensaje("Datos incorrectos","Las contraseñas no coinciden")

      }
      
      
      
    }
    else{
      this.activarWindowMensaje("Datos incompletos","Inserta todos los datos para poder crear una cuenta")
    }

    this.setScrollFunction("hidden")


  }

  setScrollFunction(state){
    window.scroll(0,0)
    document.getElementsByTagName("html")[0].style.overflowX = state;
    document.getElementsByTagName("html")[0].style.overflowY= state;
  }


  activarWindowMensaje(titulo,mensaje){
    this.setState({estWindowMensaje:"block",titulo:titulo,mensaje:mensaje})
  }
  

  Login = (e) => {
    e.preventDefault()

    if(this.state.userName=="" || this.state.pass==""){
      this.activarWindowMensaje("Datos incompletos","Inserta los datos de tu cuenta para iniciar sesión")
    }
    else{
      firebase.auth().signInWithEmailAndPassword(this.state.userName, this.state.pass)
      .then(e => {console.log(`Usuario logueado con exito: ${e.user.email}`)})
      .catch(f => { 
        console.log(`F: ${f.code}`)
        this.activarWindowMensaje("Error al iniciar sesion","Contraseña o usuario incorrecto")
      })
    }
    
  }

  AsignarTipoUser(tipo) {
    //Se hace una consultado al nodo que se pasa como parametro 
    this.tipoUsuario = firebase.database().ref().child(`${tipo}`).orderByChild("uid").equalTo(`${this.state.user.uid}`)


    /*/Listener que ayuda a asignar el valor de usuario encontrado a la variable de 
    estado datosUsuarioActual*/
    this.tipoUsuario.on('value', e => {
      /*Se requiere de un try catch porque simpre habra un caso en null y al 
      querer recorrer ese obj se produce un error*/
      try {
        Object.keys(e.toJSON()).forEach(t => {
          console.log("CHECAR:" + e.toJSON()[t])
          this.idUserDB = t
          this.setState({ datosUsuarioActual: e.toJSON()[t] })

        })
      }
      catch (e) {
      }
    })
  }


  CrearClases = (nomb, desc) => {
    this.idClase = "lista"
    var mensaje = "Clase creada con exito"
    this.addClase.push().set({ nombre: nomb, descripcion: desc })
    .then(p => { console.log("Enviando verificacion..") })
    .catch(t => { 
      console.log("Error al enviar notificacion")
      mensaje = "Error al crear la clase"
    })

    return mensaje
  }




  GenerarCodigo(keyObtenida) {
    //Se inicializa en 2 para que inserte un valor en  la primera vuelta del for
    let contGenerar = 2
    let contChar = 0

    //For para recorrer la key de la tarea creada
    for (let i = 1; i < 20; i++) {
      //contGenerar variable que cuenta posiciones en general 
      if (contGenerar == 2) {
        //contChar variable que cuenta cuando ya se hallan almacenado las 2 posicones
        if (contChar == 2) {
          contGenerar = 1
          contChar = 0
        }
        else {
          //Acumulamos los caracteres para ir creando el id de la tarea
          this.codigoClase += keyObtenida[i]
          //Esto sucede en la primera ejecucion del for ya que solo tomara un caracter
          if (i == 1) {
            contChar = 0
            contGenerar = 0;
          }
          else {
            contChar++
          }
        }
      }
      else {
        contGenerar++;
      }
    }

    console.log(this.codigoClase)
  }



  CrearTarea = (tem, subTem, nombAct, instruc, pos, words, tipoAct, up, idClase, estEdad, dia, mes, year, hora, minutes,time) => {
    this.addTarea = firebase.database().ref().child("Tareas")
    this.addTarea.push().set({ tema: tem, subtema: subTem, nombre: nombAct, instrucciones: instruc, posiciones: pos, palabras: words, tipo: tipoAct, vidas: up, edad: estEdad, fecha: `${dia}/${mes}/${year}`, hora: `${hora}:${minutes}`,tiempo:time})
    this.RutasTareas(idClase)
    this.state.tareasClase.splice(0, this.state.tareasClase.length)
  }

  CrearTareaNumeros = (tem, subTem, nombAct, instruc, type, idClase, vel, opera, resps, dia, mes, year, hora, minutes) => {
    this.addTarea = firebase.database().ref().child("Tareas")
    this.addTarea.push().set({ tema: tem, subtema: subTem, nombre: nombAct, instrucciones: instruc, tipo: type, respuestas: resps, velocidad: vel, operaciones: opera, fecha: `${dia}/${mes}/${year}`, hora: `${hora}:${minutes}` })
    this.RutasTareas(idClase)
  }

  CrearTareaPacMan = (tem, subTem, nombAct, instruc, time, preg, resps, repsCorrectas, tip, idClase, dia, mes, year, hora, minutes) => {
    this.addTarea = firebase.database().ref().child("Tareas")
    this.addTarea.push().set({ tema: tem, subtema: subTem, nombre: nombAct, instrucciones: instruc, tiempo: time, preguntas: preg, respuestas: resps, correctas: repsCorrectas, tipo: tip, edad: "noCompartir", fecha: `${dia}/${mes}/${year}`, hora: `${hora}:${minutes}` })
    this.RutasTareas(idClase)
  }

  CrearTareaConjuntos = (tem, subTem, nombAct, instruc, nombresDivs, respDiv1, respDiv2, idClase, juego, dia, mes, year, hora, minutes) => {
    this.addTarea = firebase.database().ref().child("Tareas")
    this.addTarea.push().set({ tema: tem, subtema: subTem, nombre: nombAct, instrucciones: instruc, caja1: { [`${nombresDivs[0]}`]: respDiv1 }, caja2: { [`${nombresDivs[1]}`]: respDiv2 }, tipo: juego, fecha: `${dia}/${mes}/${year}`, hora: `${hora}:${minutes}` })
    this.RutasTareas(idClase)
  }

  CrearTareaPlataformas = (tem, subTem, nombAct, instruc, preg, resps, tip, intentos, idClase, dia, mes, year, hora, minutes,time) => {
    console.log("TAREA PLATAFORMAS CREADA")
    this.addTarea = firebase.database().ref().child("Tareas")
    this.addTarea.push().set({ tema: tem, subtema: subTem, nombre: nombAct, instrucciones: instruc, preguntas: preg, respuestas: resps, tipo: tip, vidas: intentos, fecha: `${dia}/${mes}/${year}`, hora: `${hora}:${minutes}`,tiempo:time})
    this.RutasTareas(idClase)
  }

  RutasTareas(idClase) {
    this.addTarea = firebase.database().ref().child(`/TareasDeClases/${idClase}/${this.idTarea}`)
    this.addTarea.set({ creada: true })
    this.addTarea = firebase.database().ref().child(`/TareasDocentes/${this.idTarea}/${this.idUserDB}`)
    this.addTarea.set({ estado: "usuario creador" })
    this.addTarea = firebase.database().ref().child("Tareas")

  }
  ConsultarCodigo = (code) => {
    let key = ""

    var mensaje = "No te has inscrito a inguna clase, inserta un codigo valido para hacerlo"
    var nameClase = ""

    this.codeQuery = firebase.database().ref().child("/Clases").orderByChild("id").equalTo(code)
    console.log(this.codeQ)

    this.codeQuery.on("value", r => {
      try {
        Object.keys(r.toJSON()).forEach(y => { 
          key = y 
          nameClase = r.toJSON()[y].nombre
          mensaje = `Te has incrito en la clase de '${nameClase}'`
        })
  
        this.codeQuery = firebase.database().ref().child(`/InscripcionClase/${this.idUserDB}/${key}`)
        this.codeQuery.set({ code: code })
  
        this.codeQuery = firebase.database().ref().child(`/ListaAlumnos/${key}/${this.idUserDB}`)
        this.codeQuery.set({ inscrito: true })
      } catch (error) {
      
      }

    })

    console.log(mensaje)

    return mensaje

  }

  /* this.props.ConsultaRelacional(r, "ListaAlumnos", "Alumno")*/

  ConsultaRelacional = (idObjClick, nodoPrincipal, nodoReferencia, classHomework) => {

    const { studentIncritos, clases, tareasPendientes, tareasClase } = this.state
    let contTareas = 0;
    let tarea = true

    if(nodoPrincipal =="TareasDeClases"){
      this.setState({tareasPendientes:[]})
    }

    
    //Operador ternario de If para saber que tipo de valor asignar a una variable dependiendo de que tipo de parametro recibe
    let id = (nodoPrincipal == "ListaAlumnos" || nodoPrincipal == "TareasDeClases") ? idObjClick.id : idObjClick

    this.nombreClase = (nodoPrincipal == "TareasDeClases") ? idObjClick.title : null

    if (nodoPrincipal == "ListaAlumnos") {
      studentIncritos.splice(0, studentIncritos.length)
    }
    //Varibale que almacena un id, que solo es necesario cuando se activa esta funcion para ver tareas de las clases
    this.idClaseTarea = id
  

    this.codeQuery = firebase.database().ref().child(`/${nodoPrincipal}/${id}`)

    if (nodoReferencia == "Alumno") {
      console.log("ID: " + id)
    }


    this.codeQuery.on("value", p => {
      // console.log(p.toJSON())
      try {
        Object.keys(p.toJSON()).forEach(t => {
          if (nodoReferencia == "Alumno") {
            console.log("P: " + p)
            console.log("T: " + t)
          }

          this.codeQuery = firebase.database().ref().child(`/${nodoReferencia}/${t}`)

          console.log("CONSULTA: " + this.codeQuery)

          this.codeQuery.on("value", y => {

            //Es llamada desde una sesion de docente para ver que alumnos estan incritos en su clase
            if (nodoPrincipal == "ListaAlumnos") {
              console.log("REGISTRO 0: " + y.toJSON())

              this.EstadoConsulta(studentIncritos, y.key, y, "ListaAlumnos")
            }
            else {
              //Es llamada por una session de alumno para ver en que clases esta incrito
              if (nodoPrincipal === "InscripcionClase") {
                this.EstadoConsulta(clases, y.key, y, "InscripcionClase")
              }
              else {
                //Es llamado desde el parrafo de cada clase a la que estas incrito desde el componente de Paizarron
                if (nodoPrincipal == "TareasDeClases") {
                  if (classHomework == null) {
                    //Se hace una referencia a "TareasRealizadas" para saber que tareas ha hecho ya el alumno
                    this.codeQuery = firebase.database().ref().child(`TareasRealizadas/${this.idUserDB}/${this.idClaseTarea}`)

                    this.codeQuery.on("value", a => {
                      try {
                        //Leemos los datos del nodo para ver si la tarea que se va a insertar ya esta en "TareasRealizadas"
                        Object.keys(a.toJSON()).forEach(u => {

                          /*Vefificamos si la tarea a insertar coincide con alguna de las tareas que ya ha hecho el 
                          usuario para ya no insertarlas en "tareasPendientes" y que no se muestren otra vez*/
                          //y.key = tarea a insertar | u = tareas de "TareasRealizadas"
                          if (y.key == u) {
                            tarea = false
                          }

                        })

                        //En caso de que la tarea a insertar no este realizada, se inserta en la vafiable de estado
                        if (tarea == true) {
                          this.EstadoConsulta(tareasPendientes, y.key, y, "TareasDeClases")
                          this.setState({ tareasPendientes })
                        }
                        tarea = true
                        contTareas++

                      } catch (error) {
                        console.log(error)
                        this.EstadoConsulta(tareasPendientes, y.key, y, "TareasDeClases")
                        this.setState({ tareasPendientes })
                      }


                    })
                  }
                  else {
                    /*Esto sucede cuando clickeamos una <p> de una clase desde el pizarron, estando el la route
                    de /Calificaciones */
                    this.EstadoConsulta(tareasClase, y.key, y, "TodasTareas")
                  }


                }
                else {
                  //Es llamada por un maestro para saber que clases ha creado
                  if (nodoPrincipal == "ClasesCreadas") {
                    this.EstadoConsulta(clases, y.key, y, "ClasesCreadas")
                  }
                }
              }

            }

          })
        })


      }
      catch (error) {
        //console.log(error)
      }

    })

  }


  EstadoConsulta(varEst, keyConsulta, registro, accion) {
    let estInsertar = true
    const { tareasClase } = this.state
    let notas = []

    console.log("REGISTRO 1: " + registro.toJSON())

    //Verificamos si en la variable estado ya existe un obj igual al que se quiere insertar

    varEst.map(k => {
      if (k.key == keyConsulta) {
        estInsertar = false
      }
    })

    if (estInsertar == true) {
      if (accion == "ListaAlumnos") {
        //Se hace la consulta para saber que calificaciones tienen los alumnos en base a sus tareas realizadas
        this.codeQuery = firebase.database().ref().child(`TareasRealizadas/${keyConsulta}/${this.idClaseTarea}`).orderByChild("calificacion")

        this.codeQuery.on("value", c => {
          console.log(c.toJSON())

          //Es necesesario el try porque para los alumnos que todavia no tienen califiaciones marca error
          try {
            /*Leemos las notas de los alumnos y las insertamos en un array declarado en esta funcion 
            para asi poder obtener solo la nota y no un nodo padre*/
            Object.keys(c.toJSON()).forEach(s => {
              notas.push(c.toJSON()[s].calificacion)
            })
          }
          catch (e) {

          }

        })
        console.log("REGISTRO 2: " + registro.toJSON())

        //Se junto a apellido con nombre para poder ponerlo en una sola columna de la tabla en <ListaAlumnos>
        varEst.push({ nombre: registro.toJSON().nombre + " " + registro.toJSON().apellidos, key: keyConsulta, calif: notas })



        //Funcion que ordena valores del array objeto de acuerdo al nombre, de forma asendente
        varEst.sort(function (a, b) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          // a must be equal to b
          return 0;
        })

      }
      if (accion == "InscripcionClase") {
        varEst.push({ key: registro.key, nombre: registro.toJSON().nombre })
      }

      if (accion == "TareasDeClases") {
        varEst.push({ key: registro.key, nombre: registro.toJSON().nombre })
      }

      if (accion == "ClasesCreadas") {
        varEst.push({ key: registro.key, nombre: registro.toJSON().nombre, descripcion: registro.toJSON().descripcion, id: registro.toJSON().id })
      }
      if (accion == "TodasTareas") {
        /*Ademas de mostrar las tareas en la route /Calificaciones tenemos que mostrar la nota obtenida para esa
        tarea si la hay*/

        //Es por eso que hay que hacer referencia al nodo de TareasRealizadas ya que este almacena la nota
        this.codeQuery = firebase.database().ref().child(`TareasRealizadas/${this.idUserDB}/${this.idClaseTarea}/${registro.key}`)

        this.codeQuery.on("value", y => {
          /*Es necesario un try porque no todas las tareas estan en TareasRelizadas por tanto tampoco tinen una nota
           y por eso puede que el "value" no devuelva nada*/
          try {
            console.log(registro.toJSON())                                             //Extraemos la nota
            varEst.push({ key: registro.key, nombre: registro.toJSON().nombre, nota: y.toJSON().calificacion, fecha: registro.toJSON().fecha, hora: registro.toJSON().hora })

          }
          catch (error) {
            //console.log(error)
            varEst.push({ key: registro.key, nombre: registro.toJSON().nombre, nota: null, fecha: registro.toJSON().fecha, hora: registro.toJSON().hora })

          }
          this.setState({ tareasClase })
        })
      }
      console.log("VAR: ", varEst)

      this.setState({ varEst })

    }
    else {
      console.log("registro ya almacenado: " + registro)
    }
    estInsertar = true
  }

  //Funcion ejecutada desde el componente de pizarron
  ConsultarTarea = (keyTarea) => {
    console.log(keyTarea)
    this.codeQuery = firebase.database().ref().child(`Tareas/${keyTarea}`)
    this.idTarea = keyTarea
    this.codeQuery.on("value", p => {
      console.log(p.toJSON())
      //variable que almacena los datos la tarea seleccionada para hacer para despues utilizarlos en la act.
      this.state.tareaHacer = p.toJSON()

    })
  }

  ActualizarEst = () => {
    /*Esta variable estado se actualiza aqui porque esta funcion es llamada cuando presionas el boton iniciar
    del <Pizarron>*/
    let { tareaHacer } = this.state
    this.setState({ tareaHacer })
  }

  CrearTablero(varEst, letrasColor) {
    const letras = ["a", "b", "c", "d", "e", "f", "j", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    //Ciclo que accede a los elemntos del array de estado tablero 
    for (let f = 0; f < 10; f++) {
      for (let c = 0; c < 10; c++) {
        /*Genera un valor aleatorio de 0 a 25, porque son estas el total de letras
         del array "letras" que ya contiene por defecto*/

        var num = Math.floor((Math.random() * 10) + 1);
        varEst[f][c] = letras[num]

        if (letrasColor == null) {
          console.log("No se hace nada")
        }
        else {
          letrasColor[f][c] = { color: "#FFFFFF", fontSize: "1.7em", margin: "auto" }
        }
      }

    }
  }

  ImprimirTablero = (tab, ValidarPosicion, letrasColor, ClickLetras) => {
    let c = -1
    let f = -1
    return (
      <table className="tablero-sopa">
        {
          //Este map se recorre 12 veces ya que son los elemntos totales que tiene el array
          tab.map(p => {
            c = -1;
            f++
            return (
              <tr>
                {
                  /*"p" es la posicion de array "tablero" que a su vez tambien es un array que contiene
                  24 letras
                  
                  ClickLetras funcion que va a ser ejecutada por cualquiera de las letras del tablero
                  */
                  p.map(g => {
                    c++
                    return (
                      <th><p style={(ValidarPosicion != null) ? letrasColor[f][c] : null} id={c} title={f} className="parrafo" onClick={(ValidarPosicion != null) ? (e) => { ValidarPosicion(e, g) } : ClickLetras}>{g}</p></th>
                    )

                  })
                }
              </tr>
            )
          })
        }

      </table>

    )

  }

  //Funcion llamada desde SopaGame que se ejecuta cuando el juego acaba
  TareaFinalizada = (idTarea, calif) => {
    console.log("ID CALSE; "+this.idClaseTarea)
    this.codeQuery = firebase.database().ref().child(`TareasRealizadas/${this.idUserDB}/${this.idClaseTarea}/${idTarea}`)
    this.codeQuery.set({ calificacion: calif })
  }

  ReiniciarValores = () => {
    this.setState({ tareasPendientes: [], tareasClase: [],isClickedClase:false})
  }

  
  setEstadoClickClaseFromCalificaciones=(estClick)=>{
    this.setState({isClickedClase:estClick})
}


  clearNombresJuegos=()=>{
    this.setState({nombresJuegos:[]})
  }

  WriteJuego = (busqueda) => {

    const { nombresJuegos } = this.state

    //Variable para saber si insertar juegos en la variable de estado "nombresJuegos"
    let estJuego = null

    //busqueda, parametro que almacena el valor de la cadena escrita en el input de AppStudent en la Route "Buscar"
    /*Este if es necesariao ya que  al vaciar el input la variable se queda con datos del juego
     anteriormente buscado*/
    if (busqueda != "") {
      //Query para buscar Tareas de acuerdo al nodo nombre                                 //Sentencia para hacer un rango de busqueda 
      this.queryJuego = firebase.database().ref().child("/Tareas").orderByChild("nombre").startAt(busqueda).endAt(`${busqueda}\uf8ff`).limitToFirst(3)
      this.queryJuego.on("value", p => {
        //console.log(p.toJSON())

        try {
          Object.keys(p.toJSON()).forEach(v => {

            //"find" es una funcoion de los array para buscar un elemento en alguna de sus posiciones
            estJuego = nombresJuegos.find(game => game.nombre == p.toJSON()[v].nombre)

            /*La funcion find al no encontrar en el array un elemento igual al juego que se quiere insertar
            devuelve undefined*/
            if (estJuego == undefined) {
              nombresJuegos.push({ nombre: p.toJSON()[v].nombre })
              this.setState({ nombresJuegos })
            }

          })
        }
        catch (d) {

        }

      })
    }
    else {
      /*En caso de no tener nada escrito en el input de busqueda el array se vacia para no seguir 
      almacenando nombres de jugos de la busquedad anterior*/
      this.setState({ nombresJuegos: [] })
    }

  }

  BuscarJuego = (busqueda) => {
    console.log(busqueda)
    const { juegosBuscados, nombresJuegos } = this.state
    nombresJuegos.splice(0, nombresJuegos.length)
    juegosBuscados.splice(0, juegosBuscados.length)
    console.log(busqueda)
    var mensaje = ""


    //Se busca la tarea de acuerdo a lo que escribes en elinput haciendo query a un child 
    /*nota:El rango esta para una ves que el usuario busque su juego el programa pueda mostrar 
    los resultado parecidos a su busqueda ademas del que el busco*/
    this.queryJuego = firebase.database().ref().child("/Tareas").orderByChild("nombre").startAt(busqueda).endAt(`${busqueda}\uf8ff`)

    //Tareas encontradas
    this.queryJuego.on("value", p => {
      try {
           //Se recorre cada una de las tareas
        Object.keys(p.toJSON()).forEach(k => {
        console.log("Tarea ID: " + k)

          //Con la key de las tareas encontradas puedes acceder a un nodo que permite ver que docente creo la tarea
          this.queryJuego = firebase.database().ref().child(`/TareasDocentes/${k}`)

          //Accedemos a los datos dentro del nodo resultante que seria el key del docenyte que creo la tarea
          this.queryJuego.on("value", x => {

            //Accedemos al key del docente encontrado
            Object.keys(x.toJSON()).forEach(l => {
              console.log(l)

              //Ya con la key del docente,ahora si procedemos a buscarlo en el nodo de Docentes
              this.queryJuego = firebase.database().ref().child(`/Docente/${l}`)

              /*Obtenemos la informacion del docente y ahora insertamos los datos de la tarea y 
              del docente en una variable de estado*/
              this.queryJuego.on("value", t => {
                console.log(t.toJSON())
                juegosBuscados.push({ keyTarea: k, nombre: p.toJSON()[k].nombre, tipo: p.toJSON()[k].tipo, fecha: null, UserName: t.toJSON().nombre, from: t.toJSON().nacionalidad })
                this.setState({ juegosBuscados })
              })
            })

          })

      
      })
        
      } catch (error) {
        mensaje = "No resultados para esta busqueda..."
      }

      
    })
    return mensaje
  }

  JuegosPorEdad = (tipoJuego) => {
    //Array para almacenar los juegos 
    let arrayJuegos = []
    let juego = {}
    var num = 0

    var hayJuegos = true

    /*Se consultan las tareas de acuerdo a su propiedad edad que es la misma que la
    edad del alumno que este usando la app*/
    console.log("TIPO JUEGO: "+tipoJuego)

    

    
    try {
      this.queryJuego = firebase.database().ref().child("/Tareas").orderByChild("tipo").equalTo(tipoJuego)
    this.queryJuego.on("value", p => {
      if(p.toJSON() !=null){
        Object.keys(p.toJSON()).forEach(k => {
  

          //Se hace un filtro para traer solo los juegos del tipo que haya seleccionado el alumno
         // if (this.state.datosUsuarioActual.edad == p.toJSON()[k].edad) {
            /*Se almacenan las propiedades del objeto del juego encontrado en una variable obj definida en 
            esta funcion, para que la key del objeto original desapareciera*/
            Object.keys(p.toJSON()[k]).forEach(t => {
              juego[t] = p.toJSON()[k][t]
            })
  
            //se inserta la actividad a una variable local
            arrayJuegos.push(juego)
            juego = {}
         // }
  
        })
      }
      
    })
    console.log("ArrayJuegos:")
    console.log(arrayJuegos)
    //Se genera un numero aleatorio de entre la longitud de las tareas encontradas

    num = (arrayJuegos.length>1)?Math.floor(Math.random() * ((arrayJuegos.length + 1) - 0) + 0):0


    //CODIGO DE 02/05/2024 
    /*console.log("NUM RANDOM: ", 0)
    console.log(arrayJuegos[0])
    this.idTarea = arrayJuegos[0].key
    console.log(this.idTarea)
    console.log(arrayJuegos[0])*/

    console.log("NUM RANDOM: ", num)
    console.log(arrayJuegos[num])
    this.idTarea = arrayJuegos[num].key
    console.log(this.idTarea)
    console.log(arrayJuegos[num])

    /*Se hace referencia a una tarea del array y se le asigna a una variable 
    de estado que almacenara la informacion del juego que jugara el alumno*/
    this.setState({ tareaHacer: arrayJuegos[num] })
    } catch (e) {
      hayJuegos = false
      console.log("NO HAY JUEGOS")
    }

    return hayJuegos
    

  }

  JuegoLibreFinalizado = (estrellas) => {
    console.log("Estrellas ganadas: ", estrellas)

    this.SetearSkills("estrellas", estrellas)
    this.SetearSkills("juegosJugados", null)
  }

  SetearSkills(rutaValor, estrellas) {
    let estBefore = 0

    this.codeQuery = firebase.database().ref().child(`/Alumno/${this.idUserDB}/${rutaValor}`)
    this.codeQuery.on("value", k => {
      console.log(k.toJSON())
      estBefore = k.toJSON()
    })
    estBefore++;
    (rutaValor === "estrellas") ? this.codeQuery.set((estrellas + estBefore)) : this.codeQuery.set(estBefore)
     
  }

  CompartirActividad = (edad) => {
    this.codeQuery = firebase.database().ref().child(``)
  }

  /*Funciones  "MoverEnemigos"," LimitarPosEnemigos" y "DecidirDireccion" se pasaron aqui ya que se utilizan 
  en 2 juegos, en Pacman y conjuntos, de esta se pueden reutilizar para cada uno y ahorrar lineas de codigo*/

  MoverEnemigos = (arrayObjs, vel, limRight, limDown, limLeft, limTop) => {
    /*arrayObjs = array de objetos a los que hay que mover
      vel = velocidad a la que se moveran
      limDown = ""  alto ""         ""    ""    ""    ""    ""      ""      ""
      limRight = variable para limitar a los aliens en el lado derecho 
      limLeft = variable para limitar  a los aliens en el lado izq*/


    //Se crea un copia de los valores
    //"limRight" tiene el valor del width del canvas-width de una de las cajas en la que se meten a los aliens
    let limRightCopia = limRight
    let limLeftCopia = limLeft
    let limDownCopia = limDown
    let limTopCopia = limTop


    //Ciclo que recorre a los alien puestos ya en escena
    for (const i in arrayObjs) {

      var al = arrayObjs[i]

      //Dependiendo del valor que el enemigp tenga en su propiedad "direccion" es hacia donde se movera
      if (al.direccion == "arriba") {
        al.y -= vel
      }
      else {
        if (al.direccion == "abajo") {
          al.y += vel
        }
        else {
          if (al.direccion == "derecha") {
            al.x += vel
          }
          else {
            if (al.direccion == "izquierda") {
              al.x -= vel
            }
          }
        }
      }

      //Se cunmple en caso de haber clickeado a un alien 
      if (al.direccion == "noMover") {
        /*El alien que haya sido atrapado podra ser arrastrado por toda el area del canvas, los valores cambian 
        dependiedo el tamaño de la pantalla*/
        //PC
        if (window.screen.width > 769) {
          limRight = limRightCopia + limLeftCopia
          limLeft = 0
          limDown = limDownCopia
        }
        else {
          //MOVIL
          limTop = 5
          limDown = limDownCopia + limTopCopia
        }

      }
      else {
        //Para los aliens atrapados en las cajas
        if (al.atrapado) {
          //PC
          if (window.screen.width > 769) {
            //Se establece el limite inferior al cual los aliens de podrna mover dentro de las cajas
            limDown = limDownCopia - 100
            /*Verificamos a que caja pertenece el alien, simpre los aliens que sean atrapados estaran 
            en la caja que les corresponde, porque si no es asi, el alien elimina*/

            //Caja que esta ubicada en el lado izquierso del canvas
            if (al.tipo == "caja1") {
              limLeft = 0

              limRight = limLeftCopia
            }
            else {
              //width del canvas -width de la caja
              limLeft = limRightCopia
              //width del canvas
              limRight = limRightCopia + limLeftCopia

            }
          }
          else {
            limLeft = 50
            limRight = limRightCopia - 50

            //Caja que esta ubicada en la parte superior
            if (al.tipo == "caja1") {
              limTop = 50

              limDown = limTopCopia
            }
            else {
              limTop = limDownCopia + 30

              limDown = limDownCopia + limTopCopia - 25

            }
          }

        }
        else {
          /*Se setan los valores para no afectar a otros aliens en caso de que para uno se hallan cambiado los
          limites, por ejemplo uno que ya haya sido atrapado en una caja*/

          limRight = limRightCopia
          limLeft = limLeftCopia
          limDown = limDownCopia
          limTop = limTopCopia
        }
      }

      if (this.LimitarPosEnemigos(al.x, al.y, al.width, al.height, limRight, limDown, limLeft, limTop)) {
        //El valor que retorna es una direccion contraria a la que ya tiene el enemigo
        al.direccion = this.LimitarPosEnemigos(al.x, al.y, al.width, al.height, limRight, limDown, limLeft, limTop)
      }

    }
  }

  LimitarPosEnemigos = (posX, posY, valWidth, valHeight, limRight, limDown, limLeft, limTop) => {
    //IZQUIERDA CANVAS
    var limiteDer = limRight - valWidth
    //ABAJO CANVAS
    var limiteAbajo = limDown - valHeight
    let direc = ""

    if (posX > limiteDer) direc = "izquierda"
    if (posX < limLeft) direc = "derecha"
    if (posY > limiteAbajo) direc = "arriba"
    if (posY < limTop) direc = "abajo"
    return direc
  }




  DecidirDireccion = () => {
    //Se genera un valo aleatorio entre 0 y 11
    var numAleat = Math.floor((Math.random() * 11) + 1);
    let dir = ""


    /*Casi por azar dependiendo del valor de "numAleat" se cumple la condicion o no y en base a eso 
    se define una direccion*/
    if (numAleat < 6) {
      //Se vuelve a generar un numero aleatorio para saber hacia donde ira el enemigo
      //VERTICAL
      numAleat = Math.floor((Math.random() * 11) + 1);
      //ARRIBA
      if (numAleat < 6) {
        dir = "arriba"
      }//ABAJO
      else {
        dir = "abajo"
      }
    }
    else {
      //HORIZONTAL
      numAleat = Math.floor((Math.random() * 11) + 1);
      //DERECHA
      if (numAleat < 6) {
        dir = "derecha"
      }//IZQUIERDA
      else {
        dir = "izquierda"
      }

    }

    return dir

  }

  Colisiones(a, b) {
    var hit = false
    try {
      if (b.x + b.width >= a.x && b.x < a.x + a.width) {
        if (b.y + b.height >= a.y && b.y < a.y + a.height) {
          hit = true
        }
      }

      if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
        if (b.y <= a.y && b.y + b.height >= a.y + a.height) {
          hit = true
        }
      }
      if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
        if (a.y <= b.y && a.y + a.height >= b.y + b.height) {
          hit = true
        }
      }
    } catch (e) {

    }

    return hit
  }


  Alumno_Docente() {
    if (this.state.infoSkooldy) {
      return (
        <div className="layout layout--color layout--funciones">

          <ul className="lista">
            <li className="lista-item lista-item--imagen">
              <img className="lista-item__image" src={Alumno}></img>
            </li>

            <li className="lista-item lista-item--item1">
              <div className="lista-item-icon-des">
                <img className="lista-item-icon-des__icon" src={iconLapiz}></img>
                <p className="lista-item-icon-des__titulos">Inscribirse a clases</p>
              </div>
              <p className="lista-item__des">
                Inscríbete a las clases de todos tus
                maestros
              </p>
            </li>


            <li className="lista-item lista-item--item2">
              <div className="lista-item-icon-des">
                <img className="lista-item-icon-des__icon" src={iconLupa}></img>
                <p className="lista-item-icon-des__titulos">Buscar juegos</p>
              </div>
              <p className="lista-item__des">
                Busca y juega cualquier juego de docentes de
                de todas partes del mundo
              </p>
            </li>

            <li className="lista-item lista-item--item3">
              <div className="lista-item-icon-des">
                <img className="lista-item-icon-des__icon" src={iconItem}></img>
                <p className="lista-item-icon-des__titulos">Ganar items</p>
              </div>
              <p className="lista-item__des">
                Mantente motivado superando las pruebas de tus docentes y ganando
                experiencia
              </p>
            </li>

            <li className="lista-item lista-item--item4">
              <div className="lista-item-icon-des">
                <img className="lista-item-icon-des__icon" src={iconVer}></img>
                <p className="lista-item-icon-des__titulos">Ver calificaciones</p>
              </div>
              <p className="lista-item__des">
                Mira cono te ha ido, ve las calificaciones de tus clases
              </p>
            </li>

            <li className="lista-item lista-item--item5">
              <div className="lista-item-icon-des">
                <img className="lista-item-icon-des__icon" src={iconJugar}></img>
                <p className="lista-item-icon-des__titulos">Jugar juegos</p>
              </div>
              <p className="lista-item__des">
                Acceso a todos los juegos del tema
                que tu quieras
              </p>
            </li>
          </ul>

        </div>
      )
    }
    else {
      /* return (
        <div className="layout layout--section">
          <img className="layout__image" src={Alumno}></img>

          <ul className="lista">
            <li className="lista__item">
              <img className="lista__icon" src={iconLapiz}></img>
              Inscribirse a clases
            </li>
            <li className="lista__item">
              <img className="lista__icon" src={iconLupa}></img>
              Buscar juegos
            </li>
            <li className="lista__item">
              <img className="lista__icon"  src={iconItem}></img>
              Ganar items
            </li>
            <li className="lista__item">
              <img className="lista__icon"  src={iconVer}></img>
              Ver calificaciones
            </li>
            <li className="lista__item">
              <img className="lista__icon"  src={iconJugar}></img>
              Jugar juegos
            </li>
          </ul>
          
        </div>
      ) */
    }

  }

  ViweRanking = () => {
    let { usuariosRanking } = this.state
    this.ranking = firebase.database().ref().child("Alumno").orderByChild("estrellas").limitToFirst(15)
    this.ranking.on("value", x => {
      Object.keys(x.toJSON()).forEach(t => {
        //console.log(e.toJSON()[t])
        usuariosRanking.push({ nombre: x.toJSON()[t].nombre, estrellas: x.toJSON()[t].estrellas, promedio: x.toJSON()[t].promedio })


      })
      console.log()
      this.setState({ usuariosRanking })
    })

  }

  ActivarVentana = () => {
    this.setState({ windowVisible: "flex" })
  }

  DesactivarVentana = () => {
    this.setState({ windowVisible: "none" })
  }


  VentanaInfoUserPc = () => {
    /*Es necesarion que este componte se mande llamar despues de validarse esta condicional, ya que este es mandado a llamar fuera de la 
    estructura del Router, porque este componente en este caso esta preparado para funcionar como ventana emergente y no como una ruta*/
    if (window.screen.width > 769) {
      return (<WindowGetOut windowVisible={this.state.windowVisible} GetOut={this.GetOut} datosUsuarioActual={this.state.datosUsuarioActual} user={this.state.user}></WindowGetOut>)

    }
  }



  SelectTipo = (pos, id) => {

    const { newUserInfo } = this.state
    let obj = document.getElementById(id)
    let valor = obj.value

    console.log("VALOR: "+valor);
    console.log("POS: "+pos);


    this.datosForm[pos] = `${valor}`
    console.log("ARRAY: "+this.datosForm)


    if (id == "OPTIONS") {
      if (valor == "Alumno") {
        this.estGrados = "block"
      }
      else {
        this.estGrados = "none"

        newUserInfo[3] = "null"
      }

     
    }



    newUserInfo[pos] = valor

    this.setState({ newUserInfo })
  }



}

export default App;
