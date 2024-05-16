import React, { Component } from 'react'
import Fondo from '../img/Plataformas/plat_fondo.svg'
import EmptyPlat from '../Imagenes/EmptyPlat.png'
//import Caja from '../img/Plataformas/Caja.svg'
import Caja_movil from '../img/Plataformas/Caja_movil.svg'
import Caja_web from '../img/Plataformas/Caja_web.svg'
import Plataforma from '../Imagenes/Plataforma.png'
import Player from '../img/Plataformas/Player.svg'
import Prueba from '../img/Plataformas/Prueba.svg'
import footer from '../img/Menu/footer.svg';
import ContentInst from './ContentInst';
import Header from './Header.js';
import Derecha from '../img/Derecha.svg'
import Izq from '../img/Izq.svg';
import Window from './Window.js';
import platGame1 from '../img/Instrucciones/PlataformasGame1.gif'
import platGame2 from '../img/Instrucciones/PlataformasGame2.gif'
import platGame3 from '../img/Instrucciones/PlataformasGame3.gif'
import platGame4 from '../img/Instrucciones/PlataformasGame4.gif'
import platGame5 from '../img/Instrucciones/PlataformasGame5.gif'
import platGame6 from '../img/Instrucciones/PlataformasGame6.gif'
import platGame7 from '../img/Instrucciones/PlataformasGame7.gif'
import WindowGameOver from './WindowGameOver.js'

import musica from '../Sonidos/PlataformasMusic.mp3'

import soundCorrecta from '../Sonidos/Correcta.mp3'
import soundIncorrecta from '../Sonidos/Incorrecta.mp3'
import soundFailGame from '../Sonidos/FailGame.mp3'
import soundPassGame from '../Sonidos/PassGame.mp3'



export default class PlataformasGame extends Component {

    componentDidMount() {
        //Inicializa el canvas
        this.canvas = document.getElementById("canvasJuego")
        this.ctx = this.canvas.getContext('2d')


        this.props.setScrollFunction("hidden")


        this.restarPositionObjGame()

        
        //Contiene las propiedes del alien o player
        this.posPlayer = this.objPlayer.x

        //Funcion que recupera informacion de la tarea en "tareaHacer"
        this.CargarDatos()


        /*Esto se ejecuta cuando utilizamos la app en moviles o tabletas y terminamos de leer las instrucciones en pantalla completa
        en el componente <Instrucciones>*/ 
        if(window.screen.width <769)
        {
            this.StartGame()
        }


        //Se activa cuando se presiona una tecla
        document.addEventListener("keydown", (e) => {

            //Se creo una copia para no afectar al arreglo original 
            var arrayCopia = this.propCadenas.slice();
            //Valida que la tecla que se presione se la correcta para hacer saltar al alien
            if (e.code == 'Space') {

                /*Extraemos los objetos que no esten en la caja es decir las plataformas que 
                esten puestas en la oracion*/
        
                if(window.screen.width <769)
                {
                    this.objPlatSaltar = arrayCopia.filter(p => p.y != this.cadPosiciones[0].y)
                }
                else
                {
                    this.objPlatSaltar = arrayCopia.filter(p => p.x != this.cadPosiciones[0].x)
                }
                


                //Calculamos la distancia que hay de cada plataforma fuera de la caja con el personaje
                for (const i in this.objPlatSaltar) {
                    var plat = this.objPlatSaltar[i]
                    plat.distAlien = this.objPlayer.y - plat.y
                    plat.distAlienX = plat.x - this.objPlayer.x
                }

                /*Se ordenan las plataformas de "objPlatSaltar" de acuerdo a la distacia, el orden es de menor
                 a mayor
                  */


                var posX = this.objPlatSaltar
                posX.sort(function (a, b) {
                    if (a.distAlien == b.distAlien) {

                        return a.distAlienX - b.distAlienX;

                    }
                    else {
                        return a.distAlien - b.distAlien;
                    }

                });

                //Puede contener una plataforma o dos 
                this.objPlatSaltar = posX
                this.saltar = true

            }


        })

        //Se ejecuta cuando hacermos click
        document.addEventListener("mousedown", click => {

            //Recorremos a las cadenas es decir a las pltaformas creadas para la oracion 
            for (const i in this.propCadenas) {

                var cad = this.propCadenas[i]

                /*Cada que se hace click se revisa si puntero ha colisionado con alguna de las plataformas*/
                if (this.props.Colisiones(this.puntero, cad)) {
                    //Condicional para validar que solo podamos atrapar a las plataformas que no han sido atrapadas
                    if (cad.atrapado == false) {
                        //Se la propiedad "atrapado" para que solo esta plataforma siga al puntero
                        cad.atrapado = true

                        //Se almcena la posicion original que tiene la plataforma seleccionada en la caja  


                        /*Variable para saber que objeto es que el se se atrapo*/
                        this.posAtrapado = i

                        /*Condicional para verificar que la plataforma que clikeamos esta o no puesta ya en la
                        oracion*/
                        for (const k in this.propOraciones) {
                            var pasrteOracion = this.propOraciones[k]
                            /*Para optimizar, y ya que sabemos que la pltaforma solo puede estar
                            haciendo colision de un inicio con las plataformas vacias que tienen su 
                            propiedad "usada" en true*/
                            if (pasrteOracion.usada == true) {
                                /*Verificamo si la pltaforma que agarramos esta haciendo
                                colision con la platafroma vacia*/
                                if (this.props.Colisiones(cad, pasrteOracion)) {

                                    /*Variable que impedira que se detecte colision entre las plataformas
                                    y plataformas vacias*/
                                    this.colVacias = false

                                    /*Se cambia el estado de la plataforma vacia para poder volver a meter 
                                    un plataforma ahi*/
                                    pasrteOracion.usada = false

                                    /*Intervalo que despues de 3 segundos vuelve a "colVacias" a true, esto 
                                    significa que ya se detectara colison otra vez de las plastaformas*/
                                    this.tiempoColision = window.setInterval(() => {
                                        this.colVacias = true
                                        clearInterval(this.tiempoColision)
                                    }, 3000)
                                }
                            }
                        }
                        break
                    }

                }
            }

        })


        //Se ejecuta cada que movemos el mouse
        document.addEventListener("mousemove", flecha => {

            //Cada que se mueva el puntero la posicion de este se le asigna a el obj "puntero"
            this.puntero.x = flecha.clientX
            this.puntero.y = flecha.clientY

            let posCadena = -1

            /*Se busca si hay alguna plataforma que haya sido clickeada, si no se encuntra niguna pos "posCdena"
            vale -1*/
            posCadena = this.propCadenas.findIndex(e => e.atrapado == true)
            if (posCadena != - 1) {
                //La plataformas clickeada en "mousedown" seguira la posicion del cursor
                this.propCadenas[posCadena].x = flecha.clientX
                this.propCadenas[posCadena].y = flecha.clientY
            }
        })
    }

    restarPositionObjGame(){

        if (window.screen.width < 769) {

            /*Varibale de objeto que almacena las propiedades de la plataforma que al inicio del juego aparece
            para que el alien este sobre ella*/
            this.caja.src = Caja_movil  
            this.objPlatInicial = { x: 85, y: this.canvas.height - 170, width: 195, height: 35, hidde: false }
            this.objPlayer = { x: this.objPlatInicial.x + (this.objPlatInicial.width) / 3, y: this.objPlatInicial.y - 55, width: 70, height: 55, movido: false }
            this.cajaObj = { x: 10, y: this.canvas.height - 110, width: this.canvas.width - 30, height: 100 }
        }
        if (window.screen.width > 768 && window.screen.width <1200) {
            this.caja.src = Caja_web
            this.objPlatInicial = { x: 40, y: this.canvas.height -40, width: 150, height: 35, hidde: false }
            this.objPlayer = { x: this.objPlatInicial.x + (this.objPlatInicial.width) / 3, y: this.objPlatInicial.y - 65, width: 80, height: 65, movido: false }
            this.cajaObj = { x: this.canvas.width-202, y: -100, width: 200, height: this.caja.height+100 }

        }
        if(window.screen.width >1200)
        {
            this.caja.src = Prueba
            this.objPlatInicial = { x: 40, y: this.canvas.height -40, width: 130, height: 40, hidde: false }
            this.objPlayer = { x: this.objPlatInicial.x + (this.objPlatInicial.width) / 3, y: this.objPlatInicial.y - 65, width: 45, height: 65, movido: false }
            this.cajaObj = { x: this.canvas.width-182, y: 0, width: 180, height: this.canvas.height }
        }
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



    constructor() {
        super()

        this.musicaFondo = new Audio()
        this.musicaFondo.src = musica
        this.soundCorrecta = new Audio()
        this.soundCorrecta.src = soundCorrecta 
        this.soundIncorrecta = new Audio()
        this.soundIncorrecta.src = soundIncorrecta  
        this.soundFailGame = new Audio()
        this.soundFailGame.src = soundFailGame
        this.soundPassGame = new Audio()
        this.soundPassGame.src = soundPassGame


        this.limY = 0
        this.limX = 0
        this.posPlayer = 0
        this.contPlat = 0
        this.touchPunto = false
        this.posYantes = 0


        this.saltar = false
        this.intervaloPrueba = null
        this.segundos = 0

        this.canvas = null
        this.intervalo = null
        //Intervalo para esperar a detectar colision cuando saquemos a una plataforma de una plataforma vacia
        this.tiempoColision = null
        this.ctx = null
        this.numOracion = null

        //"oraciones" contiene a todas la oraciones de la actividad
        //"partesOracion" contendra a la cadena ecogida descompuesta por partes
        //"propOraciones" contiene las propiedades para pintar las partes de la oracion en el canvas
        this.oraciones = []
        this.numOraciones  =0
        this.partesOracion = []
        this.propOraciones = []

        this.cadenas = []
        this.propCadenas = []
        //Variable para almceenar las posiciones originales de las plataformas por si se regresan a las caja
        this.cadPosiciones = []

        this.fondo = new Image()
        this.fondo.src = Fondo
        //Variable que contendra la iagen de la plataforma vacia
        this.platVacia = new Image()
        this.platVacia.src = EmptyPlat

        //Contenedor dem las plataformas
        this.caja = new Image()
       

        this.alien = new Image()
        this.alien.src = Player

        this.cajaObj = null
        this.objPlatSaltar = null



        this.plataforma = new Image()
        this.plataforma.src = Plataforma



        //Obj para hacer colicion con las plataformas y asi poder moverlas
        this.puntero = { x: 0, y: 0, width: 20, height: 20 }
        this.objPlayer = null
        this.objPlatInicial = null
        this.posAtrapado = null


        //Variables para devolver a las cajas las plataformas

        this.colCaja = false
        this.colVacias = true
        this.califIntervalo = null
        
        this.tiempo = null
        this.sumarOracionCorrecta = true
        this.contOracionCorrecta = 0

        this.imagenes=[platGame1,platGame2,platGame3,platGame4,platGame5,platGame6,platGame7]
        this.instrucciones=[
            "Ayuda al duendecillo a escalar para llegar a la cima donde se encuentra su oro ",
            "El juego inicia cuando baja una oración con un espacio para colocar una plataforma a la que el duendecillo podrá saltar ",
            "En la parte inferior de la pantalla se encuentran las plataformas con las palabras para completar la oracion",
            "Para colocar un plataforma en el espacio de la oracion solo arrastra la plataforma",
            "Presiona al duendecillo para que salte a la plataforma que pusiste en el espacio vacio",
            "Cuando el duendecillo llegue a la plataforma se calificara tu respuesta que pusiste en la oracion",
            "Ganaras el juego si consigues que el duendecillo llegue a la cima"]

        this.state = {
            vidas: 0,
            correctas: 0,
            incorrectas: 0,
            estWindowGameOver:"none",
            titulo:"",
            total:"",
            calif:"",
            score:0,
            min:0,
            seg:0
        }


    }

    render() {
        return (
            <div>
                <Header></Header>
                <div className="modulo modulo--juegos-movil">

                    <div className="area-juego area-juego--plat">
                        <div className="content-info-juego content-info-juego--plat">
                            <p className="info-desc info-desc--vidas">{`Vidas: ${this.state.incorrectas}`} </p>

                            <p className="info-desc info-desc--buenas">{`Score: ${this.state.score}`}</p>
                            <p className="info-desc info-desc--tiempo">{`Tiempo: ${this.state.min}:${this.state.seg}`}</p>
                        </div>



                        <canvas className="juegoScene--plat" id="canvasJuego" width="800" height="500"></canvas>

                    </div>
                    <ContentInst clase={null} tema={null} inst={null}></ContentInst>

                </div>
                    <Window CloseIns={this.props.CloseIns} windowIns={this.props.windowIns} IniciarJuego={this.StartGame} instrucciones={this.instrucciones} imagenes={this.imagenes} titulo={"Plataformas"} layout={"instrucciones"}></Window>
                    <WindowGameOver juegoLibre={this.props.juegoLibre}  estWindowGameOver={this.state.estWindowGameOver} titulo={this.state.titulo} total={this.state.total} correctas={this.state.correctas} setScrollFunction={this.props.setScrollFunction} calif = {this.state.calif}></WindowGameOver>


                <img style={{zIndex:2000}} className="fondo-figuras fondo-figuras--der fondo-figuras--juego" src={Derecha}></img>
                <img style={{zIndex:2000}} className="fondo-figuras fondo-figuras--izq fondo-figuras--juego fondo-figuras--juego" src={Izq}></img>

                <footer className="footer-menu footer-menu--juegos-movil">
                    <img className="footer-menu__fondo" src={footer}></img>
                </footer>



            </div>
        )
    }

    
      
    activarWindowGameOVer(tipoResultado,calif){
        this.setState({estWindowGameOver:"block",titulo:"Fin del juego",total:`Oraciones totales: ${this.numOraciones}`,correctas:`Oraciones correctas: ${this.contOracionCorrecta}`,calif:`${tipoResultado} ${calif}`})
    }




    StartGame=()=>
    {
        /*"StatGame" Fucnion que agrupa las lineas de codigo necesarias para iniar el juego desde el cokponente 
        <window>*/ 
        console.log("HOLA START GAME")
        this.IniciarJuego()
        this.initTimer()
        this.intervalo = window.setInterval(() => { this.Update() }, 1000 / 55)
        this.musicaFondo.play()
    }

    Update() {
        //Se dibuja el fondo que sera del mismo tamaño que le canvas

        this.ctx.drawImage(this.fondo, 0, 0, 800, 500)

        /*Funcion que se ejcutara cuando el proceso de saltar de alien haya terminado osea que las platafomas 
        fueron calificadas*/
        //this.OracionCalificada(this.propOraciones,null) 
        //this.OracionCalificada(this.propCadenas,"checar")

        //Funcion que bajara de la parte superiro del canvas a la oracion que se genero
        this.BajarOracion(this.canvas.height / 3)
        this.BajarPlayer()

        //Pinta el contendor de las plataformas
        this.ctx.save()
        this.ctx.drawImage(this.caja, this.cajaObj.x, this.cajaObj.y, this.cajaObj.width, this.cajaObj.height)
        this.ctx.restore()

        this.SaltarAlien()

        //Funcion que pintara las plataformas
        this.DibujarOracion()
        this.DibujarCadenas()
        this.DibujarAlien()
        this.DibujarPuntero()

        this.ctx.save()
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.limX, this.limY, 10, 10)
        this.ctx.restore()

        this.ColVacia_Plataforma()


    }

    CargarDatos() {
        //Recuperamos las oraciones totales de la actividad y al ser un obj se convierten a array
        this.oraciones = Object.values(this.props.tareaHacer.preguntas)
        console.log("ORACIONES: ",this.oraciones)
        this.numOraciones = this.oraciones.length
        this.setState({ vidas: this.props.tareaHacer.vidas })
    }

    IniciarJuego=()=> {
        console.log("ORACIONES: ",this.oraciones)
        //Genera valor aleatorio para selecionar una pregunta
        var cantOraciones = (Object.keys(this.oraciones).length) - 1
        let num = null


        while (num == null) {

            num = Math.floor(Math.random() * ((cantOraciones + 1) - 0) + 0)

            if (this.oraciones[num] == "") {
                num = null
            }
        }


        //Almacenamos las posicion de la oracion escogida
        this.numOracion = num

        //En "partesOracion" que es un array se almacenaran las cadenas de la oracion descompuesta
        this.partesOracion = this.oraciones[num].split([" "])


        //Funcion que buscara las cadenas  que le corresponden a la oracion escogida
        this.DatosPregunta(num, this.props.tareaHacer)

        //  NOTA SI EXITE ALGUN FALLO PUDIERA SER EL ORDEN DE INVOCAION DE ESTAS FUNCIONES 

        /*Funcion que crea objs en "propOraciones" de acuerdo al numero de cadenas que se obtuvieron 
        de descomponer la oracion escogida*/
        this.CrearObjOracion()



        /*De acuerdo a las cadenas encontradas para la oracion que se almcenan en "cadenas", se crearan objs
        en "propCadenas" para crear las plataformas en el canvas*/
        this.CrearObjCadenas()
    }


    DatosPregunta(numAleat, obj) {
        /*Funcion  que lee directamente de "tareaHacer" las respuestas y almacena en "cadenas" las que les 
        correspondan a la oracion*/
        var objRecorrer = obj.respuestas

        Object.keys(objRecorrer).forEach(r => {
            if (r[r.length - 1] == numAleat) {
                //Almacena las cadenas para la oracion
                this.cadenas = Object.values(objRecorrer[r])
            }
        })
    }

    CrearObjOracion() {

        let posXAnterior = 40
        let valSumar = 0
        let platVacia = undefined
        let posYCadena = 0;
        let posYPlatVacia = -30


        //Recorremos al array que contiene solo las cadenas "partesOracion"
        for (const i in this.partesOracion) {
            //Apunta a una cadena del array dependiendo de la vuelta en que valla el for
            var pedazo = this.partesOracion[i]

            //Verificamos cual de las cedenas sera una respuesta correcta
            platVacia = this.cadenas.find(c => c == pedazo + " ")


            /*Por cada cadena se verifica que la posicion en X en la cual se va a pintar 
            no salga de la pantalla*/
            if (window.screen.width < 769) 
            {
                if (posXAnterior > this.canvas.width - 205) 
                {
                    /*En caso de cumplirse que alguna cadena se comienza a salir del canvas
                    se reinician valores de posicion para pintar desde la posicion inicial solo cambiando 
                    sus valores en Y para que se pinten por debajo de las cadenas ya pintadas*/
                    posXAnterior = 40
                    posYCadena += 52
                    posYPlatVacia += 50
                }
            }
            else{
                if (window.screen.width > 768) 
                {
                    if (posXAnterior > this.canvas.width - this.cajaObj.width-150) 
                    {
                        /*En caso de cumplirse que alguna cadena se comienza a salir del canvas
                        se reinician valores de posicion para pintar desde la posicion inicial solo cambiando 
                        sus valores en Y para que se pinten por debajo de las cadenas ya pintadas*/
                        posXAnterior = 40
                        posYCadena += 52
                        posYPlatVacia += 50
                    }
                }
            }
           

            




            /*Se inserta un objeto que contendra las caracteristicas de la cadena actual a la que esta 
            apuntando el for*/
            this.propOraciones.push({
                x: posXAnterior,
                y: (platVacia != undefined) ? posYPlatVacia : posYCadena,
                oracion: pedazo,
                usada: false
            })

            //Verificamos si la cadena actual sera una plataforma vacia
            if (platVacia != undefined) {
                /*Si la cadena actual es una plataforma vacia entonces el valor a sumar para la posicion en X
                que usara la cadena siguiente sera un valor acercado al ancho de la plataforma
                para que la cadena o plataforma que se pinte delante no se encime*/

                //El valor que hay que sumar es 193 un valor carcano al 195 que es ancho de la plataforma

                /*NOTA:Cuando una plataforma se pinta en la posicion inicial parece que el 193 no le es suficiente
                ya que se encima con la siguinete cadena por eso se suma 200*/
                if (posXAnterior == 40) {
                    valSumar += 220
                }
                else {
                    valSumar += 160
                }

            }
            else {
                /*Se realizo un algoritmo con el metodo de tanteo y se obtuvo como resultado que para una
                cadena de 20 caracteres habia que sumar 373 con respecto a su posicion actual en X para pintar 
                la siguiente cadena y que de esa forma no se encimaran */

                /*La funcion "GetValorSumar" lo que hace es retornar un valor a sumar en X para la siguiente 
                cadena en base a los caracteres que tenga la cadena actual*/
                valSumar = this.GetValorSumar(373, pedazo.length)
            }


            /*Acumula el valor de la posicion actual de la plataforma mas lo que hay que sumar para que se pinte
            la siguinte*/
            posXAnterior += valSumar

        }
    }

    GetValorSumar(valMayorSum, longCad) {
        //Clico para centrar texto en la plataforma 
        for (let p = 20; p > 0; p--) {
            if (longCad == p) {
                p = -1
            }
            else {
                valMayorSum -= 16
            }


        }

        return valMayorSum
    }

    DibujarOracion() {
        let cadEncontrada = undefined
        this.ctx.save()

        //Se recorren las propiedes de las cadenas resultantes de separar la oracion
        for (const i in this.propOraciones) {
            var prop = this.propOraciones[i]

            /*Buscamos en las cadenas para la oracion si alguna de ellas es igual a una de las partes de la 
            oracion descompuestas, si no hay un match retorna undefined  */
            cadEncontrada = this.cadenas.find(c => c == prop.oracion + " ")

            if (cadEncontrada != undefined) {

                /*Se econtro una cadena similar a una parte de la oracion descompuesta, lo que significa que 
                dicha cadena es una posible respuesta por lo que enves de pintar la cadena, se pinta 
                una plataforma vacia*/

                /*Se les asigna un ancho y un alto para poder derectar colisiones con las plataformas que 
                arrastremos a la plataformas vacia que se generara aqui*/
                prop.width = this.objPlatInicial.width
                prop.height = this.objPlatInicial.height
                /*Propiedad importante para despues diferenciar a los objs que enves de pintar texto pintaran 
                una platafroma vacia*/

                prop.img = true
                this.ctx.drawImage(this.platVacia, prop.x, prop.y, prop.width, prop.height)
            }
            else {
                //No econtro una cadena similar a una parte de la oracion descompuesta
                this.ctx.font = "35px Roboto";
                this.ctx.fillStyle = "white"
                this.ctx.fillText(prop.oracion, prop.x, prop.y);
            }


        }
        this.ctx.restore()
    }

    CrearObjCadenas() {
        
        let acumPosX = 10
        let masPos=0
        for (const i in this.cadenas) {

            //Clico para centrar texto en la plataforma 
            //Basandonos en el numero maximo de letras que puede tener una palabra(17)
            for (let p = 17; p > 0; p--) 
            {
                if (this.cadenas[i].length == p) {
                    p = -1
                }
                else {
                    //El valor a sumar es diferente dependiendo de la resolucion de la pantalla
                    acumPosX += (window.screen.width < 769) ?4.4:3
                }
            }
            //Se mide pantalla del dipositivo para saber en donde pintar las plataformas
            if (window.screen.width < 769) 
            {
                this.NuevoObj(83,masPos,this.canvas.height,60,i,acumPosX,this.objPlatInicial.width,this.objPlatInicial.height)
                masPos += 215
            }
            else{
                if (window.screen.width > 768) 
                {
                    masPos += 120
                    this.NuevoObj(this.canvas.width,-(this.cajaObj.width-25),0,masPos,i,acumPosX,this.objPlatInicial.width,this.objPlatInicial.height)
                }
            }

           
            acumPosX = 10

        }
        console.log("PROPCADENAS: ",this.propCadenas)
        console.log("POSICIONES: ",this.cadPosiciones)
       
    }

    NuevoObj(valXIn,valXFin,valYIn,valYFin,i,acumPosX,ancho, alto)
    {
        this.propCadenas.push({
            x: valXIn + valXFin,
            y: (window.screen.width > 768)? valYIn + valYFin:valYIn - valYFin,
            width: ancho,
            height: alto,
            text: this.cadenas[i],
            atrapado: false,
            //propieda para saber con que detectar la colision, si con la caja o los inputs
            usado: false,
            posXTexto: acumPosX
        })

        //Se almacena las posiciones en la caja para cada pltaforma
        this.cadPosiciones.push({
            x: valXIn + valXFin,
            y: (window.screen.width > 768)? valYIn + valYFin:valYIn - valYFin
        })
    }

    DibujarCadenas() {
        let cadSinEspacio = "";
        this.ctx.save()
        for (const i in this.propCadenas) {
            var cadProp = this.propCadenas[i]

            this.ctx.drawImage(this.plataforma, cadProp.x, cadProp.y, cadProp.width, cadProp.height)
            this.ctx.font = "25px Roboto";
            this.ctx.fillStyle = "#7D7D7D";
            this.ctx.fillText(cadProp.text, cadProp.x + cadProp.posXTexto, cadProp.y + (cadProp.height / 1.3));
        }
        this.ctx.restore()
    }

    DibujarPuntero() {
        this.ctx.save()
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.puntero.x, this.puntero.y, this.puntero.width, this.puntero.height)
        this.ctx.restore()
    }

    ColVacia_Plataforma() 
    {


        //Esto solo se ejecutara cuando el usuarion haya clikeado alguna plataforma
        if (this.posAtrapado != null && this.colVacias == true) {
            //Se recorren a los objetos de las partes de la oracion pintada en el canvas
            for (const i in this.propOraciones) {
                var objOracion = this.propOraciones[i]

                /*Para optimizar el juego solo verificaremos colision con aquelos obj que sabemos que enves 
                de cadena tienen una plataforma vacia*/
                if (objOracion.img && objOracion.usada != true) {
                    //Verifica colision de la plataforma con las plataformas vacias
                    if (this.props.Colisiones(this.propCadenas[this.posAtrapado], objOracion)) {

                        //Ya no seguira la posicion del cursor
                        this.propCadenas[this.posAtrapado].atrapado = false

                        //La plataforma se coloca en la misma posicion en la que estaba la plataforma vacia
                        this.propCadenas[this.posAtrapado].x = objOracion.x
                        this.propCadenas[this.posAtrapado].y = objOracion.y


                        //Para que ya no se ejecute esta funcion hasta seleccionar otra plataforma
                        this.posAtrapado = null

                        /*Para que no se haga colision con las plataformas vacias que ya tienen una plataforma
                        enciam*/
                        objOracion.usada = true

                    }
                }
            }
        }
        if(window.screen.width <769)
        {
            /*Detecta colision con la caja para devolver la plataforma a su posicion original,*/
            if ((this.posAtrapado != null && this.propCadenas[this.posAtrapado].y < (this.canvas.height - this.cajaObj.height - this.propCadenas[this.posAtrapado].height - 60)) || this.colCaja)
            {
                this.colCaja = true
                if (this.props.Colisiones(this.propCadenas[this.posAtrapado], this.cajaObj)) {
                    //Se la asigna a la pltafoirma la posicion que tenia en la caja
                    this.propCadenas[this.posAtrapado].x = this.cadPosiciones[this.posAtrapado].x
                    this.propCadenas[this.posAtrapado].y = this.cadPosiciones[this.posAtrapado].y
                    this.propCadenas[this.posAtrapado].atrapado = false

                    this.colCaja = false
                    this.posAtrapado = null
                }
            }
        }
        else{
            /*Detecta colision con la caja para devolver la plataforma a su posicion original,*/
            if ((this.posAtrapado != null && this.propCadenas[this.posAtrapado].x < (this.canvas.width- this.cajaObj.width - this.propCadenas[this.posAtrapado].width - 60)) || this.colCaja)
            {
                
                this.colCaja = true
                if (this.props.Colisiones(this.propCadenas[this.posAtrapado], this.cajaObj)) {
                    console.log("COLISION")
                    //Se la asigna a la pltafoirma la posicion que tenia en la caja
                    console.log(this.propCadenas)
                    this.propCadenas[this.posAtrapado].x = this.cadPosiciones[this.posAtrapado].x
                    this.propCadenas[this.posAtrapado].y = this.cadPosiciones[this.posAtrapado].y
                    this.propCadenas[this.posAtrapado].atrapado = false

                    this.colCaja = false
                    this.posAtrapado = null
                }
            }
        }
        
    }

    DibujarAlien() {
        this.ctx.save()
        this.ctx.drawImage(this.alien, this.objPlayer.x, this.objPlayer.y, this.objPlayer.width, this.objPlayer.height)

        //Cuando ya hallasmo contestado una oracion la plataforma se oculta

        if (this.objPlatInicial.hidde != true) {
            this.ctx.drawImage(this.plataforma, this.objPlatInicial.x, this.objPlatInicial.y, this.objPlatInicial.width, this.objPlatInicial.height)
        }


        this.ctx.restore()
    }

    SaltarAlien() {
        //Se cumple cuando el usuario pe¿resiona f y comienza a hacer que el player salte
        if (this.saltar) {
            // Verificamos si la posicion actual del player es MAYOR a la posicion de la plataforma a la que saltara
            if (this.posPlayer > this.objPlatSaltar[this.contPlat].x + this.objPlatSaltar[this.contPlat].width) {

                this.DefinirMovimiento(-1)
            }
            else {
                //MENOR
                if (this.posPlayer < this.objPlatSaltar[this.contPlat].x) {
                    this.DefinirMovimiento(+1)
                }
                else {
                    //IGUAL

                    if (this.posPlayer > this.objPlatSaltar[this.contPlat].x && this.posPlayer < this.objPlatSaltar[this.contPlat].x + this.objPlatSaltar[this.contPlat].width) {

                        this.DefinirMovimiento(0)
                    }
                }
            }

        }
    }

    //Funcion que calcula un punto dependiendo de a que plaforma tiene que saltar el personaje
    DefinirMovimiento(signo) {
        let puntoSalto = 0
        var ope = 0
        //Verifica si la siguiente plataforma a la que hay que saltar tiene la misma posicion en y
        if (this.posYantes == this.objPlatSaltar[this.contPlat].y) {
            /*Si la plataforma en la que el player esta parado tiene la misma posicion que la plafarma 
            a la que hay que saltar entonces se calcula un punto medio entre las dos al que hay que 
            llegar*/
            puntoSalto = {
                x: (this.objPlatSaltar[this.contPlat - 1].x + this.objPlatSaltar[this.contPlat - 1].width + this.objPlatSaltar[this.contPlat].x) / 2,
                y: this.objPlatSaltar[this.contPlat].y - (this.objPlatSaltar[this.contPlat].height * 3)
            }
        }
        else {
            //En caso de tener posiciones en Y diferentes se calcula un punto al borde de la plataforma
            puntoSalto = {
                x: this.objPlatSaltar[this.contPlat].x + this.objPlatSaltar[this.contPlat].width,
                y: this.objPlatSaltar[this.contPlat].y - (this.objPlatSaltar[this.contPlat].height * 2)
            }

        }

        //Variables para ver visiblemente el punto creado en el canvas(BORRAR CUANDO TERMINE EL TESTEO)
        this.limY = puntoSalto.y
        this.limX = puntoSalto.x


        /*Cuando el player este por debajo de punto que se calculo encima de la platafporma a la que hay 
        que saltar, ira hacia arriba*/
        if (this.objPlayer.y > puntoSalto.y && this.touchPunto == false) {
            this.objPlayer.y -= 2
            //Condicional para que cuando el player este debajo de un plataforma no se sume nada en x 
            if (signo != 0) {
                ope = ((puntoSalto.x * 2) / puntoSalto.y) * signo
                this.objPlayer.x += ope
            }
            else {
                this.objPlayer.x += 0
            }
        }
        else {
            this.touchPunto = true
            /*Cuando el player llegue punto que se calculo encima de la platafporma a la que hay 
             que saltar, entonces el player baja a la plataforma*/
            if (this.objPlayer.y < this.objPlatSaltar[this.contPlat].y - this.objPlayer.height) {

                this.objPlayer.y += 2
                if (signo != 0) {
                    ope = ((puntoSalto.x * 2) / puntoSalto.y) * signo
                    this.objPlayer.x += ope
                }
                else {
                    this.objPlayer.x += 0
                }
            }
            else {
                /*Una vez que que el player este encima de la plataforma a la que habia que saltar 
                entonces se califica*/
                this.CalificarPlataforma()
            }
        }
    }




    CalificarPlataforma() {
        let posArrayOriginal = null
        /*Se almacena la posicion en "y" de la plataforma a la que llego el player, para comparar su posiscion en "y" 
        con la siguiente plataforma a la que haya que saltar*/
        this.posYantes = this.objPlatSaltar[this.contPlat].y


        /*Para poder chechar la colision de la plataforma a la que llego el alien
        con la plataforma vacia que se encuentra debajo de ella se necesita el objeto 
        original en "propCadenas" y no la posicion que se copio en "objPlatSaltar"*/
        //Se obtiene la posicion del objeto original
        posArrayOriginal = this.propCadenas.findIndex(c => c.text == this.objPlatSaltar[this.contPlat].text)

        //Se recorre a las partes de la oracion
        for (const i in this.propOraciones) {

            var parte = this.propOraciones[i]

            //Se verifica colision de las plataformas vacias con la plataforma a la que llego el alien
            if (this.props.Colisiones(parte, this.propCadenas[posArrayOriginal])) {
                //Verificamos si los textos de las propiedades coinciden o no
                if (parte.oracion + " " == this.propCadenas[posArrayOriginal].text) {
                    console.log("Respuesta correcta")
                    //Se itera contador para saltar a la siguinete plataforma
                    this.contPlat++
                    this.score++
                    this.soundCorrecta.play()
                    this.setState({ score: this.state.score + 1 })

                    /*Si el contador no es igual a la longitud del arreglo que contiene a la plaformas puestas
                    en la oracion*, entonces el player tendra que seguir salatando a las pltaformas restantes*/
                    if (this.contPlat != this.objPlatSaltar.length) {
                        //Seguir saltando en las misma oracion

                        this.touchPunto = false
                        this.posPlayer = this.objPlayer.x

                        /*Se detiene el intervalo que ejecuta a la funcion "Update" para que el alien no salte seguido 
                        de una plataforma a otra y haya una pequeña pausa y esto solomante pasara cuando haya dos
                        platafromas en la oaracion*/

                        clearInterval(this.intervalo)
                        this.califIntervalo = window.setInterval(() => {
                            this.intervalo = window.setInterval(() => { this.Update() }, 1000 / 55)
                            clearInterval(this.califIntervalo)
                        }, 2000)

                    }
                    else {
                        //Bajar otra oracion
                        // this.saltar = false
                        this.objPlayer.movido = true
                        //this.objPlatSaltar= null

                        //La plataforma incial obtiene la posiucion de la ultima plataforma eb la que estuvi el alien
                        this.objPlatInicial.x = this.propCadenas[posArrayOriginal].x
                        this.objPlatInicial.y = this.propCadenas[posArrayOriginal].y
                        this.EstadoJuego()
                    }
                }
                else {
                    this.sumarOracionCorrecta = false
                    this.saltar = false
                    this.objPlayer.movido = true
                    this.objPlatInicial.hidde = true
                    this.setState({ incorrectas: this.state.incorrectas + 1 })
                    console.log("Respuesta incorrecta")
                    this.soundIncorrecta.play()
                    this.EstadoJuego()
                }
            }

        }
    }

    BajarPlayer() 
    {
        var limBajar = (window.screen.width < 769)? this.canvas.height - 205:this.canvas.height - this.objPlatInicial.height-this.objPlayer.height-5
        if (this.objPlayer.movido) 
        {
            this.objPlayer.y += 1
            this.objPlatInicial.y += 1

            if (this.objPlayer.y > limBajar) {
                this.objPlayer.movido = false
                /*Esta codicional se cumple cuando la respuesta es incorrecta ya que se oculta la plataforma
                incial para hacer que el alien caiga hacia abajo*/
                if (this.objPlatInicial.hidde == true) {
                    /*Se vuelve a mostrar la plataforma incial, ademas de que esto funcionara para 
                    que al contestar corrctamente no se inicialize el juego*/

                    //Cuando el player haya terminado de caer se etablece su posicion original
                    if(window.screen.width <769)
                    {
                        this.objPlatInicial = { x: 85, y: this.canvas.height - 170, width: 195, height: 35, hidde: false }
                        this.objPlayer = { x: this.objPlatInicial.x + (this.objPlatInicial.width / 3), y: this.objPlatInicial.y - 55, width: 50, height: 55, movido: false }
                    }
                    else
                    {
                        this.objPlatInicial = { x: 40, y: this.canvas.height -35, width: 150, height: 35, hidde: false }
                        this.objPlayer = { x: this.objPlatInicial.x + (this.objPlatInicial.width) / 3, y: this.objPlatInicial.y - 65, width: 80, height: 65, movido: false }
                    }
                    

                    this.EstadoJuego()
                }
            }
        }
    }


    BajarOracion(lim) {
        /*Condicional para optimizar y que solo ejecute el for mientras que las partes de la oracion  
        tengan un valor menor en "y" al de la mitad de la altura del canvas*/
        if (this.propOraciones[0].y < lim) {
            for (const i in this.propOraciones) {
                var ora = this.propOraciones[i]

                ora.y++

            }
        }

    }

    EstadoJuego() {
        let seguir = []

        /*Se hace una copia para poder extraer la plataforma en la que se quedara parado el alien
        despues de que se borre la oracion y se genere la nueva*/

        this.saltar = false
        this.objPlatSaltar = null
        this.oraciones[this.numOracion] = ""
        this.propCadenas = []
        this.propOraciones = []
        this.contPlat = 0
        this.touchPunto = false
        this.posYantes = 0

        //Se valida si la oracion fue llenada correctamente antes de generra la siguiente
        if(this.sumarOracionCorrecta){
            this.contOracionCorrecta++
        }

        this.sumarOracionCorrecta = true
        //Verificamos si todvia hay oraciones para contestar
        seguir = this.oraciones.filter(e => e != "")
        if (seguir.length != 0) {
            this.restarPositionObjGame()
            this.IniciarJuego()
        }
        else {
            this.JuegoTerminado()
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

    JuegoTerminado(){
        clearInterval(this.intervalo)
        clearInterval(this.tiempo)
        let calif = (this.contOracionCorrecta * 10) / this.numOraciones
        calif = calif.toFixed(1)

       // this.props.TareaFinalizada(this.props.idTarea, calif)
        console.log("SE ACABO EL JUEGO")
        this.activarWindowGameOVer(calif)

        console.log(`ORACCCIONES CORRECTAS: ${this.contOracionCorrecta}`)

        this.playFinalSound(calif)
        this.verificarModalidadGame(calif)
    }

    playFinalSound(calif){
        if(calif>5){
            this.soundPassGame.play()
        }
        else{
            this.soundFailGame.play()
        }
    }
}
