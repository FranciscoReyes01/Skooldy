import React, { Component } from 'react'
import Player from '../Imagenes/Player.png'
import Fondo from '../Imagenes/Fondo.png'
import Enemigo from '../Imagenes/Pacman.png'
import "./PacmanGame.css"
import Header from './Header.js';
import footer from '../img/Menu/footer.svg';
import ContentInst from './ContentInst'
import button_resp from '../img/Pacman/button_resp.svg';
import Derecha from '../img/Derecha.svg'
import Izq from '../img/Izq.svg'
import Instrucciones from './Instrucciones.js'
import WindowInstrucciones from './WindowInstrucciones.js'
import music from '../Sonidos/PacManMusic.mp3'
import soundCorrecta from '../Sonidos/Correcta.mp3'
import soundIncorrecta from '../Sonidos/Incorrecta.mp3'
import soundFailGame from '../Sonidos/FailGame.mp3'
import soundPassGame from '../Sonidos/PassGame.mp3'
import WindowGameOver from './WindowGameOver.js'


export default class PacmanGame extends Component {

    componentDidMount() {
        this.SetCanvas()
        console.log("Did Mount")
        this.CargarDatos()

        this.fondo.onload = () => {
            /*Una vez cargada la imagen de fondo se ejecuta el update 1 vez para que pinte en el cavas 
            los elementos que componen el juego y no se vea vacio de inicio*/
            this.Update()
        }
        
        this.props.setScrollFunction("hidden")


        //Evento que detecta cuando presionamos alguna tecla
        document.addEventListener("keydown", (e) => {
            //Condicional que se cumple solo la primera vez que se ejecuta el evento
            if (this.estJuego == "noIniciado") {
                this.backgroundMusic.play()
                this.cerrarWindowInstruc()
                this.props.setScrollFunction("auto")
                //Se inicia el tiempo
                this.state.min = this.props.tareaHacer.tiempo
            
                                        

                console.log("TIEMPO INICIAL:")
                console.log(`Minutos ${this.state.min}`)
                console.log(`Segundos ${this.state.seg}`)


                this.IniciarJuego()
                this.intervalo = window.setInterval(() => { this.Update() }, 1000 / 55)

                //Intervalo quu controla el tiempo
                this.tiempo = window.setInterval(() => {
                    let { seg, min } = this.state
                    //Por cada repeticion del intervalo se le resta 1 a seg
                    seg -= 1

                    //Verifica cuando segundos ya este en 0 para cambiar minutos
                    if (seg == -1) {
                        min -= 1
                        seg = 60
                    }

                    /*Condicional que se encarga de verificar ciuando el tiempo ya haya acabado es decir
                    cuando ya no tengamos minutos*/
                    if (min == -1) {
                        min = 0
                        seg = 0
                        this.JuegoTerminado()
                    }
                    this.setState({ seg, min })


                }, 1000)
                //Intervalo que se encarga de cambiar direccion de los enemigos cada cierto tiempo
                this.cambiarDir = window.setInterval(() => {
                    //Se recorre a los enemigos creados
                    for (const i in this.enemigos) {
                        var enemigo = this.enemigos[i]
                        enemigo.direccion = this.props.DecidirDireccion()
                    }
                }, 3000)

                this.estJuego = "Iniciado"
            }
            else {
                //Detecta las teclas para mover el player
                this.teclado = e.key
            }

        })

        /*Se ejecuta cuando dejamos de presionar alguna tecla esto para que el movimeinto del player no sea 
        infinito*/
        document.addEventListener("keyup", (e) => { this.teclado = "" })



    }

    constructor() {
        console.log("contructor")
        super()

        //Variables de Juego
        this.calif = 0
        this.canvas = null
        this.ctx = null
        this.intervalo = null
        this.cambiarDir = null
        this.tiempo = null
        this.velEnemigos = 1.5;
        this.incisos = ["a", "b", "c", "d", "e", "f"]
        this.contIncisos=-1
        this.backgroundMusic = new Audio()
        this.backgroundMusic.src = music
        this.soundCorrecta = new Audio()
        this.soundCorrecta.src =soundCorrecta
        this.soundIncorrecta = new Audio()
        this.soundIncorrecta.src = soundIncorrecta
        this.soundFailGame = new Audio()
        this.soundFailGame.src = soundFailGame
        this.soundPassGame = new Audio()
        this.soundPassGame.src = soundPassGame
        this.playerProp = {
            x: 600,
            y: 50,
            width: 60,
            height: 60
        }
        this.teclado = ""
        this.estJuego = "noIniciado"
        this.enemigos = []
        this.posCorrecta = 0

        //Variables para imagenes
        /*Se incializan aqui las imagenes ya que el contructor es lo primero que se ejecuta
        y eso asegura que las imagenes esten listas cuando las ocupemos mas adelante*/
        this.fondo = new Image()
        this.fondo.src = Fondo
        this.enemigo = new Image()
        this.enemigo.src = Enemigo

        this.player = new Image()
        this.player.src = Player

        //Variables de BD
        this.time = null
        this.numPreguntas = null
        this.contPreguntas = 0
        this.correctas = []
        this.accionVer ="r"

        this.state = {
            pregs: [],
            resp: [],
            numPregGen: null,
            pregunta: "",
            respuestas: [],
            score: 0,
            malas: 0,
            min: 0,
            seg: 0,
            verResp:null,
            verPreg:null,
            textAccion:"Respuestas",
            estWindow:false,
            estWindowInstruc:"block",
            titulo:"",
            instrucciones:"",
            estWindowGameOver:"none",
            total:"",
            correctas:"",
            calif:""
        }
    }

    render() {
        this.contIncisos=-1

        let { numPregGen, pregunta, respuestas } = this.state
        return (
            <div>
                <Header></Header>
                <div className="modulo modulo--juegos-movil">

                    <div className="caja-juego">

                        <div className="caja-header">
                            <p className="caja-header__titulo">Pregunta</p>
                        </div>

                        <div className="caja-contenido caja-contenido--pacman">
                            <p style={this.state.verPreg} className="caja-contenido__preg">{pregunta}</p>
                             {/*Los estilos en liena de estos elementos solo funcionan en la version de movil y tablet */}
                            <div style={this.state.verResp}  className="content-resp">
                                {
                                    //this.contIncisos=0
                                    respuestas.map(e => {
                                        this.contIncisos++
                                        return (
                                            <div className="itemPac-resp">
                                                <p className="itemPac-resp__inciso">{`${this.incisos[this.contIncisos]})`}</p>

                                                <p className="itemPac-resp__resp" key={e}>{e}</p>
                                            </div>
                                        ) 
                                        
                                    })
                                }
                            </div>
                            
                        </div>
                         {/*Contenedor que solo aparece en la version movil */}
                        <div className="movil-resp">
                                {/* Pinta texto "Pregunta" o "Respuestas" */}
                                <p className="movil-resp__texto">{this.state.textAccion}</p>
                                 {/*Imagen, funciona como boton y lo que hace es mostar o ocultar ya sea las 
                                 respuestas o la pregunta generada*/}
                                <img className="movil-resp__button" onClick={()=>{
                                    
                                    console.log("Hola")
                                    if(this.accionVer=="r")
                                    {  
                                        
                                        this.setState({verResp:{display:"block"},verPreg:{display:"none"},textAccion:"Pregunta"})
                                        this.accionVer="p"
                                        
                                    }
                                    else{
                                        
                                        this.setState({verResp:{display:"none"},verPreg:{display:"block"},textAccion:"Respuestas"})
                                        this.accionVer="r"
                                    }
                                    

                                }} src={button_resp}></img>
                        </div>
                    </div>

                    <div className="area-juego area-juego--pacman">
                        <div className="content-info-juego">
                            <p className="info-desc info-desc--vidas">{`Incorrectas: ${this.state.malas}`} </p>

                            <p className="info-desc info-desc--buenas">{`Score: ${this.state.score}`}</p>
                            <p className="info-desc info-desc--tiempo">{`Tiempo: ${this.state.min}:${this.state.seg}`}</p>
                        </div>

                        <canvas className="juegoScene"  id="game" width="800" height="500"></canvas>

                        


                    </div>

                    <ContentInst clase={null} tema={null} inst={null}></ContentInst> 

                </div>


                <img style={{zIndex:2000}} className="fondo-figuras fondo-figuras--der fondo-figuras--juego" src={Derecha}></img>
                <img style={{zIndex:2000}} className="fondo-figuras fondo-figuras--izq fondo-figuras--juego fondo-figuras--juego" src={Izq}></img>


                <WindowInstrucciones estWindowInstruc ={this.state.estWindowInstruc} titulo="Instrucciones"  instrucciones ="Mueve a pacman con las teclas A,W,S,D y atrapa al fantasma que tenga el inciso de la respuesta a la pregunta" setScrollFunction={this.setScrollFunction}></WindowInstrucciones>
                <WindowGameOver juegoLibre={this.props.juegoLibre}  estWindowGameOver={this.state.estWindowGameOver} titulo={this.state.titulo} total={this.state.total} correctas={this.state.correctas} setScrollFunction={this.props.setScrollFunction} calif = {this.state.calif}></WindowGameOver>


                <footer className="footer-menu footer-menu--juegos-movil">
                    <img className="footer-menu__fondo" src={footer}></img>
                </footer>


                {/* <p>Tema: {this.props.tareaHacer.tema}</p>
                <p>intrucciones: {this.props.tareaHacer.instrucciones}</p>
                <canvas style={{ background: "blue" }} id="game" width="800" height="500"></canvas>
                <h3>Preguntas</h3>
                <p>Score:{this.state.score}</p>
                <p>Incorrectas: {this.state.malas}</p>
                <p>Tiempo:{this.state.min}:{this.state.seg}</p>
                <p> {numPregGen}.- {pregunta}</p>
                {
                    respuestas.map(e => {
                        return <p key={e}>{e}</p>
                    })
                } */}

            </div>
        )
    }



    activarWindowGameOVer(tipoResultado,calif){
        this.setState({estWindowGameOver:"block",titulo:"Fin del juego",total:`Preguntas totales: ${this.cantPalabras}`,correctas:`Preguntas correctas: ${this.state.score}`,calif:`${tipoResultado} ${calif}`})
    }




    cerrarWindowInstruc=()=>{
        this.setState({estWindowInstruc:"none"})
    }





    SetCanvas() {
        //Buscas el cambas por medio de un id
        this.canvas = document.getElementById("game")

        //Al canvas obtenbido se le asigna un contexto para trabajar
        this.ctx = this.canvas.getContext('2d')
    }

    Update() {
        if (this.estJuego != "fin") {

            this.MoverPlayer()
            this.props.MoverEnemigos(this.enemigos, this.velEnemigos, this.canvas.width, this.canvas.height, 0)

            //Dibuja fondo del juego
            this.ctx.drawImage(this.fondo, 0, 0, 800, 500)

            //Dibuja el player con las propiedades de su objeto this.player
            this.ctx.drawImage(this.player, this.playerProp.x, this.playerProp.y, this.playerProp.width, this.playerProp.height)
            this.DibujarEnemigos()
            this.VerificarColision()
        }


    }

    CargarDatos() {
        /*Asignamos las preguntas y respuestas de la actividad a la varibles de tipo [] que se utilizara
        pero para trabajar de forma mas comoda los datos  de tipo {} los convertimos a array*/
        console.log("HACER:", this.props.tareaHacer)
        this.setState({ resp: Object.values(this.props.tareaHacer.respuestas), pregs: Object.values(this.props.tareaHacer.preguntas), min: this.props.tareaHacer.tiempo })
        this.time = this.props.tareaHacer.tiempo
        this.correctas = Object.values(this.props.tareaHacer.correctas)
        console.log(this.correctas)
    }

    MoverPlayer() {
        //"this.teclado" se le asigna valor cuando presionamos una tecla
        if (this.teclado == "d") {
            this.estJuego = "Iniciado"
            /*Se calcula un limite con el ancho del canvas y del player para que sea posible impedir que el 
            player salga del canvas*/
            var limite = this.canvas.width - this.playerProp.width
            if (this.playerProp.x > limite) this.playerProp.x = limite
            this.playerProp.x += 5
        }

        if (this.teclado == "a") {
            /*No es necesario calcular un limite ya que cualquier canvas del lado izq inia en 0*/
            if (this.playerProp.x < 10) this.playerProp.x = 10
            this.playerProp.x -= 5
        }


        if (this.teclado == "w") {
            /*No es necesario calcular un limite ya que cualquier canvas del lado izq inia en 0*/
            if (this.playerProp.y < 10) this.playerProp.y = 10
            this.playerProp.y -= 5
        }

        if (this.teclado == "s") {
            this.estJuego = "Iniciado"
            /*Se calcula un limite con el ancho del canvas y del player para que sea posible impedir que el 
            player salga del canvas*/
            var limite = this.canvas.height - this.playerProp.height
            if (this.playerProp.y > limite) this.playerProp.y = limite
            this.playerProp.y += 5
        }
    }

    IniciarJuego() {
        //Genera valor aleatorio para selecionar una pregunta
        var numPreguntas = (Object.keys(this.state.pregs).length) - 1
        var num = null;

        /*Se encarga de asegurar que el numero aleatorio generado no apunte a una posicion vacia del array de
        preguntas*/
        while (num == null) {

            num = Math.floor(Math.random() * ((numPreguntas + 1) - 0) + 0)

            if (this.state.pregs[num] == "") {
                num = null
            }
        }

        //Funcion que buscara las respuestas de la pregunta que se genero, de acuerdo al "num"
        this.DatosPregunta(num, this.props.tareaHacer, null)

        //Funcion que buscara la respuesta correcta de la pregunta
        this.DatosPregunta(num, this.props.tareaHacer, this.posCorrecta)

        //Se crean enemigos por cada respuesta encontrada para la pregunta
        for (let i = 0; i < this.state.respuestas.length; i++) {
            /*"posCorrecta" alamcena un valor que corresponde a la posicion en el array de respuestas de la
             pregunta seleccionada*/
            if (i == this.posCorrecta) {
                //Se asigna la propiedad de "tipo" de un enemigo que es el correcto 
                this.CrearEnemigos(i, "correcta", this.incisos[i])
            }
            else {
                this.CrearEnemigos(i, "", this.incisos[i])
            }

        }
        console.log("ENEMIGOS: ")
        console.log(this.enemigos)
        this.setState({ numPregGen: num, pregunta: this.state.pregs[num] })
    }

    DatosPregunta(numAleat, obj, posCorrecta) {
        let { respuestas } = this.state
        console.log("Bucar Repuestas")
        /*Dependiendo de si se recibe un valor o no  en el parametro "posCorrecta" se le asigna un obj
        a la varibale objRecorrer*/
        var objRecorrer = (posCorrecta == null) ? obj.respuestas : obj.correctas

        Object.keys(objRecorrer).forEach(r => {
            /*El objeto que almacenan las respuestas y el objeto que almacena respuesta correcta
            tienen esta nomenclatura "pregunta 0:{respuestas}", entonces se compara el valor final de la cadena
            con el numero aleatorio generado para saber que datos le corresponden a la pregunta*/
            if (r[r.length - 1] == numAleat) {
                //Almacene respuestas
                if (posCorrecta == null) {
                    respuestas = Object.values(objRecorrer[r])
                    this.setState({ respuestas })
                }
                else {
                    console.log("obj respuesta:", objRecorrer[r])
                    //Almacena la posicion de la respuesta correcta en el array de respuestas para la pregunta
                    this.posCorrecta = objRecorrer[r]
                }

            }
        })

    }

    CrearEnemigos(val, estResp, ins) {
        //Inserta un obj cada que se ejecuta esta funcion
        this.enemigos.push({
            x: 200 + (val * 60),
            y: 200,
            width: 40,
            height: 50,
            /*"direccion" es muy importante ya que gracias a esta propiedad sabremos hacia donde se movera cada
            enemigo*/
            direccion: this.props.DecidirDireccion(),
            tipo: estResp,
            inciso: ins

        })
    }

    DibujarEnemigos() {
        this.ctx.save()
        //Se crea una imagen del enemigo en el canvas por cada obj econtrado en this.enemigos
        this.enemigos.map(e => {
            this.ctx.drawImage(this.enemigo, e.x, e.y, e.width, e.height)

            //Se dibuja la respuesta debajo de cada enemigo pintado
            this.ctx.font = "20px Georgia";
            this.ctx.fillText(e.inciso, e.x + 15, e.y + 70);
        })

        this.ctx.restore()
    }


    VerificarColision() {
        const { respuestas, pregs } = this.state
        let estPrguntas = null

        //Recorremos a cada uno de los enemigos creados de acuerdo a las respuestas de la pregunta
        for (const e in this.enemigos) {
            var enemy = this.enemigos[e]
            //La funcion recibe 2 objetos para comparar que esten colisionando
            if (this.props.Colisiones(this.playerProp, enemy)) {
                //Se valida si el objeto con el que esta colisionando el player es la respuesta correcta
                if (enemy.tipo == "correcta") {
                    //Se vuelve a vacio la propieda para que no este sumando muchos puntos cada que colisionamos
                    enemy.tipo = ""
                    this.setState({ score: this.state.score + 1 })
                    this.soundCorrecta.play()

                }
                else {
                    this.soundIncorrecta.play()
                    enemy.tipo = ""
                    this.setState({ malas: this.state.malas + 1 })
                }

                //Una vez hallamos colisionado con una respuesta se tenda que generar la siguiente pregunta
                //SETAMOS VALORES PARA NO ACUMULAR
                this.respuestas = []
                this.enemigos = []

                //Se elimina la pregunta que fue contestada  
                pregs[this.state.numPregGen] = ""

                /*Buscamos en el array de preguntas si todavia hay alguna que no haya sido borrada
                "find" devuelve el primer elemnto que encuentre que cumpla la condicion*/
                estPrguntas = pregs.find(t => t != "")
                this.setState({ respuestas, pregs })

                //Ya no hay preguntas
                if (estPrguntas == null) {

                    this.JuegoTerminado()
                }
                else {
                    //Si hay preguntas, por lo tanto se inicia el juego otra vez
                    this.playerProp = {
                        x: 600,
                        y: 50,
                        width: 60,
                        height: 60
                    }
                    this.IniciarJuego()
                }
            }

        }
    }

 

    verificarModalidadGame(calif){
        /*Variable rellenada desde AppStudent, el condicional indica si el juego que se esta jugando
        es una actividad de clase o el uausrio esta jugando en modo libre*/
        if (this.props.juegoLibre == false) {
            this.activarWindowGameOVer("Tu calificacion es: ",calif)
            this.props.TareaFinalizada(this.props.idTarea, calif)
        }
        else {
            if (this.props.juegoLibre == true) {
                this.activarWindowGameOVer("Estrellas ganadas: ",parseInt(calif))

                this.props.JuegoLibreFinalizado(parseInt(calif))
            }
        }
    }


    JuegoTerminado() {
        this.calif = this.state.score * 10 / this.state.pregs.length
        this.calif  = this.calif.toFixed(1)
        this.estJuego = "fin"
        console.log("Juego terminado")

        this.props.setScrollFunction("hidden")
        //this.activarWindowGameOVer(this.calif)
        this.playFinalSound(this.calif)

        //Se detienen todos los timers
        clearInterval(this.intervalo);
        clearInterval(this.cambiarDir);
        clearInterval(this.tiempo)
        this.setState({estWindow:true})

        //Funcion que viene desde APP que insertara la calificacion en TareasRealizadas de la BD
        //this.props.TareaFinalizada(this.props.idTarea, this.calif)
        this.verificarModalidadGame(this.calif)
    }


    playFinalSound(calif){
        if(calif>5){
            this.soundPassGame.play()
        }
        else{
            this.soundFailGame.play()
        }
    }




    WindowsJuegoTerminado=()=>
    {
        return(
            <div style={{display:(this.state.estWindow==false)?"none":"block",margin:"0",top:"0"}} className="fondo-window fondo-window--menu">
               
                <div className="window window--menu" style={{width:"80%",height:"40%"}}>


                    <div className="window-header" style={(this.props.layout=="instrucciones")?{height:"20%"}:null}>
                        <p className="window-header__titulo">Juego terminado</p>
                    </div>

                    <div className="window-contenido" style={{overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",justifyItems:"center"}}>
                        <p className="window__act" style={{margin:"1.5em 0 1em 0"}} >Calificacion obtenida:</p>
                        <p className="window__act" style={{fontSize:"3em"}}>{this.calif}</p>
                    </div>

                    <button className="buttons buttons--window" onClick={()=>{window.location.reload()}}>Aceptar</button>


                </div>
            </div>
        )
        
    }


}

