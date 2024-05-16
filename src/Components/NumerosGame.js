import React, { Component } from 'react'
import imagenA from '../Imagenes/imgA.png'
import imagenS from '../Imagenes/imgS.png'
import imagenD from '../Imagenes/imgD.png'
import fondo from '../img/Numeros/fondo_Num.svg'
import fondo_PC from '../img/Numeros/fondo_Pc.svg'
import imagenResp from '../Imagenes/imgNumero.png'
import Header from './Header.js';
import footer from '../img/Menu/footer.svg';
import ContentInst from './ContentInst'
import Derecha from '../img/Derecha.svg'
import Izq from '../img/Izq.svg'
import Window from './Window.js'
import numerosGame1 from '../img/Instrucciones/NumerosGame1.gif'
import numerosGame2 from '../img/Instrucciones/NumerosGame2.gif'
import numerosGame3 from '../img/Instrucciones/NumerosGame3.gif'
import numerosGame4 from '../img/Instrucciones/NumerosGame4.gif'
import musica from '../NumerosGame/Sonidos/MusicNumeros.mp3'
import sound2 from '../NumerosGame/Sonidos/Push.flac'

import soundCorrecta from '../Sonidos/Correcta.mp3'
import soundIncorrecta from '../Sonidos/Incorrecta.mp3'
import soundFailGame from '../Sonidos/FailGame.mp3'
import soundPassGame from '../Sonidos/PassGame.mp3'
import WindowGameOver from './WindowGameOver.js'




export default class NumerosGame extends Component {

    componentDidMount() {
        
        //Se inicializa las propiedades del canvas
        this.canvas = document.getElementById("areaGame")
        console.log(this.canvas)
        this.ctx = this.canvas.getContext('2d')

        /*Inicializa variable local de tipo array "operaciones" que contendra por cada posicion un obj
        con las operaciones [{P 0:2+5},P 1:9+3}]*/
        Object.keys(this.props.tareaHacer.operaciones).forEach(e => {
            this.operaciones.push({ [`${e}`]: this.props.tareaHacer.operaciones[e] })
        })
        this.numOperaciones = this.operaciones.length
        //Velocidad se convierte a entero ya que se lee del obj como cadena
        this.velocidad = parseInt(this.props.tareaHacer.velocidad)

        if (window.screen.width < 769) {
            console.log("CHICA")
            this.imgFondo.src = fondo
        }
        else {
            if (window.screen.width < 1200) {
                this.imgFondo.src = fondo_PC
                this.anchoFiguras = 110
                this.altoFiguras = 60
                this.figPosInicial = 220
                this.sumPos = 150
                console.log("GRANDE")
            }
            else {

                this.imgFondo.src = fondo_PC
                this.anchoFiguras = 85
                this.altoFiguras = 60
                this.figPosInicial = 250
                this.sumPos = 140
                console.log("GRANDE")

            }

            this.props.setScrollFunction("hidden")

        }



        /*Funcion que crea 3 objs con propiedades para las figuras de las teclas que vamos a presionar para 
        atrapar las respuestas*/
        this.IniciarFiguras()



        /*Vericamos el tamaño de la pantalla para saber que fondo pintar en el 
        canvas*/



        /*Esperamos a que se haya cargado la imagen de fondo ya que es la mas pesada, y cuando esto ocurra
       se ejecuta una vez la funcion "Update" para pintar en el canvas las figuras y el fondo*/
        this.imgFondo.onload = () => {
            this.Update()
            
            /*Esto se ejecuta cuando utilizamos la app en moviles o tabletas y terminamos de leer las instrucciones en pantalla completa
            en el componente <Instrucciones>*/ 
            if(window.screen.width <769)
            {
                this.StartGame()
            }
        }

        document.addEventListener("keydown", (e) => { 
            this.botonSound.play()
            this.AtraparRespuesta(e.key) 
        })

    }

    constructor() {
        super()
        this.calif = 0
        this.musicaFondo = new Audio()
        this.musicaFondo.src = musica
        this.botonSound = new Audio()
        this.botonSound.src = sound2
        this.soundCorrecta = new Audio()
        this.soundCorrecta.src = soundCorrecta 
        this.soundIncorrecta = new Audio()
        this.soundIncorrecta.src = soundIncorrecta  
        this.soundFailGame = new Audio()
        this.soundFailGame.src = soundFailGame
        this.soundPassGame = new Audio()
        this.soundPassGame.src = soundPassGame

        this.canvas = null
        this.ctx = null
        //Intervalo que funcionara durante todo el juego y ejecuta la funcion "Update"
        this.intervalo = null

        //Intervalo que mueve las respuesras aleatoriamente 
        this.intervalo2 = null
        this.imgA = new Image()
        this.imgA.src = imagenA
        this.imgS = new Image()
        this.imgS.src = imagenS
        this.imgD = new Image()
        this.imgD.src = imagenD
        this.imgFondo = new Image()



        this.imgResp = new Image()
        this.imgResp.src = imagenResp
        this.imgFiguras = [this.imgA, this.imgS, this.imgD]

        this.figurasDraw = []
        this.respCorrecta = 0
        this.ObjResp = []
        this.ObjRespAnterior = []
        this.operaciones = []

        this.velocidad = 0
        this.contMover = 0
        this.pregGenerada = null
        this.numOperaciones = 0
        this.anchoFiguras = 140
        this.altoFiguras = 50
        this.figPosInicial = 130
        this.sumPos = 200


        this.imagenes=[numerosGame1,numerosGame2,numerosGame3,numerosGame4]
        this.instrucciones=[
            "Resuelve las operaciones que aparecen en pantalla",
            "Para cada operación se generan 3 respuestas que se mueven hacia abajo, de las cuales solo una es la correcta",
            "Escoge la respuesta que creas correcta presionando el botón adecuado",
            "Contesta correctamente o de lo contrario perderás vidas y podrías perder el juego"
        ]



        this.posTexto =

            this.state = {
                score: 0,
                vidas:3,
                pregunta: "",
                estWindow:false,
                estWindowGameOver:"none",
                titulo:"",
                total:"",
                correctas:"",
                calif:""
            }



    }

    render() {
        return (
            <div>
                <Header></Header>
                <div className="modulo modulo--juegos-movil">
                    
                    <div className="content-info-juego content-info-juego--numeros">


                        <div className="content-score">
                            <p className="info-desc info-desc--vidas info-desc-nomargin">Vidas:</p>
                            <p className="info-desc info-desc--vidas info-desc--borde--red">{this.state.vidas}</p>

                        </div>

                        <div className="content-score">
                            <p className="info-desc info-desc--buenas info-desc-nomargin">Score:</p>
                            <p className="info-desc info-desc--buenas info-desc--borde">{this.state.score}</p>
                        </div>

                    </div>

                    <div  className="area-juego area-juego--numeros">
                        <p className="area-juego__operacion">{this.state.pregunta}</p>
                        <canvas className="juegoScene juegoScene--numeros" width="800" height="500" id="areaGame"></canvas>
                    </div>

                    <ContentInst clase={null} tema={null} inst={null}></ContentInst>

                </div>


                <Window  IniciarJuego={this.StartGame} instrucciones={this.instrucciones} imagenes={this.imagenes} titulo={"Numeros"} layout={"instrucciones"} CloseIns={this.props.CloseIns} windowIns={this.props.windowIns}></Window>
               
                <WindowGameOver juegoLibre={this.props.juegoLibre} estWindowGameOver={this.state.estWindowGameOver} titulo={this.state.titulo} total={this.state.total} correctas={this.state.correctas} setScrollFunction={this.props.setScrollFunction} calif = {this.state.calif}></WindowGameOver>


                <img style={{ zIndex: 400 }} className="fondo-figuras fondo-figuras--der fondo-figuras--juego" src={Derecha}></img>
                <img style={{ zIndex: 400 }} className="fondo-figuras fondo-figuras--izq fondo-figuras--juego" src={Izq}></img>

                {this.WindowsJuegoTerminado()}
                <footer className="footer-menu footer-menu--juegos-movil">
                    <img className="footer-menu__fondo" src={footer}></img>
                </footer>

                {/*  

                <div name="padre" style={{display:"flex"}}>
                    <div name ="info">
                        <p>Tema: {this.props.tareaHacer.tema}</p>
                        <p>Instrucciones: {this.props.tareaHacer.instrucciones}</p>

                    </div>
                    <div>
                        <canvas width="750" height="450" id="areaGame"></canvas>
                    </div>
                </div> */}



            </div>
        )
    }


      
    activarWindowGameOVer(tipoResultado,calif){
        this.setState({estWindowGameOver:"block",titulo:"Fin del juego",total:`Operaciones totales: ${this.numOperaciones}`,correctas:`Operaciones correctas: ${this.state.score}`,calif:`${tipoResultado} ${calif}`})
    }


    StartGame=()=>
    {
        this.musicaFondo.play()
        /*"StatGame" Fucnion que agrupa las lineas de codigo necesarias para iniar el juego desde el cokponente 
        <window>*/ 
        this.intervalo2 = window.setInterval(() => { this.EstadoMovimiento() }, 1000)
        this.intervalo = window.setInterval(() => { this.Update() }, 1000 / 55)
        this.IniciarJuego()
    }


    IniciarJuego() {
       
        console.log(this.operaciones)

        let objKey = ""
        let nombre = ""
        let numPregunta = 0
        //Se genera un numero aleatorio de acuerdo a la longitud del array de operaciones 
        let num = Math.floor(Math.random() * ((this.operaciones.length) - 0) + 0)

        this.pregGenerada = num

        //Apunta a una posicion en "operaciones" y se extrae el key de su obj que contiene
        objKey = Object.keys(this.operaciones[num])

        /*Por algun motivo el key lo devolvia como array y no como cadena, para corregir esto se 
        utiliza la funcion join que junta todas las posiciones y las convierte en una cadena*/
        nombre = objKey.join()

        //Retorna el numero de la pregunta extraido de un obj de operaciones  P 2:9+2
        numPregunta = this.GetNumPregunta(nombre)

        /*Se almacena en una varibale global la pregunta que se ha generado, se apunta a su posicion de arreglo
        y de objeto*/
        this.setState({ pregunta: this.operaciones[num][`P ${numPregunta}`] + "=" },()=>{

            console.log("PEGUNTA: "+this.state.pregunta)

             //console.log("PEGUNTA: "+this.state.pregunta)

        //Resulve la  operacion seleccionada la  para obtener la respuesta correcta
        this.ResolverOperacion();

        this.ObtenerRespuestas(numPregunta)

        console.log("RESPUESTAS: "+this.ObjResp)

        })

       
    }

    ObtenerRespuestas(num) {
        let posResp = this.figPosInicial;

        /*No es necesario para las respuestas asignarlas a una varoable global, asi que recorremos el obj de 
        la propiedad de la tarea directamente*/

        Object.keys(this.props.tareaHacer.respuestas).forEach(r => {
            /*Comparamos la key de todas las respuestas con el numero que encontramos sacado de
             la operacion generada  R 1 == R 1 para saber cuales son las respuestas de la operacion*/
            if (("R " + num) == r) {
                //Recorremos las 3 respuestas encontradas
                Object.keys(this.props.tareaHacer.respuestas[r]).forEach(e => {
                    /*Por cada respuesta se llama a esta funcion que crea objs con propiedades
                    para las respuestas que despues seran pintadas en el canvas*/
                    this.CrearRespuestas(this.props.tareaHacer.respuestas[r][e], posResp)
                    posResp += this.sumPos
                })
            }
        })
    }



    GetNumPregunta(cad) {
        let acumCarac = ""
        let estInsertar = false

        //Recorremos al parametro que recibe la funcion que es el key de un objeto en "operaciones"
        for (let i = 0; i < cad.length; i++) {
            //Encontrar el " " indica que los caracteres siguientes ya son el numero de la pregunta {P 1:3+6}
            if (cad[i] == " ") {
                estInsertar = true
            }
            /*Se acumula en una variable ya que no hay la certeza de cuntos caracteres pueda haber despues
             del espacio*/
            if (cad[i] != " " && estInsertar) acumCarac += cad[i]
        }


        return acumCarac
    }


    Update() {
        this.MoverRespuestas(this.ObjResp, true)
        this.MoverRespuestas(this.ObjRespAnterior, false)

        //Eliminar Respuestas de "ObjRespAnterior" que hayan salido del canvas por la parte inferior
        for (const i in this.ObjRespAnterior) {
            var res = this.ObjRespAnterior[i]
            if (res.y > this.canvas.height) this.ObjRespAnterior.splice(i, 1)
        }

        //Funcion que pinta la imganen de fondo
        this.DibujarEscena()

        //Dibuja las figuras que fueron creadas en el componentDidMount
        this.DibujarFiguras()

        this.DibujarRespuestas(this.ObjResp)
        this.DibujarRespuestas(this.ObjRespAnterior)

    }

    DibujarEscena() {
        this.ctx.drawImage(this.imgFondo, 0, 0, 800, 500)
    }
    DibujarFiguras() {
        for (const i in this.figurasDraw) {
            var figura = this.figurasDraw[i]
            this.ctx.drawImage(figura.img, figura.x, figura.y, figura.width, figura.height)
        }
    }

    CrearRespuestas(textResp, posResp) {

        /*maxPosX variable que cambia en la funcion de "ObtenerRespuestas" para que las posicion en x de cada 
        respuesta no sea la misma*/
        this.ObjResp.push({
            width: this.anchoFiguras,
            height: this.altoFiguras,
            x: posResp,
            y: 0,
            text: textResp,
            mover: false
        })
    }

    IniciarFiguras() {
        let posFig = this.figPosInicial
        //Se ejcuta 3 veces
        for (let i = 1; i < 4; i++) {

            this.figurasDraw.push({
                width: this.anchoFiguras,
                height: this.altoFiguras,
                x: posFig,
                y: (this.canvas.height / 2) + 100,
                img: this.imgFiguras[(i - 1)]
            })

            posFig += this.sumPos
        }
    }

    DibujarRespuestas(respObj) {
        /*Recorre a los objetos que han sido creados de acuerdo a las respuestas encontradas para la
         operacion y por cada una de ellas pinta en el canvas una imagen y un texto que contiene las respuestas*/
        this.ctx.save()
        for (const i in respObj) {
            var resp = respObj[i]
            this.ctx.font = "20px Georgia";
            this.ctx.drawImage(this.imgResp, resp.x, resp.y, resp.width, resp.height);
            this.ctx.fillText(resp.text, resp.x + (resp.width / 2.5), resp.y + (resp.height / 2));
        }
        this.ctx.restore()
    }

    MoverRespuestas(respuestasObj, accion) {
        /*Recorre a los objetos que se crearon de acuerdo a las respuestas y modifica su propiedad "y" asiendo
        asi que se mueva hacia la parte inferior del canvas, pero solo movera a los objs que tengan su 
        propiedad "mover" en true, por defecto esta esta en false*/
        let contPosY = 0
        for (const i in respuestasObj) {
            var res = respuestasObj[i]
            if (res.mover) res.y += this.velocidad

            //Esto solo se ejecuta cuando el parametro de "respuestasObj" es igual a "ObjResp"
            if (accion == true) {
                //Cuenta si los objs en su posicion "y" han sobrepasado a las figuras para atrapar las respuestas
                if (res.y > (this.figurasDraw[0].y + 60)) contPosY++

                /*Se refire a que 3 son los objetos de "ObjResp" que no se han atrapado, es decir no se contesto
                la operacion*/
                if (contPosY == 3) {
                    this.ValidarEstadoJuego(null)
                }
            }
        }
    }

    EstadoMovimiento() {
        //Funcion ejecutada cada 1 segundo por el "intervalo2"

        //console.log("intervalo2")
        let num = 0

        //Condicional que indicara cuando ya hayamos activado los objs de las 3 respuestas "ObjResp"
        if (this.contMover < this.ObjResp.length) {
            //Genera numero aleatorios en entre 0 y 2
            num = Math.floor(Math.random() * ((this.ObjResp.length) - 0) + 0)

            /*Si el numero aleatorio que se genero apunta a un obj de las respuesta el cual tenga su 
            propiead "mover" en true significa que "num" no sirve*/
            if (this.ObjResp[num].mover == true) {
                /*"num" se vueleve a null para que se ejecute el ciclo las veces que sea necesario hasta que 
                el valor generado dentro de este apunte a un obj de las respuestas que no tenga su proipiedad en 
                true*/
                num = null
                while (num == null) {
                    num = Math.floor(Math.random() * ((this.ObjResp.length) - 0) + 0)
                    if (this.ObjResp[num].mover == true) num = null
                }
            }

            /*En este punto sabemos que el numero aleatorio generado funciona y que estamos apuntando a un obj 
            que tiene false en la propiedad "mover"*/
            this.ObjResp[num].mover = true
            this.contMover++

        }
        else {
            /*Cuando los todos los objetos de "ObjResp" esten en movimiento ya no se necesita el intervalo
            para activar el movimiento a los objs*/
            clearInterval(this.intervalo2)
        }
    }

    Colisiones(a, b) {
        var hit = false
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
        return hit
    }

    AtraparRespuesta = (letra) => {
        //Array para comparar si la tecla que hemos presionado coincide con algun valor de sus posiciones
        let letras = ["a", "s", "d"]

        for (let i = 0; i < letras.length; i++) {
            //"letra" es el parametro que se recibe desde el evento "keydown" que almacena la tecla que presionamos
            if (letra == letras[i]) {
                /*Se pudo hacer posible este tipo de comparacion ya que los elementos de todos los arrays
                estan alineados en cuanto a posiciones*/

                if (this.Colisiones(this.figurasDraw[i], this.ObjResp[i])) {
                    /*Validamos si el obj de la respuesta con la que colisionamos en su propiedad text conicide 
                    con la respuesta correcta para la operacion*/
                    if (this.respCorrecta == this.ObjResp[i].text) {
                        //Correcta
                        //Se suma 1 a la puntuacion   
                        this.setState({ score: this.state.score + 1 })
                        this.soundCorrecta.play()
                    }
                    else{
                        this.setState({ vidas: this.state.vidas + -1 })

                        this.soundIncorrecta.play()
                    }

                    //Se ejecuta cuando colisionamos con una respuesta no importa si es correcta o incorrecta
                    this.ValidarEstadoJuego(i)
                }
            }

        }

    }

    ResolverOperacion() {
        /*De la variable que contiene la operacion generada extraemos el ultimo caracter que es "=" para 
        poder resolverla*/
        let ope = this.state.pregunta.substring(0, this.state.pregunta.length - 1)

        //"eval" es una funcion que permite resolver una operacion matematica que este expresada en una cadena
        this.respCorrecta = eval(ope)
        console.log("CORRECTA: ", this.respCorrecta)

    }


    

    ValidarEstadoJuego(i) {
        //Se elimina la operacion que estaba mostrada en el canvas para responder
        //"pregGenerada" variable que almacena posicion de la pregunta que se genero
        this.operaciones.splice(this.pregGenerada, 1)

        //Condicional para validar si el juego puede seguir o ya no 
        if (this.operaciones.length != 0 && this.state.vidas >0) {
            /*Se ejecuta cuando esta funcion es llamda desde " AtraparRespuestas".  ya que se elimina la 
            respuesta que haya atrapado el usuario  para que las sobrantes sigan moviendose*/
            if (i != null) this.ObjResp.splice(i, 1)


            /*Se crea una copia del array "ObjResp" para despues seguir moviendo los objs de esa copia y dejar 
            libre a "ObjResp" para las respuestas de la nueva operacion que se genere*/
            this.ObjRespAnterior = this.ObjResp.slice()

            this.ObjResp = []

            /*Se vuelve a 0 para en "EstadoDeMovimiento" se pueda cambiar la propiedad de "mover" de los 3
            objetos que tendra "ObjResp"*/
            this.contMover = 0

            this.IniciarJuego()

            //Se vualve a activar el "intervalo2" para que mueve a los obj nuevos de "ObjResp"
            this.intervalo2 = window.setInterval(() => { this.EstadoMovimiento() }, 1000)
        }
        else {
            this.calif = (this.state.score * 10) / this.numOperaciones
            this.calif = this.calif.toFixed(1)
            //this.props.TareaFinalizada(this.props.idTarea, this.calif)
            clearInterval(this.intervalo)
            console.log("Juego terminado")

            this.playFinalSound(this.calif)
            
            this.props.setScrollFunction("hidden")
            this.activarWindowGameOVer(this.calif)
            this.verificarModalidadGame(this.calif)
        }
    }
    verificarModalidadGame(calif){
        /*Variable rellenada desde AppStudent, el condicional indica si el juego que se esta jugando
        es una actividad de clase o el uausrio esta jugando en modo libre*/
        if (this.props.juegoLibre == false) {
            this.props.TareaFinalizada(this.props.idTarea, calif)
        }
        else {
            if (this.props.juegoLibre == true) {
                this.props.JuegoLibreFinalizado(parseInt(calif))
            }
        }
    }


    verificarModalidadGame(calif){
        /*Variable rellenada desde AppStudent, el condicional indica si el juego que se esta jugando
        es una actividad de clase o el uausrio esta jugando en modo libre*/
        if (this.props.juegoLibre == false) {
            this.activarWindowGameOVer("Tu calificacion es:",calif)
            this.props.TareaFinalizada(this.props.idTarea, calif)
        }
        else {
            if (this.props.juegoLibre == true) {
                this.activarWindowGameOVer("Estrellas ganadas:",parseInt(calif))

                this.props.JuegoLibreFinalizado(parseInt(calif))
            }
        }
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
