import React, { Component } from 'react'
import Header from './Header.js';
import footer from '../img/Menu/footer.svg';
import vidas_icon from '../img/Jugar/vidas_icon.svg'
import Derecha from '../img/Derecha.svg'
import Izq from '../img/Izq.svg'

import music from '../Sonidos/MusicSopa.mp3'
import soundCorrecta from '../Sonidos/Correcta.mp3'
import soundIncorrecta from '../Sonidos/Incorrecta.mp3'
import soundFailGame from '../Sonidos/FailGame.mp3'
import soundPassGame from '../Sonidos/PassGame.mp3'
import WindowInstrucciones from './WindowInstrucciones.js'
import WindowGameOver from './WindowGameOver.js'


import ContentInst from './ContentInst'

export default class SopaGame extends Component {
    constructor() {
        super()
        this.contLetras = 1
        this.palabra = ""
        this.contLabels = 0
        this.cantPalabras=0
        this.est = " "
        this.numIzq = 1;
        this.numDer = 1;

        this.numIzqCI = 1;
        this.numDerCI = 1;

        this.estJuego = "noIniciado"
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

        this.tiempo = null

        this.state = {
            tableroGame: [[], [], [], [], [], [], [], [], [], [], [], []],
            letrasColor: [[], [], [], [], [], [], [], [], [], [], [], []],
            posLetras: [],
            score: 0,
            vidas: [],
            palabras:[],
            estWindowInstruc:"block",
            estWindowGameOver:"none",
            total:"",
            correctas:"",
            calif:"",
            min: 0,
            seg: 0,

        }
    }
    componentDidMount() {
        const { tableroGame, letrasColor } = this.state
        this.props.CrearTablero(tableroGame, letrasColor)
        this.setState({ letrasColor })
        this.IntroducirPalabras()

        //document.addEventListener("keydown", (e) => { this.EnterEvent(e) }, false);
        this.GenerarVidas()
        console.log(this.props.idTarea)
        console.log("PALABRAS: ")
        console.log(this.state.palabras)
        //this.IntroducirPalabras()    
        this.props.setScrollFunction("hidden")


        this.cantPalabras = this.state.palabras.length
        document.addEventListener("keydown", (e) => {
            //Condicional que se cumple solo la primera vez que se ejecuta el evento
            if (this.estJuego == "noIniciado") {
                this.backgroundMusic.play()
                this.initTimer()
                this.cerrarWindowInstruc()
                this.props.setScrollFunction("auto")
                this.estJuego ="iniciado"
            }
            else{
                console.log(e)
                this.EnterEvent(e) 
            }
        })

        
    }

    initTimer(){
        this.state.min = this.props.tareaHacer.tiempo
            
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
    }



    /*componentWillUnmount(){ 
        document.removeEventListener("keydown", (e)=>{this.EnterEvent(e)}, false); 
        }*/

    render() {
        return (
            <div>

                <Header></Header>
                {/* <p>{`Clase: ${this.props.nombreClase}`}</p>
                <p>{`Tema: ${this.props.tareaHacer.tema}`}</p>
                <p>{`Instrucciones: ${this.props.tareaHacer.instrucciones}`}</p> */}

                <div className="modulo modulo--juegos-movil">

                    <div className="caja-juego">
                        <div className="caja-header">
                            <p className="caja-header__titulo">Palabras</p>
                        
                        </div>

                        {this.mostrarPalabras()}
                        
                    </div>

                    <div className="area-juego" >
                        <div className="content-info-juego">

                            <div className="vidas-content">
                                <p className="info-desc info-desc--vidas">Vidas: </p>
                                {
                                    this.state.vidas.map(p => {
                                        return <img className="content-info-juego_vidas" src={vidas_icon}></img>
                                    })
                                }
                            </div>

                            <p className="info-desc info-desc--buenas">{`Score: ${this.state.score}`}</p>
                            <p className="info-desc info-desc--tiempo">{`Tiempo: ${this.state.min}:${this.state.seg}`}</p>


                        </div>


                        {
                            this.props.ImprimirTablero(this.state.tableroGame, this.ValidarPosicion, this.state.letrasColor)
                        }

                    </div>

                    <ContentInst clase={null} tema={null} inst={null}></ContentInst>    

                    <img className="fondo-figuras fondo-figuras--der" src={Derecha}></img>
                    <img className="fondo-figuras fondo-figuras--izq" src={Izq}></img>
                </div>

                        
                <WindowInstrucciones estWindowInstruc ={this.state.estWindowInstruc} titulo="Instrucciones"  instrucciones ="Encuentra cada una de las palabras, cuando la veas seleccionala letra por letra con click y cuando estes listo presiona 'Space' en tu teclado para que sea calificada"></WindowInstrucciones>
                <WindowGameOver juegoLibre={this.props.juegoLibre} estWindowGameOver={this.state.estWindowGameOver} titulo={this.state.titulo} total={this.state.total} correctas={this.state.correctas} setScrollFunction={this.props.setScrollFunction} calif = {this.state.calif}></WindowGameOver>


                <footer className="footer-menu footer-menu--juegos-movil">
                    <img className="footer-menu__fondo" src={footer}></img>
                </footer>

            </div>
        )
    }

 
    
    cerrarWindowInstruc=()=>{
        this.setState({estWindowInstruc:"none"})
    }

    mostrarPalabras(){
        return(
            <div className="caja-contenido">
                {
                    this.state.palabras.map(p=>{
                        return(
                            <p  className="caja-header__titulo">{p}</p>
                        )
                    })
                }

            </div>
        )
    }

    activarWindowGameOVer(tipoResultado,calif){
        this.setState({estWindowGameOver:"block",titulo:"Fin del juego",total:`Palabras totales: ${this.cantPalabras}`,correctas:`Palabras econtradas: ${this.state.score}`,calif:`${tipoResultado} ${calif}`})
    }


    ValidarPosicion = (obj, letra) => {

        const { letrasColor, posLetras } = this.state
        let valorC = 0;
        let valorF = 0;
        let sumaStrings = 0
        let restaStrings = 0




        if (this.contLetras == 1) {
            letrasColor[obj.target.title][obj.target.id] = { color: "blue" , fontSize: "1.7em", margin: "auto" }
            this.palabra = this.palabra + letra;
            this.AlmacenarPosiciones(obj.target.title, obj.target.id);
            console.log("Letra 1: " + "F: " + obj.target.title + " " + "C: " + obj.target.id)
        }
        else {
            this.AlmacenarPosiciones(obj.target.title, obj.target.id);

            valorC = posLetras[this.contLabels - 1];
            valorF = posLetras[this.contLabels - 2];



            /*console.log("Letra: "+"F: "+obj.target.title +" "+ "C: "+obj.target.id)
            console.log("Condicion 1: "+posLetras[0]+" =="+posLetras[this.contLabels - 2])
            console.log("Condicion 2: "+posLetras[1]+" == "+(valorC - this.numDer))
            console.log("Condicion 3: "+posLetras[1]+"== "+`${sumaCond3}`)
            console.log("If adentro: "+posLetras[1]+" < "+valorC)*/

            if (this.est == " " || this.est == "F") {
                sumaStrings = parseInt(valorC) + parseInt(this.numIzq)
                restaStrings = parseInt(valorC) - parseInt(this.numDer)
                //Filas iguales
                if (parseInt(posLetras[0]) == parseInt(posLetras[this.contLabels - 2]) && (parseInt(posLetras[1]) == restaStrings || posLetras[1] == sumaStrings)) {
                    this.palabra = this.palabra + letra;
                    this.est = "F";
                    if (parseInt(posLetras[1]) < parseInt(valorC)) {
                        //Derecha 
                        console.log(this.numDer)
                        this.numDer++;
                        console.log("Hacia derecha +1");
                        console.log(this.numDer)
                    }
                    else {
                        console.log("CONTlABELS: " + this.contLabels)

                        console.log("posLetras[1] : " + posLetras[1])
                        console.log("ValorC: " + valorC)
                        //Izquierda
                        this.numIzq++;
                        console.log("Hacia izquierda +1");


                    }

                    letrasColor[obj.target.title][obj.target.id] = { color: "blue" }
                    //((Label)sender).Enabled = false;
                }
                else {
                    if (this.contLetras == 2) {
                        console.log("No hacer nada");
                    }
                    else {
                        console.log("Posicion No valida");
                        this.contLabels -= 2;
                        this.contLetras--;
                    }
                }
            }




            if (this.est == " " || this.est == "C") {
                sumaStrings = parseInt(valorF) + parseInt(this.numIzqCI)
                restaStrings = parseInt(valorF) - parseInt(this.numDerCI)
                //Columnas iguales
                if (parseInt(posLetras[1]) == parseInt(posLetras[this.contLabels - 1]) && (parseInt(posLetras[0]) == restaStrings || parseInt(posLetras[0]) == sumaStrings)) {
                    this.palabra = this.palabra + letra;
                    this.est = "C";
                    if (parseInt(posLetras[0]) < parseInt(valorF)) {
                        //Derecha 
                        this.numDerCI++;
                        console.log("Hacia derecha +1");
                    }
                    else {
                        //Izquierda
                        this.numIzqCI++;
                        console.log("Hacia izquierda +1");
                    }


                    letrasColor[obj.target.title][obj.target.id] = { color: "blue" , fontSize: "1.7em", margin: "auto" }
                    //((Label)sender).Enabled = false;
                }
                else {
                    if (this.contLetras == 2) {
                        console.log("No hacer nada");
                    }
                    else {
                        console.log("Posicion No valida");
                        this.contLabels -= 2;
                        this.contLetras--;
                    }
                }
            }



        }
        this.setState({ letrasColor })
        this.contLetras++;

    }

    AlmacenarPosiciones = (posFila, posColum) => {
        const { posLetras } = this.state
        posLetras[this.contLabels] = posFila;
        this.contLabels++;
        posLetras[this.contLabels] = posColum;
        this.contLabels++;
        this.setState({ posLetras })
    }


    IntroducirPalabras() {
        console.log("Introducir pal")

        const { tableroGame,palabras } = this.state
        let posFil = this.props.tareaHacer.posiciones[0]
        let posColum = this.props.tareaHacer.posiciones[1]
        let longPal = 0
        let palabra = ""
        let cantPalabras = Object.keys(this.props.tareaHacer.palabras).length
        let arrayPos = []

        for (let p = 0; p < Object.keys(this.props.tareaHacer.posiciones).length; p++) {
            arrayPos.push(this.props.tareaHacer.posiciones[p])
        }

        for (let j = 0; j < cantPalabras; j++) {

            
            palabra = this.props.tareaHacer.palabras[j]
            palabras.push(palabra)
            
            longPal = this.props.tareaHacer.palabras[j].length
            console.log()
            //Iteramos en columnas
            if (arrayPos[0] == arrayPos[2]) {

                //Derecha
                if (arrayPos[1] < arrayPos[3]) {
                    console.log("DERECHA")
                    console.log(palabra)
                    for (let i = 0; i < longPal; i++) {
                        tableroGame[arrayPos[0]][posColum] = palabra[i]
                        //console.log(tablero[this.posLetras[0]][posColum])
                        posColum++;
                    }
                }
                else //Izquierda
                {
                    console.log("IZQUIERDA")
                    for (let i = 0; i < longPal; i++) {
                        tableroGame[arrayPos[0]][posColum] = palabra[i]
                        posColum--;
                    }
                }
            }
            else //Iteramos en filas
            {
                //Abajo
                if (arrayPos[0] < arrayPos[2]) {
                    console.log("ABAJO")
                    for (let i = 0; i < longPal; i++) {
                        console.log("posFil: " + posFil)
                        console.log("arrayPos:" + arrayPos[1])
                        tableroGame[posFil][arrayPos[1]] = palabra[i]
                        posFil++;
                    }
                }
                else //Arriba
                {
                    console.log("ARRIBA")
                    for (let i = 0; i < longPal; i++) {
                        tableroGame[posFil][arrayPos[1]] = palabra[i]
                        posFil--;
                    }
                }
            }

            arrayPos.splice(0, 4)
            posFil = arrayPos[0]
            posColum = arrayPos[1]
        }
        this.setState({ tableroGame,palabras })
    }


    EnterEvent(e) {
        console.log(e)
        console.log(e.code)
        if (e.code == 'Space') {
            this.CalificarPalabra();
            this.contLetras = 1;
            this.contLabels = 0;
            this.numIzq = 1;
            this.numDer = 1;

            this.numIzqCI = 1;
            this.numDerCI = 1;
            this.est = " ";
            this.palabra = "";
        }
    }


    quitarPalabraDeCaja(palabra){
        const {palabras} = this.state


        for (let i = 0; i < palabras.length; i++) {
            if(palabras[i] == palabra){
                palabras[i]=""


                this.setState({palabras})
                break
            }
            
        }

    }

    CalificarPalabra() {
        let mal = true;

        //Leemos la longitud de un array de objs
        let cantPalabras = Object.keys(this.props.tareaHacer.palabras).length
        console.log(this.palabra)
        console.log(cantPalabras)
        let { vidas } = this.state
        let calif = 0
        let estrellas = 0
        for (let i = 0; i < cantPalabras; i++) {
            console.log(this.props.tareaHacer.palabras[i])
            //Verificaomos si la palabra que seleccciono el usuario coincide con alguna de las que el docente guardo
            if (this.palabra == this.props.tareaHacer.palabras[i]) {
                mal = false;
                this.setState({ score: (this.state.score + 1) })
                //pals[i].ForeColor = Color.Red;
                this.quitarPalabraDeCaja(this.palabra)
                this.soundCorrecta.play()
                
            }
            else{
            }
        }

        if (mal == true) {
            vidas.shift()
            this.setState({ vidas })
            this.soundIncorrecta.play()

        }

        //Si las vidas se acaban o el socore llega a su valor maximo el juego finaliza
        if (this.state.vidas.length == 0 || this.state.score == cantPalabras) {

            this.JuegoTerminado()
            /*Variable rellenada desde AppStudent, el condicional indica si el juego que se esta jugando
            es una actividad de clase o el uausrio esta jugando en modo libre*/
            /*if (this.props.juegoLibre == false) {
                this.props.TareaFinalizada(this.props.idTarea, calif)
            }
            else {
                if (this.props.juegoLibre == true) {
                    this.props.JuegoLibreFinalizado(parseInt(calif))
                }
            }*/
        

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



    JuegoTerminado(){
        var calif=0
        console.log("Juego terminado")
        console.log(`Aciertos: ${this.state.score}`)
        calif = (this.state.score * 10) / this.cantPalabras
        calif = calif.toFixed(1)

        this.props.setScrollFunction("hidden")
        this.verificarModalidadGame(calif)
        this.playFinalSound(calif)
        
       // this.activarWindowGameOVer(calif)
        clearInterval(this.tiempo)
    }


    playFinalSound(calif){
        if(calif>5){
            this.soundPassGame.play()
        }
        else{
            this.soundFailGame.play()
        }
    }


    GenerarVidas() {
        let cantVidas = parseInt(this.props.tareaHacer.vidas)
        let { vidas } = this.state
        for (let i = 0; i < cantVidas; i++) {
            vidas.push("vida")
        }
        this.setState({ vidas })
    }


}
