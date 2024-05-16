import React, { Component } from 'react'
import './FormTareas.css'
import Pacman from '../Imagenes/Pacman.png'
import Plataforma from '../Imagenes/Plataforma.png'
import Alien from '../Imagenes/Alien.png'
import { Button } from 'shards-react'
import headerForm from '../img/AppTeacher/Formularios/header_form.svg'
import speaker from '../img/AppTeacher/Formularios/Speaker.svg'
import ojo from '../img/AppTeacher/Formularios/ojo.svg'

class FormTareas extends Component {
    componentDidMount() {
        if (this.props.tipoJuego == "Numeros") {
            /*Se manda a llamar a la fucnion para que cree inputs para un operacion de 2 digitos
            y asi de un inicio haya algo y no este vacia esa seccion del formulario*/
            this.CreadorInputs(3, this.state.arrayPalabras, "numbers", null, "")

            this.canvas = document.getElementById("canvasEjemplo")
            this.ctx = this.canvas.getContext('2d')

            this.props.IniciarFiguras(this.props.figurasBoton, (this.canvas.height - 130), "figuras")
            this.props.IniciarFiguras(this.props.figRespuestas, 0, "respuestas")

            /*ya que el interLento se ejecuta despues de 10 seg el canvas estaria vacio de un inicio, para 
            corregir esto es por que se manda a llamar una vez*/
            //this.Update()
            this.intervalo = window.setInterval(() => { this.Update() }, 1000 / 55)

        }
        //window.SpeechSynthesisUtterance()

    }
    constructor() {
        super()
        this.insDate = new Date()
        console.log("HORA: ", this.hora)
        this.palabra = ""
        this.cont = 0
        this.canvas = null
        this.ctx = null
        this.intervalo = null
        this.interLento = null
        this.numRadioButton = 0
        this.numResp = 0
        this.numResp2 = 0
        this.estInterLento = true

        this.contObj = 0;
        this.contPosObj = 0;
        this.dif = 0
        this.newContent = "";
        this.contPreguntas = 0
        this.estDigito2=false
        this.estDigito3=false
        this.contEstInput =0


        this.contInputsDinamics = 0
        this.contInputsDinamics_Dos = 0
        this.punteroInputPregunta=1

        this.incisos = ["a","b","c","d"]
        this.conPalabras =-1

        this.state = {
            arrayPalabras: [],
            tema: "",
            subtema: "",
            nombre: "",
            instrucciones: "",
            idClase: "",
            vidas: null,
            estVentana: "Parte1",
            setWindow: false,
            displayBoton: "none",
            tipoActividad: "texto",
            valInputResp: 0,
            estWindow: false
        }
    }


    render() {
        this.contInputsDinamics =0
        this.contInputsDinamics_Dos=0
        this.contEstInput = 0
        this.conPalabras = -1
        return (
            <div className="modulo modulo--form">
                <div className="content-form_header" style={{ background: `url(${headerForm})`, backgroundSize: "cover" }}>
                    <p className="nombre-juego">{this.props.nombreJuego}</p>

                    <div className="content-butt-header">
                        <div className="buttons-header" onClick={() => { this.setState({ tipoActividad: "texto" }) }}>
                            <img className="icon-form" src={ojo}></img>
                        </div>
                        <div className="buttons-header" onClick={() => { this.setState({ tipoActividad: "audio" }) }}>
                            <img className="icon-form" src={speaker}></img>
                        </div>
                    </div>

                </div>

                <div className="content-form">

                    <div className= "content-form-izq" style={(this.props.tipoJuego === "PacMan" || this.props.tipoJuego === "Plataformas" )?{width:"100%",background:"none"}:null}>
                        <div className="inputs-defecto-form">

                            {/*Estrcutura basica para crear una actividad*/}
                            <div className="content-inline">
                                <p className="content-inline_text">Tema: </p>
                                <input id="inputTema" className="inputs-form" name="tema" onChange={this.WrittingInfo}></input>
                                <button className="buttons buttons--play" style={(this.state.tipoActividad == "texto") ? { display: "none" } : null}
                                    onClick={() => { this.ReproducirAudio(this.state.tema) }}>Play</button>
                            </div>



                            <div className="content-inline">
                                <p className="content-inline_text">Subtema: </p>
                                <input id="inputSubtema"  className="inputs-form" name="subtema" onChange={this.WrittingInfo}></input>
                                <button className="buttons buttons--play" style={(this.state.tipoActividad == "texto") ? { display: "none" } : null}
                                    onClick={() => { this.ReproducirAudio(this.state.subtema) }}>Play</button>
                            </div>



                            <div className="content-inline">
                                <p className="content-inline_text">Nombre de actividad: </p>
                                <input id="inputNombreAct"  className="inputs-form" name="nombre" onChange={this.WrittingInfo}></input>
                                <button className="buttons buttons--play" style={(this.state.tipoActividad == "texto") ? { display: "none" } : null}
                                    onClick={() => { this.ReproducirAudio(this.state.nombre) }}>Play</button>
                            </div>


                            <div className="content-inline">
                                <p className="content-inline_text">Instrucciones: </p>
                                <textarea id="inputInstruc" style={{width: "18em"}} className="inputs-form" name="instrucciones" onChange={this.WrittingInfo}></textarea>
                                <button className="buttons buttons--play" style={(this.state.tipoActividad == "texto") ? { display: "none" } : null}
                                    onClick={() => { this.ReproducirAudio(this.state.instrucciones) }}>Play</button>
                            </div>



                            <div className="content-inline">
                                <p className="content-inline_text">Asignar a clase: </p>
                                {/* <input className="inputs-form" name="idClase" onChange={this.WrittingInfo}></input>
 */}
                                <select  id="dropDownClase" className="inputs-form" onChange={this.GetIdClase}>
                                    <option value="0" selected>seleccione una materia</option>
                                    {

                                        this.OpcionesClases()

                                    }

                                </select>


                                <button className="buttons buttons--play" style={(this.state.tipoActividad == "texto") ? { display: "none" } : null}
                                    onClick={() => { this.ReproducirAudio(this.state.idClase) }}>Play</button>
                            </div>

                        </div>



                        {
                            this.Vidas(this.props.vidas)
                        }

                        {
                            /*Funcion que delimita que mostrar en pantalla dependiendo de la props que se recibe 
                            y hace referencia a un juego*/
                            this.EstadoFormulario()
                        }
                    </div>
                    {
                        this.RenderSeccionDer()
                    }
                </div>


                {this.WindowsJuegoTerminado()}

            </div>)
    }

    validateDataDefaultInputs(){
        var isValidData=false
        var inputTema = document.getElementById("inputTema").value
        var inputSubtema = document.getElementById("inputSubtema").value
        var inputNombreAct = document.getElementById("inputNombreAct").value
        var inputInstruc = document.getElementById("inputInstruc").value
        var dropDownClase = document.getElementById("dropDownClase").value

        if(inputTema !="" && inputSubtema !="" && inputNombreAct !="" && inputInstruc !="" && dropDownClase !=0){
            isValidData = true
        }

        console.log(`TEMA ${inputTema}`)
        console.log(`SUBTEMA ${inputSubtema}`)
        console.log(`NOMRBE ${inputNombreAct}`)
        console.log(`INSTRUCCIONES ${inputInstruc}`)
        console.log(`CLASE ${dropDownClase}`)


        return isValidData

    }


    RenderSeccionDer = () => {
        const { tema, subtema, nombre, instrucciones, arrayPalabras } = this.state

        if (this.props.tipoJuego === "Sopa") {
            return (
                <div className="content-dinamic-der">
                    {this.props.ImprimirTablero(this.props.tablero, null, null, this.props.ClickLetras)}
                    <button className="buttons buttons-crear-tar buttons-crear-tar-sopa" onClick={() => { 
                        var isValidData = this.validateDataSopa()
                    
                        if(isValidData){
                            try {
                                this.setState({ estWindow: true })
                            } catch (error) {
                                console.log("ERROR: " + error)
                            }
                            this.props.CrearTarea(tema, subtema, nombre, instrucciones, this.props.posiciones, this.props.palabras, this.props.tipoJuego, this.state.vidas, this.state.idClase, 5, this.insDate.getDate(), this.insDate.getMonth() + 1, this.insDate.getFullYear(), this.insDate.getHours(), this.insDate.getMinutes(),this.props.tiempo) 
                        }
                        else{
                            this.props.activarWindowMensaje("No se ha podido crear la actividad, porque hay datos faltantes")

                        }
                        }}>Crear tarea</button>

                </div>
            )
        }
        else {
            if (this.props.tipoJuego === "Numeros") {
                return (

                    <div className="content-dinamic-der" name="hijo2">

                        <p className="content-inline_text">Velocidad</p>
                        <input id="inputVelocidad" className="inputs-form inputs-form--number input-vel" onChange={(e) => {
                            /*Variable se vuelve a false para que en el update que es ejecutado por
                            el intervalo rapido ya no ejecute al intervalo lento, esto para permitirle al 
                            usuario testear con velocidades y noctener que esperar 10 segundos 
                            para ver como se ven*/
                            this.estInterLento = false

                            /*Se dietiene al intervalo lento para que ya no se ejecute y se detiene
                            al rapido  para poder volver a iniciarlo aqui mismo */
                            clearInterval(this.interLento)
                            clearInterval(this.intervalo)
                            this.intervalo = window.setInterval(() => {
                                this.Update()
                            }, 1000 / 55)
                            this.props.SetVelocidad(e.target.value)
                        }}
                            onBlur={() => { this.estInterLento = true }}></input>
                        {/* width="700" height="500" */}
                        <canvas width={(window.screen.width < 480) ? window.screen.width - 20 : (window.screen.width > 480 && window.screen.width < 769) ? window.screen.width - 35 : window.screen.width - (window.screen.width / 1.9)} height={(window.screen.height < 550) ? window.screen.height / 3 : window.screen.height / 3} style={{ background: "#5C5C5C", alignSelf: "center", margin: "1em 0" }} id="canvasEjemplo"></canvas>
                        <button className="buttons buttons-crear-tar" onClick={() => {

                            var isDataValid = this.validateDataNumeros()
                            console.log(`isDataValid: ${isDataValid}`)
                            if(isDataValid){
                                console.log(this.props.ConvertirObjs(this.props.operaciones))
                                //console.log(this.props.ConvertirObjs(this.props.respuestas))
    
    
                                this.setState({ estWindow: true })
                                this.props.CrearTareaNumeros(tema, subtema, nombre, instrucciones, this.props.tipoJuego, this.state.idClase, this.props.velocidad, this.props.ConvertirObjs(this.props.operaciones), this.props.ConvertirObjs(this.props.respuestas), this.insDate.getDate(), this.insDate.getMonth() + 1, this.insDate.getFullYear(), this.insDate.getHours(), this.insDate.getMinutes())
                            }
                            else{
                                this.props.activarWindowMensaje("No se ha podido crear la actividad, porque hay datos faltantes")
                                console.log("INSERTA Todos los datos")
                            }

                           
                        }}>Crear Tarea</button>
                    </div>

                )

            }
            else {
                if (this.props.tipoJuego === "Conjuntos") {
                    return (
                        <div className="content-dinamic-der" name="padre">
                            {/*                             <p>{this.props.contObj2}</p>
 */}                            <div className="cajas" name="hijo1">
                                <div className="content-num-resp-conj">
                                    <p className="content-inline_text">Nombre caja 1:</p>
                                    <input className="inputs-form" onChange={(e) => { this.props.GuardarValInput(0, this.props.nombCajas, e.target.value) }}></input>
                                </div>


                                {this.CadenaAudio(this.state.tipoActividad, 0, this.props.nombCajas, false)}
                                <div className="content-num-resp-conj">
                                    <p className="content-inline_text">No. respuestas: </p>
                                    <input className="inputs-form inputs-form--number" onChange={(e) => {
                                        if (e.target.value != "") {
                                            /*Su funcion es asignar un valor a "contObj" dependiendo de la longitud,
                                            esto para saber que corrida es, es decir si es la primera o no */
                                            (this.state.arrayPalabras.length == 0) ? this.contObj = 0 : this.contObj = 1

                                            /*"contPosObj" variable que se encarga de las pocisones al crear mas 
                                            inputs*/
                                            this.contPosObj = this.state.arrayPalabras.length
                                            this.CreadorInputs(e, this.state.arrayPalabras, "dont", null, "")
                                        }

                                    }}></input>
                                </div>


                                {
                                    this.props.MostrarInputs(this.state.arrayPalabras, Alien, this.props.aliensDiv1, this.CadenaAudio, this.state.tipoActividad)
                                }

                            </div>

                            <div className="cajas" name="hijo2">
                                <div className="content-num-resp-conj">
                                    <p className="content-inline_text">Nombre caja 2:</p>
                                    <input className="inputs-form" onChange={(e) => { this.props.GuardarValInput(1, this.props.nombCajas, e.target.value) }}></input>
                                </div>

                                {this.CadenaAudio(this.state.tipoActividad, 1, this.props.nombCajas, false)}
                                <div className="content-num-resp-conj">
                                    <p className="content-inline_text">No. respuestas: </p>
                                    <input className="inputs-form inputs-form--number" onChange={(e) => {
                                        if (e.target.value != "") {
                                            (this.props.arrayPalabras2.length == 0) ? this.contObj = 0 : this.contObj = 1
                                            this.contPosObj = this.props.arrayPalabras2.length
                                            this.CreadorInputs(e, this.props.arrayPalabras2, "respConjuntos2", null, "")
                                        }

                                    }}></input>
                                </div>

                                {
                                    this.props.MostrarInputs(this.props.arrayPalabras2, Alien, this.props.aliensDiv2, this.CadenaAudio, this.state.tipoActividad)
                                }
                            </div>




                            <button className="buttons buttons-crear-tar" onClick={() => {
                                var isValidData = this.validateDataConjuntos()
                                if(isValidData){
                                    this.props.CrearTareaConjuntos(tema, subtema, nombre, instrucciones, this.props.nombCajas, this.props.aliensDiv1, this.props.aliensDiv2, this.state.idClase, this.props.tipoJuego, this.insDate.getDate(), this.insDate.getMonth() + 1, this.insDate.getFullYear(), this.insDate.getHours(), this.insDate.getMinutes())
                                    this.setState({ estWindow: true })
                                }
                                else{
                                    this.props.activarWindowMensaje("No se ha podido crear la actividad, porque hay datos faltantes")

                                }
                                    
                                
                               
                            }}>Crear Tarea</button>
                        </div>
                    )
                }
            }
        }
    }


    validateDataConjuntos(){
        var isValidData = false
        var isValidDefaultData = this.validateDataDefaultInputs()

        if(isValidDefaultData && this.props.nombCajas.length > 1 && this.props.aliensDiv1.length >1 && this.props.aliensDiv2.length > 1){
            isValidData = true
        }

        return isValidData

    }

    validateDataNumeros(){
        var isValidData = false

        var isDataDefaultInputValid = this.validateDataDefaultInputs()
        var isThereOperaciones = this.props.operaciones.length >0 ? true : false
        var inputVelocidad = document.getElementById("inputVelocidad").value
        if(isDataDefaultInputValid && isThereOperaciones && inputVelocidad !=""){
            isValidData  = true
        }

        return isValidData
    }

    EstadoFormulario() {
        //Indica que mostrar en pantalla de acuerdo al que juego selecciono el docente
        const { tema, subtema, nombre, instrucciones, arrayPalabras } = this.state

        if (this.props.tipoJuego === "Sopa") {
            return (
                <div className="content-dinamic-izq">
                    {/* CreadorInputs ->Funcion que inserta datos de tipo string en un array parametro*/}

                    {this.props.BotonesTiempo()}

                    <div className="content-inline" style={{marginTop:"1.5em"}}>
                        <p className="content-inline_text">Vidas: </p>
                        <input id="inputVidas" className="inputs-form inputs-form--number" name="vidas" onChange={this.WrittingInfo}></input>
                    </div>


                    <div className="content-inline">
                        <p className="content-inline_text">Palabra: </p>
                        <input className="inputs-form" onChange={(e) => {
                            //Se almacena el valor que se haya escrito en el input para despues insertarlo en el arrayPalabras
                            this.palabra = e.target.value
                        }} type="text"></input>
                        <button className="buttons buttons--form" onClick={() => {
                            arrayPalabras[this.cont] = this.palabra
                            this.setState({ arrayPalabras })
                            this.cont++
                        }}>Insertar
                        </button>
                    </div>




                    {
                        //Array llenado en la funcion CreadorInputs
                        this.state.arrayPalabras.map(e => {
                            this.conPalabras++
                            console.log(`E: ${e}`)
                            return (
                                <div className="content-inline">
                                    {/*A cada input se le asigna un nombre para despues al seleccionarlo cambiar el valor 
                                           de la varibale palabra para despues meterla al tablero
                                        */}
                                    <input type="radio" name={e} onChange={() => {

                                        //Funcion que cambia el valor de varibales del Script Sopa para poder meter palabras en el tablero
                                        this.palabra = e
                                        this.props.Cambiar(this.palabra)
                                    }} value="Hola"></input>
                                    <p className="content-inline_text">{e}</p>
                                    <button className="boton-quitar" style={{fontSize:"1em",fontWeight:"800"}} name={this.conPalabras} onClick={(e) => {
                                            arrayPalabras.splice(e.target.name,1)
                                            this.setState({ arrayPalabras })
                                            this.cont--
                                        }}>x</button>
                                </div>
                            )
                        })

                    }




                    {/*Funcion para crear tareas y verificar si el docente hace publica su actividad o no */}
                    {/*this.VentanaEmergente()*/}
                    {/*Cambia de estado a una variable lo que permitre mostrar la ventana emergente  */}
                    {/*ACTIVAR PARA CREAR TAREA<Button onClick={() => { this.setState({ setWindow: true }) }}>Aceptar</Button>
 */}                </div>)

        }
        else {

            if (this.props.tipoJuego === "PacMan" || this.props.tipoJuego == "Plataformas") {
                return (

                    <div>

                        {this.props.BotonesTiempo()}
                        <p className="content-inline_text">No. preguntas:</p>
                        <input id="inputNumPreguntas" className="inputs-form" onChange={(e) => {
                            if (e.target.value != "") {
                                this.CreadorInputs(e, this.state.arrayPalabras, "arrayPalabras", this.props.estPreguntasInp, "")
                            }

                        }}></input>
                        <div className="padre">
                            <div className="hijo1">
                                <p className="content-inline_text">Panel 1</p>
                                {
                                    this.state.arrayPalabras.map(e => {
                                        this.contInputsDinamics++
                                        return (
                                            <div style={{ display: "flex", margin: "0.5em" }}>
                                                {/*e[e.length-1]-1 se hace esto porque al arrayPalabras se asignaron datos con tipo 
                                                    Palabra 1,2,3,4,5,6... entonces se hace refencia a la ultiuma 
                                                    posicion de la cedena que almacena la posicion y se le resta 1
                                                    para poder trabajar con ellas en un array
                                                */}

                                                {/*
                                                A cada elemento dinamico creado se le asigna un id basadoi en un contador para despues hacer referencia
                                                Solo al primer input de preguntas de sera estara activo*/}
                                                <input id={`inputPregunta${this.contInputsDinamics}`} disabled={(this.contInputsDinamics!=1)?true:false}  className="inputs-form" type="text" name={e[e.length - 1] - 1} onChange={(p) => {
                                                    this.props.AlmacenarPrguntas(p)
                                                    if(p.target.value != ""){
                                                        
                                                        var idInputPregunta = this.getNumberIdElemento(p.target.id)
                                                        console.log(`ID: ${idInputPregunta}`)
                                                        this.setDisabledElemento(`inputRadioPregunta${idInputPregunta}`,false)
                                                    
                                                    }
                                        
                                                }}>

                                                </input>
                                                <input  id={`inputRadioPregunta${this.contInputsDinamics}`} disabled={true} type="radio" checked={this.props.estPreguntasInp[e[e.length - 1] - 1]} name={e[e.length - 1] - 1} onChange={(p) => {
                                                    /*Solo cuando el tipo de juego es plataformas tomamos lo que haya escrito en el input de
                                                    que le corresponde al radio button, ya que inputs y radios estan ligados por medio de una 
                                                    posicion que apunta a una array*/


                                                    (this.props.tipoJuego == "Plataformas") ? this.props.DecomponerCadena(p.target.name) : console.log()

                                                    this.contObj = 0
                                                    this.contPosObj = 0
                                                    this.props.CargarRespuestas(p)
                                                    this.setDisabledElemento("inputNumRespuestas",false)

                            
                                                }}>
                                                </input>
                                                {this.CadenaAudio(this.state.tipoActividad, e[e.length - 1] - 1, this.props.preguntasPac)}
                                            </div>
                                        )
                                    })
                                }

                            </div>

                            <div style={(this.props.tipoJuego == "Plataformas")?{ background: "#424141", padding: "0.5em", borderRadius: "0.5em",overflow:"auto"}:{ background: "#424141", padding: "0.5em", borderRadius: "0.5em" }} className="hijo2">
                                <p className="content-inline_text" >Panel 2</p>
                                {(this.props.tipoJuego == "Plataformas") ? this.props.ImprimirCadena(this.CreadorInputs) : console.log()}
                                <p className="content-inline_text">No. de respuestas:</p>
                                <input id="inputNumRespuestas" disabled={true} className="inputs-form" value={(this.props.tipoJuego == "Plataformas") ? this.state.valInputResp : null} type="number" onChange={(e) => {


                                    if(e.target.value > this.incisos.length){
                                        e.target.value = this.incisos.length
                                    }

                                    if (e.target.value != "") {
                                        this.CreadorInputs(e, this.props.respPacManInp, "respPacManInp", null, "")
                                    }

                                    if (this.props.tipoJuego == "Plataformas") {
                                        this.setState({ valInputResp: e.target.value })
                                        if (e.target.value != "") {
                                            this.props.EstadosCadena()
                                        }
                                    }
                                   

                                    
                                }}></input>



                                {this.props.BotonesCorrecta()}



                                <div>
                                    {

                                        this.props.respPacManInp.map(e => {
                                            /*Varibale que modifica la cadena y eliminar 
                                            el dato numerico que la cadena tiene al final para que este 
                                            no se vea en el placeholder del input*/
                                            this.newContent = e.substring(0, e.length - 1)
                                            this.contInputsDinamics_Dos++
                                            return (
                                                <div>
                                                    <p className="content-inline_text">{`${this.incisos[this.contInputsDinamics_Dos-1]})`}</p>
                                                    <img style={(this.props.nombreJuego =="PacMan")?{ width: "4em", height: "5em" }:{ width: "10em", height: "5em" }} src={(this.props.nombreJuego =="PacMan")?Pacman:Plataforma}></img>
                                                    <input id={`inputRespuesta${this.contInputsDinamics_Dos}`} style={(this.props.nombreJuego =="PacMan")?{ width: "10em", margin: "0 1em" }:{ width: "10em", margin: "1em 0em 2em 1em" }} className="inputs-form" name={e[e.length - 1] - 1} placeholder={this.newContent} onChange={(y) => {

                                                        this.props.AlmacenarResp(y)
                                                        if (this.props.tipoJuego == "Plataformas") {
                                                            this.props.EstadosCadena()
                                                        }

                                                        var isAllRespHaveData =this.validatDataInputsDinamics("inputRespuesta",this.contInputsDinamics_Dos)
                                                        if(isAllRespHaveData){
                                                            this.setDisabledElemento("inputCorrecta",false)
                                                            
                                                        } 
                                                        else{
                                                            this.setDisabledElemento("inputCorrecta",true)

                                                        }

                                                    }} type="text"></input>
                                                    {this.CadenaAudio(this.state.tipoActividad, e[e.length - 1] - 1, this.props.respPacManInp, true)}

                                                </div>)
                                        }
                                        )

                                    }
                                </div>


                                <button id="buttonInsertar"  className="buttons buttons-crear-tar" onClick={() => {

                                    var inputInciscoCorrcto = document.getElementById("inputCorrecta")
                                    if(inputInciscoCorrcto.value  != ""){
                                        console.log("RESPUESTAS INSERTADAS")
                                        this.props.InsertarRespuestas()
                                        this.setDisabledElemento(`inputPregunta${this.punteroInputPregunta}`,true)
                                        this.setDisabledElemento(`inputRadioPregunta${this.punteroInputPregunta}`,true)
                                        this.setDisabledElemento("inputNumRespuestas",true)
                                        this.setDisabledElemento("inputCorrecta",true)
                                        this.props.quitarRespuestas()
                                        this.contInputsDinamics_Dos=0
                                        document.getElementById("inputNumRespuestas").value =""
                                        inputInciscoCorrcto.value = ""

                                        this.punteroInputPregunta++
                                        if( this.punteroInputPregunta <= this.contInputsDinamics){
                                            this.setDisabledElemento(`inputPregunta${this.punteroInputPregunta}`,false)
                                        }

                                        
                                    }
                                    else{
                                        console.log("INSERTA INSICO CORRECTO")
                                    }

                                }}>Insertar</button>
                            </div>
                        </div>

                        <button style={{ display: "block", margin: "3em auto 2em auto" }} className="buttons buttons-crear-tar" onClick={() => {
                            try {
                                var isValidData =this.validateDataPacman()
                                console.log(`IS_VALID_DATA: ${isValidData}`)

                                if(isValidData == true){
                                    (this.props.tipoJuego == "PacMan") ? this.props.CrearTareaPacMan(tema, subtema, nombre, instrucciones, this.props.tiempo, this.props.preguntasPac, this.props.respPregToInsert, this.props.answerCorrect, this.props.tipoJuego, this.state.idClase, this.insDate.getDate(), this.insDate.getMonth() + 1, this.insDate.getFullYear(), this.insDate.getHours(), this.insDate.getMinutes())
                                : this.props.CrearTareaPlataformas(tema, subtema, nombre, instrucciones, this.props.preguntasPac, this.props.respPregToInsert, "Plataformas", this.state.vidas, this.state.idClase, this.insDate.getDate(), this.insDate.getMonth() + 1, this.insDate.getFullYear(), this.insDate.getHours(), this.insDate.getMinutes(),this.props.tiempo)
                                this.setState({ estWindow: true })
   
                                }
                                else{
                                    this.props.activarWindowMensaje("No se ha podido crear la actividad, porque hay datos faltantes")

                                }
                            } catch (error) {
                                console.log("ERROR: " + error)
                            }

                            
                        }}

                        >CREAR TAREA
                        </button>

                    </div>
                )

            }
            else {
              
                if (this.props.tipoJuego === "Numeros") {
                    return (

                        <div className="content-dinamic-izq content-dinamic-izq--num" name="hijo1">
                            <div className="content-buttons-num">
                                <button disabled={this.estDigito2} className="buttons buttons-dijitos" value="3" onClick={(y) => {
                                    //Se vacia la variable para que no acumule 
                                    this.state.arrayPalabra = []
                                    this.contEstInpu=0
                                    this.vaciarInputsNumeros()
                                    this.CreadorInputs(y, this.state.arrayPalabras, "dont", null, "")
                                }}>2 Digitos</button>

                                <button disabled={this.estDigito3} className="buttons buttons-dijitos" value="5" onClick={(t) => {
                                    //this.estDigito2 =true
                                    this.state.arrayPalabra = []
                                    this.contEstInpu=0
                                    this.vaciarInputsNumeros()
                                    this.CreadorInputs(t, this.state.arrayPalabras, "dont", null, "")
                                }}>3 Digitos</button>
                                <button className="buttons buttons-dijitos" value="7" onClick={(v) => {
                                    //this.estDigito2 =true
                                    //this.estDigito3 =true
                                    this.state.arrayPalabra = []
                                    this.contEstInpu=0
                                    this.vaciarInputsNumeros()
                                    this.CreadorInputs(v, this.state.arrayPalabras, "dont", null, "")
                                    
                                }}>4 Digitos</button>
                            </div>
                            {/*Estilo para mostrar los inputs de froma horizontal  */}
                            <div style={{ display: "flex", marginBottom: "1em" }}>
                                {
                                    this.state.arrayPalabras.map(k => {
                                        /*el contador ayuda a crear inputs con diferentes propiedades 
                                        ya que unos almacenaran numeros y otros signos*/
                                        this.contEstInput++

                                        //Se crean inputs de tipo numero
                                        if (this.contEstInput % 2 != 0) {
                                            return (
                                                <input style={{ textAlign: "center" }} className="inputs-numeros" key={k} id={this.contEstInput - 1} onChange={(l) => { this.props.AlmacenarCaracteres(l.target.value, l.target.id, this.state.arrayPalabras.length) }} type="number" placeholder="digito"></input>
                                            )

                                        }
                                        else {
                                            //Se crean inputs para almcenar signos
                                            return (
                                                <select id={this.contEstInput - 1} className="inputs-numeros" onChange={(e)=>{this.props.AlmacenarCaracteres(e.target.value, e.target.id, this.state.arrayPalabras.length)}} key={k}>
                                                    <option value="" selected>?</option>
                                                    <option value="+">+</option>
                                                    <option value="-">-</option>
                                                    <option value="*">*</option>
                                                    <option value="/">/</option>
                                                </select>
/*                                                 <input style={{textAlign:"center"}} className="inputs-numeros" key={k} name={contEstInput - 1} onChange={(l) => { this.props.AlmacenarCaracteres(l.target.value, l.target.name, this.state.arrayPalabras.length) }} placeholder="signo"></input>
 */                                            )
                                        }

                                    })
                                }
                                <p className="signo-igual">=</p>
                                {
                                    //Se crean 3 inputs que ocntendran las respuestas para la operacion escrita
                                    this.props.respXpregunta.map(e => {
                                        return (
                                            <input className="inputs-numeros" type="number" value={e}></input>
                                        )
                                    })
                                }
                            </div>

                            <button style={{ margin: "0", padding: "0" }} className="buttons buttons-dijitos" onClick={() => {
                                console.log("CLICK INSERTAR")

                               if(this.props.isPossibleInsertar){
                                
                                this.props.GuardarPreguntas(this.contPreguntas)
                                this.props.GuardarRespuestas(this.contPreguntas)
                                this.contPreguntas++
                                this.vaciarInputsNumeros()
                                this.props.setIsPosibleInsertar(false)
                                
                               }
                               else{
                                console.log("Inserta todos los caracteres")
                               }
                               
                            }}>Insertar</button>



                            <div className="content-operaciones" name="Preguntas">
                                <p className="content-inline_text">Operaciones insertadas</p>

                                <div style={{ display: "flex" }}>
                                    {
                                        this.MostrarPreguntas(this.props.operaciones, "O")
                                    }
                                    {
                                        this.MostrarPreguntas(this.props.respuestas, "R")
                                    }

                                </div>

                            </div>

                            {/* */}
                        </div>

                    )


                }
                else {
                    if (this.props.tipoJuego == "Conjuntos") {

                    }
                    else {
                        if (this.props.tipoJuego == "Plataformas") {
                            return (<h1>Hola platafroamas</h1>)
                        }
                    }
                }
            }
        }
    }

    validateDataSopa(){
        var isValidData = false
        var isValidDataDefaultInput = this.validateDataDefaultInputs()
        var inputVidas = document.getElementById("inputVidas").value

        if(isValidDataDefaultInput && this.props.tiempo !=0 && inputVidas !="" && this.props.palabras.length >0){
            isValidData = true
        }

        return isValidData
    }

    vaciarInputsNumeros(){

        console.log("VACIAR NUMEROS")
        console.log(this.contEstInput)
        this.props.cleanPartesOperacion()

        for (let i = 1; i <= this.contEstInput; i++) {
            var input = document.getElementById(`${i-1}`) 
            console.log(`${i}`)
            console.log(`${input}`)
            if (i % 2 != 0) {
                input.value = ""
            }
            else{
                input.value = "?"
            }
            
        }
    }

    getNumberIdElemento(idElemento){

        //Se obtienen los valores numericos del id para usarlo y apuntar al input de tipo radio button de la pregunta
        var regex = /(\d+)/g;
        return idElemento.match(regex).toString()
    }

    setDisabledElemento(id,disabledEst){
        var elemento = document.getElementById(`${id}`)
        elemento.disabled = disabledEst
    }


    validateDataPacman(){
        var isValidData = false
        var isValidDefaulData = this.validateDataDefaultInputs()
        var inputNumPreguntas = document.getElementById("inputNumPreguntas").value

        //Funcion ára verificar que todos los inputs de las preguntas ya tienen un contenito
        var isValidDataPreguntas = this.validatDataInputsDinamics("inputPregunta",this.contInputsDinamics)
        var pregsHaveAnwers = this.pregsAlreadyHaveAnswers()

        console.log(`isValidDefaulData ${isValidDefaulData}`)
        console.log(`this.props.tiempo ${this.props.tiempo}`)
        console.log(`inputNumPreguntas ${inputNumPreguntas}`)
        console.log(`isValidDataPreguntas ${isValidDataPreguntas}`)
        console.log(`this.pregsAlreadyHaveAnswers ${pregsHaveAnwers}`)




        if(isValidDefaulData ==true && this.props.tiempo !=0 && inputNumPreguntas !="" && isValidDataPreguntas == true && pregsHaveAnwers== true){
            isValidData = true
        }
        
        return isValidData
    }

    pregsAlreadyHaveAnswers(){
        //Se verifica si para todas las preguntas creadas ya existe un array de respuestas
        return Object.keys(this.props.respPregToInsert).length == this.contInputsDinamics
    }

    validatDataInputsDinamics(prefijo,contDinamyc){

        var isValidData = true
        for (let i = 1; i <= contDinamyc; i++){
            var inputValue = document.getElementById(`${prefijo}${i}`).value
            console.log(`INPUT DINAMYC: ${inputValue}`)
            if(inputValue ==""){
                isValidData = false
                break
            }
        }

        return isValidData

    }

    MostrarPreguntas(propArray, valLetra) {
        let x = -1
        let indice = ""


        try {

            return (


                <div className="operacion-added">
                    {
                        //Array que contiene obj
                        propArray.map(p => {
                            x++
                            indice = Object.keys(p).toString()


                            //Condicional qiue valida a que array va a acceder
                            if (valLetra == "O") {
                                //Solo se retorna un <P> sin otro map ya que "operaciones" no contiene arrays anidados
                                return (
                                    <p className="content-inline_text text-opera">{x + 1}. - {p[`${indice}`]} =</p>)
                            }
                            else {

                                return (
                                    <div style={{ display: "flex" }}>
                                        {
                                            /*Se requiere otro map para acceder a el array que almacena 
                                            "operaciones" por cada posicion*/
                                            p[`${indice}`].map(k => {

                                                return (<p  className="content-inline_text text-opera">{k}</p>)

                                            })
                                            /*Se crea un boton por cada arreglo de respuestas, es importante el 
                                            name ya que sera el indice para eliminar una pregunta y sus respectivas 
                                            respuestas*/
                                        }

                                        <button className="boton-quitar" name={x} onClick={(e) => {
                                            this.props.EliminarOperacion(e.target.name)
                                        }}>x</button>

                                    </div>
                                )
                            }
                        })

                    }
                </div>


            )

        }
        catch (error) {

        }
        x = 0
    }

    VentanaEmergente() {
        //Variable que almacena la edad recomendada para jugar la actividad del docente que hara publica
        let edadRecomed = ""
        const { tema, subtema, nombre, instrucciones } = this.state

        if (this.state.setWindow == true) {
            //La ventana esta compuesta por dos partes 
            if (this.state.estVentana == "Parte1") {
                return (
                    <div>

                        <p>
                            Ayuda a mas alumnos, quieres compartir tu actividad para que cualquier alumno que necesite
                            reforzar conocimiento tenga acesso a ella?
                        </p>
                        <button onClick={() => { this.setState({ estVentana: "Parte2" }) }}>Si</button>
                        {/* Si el parametro pasado en la edad es noCopartir entonces no se mostraran a alumnos externos
                         a la clase del docente */}
                        <button onClick={() => { this.props.CrearTarea(tema, subtema, nombre, instrucciones, this.props.posiciones, this.props.palabras, this.props.tipoJuego, this.state.vidas, this.state.idClase, "noCompartir", this.insDate.getDate(), this.insDate.getMonth() + 1, this.insDate.getFullYear(), this.insDate.getHours(), this.insDate.getMinutes()) }}>No</button>


                    </div>
                )
            }
            else {
                return (
                    <div>
                        <p>Edad recomendada</p>
                        <input placeholder="Edad..." onChange={(r) => { edadRecomed = r.target.value }}></input>
                        <button onClick={() => { this.props.CrearTarea(tema, subtema, nombre, instrucciones, this.props.posiciones, this.props.palabras, this.props.tipoJuego, this.state.vidas, this.state.idClase, edadRecomed, this.insDate.getDate(), this.insDate.getMonth() + 1, this.insDate.getFullYear(), this.insDate.getHours(), this.insDate.getMinutes()) }}>Ok</button>
                    </div>

                )
            }
        }


    }


    CreadorInputs = (e, varEst, estSting, estPreguntasInp, valCadena) => {
        /*
        e - Almacena el objeto que ejecute este funcion.
        varEst - Almacena el array de estado al que haya que modificar.
        estString - Almacen un dato para saber especificmente cuando es llamada esta funcion para crear 
                    preguntas en el pacman
        */

        let numInputs = (estSting == "numbers") ? e : e.target.value

        /*A "respAlmacenada" solo se le asigna el valor de "numResp2" cuando esta funcion es llamada en el 
        config del juego de conjuntos, esto para poder utilizar dos varibles que gestiones los aliens de cada
        caja*/
        let respAlmacenada = (estSting == "respConjuntos2") ? this.numResp2 : this.numResp

        //this.contObj es iniciada en 0 por lo que se le suma 1 y entra al primer if
        this.contObj++

        if (this.contObj == 1) {
            //Ciclo que se ejecuta el numero de veces que haya insertado el docente el el objeto que ejecuto la funcion
            for (let i = 0; i < numInputs; i++) {
                /*Se llena un array de strings para posteriormente  recorrerlo con map, y en base a los datos
                 almacenados retornar un <input></input> */

                /*Es importante asignar como valor al arreglo un dato con un coeficiente numerico al final para 
                asi poder identificarlo despues*/

                /*Condicional para validar cuando en el juego de plataformas seleccionamos una cadena de la 
                palabra y queremos crear una respuesta con dicha cadena seleccionada*/

                if (valCadena != "") {
                    //  Se asigna la cadena del parrafo seleccionado
                    varEst[i] = valCadena + " " + (i + 1)
                    this.setState({ valInputResp: parseInt(this.state.valInputResp) + 1 })
                }
                else {
                    varEst[i] = `Palabra ${i + 1}`
                }

                //Esto solo se ejecita cuando se crean preguntas para el pacman
                if (estSting == "arrayPalabras") {
                    //Almacenamos estados de los radiobuttons por cada pregunta creada
                    estPreguntasInp[i] = false
                }
                /*Variable que va interandoce para saber en que posicion hay que meter datos  
                en caso de entrar al otro if*/
                this.contPosObj++;
            }
            //Variable que almacena el dato numerico del numero de obj a crear para despues compararlo con el actual
            (estSting == "respConjuntos2") ? this.numResp2 = numInputs : this.numResp = numInputs
        }
        else {
            if (this.contObj >= 2) {
                //Comparamos el valor anterior con el actual para saber si crear mas objs o quitar
                if (respAlmacenada < numInputs) {
                    //GENERAR DATOS
                    //Calcula cuantos datos hay que crear
                    this.dif = numInputs - respAlmacenada

                    for (let i = 0; i < this.dif; i++) {

                        /*Se llena un array de strings para posteriormente  recorrerlo con map, y en base a los datos
                         almacenados retornar un <input></input> */
                        //varEst[this.contPosObj]=`Palabra ${this.contPosObj+1}`
                        //(valCadena !="")?varEst[this.contPosObj]=valCadena+" "+(this.contPosObj+1):varEst[this.contPosObj]=`Palabra ${this.contPosObj+1}`
                        if (valCadena != "") {
                            this.setState({ valInputResp: parseInt(this.state.valInputResp) + 1 })
                            varEst[this.contPosObj] = valCadena + " " + (this.contPosObj + 1)
                        }
                        else {
                            varEst[this.contPosObj] = `Palabra ${this.contPosObj + 1}`
                        }

                        if (estSting == "arrayPalabras") {
                            estPreguntasInp[this.contPosObj] = false
                        }

                        this.contPosObj++;
                    }
                }
                else {
                    if (respAlmacenada > numInputs) {
                        //QUITAR DATOS
                        this.dif = respAlmacenada - numInputs
                        this.contPosObj -= (this.dif);

                        varEst.splice(numInputs, (respAlmacenada - 1));


                        if (estSting == "arrayPalabras") {
                            estPreguntasInp.splice(numInputs, (respAlmacenada - 1));

                        }


                    }
                }
                (estSting == "respConjuntos2") ? this.numResp2 = numInputs : this.numResp = numInputs
                //this.numResp = numInputs
                this.contObj = 1

            }
        }
        //Su funion es no hacer nada con los inputs en caso de dar un valor null
        if (numInputs != "") {
            this.setState({ varEst, estPreguntasInp })
        }


    }

    WrittingInfo = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    Update() {
        //Verificamos que ya no tengamos elementos en el array de "figRespuesta"
        if (this.props.MoverRespuestas(this.canvas.height) == 0) {
            //Creamos nuevos elementos
            this.props.IniciarFiguras(this.props.figRespuestas, 0, "respuestas")

            //Condicional para saber cuando debe estar activo el intervalo lento
            if (this.estInterLento) {
                //Se detiene el "intervalo"
                clearInterval(this.intervalo)

                //Activamos el intervalo lento para que despues de 10 segundos vuelva a activar al "intervalo"
                this.interLento = window.setInterval(() => {
                    this.intervalo = window.setInterval(() => {
                        //Paramos el intervalo lento para que solo se ejecute el rapido 
                        clearInterval(this.interLento)
                        this.Update()
                    }, 1000 / 55)

                }, 10000)

            }


        }

        this.props.DibujarFondo(this.ctx, this.canvas)
        this.props.DibujarFiguras(this.ctx, this.props.figurasBoton)
        this.props.DibujarFiguras(this.ctx, this.props.figRespuestas)
        this.props.DibujarTextos(this.ctx)
    }

    CadenaAudio = (tipoActividad, pos, array, clearChar) => {
        //Funcion que enlaza cadena al speech de acuerdo a un array y a una de su posiciones
        if (tipoActividad == "audio") {
            return (<button name={pos} onClick={() => {
                this.ReproducirAudio(array[pos], clearChar)
            }}>Play</button>)
        }

    }



    ReproducirAudio(cadena, clearChar) {
        /*Solo se ejecuta esta condicion cuando la funcion es llamda desde el juego de PacMan
        por los botones de las respuestas, lo que se hace es eliminar el utimo caracter
        para que asi la cadena pueda ser leida de forma correcta ya que las respuestas
        contienen un numero al final*/
        (clearChar) ? cadena = cadena.substring(0, cadena.length - 1) : console.log("")
        speechSynthesis.speak(new SpeechSynthesisUtterance(cadena))
    }

    Vidas() {
        if (this.props.tipoJuego == "Plataformas")
            return (
                <div>
                    <p  className="content-inline_text">Vidas: </p>
                    <input name="vidas" className="inputs-form" onChange={(e) => { this.setState({ vidas: e.target.value }) }}></input>
                </div>
            )
    }





    WindowsJuegoTerminado = () => {
        return (
            <div style={{ display: (this.state.estWindow == false) ? "none" : "block", margin: "0", top: "0" }} className="fondo-window fondo-window--menu">

                <div className="window window--menu" style={{ width: "80%", height: "40%" }}>


                    <div className="window-header" style={(this.props.layout == "instrucciones") ? { height: "20%" } : null}>
                        <p className="window-header__titulo">Operacion exitosa</p>
                    </div>

                    <div className="window-contenido" style={{ overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center" }}>
                        <p className="window__act" style={{ margin: "2em 0 1em 0" }} >Actividad creada con exito</p>

                    </div>

                    <button className="buttons buttons--window" onClick={() => { window.location.reload() }}>Aceptar</button>


                </div>
            </div>
        )

    }



    GetIdClase = () => {
        try {
            let obj = document.getElementById("dropDownClase")
            let valor = obj.value

            this.setState({ idClase: valor })

        } catch (error) {

        }
    }

    OpcionesClases = () => {
        //console.log("CLASES: ")
        //console.log(this.props.Clases)
        try {
            return (
                <React.Fragment>
                    {this.props.Clases.map(e => {
                        return (
                            <React.Fragment>
                                <option value={e.key}>{e.nombre}</option>

                            </React.Fragment>
                        )
                    })}
                </React.Fragment>
            )


        } catch (error) {

        }
    }




}

export default FormTareas;

