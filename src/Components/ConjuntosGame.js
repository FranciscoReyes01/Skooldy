import React, { Component } from 'react'
import Caja from '../Imagenes/Caja.png';
import Fondo from '../Imagenes/FondoConjuntos.png'
import Header from './Header.js';
import ContentInst from './ContentInst';
import CajaMovil from '../img/Conjuntos/Plataforma_movil.svg';
import Window from './Window.js'
import alienGame1 from '../img/Instrucciones/AlienGame1.gif'
import alienGame2 from '../img/Instrucciones/AlienGame2.gif'
import alienGame3 from '../img/Instrucciones/AlienGame3.gif'
import alienGame4 from '../img/Instrucciones/AlienGame4.gif'
import Derecha from '../img/Derecha.svg'
import Izq from '../img/Izq.svg'
import footer from '../img/Menu/footer.svg';
import musica from '../img/AlienGame/Sonidos/AlienGame.mp3'
import soundCorrecta from '../Sonidos/Correcta.mp3'
import soundIncorrecta from '../Sonidos/Incorrecta.mp3'
import soundFailGame from '../Sonidos/FailGame.mp3'
import soundPassGame from '../Sonidos/PassGame.mp3'
import AlienWalk1 from '../img/AlienGame/Walk1.png';
import AlienWalk2 from '../img/AlienGame/Walk2.png';
import AlienWalk3 from '../img/AlienGame/Walk3.png';
import AlienWalk4 from '../img/AlienGame/Walk4.png';
import AlienWalk5 from '../img/AlienGame/Walk5.png';
import AlienWalk6 from '../img/AlienGame/Walk6.png';
import AlienWalk7 from '../img/AlienGame/Walk7.png';
import AlienWalk8 from '../img/AlienGame/Walk8.png';
import AlienWalk9 from '../img/AlienGame/Walk9.png';
import AlienWalk10 from '../img/AlienGame/Walk10.png';
import AlienExplotar from '../img/AlienGame/Explotar/Explotar1.png'
import AlienExplotar2 from '../img/AlienGame/Explotar/Explotar2.png'
import AlienExplotar3 from '../img/AlienGame/Explotar/Explotar3.png'
import AlienExplotar4 from '../img/AlienGame/Explotar/Explotar4.png'
import AlienExplotar5 from '../img/AlienGame/Explotar/Explotar5.png'
import AlienExplotar6 from '../img/AlienGame/Explotar/Explotar6.png'
import AlienExplotar7 from '../img/AlienGame/Explotar/Explotar7.png'
import AlienExplotar8 from '../img/AlienGame/Explotar/Explotar8.png'
import AlienExplotar9 from '../img/AlienGame/Explotar/Explotar9.png'
import AlienExplotar10 from '../img/AlienGame/Explotar/Explotar10.png'
import AlienExplotar11 from '../img/AlienGame/Explotar/Explotar11.png'
import AlienExplotar12 from '../img/AlienGame/Explotar/Explotar12.png'
import AlienExplotar13 from '../img/AlienGame/Explotar/Explotar13.png'
import AlienExplotar14 from '../img/AlienGame/Explotar/Explotar14.png'
import AlienExplotar15 from '../img/AlienGame/Explotar/Explotar15.png'
import AlienExplotar16 from '../img/AlienGame/Explotar/Explotar16.png'
import WindowGameOver from './WindowGameOver.js'





export default class ConjuntosGame extends Component {

    componentDidMount() {
        

        //Se inicializa el canvas y su contexto
        this.canvas = document.getElementById("game")
        this.ctx = this.canvas.getContext('2d')

        this.animImg = [AlienWalk1, AlienWalk2, AlienWalk3, AlienWalk4, AlienWalk5, AlienWalk6, AlienWalk7, AlienWalk8, AlienWalk9, AlienWalk10]
        this.CargarAnimaciones(this.animImg, this.fotogramasWalk)
        this.animImg = [AlienExplotar, AlienExplotar2, AlienExplotar3, AlienExplotar4, AlienExplotar5, AlienExplotar6, AlienExplotar7, AlienExplotar8, AlienExplotar9, AlienExplotar10, AlienExplotar11, AlienExplotar12, AlienExplotar13, AlienExplotar14, AlienExplotar15, AlienExplotar16]
        this.CargarAnimaciones(this.animImg, this.fotogramasBoom)

        //Funcion que inicializa objetos
        this.CrearEscena("cajas")
        this.CrearEscena("aliens")
        this.cantAliens = this.ObjAliens.length



        /*Timer que se ejecuta cada cierto tiempo para cambiar el valor numerico de la varible "apuntadorAnim" y asi
        poder dibujar en el canvas otra imagen del alien caminando*/
        this.intervalAnim = window.setInterval(() => {
            this.apuntadorAnimWalk++
            //condicional para controlar la animcacionde caminar y asi poder reiniciarla cuando se haya alcanzado el fotogramas final
            if (this.apuntadorAnimWalk > (this.fotogramasWalk.length - 1)) 
            {
                this.apuntadorAnimWalk=0
            }


            //Solo se cumple esta condicional cuando un alien a agotado su vida o cuando este ha sido metido a la caja incorrecta 
            if(this.alienBoom != null)
            {
                this.apuntadorAnimBoom++
                if(this.apuntadorAnimBoom > (this.fotogramasBoom.length-1))
                {
                    this.JuegoTerminado(this.alienBoom)
                }
            }
            



        }, 250)


        if (window.screen.width < 769) {
            this.IniciarJuego()
        }

        //Se activa cuando se hace click
        document.addEventListener("mousedown", click => {

            if (this.alienBoom == null) {
                for (const i in this.aliensSacados) {

                    var alien = this.aliensSacados[i]

                    /*Cada que se hace click se revisa si puntero ha colisionado con alguno de los aliens*/
                    if (this.props.Colisiones(this.puntero, alien)) {
                        //Condicional para validar que solo podamos atrapar a los aliens que no han sido atrapados
                        if (alien.atrapado == false) {
                            console.log("ATRAPASTE")
                            /*Se cambia la direccion para que la funcion "MoverEnemigos" no lo mueva mas y asi no sea
                            dificil manipularlo,ademas de que con este nuevo valor podra ser arrastrado por todo el canvas*/
                            alien.direccion = "noMover"


                            break
                        }

                    }
                }
            }


            console.log(this.aliensSacados)

        })


        //Se activa cuando se mueve el cursor
        document.addEventListener("mousemove", flecha => {
            //Cada que se mueva el puntero la posicion de este se le asigna a el obj "puntero"

            if (this.alienBoom == null) {


                this.puntero.x = flecha.clientX
                this.puntero.y = flecha.clientY

                let posAlien = -1

                /*Es necesario el "try" ya que de un inicio "aliensSacados" no tiene ningun obj de aliens almacenado,
                hasta despues de 3 seg cuando se ejecuta el intervlo "intervaloCrear"*/
                try {
                    //Se busca si hicimos click sobre algun alien
                    //"findIndex" devuelve la posicion en la cual se encuentre el obj si no lo encuentra devuelve -1
                    posAlien = this.aliensSacados.findIndex(e => e.direccion == "noMover")


                    if (posAlien != - 1) {
                        // console.log("Ejucutando")

                        /*El alien clickeado en "mousedown" seguira la posicion del cursor y ya no se movera a 
                        voluntad propia*/
                        this.aliensSacados[posAlien].x = flecha.clientX
                        this.aliensSacados[posAlien].y = flecha.clientY

                        //Despues de mover el alien se verificara si tuvo colision o no con aluguna de las  2 cajas
                        for (const c in this.ObjCajas) {
                            var caja = this.ObjCajas[c]

                            if (this.props.Colisiones(this.aliensSacados[posAlien], caja)) {
                                /*Si hubo colision entonces ahora verificamos si el alien colisino con la caja a
                                 la que pertenecia*/

                                if (caja.tipo == this.aliensSacados[posAlien].tipo) {
                                    
                                    /*De acuerdo a la caja donde se haya metido el alien se acumulan puntos para esa
                                     caja*/
                                    (caja.tipo == "caja1") ? this.atrapadosCaja1++ : this.atrapadosCaja2++
                                    console.log(caja.tipo)
                                    console.log("CONT:", this.atrapadosCaja1)
                                    /*La direccion se vuelve a "" para que  "DecidirDireccion" pueda darle una direccion
                                    y asi se mueva otra vez el alien por si solo*/
                                    this.aliensSacados[posAlien].direccion = ""

                                    /*"atrapado" sera la propiedad que ayude a que la posicion del alien este restringida
                                    a la caja en la que fue metido en "MoverEnemigos"*/
                                    this.aliensSacados[posAlien].atrapado = true

                                    this.soundCorrecta.play()
                                    
                                    
                
                                    this.validarJuegoTerminado()
                                    break
                                }
                                else {
                                    this.soundIncorrecta.play()
                                    //Variable global que almacena el valor del alien que tendra que explotar
                                    this.alienBoom = posAlien
                                    
                                }
                            }
                        }
                    }
                }
                catch (error) {

                }
            }


        })


    }


    validarJuegoTerminado(){

        var totalAliensCapturados = this.atrapadosCaja1 + this.atrapadosCaja2

        if(totalAliensCapturados == this.cantAliens){
            this.JuegoTerminado(this.alienBoom)
        }

    }

    constructor() {
        super()
        /*Variables que contendran las instancias de Image() para poder almacenar las imagenes de las animaciones y reproducirlas en el 
        canvas*/
        this.fotogramasWalk = []
        this.fotogramasBoom = []
        this.ctx = null
        this.alienBoom = null
        this.canvas = null
        this.intervalo = null
        this.cambiarDir = null
        this.intervaloCrear = null
        this.box = new Image()
        this.box.src = Caja
        this.boxMovil = new Image()
        this.boxMovil.src = CajaMovil
        this.fondo = new Image()
        this.fondo.src = Fondo
        //variable que se ejecuta cada cierto tiempo para cambir de fotograma las animaciones
        this.intervalAnim = null
        //variables para controlar los fotogramas o imagenes de cada animacion
        this.apuntadorAnimWalk = 0
        this.apuntadorAnimBoom=0

        this.ObjCajas = []
        this.ObjAliens = []
        this.aliensSacados = []
        //Obj para poder atrapar a los aliens, ya que fue imposible hacerlo concel cursor normal
        this.puntero = { x: 0, y: 0, width: 20, height: 20 }
        this.cantAliens = 0
        this.atrapadosCaja1 = 0
        this.atrapadosCaja2 = 0
        this.imagenes = [alienGame1, alienGame2, alienGame3, alienGame4]
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
        this.instrucciones = [
            "Aliens aparecen cada cierto tiempo, saliendo de los portales",
            "Apresurarte a atraparlos porque los aliensexplotan, si esto sucede pierdes el juego",
            "Cuando atrapes uno arrástralo a la caja correcta,si te equivocas explotan y perderas el juego",
            "Ganaras el juego cuando todos aliens estén atrapados en las cajas"]


        //Tiempo en el que los aliens apareceran
        this.tiempo = 3000
        this.velAliens = 2

        this.state = {
            estJuego: true,
            estWindowGameOver:"none",
            titulo:"",
            total:"",
            correctas:"",
            calif:""

        }


    }

    CargarAnimaciones(arrayImg, varFotogramas) {
        for (let i = 0; i < arrayImg.length; i++) {
            varFotogramas[i] = new Image()
            varFotogramas[i].src = arrayImg[i]

        }
    }

    render() {
        return (
            <div>


                <Header funcionamiento="noLink"></Header>


                <div className="modulo modulo--juegos-movil">

                    <div className="area-juego area-juego--conjuntos">
                        <canvas className="juegoScene--conjuntos" style={{ cursor: "none" }} id="game" width="800" height="500"></canvas>
                    </div>
                    <ContentInst clase={null} tema={null} inst={null}></ContentInst>
                </div>

                <Window CloseIns={this.props.CloseIns} windowIns={this.props.windowIns} IniciarJuego={this.IniciarJuego} instrucciones={this.instrucciones} imagenes={this.imagenes} titulo={"Conjuntos"} layout={"instrucciones"}></Window>

                <img style={{ zIndex: 400 }} className="fondo-figuras fondo-figuras--der fondo-figuras--juego" src={Derecha}></img>
                <img style={{ zIndex: 400 }} className="fondo-figuras fondo-figuras--izq fondo-figuras--juego" src={Izq}></img>


                <footer className="footer-menu footer-menu--juegos-movil">
                    <img className="footer-menu__fondo" src={footer}></img>
                </footer>

                <WindowGameOver juegoLibre={this.props.juegoLibre} estWindowGameOver={this.state.estWindowGameOver} titulo={this.state.titulo} total={this.state.total} correctas={this.state.correctas} setScrollFunction={this.props.setScrollFunction} calif = {this.state.calif}></WindowGameOver>

            </div>
        )
    }

    Update() {
        try {
            /*Cuando un alien ya no tiene vida o ha sido colocado en la caja incorrecta "alienBoom" almacena la posicion del alien
            que va a explotar lo que significa que los demas aliens ya no se pueden mover*/
            if (this.alienBoom == null) {
                if (window.screen.width > 769) {
                    this.props.MoverEnemigos(this.aliensSacados, this.velAliens, (this.canvas.width - this.ObjCajas[0].width), this.canvas.height, this.ObjCajas[0].width, 5)
                }
                else {
                    this.props.MoverEnemigos(this.aliensSacados, this.velAliens, this.canvas.width, this.canvas.height - this.ObjCajas[0].height - 50, 0, this.ObjCajas[0].height + 25)
                }
            }

        }
        catch (error) {

        }

        //Dibuja el fondo del canvas
        this.ctx.save()
        this.ctx.drawImage(this.fondo, 0, 0, 800, 500)
        this.ctx.restore()

        this.DibujarCajas()
        this.DibujarAliens()
        this.DibujarScore(this.atrapadosCaja1, 345, 25)
        this.DibujarScore(this.atrapadosCaja2, 345, this.canvas.height - 15)
        this.DibujarPuntero()

    }

    DibujarScore(score, posX, posY) {
        this.ctx.save()
        this.ctx.font = "bold 20px Roboto, sans-serif";
        this.ctx.fillStyle = "#C371F9";
        this.ctx.fillText(`Atrapados: ${score}`, posX, posY)
        this.ctx.restore()
    }

    CrearEscena(instruc) {
        /*En caso de estar jugando con una pantalla de movil la caja aparaceria un poco mas abajo para 
        permitir pintar el score de la caja superior*/
        let masPos = (window.screen.width < 769) ? 35 : 0
        let acumPosX = 320

        //Recorre al objeto que tiene la informacion de la tarea de conjuntos
        Object.keys(this.props.tareaHacer).forEach(p => {
            //Condicional para extraer los valores de los nodos de las cajas
            if (p == "caja1" || p == "caja2") {
                /*Accedemos al nivel 2 de la jeraquia de objs ejemplo: caja 1:{
                    amimales:  <---
                    {

                    }
                }*/
                Object.keys(this.props.tareaHacer[p]).forEach(t => {

                    /*Condicional para saber que es lo que hay que crear, es importante diferenciar, ya que 
                    para las cajas solo se necesita el dato del nombre de la caja que realmente es "t"*/
                    if (instruc == "cajas") {
                        if (window.screen.width < 769) {
                            /*Calcula un numero en base a el numero de letras de la palabra del nombre de la caja,
                            este numero posicionara a la palabra enmedio de la caja*/
                            for (let p = 17; p > 0; p--) {
                                if (t.length == p) {
                                    p = -1
                                }
                                else {
                                    //El valor a sumar es diferente dependiendo de la resolucion de la pantalla
                                    acumPosX += 4
                                }
                            }

                            this.ObjCajas.push({
                                //Para dispositivos moviles las cajas se pintaran desde el borede izquierdo del canvas
                                x: 0,
                                /*La posicipn en "y" sera en 0 para primera caja, y en el limite inferior del canvas
                                para la segunda*/
                                y: masPos,
                                width: this.canvas.width,
                                height: 100,
                                //"p" es el tipo de caja / caja1 o caja2 
                                tipo: p,
                                //"t" nombre de caja
                                text: t,
                                posXTexto: acumPosX

                            })
                            if (window.screen.width > 769) {
                                masPos += this.canvas.height - 100
                            }
                            else {
                                masPos += this.canvas.height - 173
                            }

                        }
                        else {
                            this.ObjCajas.push({
                                x: masPos,
                                y: 0,
                                width: 200,
                                height: 400,
                                //"p" es el tipo de caja / caja1 o caja2 
                                tipo: p,
                                //"t" nombre de caja
                                text: t

                            })
                            masPos += this.canvas.width - 200
                        }

                    }
                    else {
                        //En este punto se tienen que crear los aliens que contendran las cadenas para las cajas
                        //this.props.tareaHacer[caja1][Animales]
                        //Se recorren todas las cadenas almacenadas por cada caja en el arbol de datoS en JSON
                        Object.keys(this.props.tareaHacer[p][t]).forEach(w => {
                            //"w" posiciones en la BD
                            this.ObjAliens.push({
                                x: this.canvas.width / 2,
                                y: this.canvas.height / 2,
                                width: 50,
                                height: 55,
                                //Texto que cada alien debe de tener
                                //this.props.tareaHacer[caja1][Animales][0]
                                text: this.props.tareaHacer[p][t][w],
                                /*Tipo es una propiedad para saber a que caja pertenece 
                                cada alien*/
                                tipo: p,
                                atrapado: false,
                                vida: 30,

                                //Funcion que retorna un direccion de forma aleatoria
                                direccion: this.props.DecidirDireccion(),
                            })
                        })
                    }
                })

            }

        })

    }

    DibujarCajas() {
        //Se dibujan las cajas que siempre seran 2, y que fueron creadas en el "componentDidMount"
        for (const i in this.ObjCajas) {
            var caja = this.ObjCajas[i]
            this.ctx.save()
            this.ctx.drawImage((window.screen.width < 769) ? this.boxMovil : this.box, caja.x, caja.y, caja.width, caja.height)
            //Se pinta en el vanvas en la parte superior de la caja el nombre
            this.ctx.font = "20px Roboto, sans-serif";
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.fillText(caja.text, caja.x + 40,caja.y+25)


            this.ctx.restore()
        }
    }

    SacarAliens() {
        //Solo se cumple la condicion si hay elemntos que sacar todavia de "ObjAliens"
        if (this.ObjAliens.length != 0) {
            let num = Math.floor(Math.random() * ((this.ObjAliens.length) - 0) + 0)
            this.aliensSacados.push(this.ObjAliens[num])
            this.ObjAliens.splice(num, 1)
            //console.log("Sacados: ",this.aliensSacados)
        }
        else {
            /*En caso de que ya no haya elmentos que sacar se detiene el intervalo 
            que ejecutaba esta fucion para no seguir gastando recursos*/
            clearInterval(this.intervaloCrear)

        }

    }

    DibujarAliens() {
        /*Dibuja los aliens que ya hayan sido sacados del array "ObjAliens" que contiene 
        todos los aliens*/
        for (const i in this.aliensSacados) {
            var a = this.aliensSacados[i]

            //Condicinal para detectar si un alien debe explotar
            if (i == this.alienBoom) 
            {
                this.ctx.drawImage(this.fotogramasBoom[this.apuntadorAnimBoom], a.x, a.y, a.width, a.height)
            }
            else 
            {
                this.ctx.drawImage(this.fotogramasWalk[this.apuntadorAnimWalk], a.x, a.y, a.width, a.height)
            }



            this.ctx.save()

            //Se pinta la cadena de cada alien
            this.ctx.font = "20px Roboto, sans-serif";
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.fillText(a.text, a.x + 15, a.y + 70);
            this.ctx.restore()
        }
    }

    DibujarPuntero() {
        this.ctx.save()
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.puntero.x, this.puntero.y, this.puntero.width, this.puntero.height)
        this.ctx.restore()
    }


    MostrarResultados() {
        let cont = 0
        let pCajas = true

        if (this.state.estJuego == false) {
            return (

                <div>
                    <h2>Atrapados</h2>
                    {
                        this.ObjCajas.map(c => {
                            pCajas = true
                            cont = 0
                            return (
                                <div>
                                    {
                                        this.aliensSacados.map(a => {
                                            cont++
                                            console.log(c)
                                            console.log(a)
                                            if (a.atrapado == true && a.tipo == c.tipo) {
                                                console.log("Se cumplio")
                                                if (pCajas) {
                                                    pCajas = false
                                                    return (
                                                        <div>
                                                            <p>{c.text}</p>
                                                            <p>{cont}.-{a.text}</p>
                                                        </div>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <p>{cont}.-{a.text}</p>
                                                    )
                                                }
                                            }
                                        })

                                    }
                                </div>
                            )

                        })
                    }

                </div>
            )
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

    JuegoTerminado(pos) {
        let calif = 0
        this.aliensSacados.splice(pos, 1)
        this.setState({ estJuego: false })
        clearInterval(this.intervalo)
        clearInterval(this.intervaloCrear)
        clearInterval(this.cambiarDir)
        clearInterval(this.intervalAnim)


        var atrapados = this.atrapadosCaja1+this.atrapadosCaja2
        calif = (atrapados * 10) / this.cantAliens
        calif = calif.toFixed(1)

        console.log("Juego terminado")
        console.log("ID ALV: "+this.props.idTarea)

        this.playFinalSound(calif)
        //this.activarWindowGameOVer(calif)
        this.props.setScrollFunction("hidden")
        this.verificarModalidadGame(calif)
        //this.props.TareaFinalizada(this.props.idTarea, calif)
        
    }

    playFinalSound(calif){
        if(calif>5){
            this.soundPassGame.play()
        }
        else{
            this.soundFailGame.play()
        }
    }


    activarWindowGameOVer(tipoResultado,calif){
        this.setState({estWindowGameOver:"block",titulo:"Fin del juego",total:`Aliens totales: ${this.cantAliens}`,correctas:`Aliens atrapados: ${this.atrapadosCaja1+this.atrapadosCaja2}`,calif:`${tipoResultado} ${calif}`})
    }



    IniciarJuego = () => {
        this.musicaFondo.play()
        console.log("SE INICIO JUEGO ALIENS")
        //Intervalo que se encarga de pintar y mover cosas en el canvas
        this.intervalo = window.setInterval(() => { this.Update() }, 1000 / 55)

        /*Intervalo que va sacando de 1 por 1, aliens del array "ObjAliens" en el cual tiene
        a todos los aliens para el juego*/
        this.intervaloCrear = window.setInterval(() => { this.SacarAliens() }, this.tiempo)

        //Intervalo que cada cierto tiempo cambia la direccion de los aliens en el canvas
        this.cambiarDir = window.setInterval(() => {
            //Se recorre a los enemigos creados
            for (const i in this.aliensSacados) {
                var al = this.aliensSacados[i]
                if (al.atrapado == false) {
                    al.vida -= 3
                    if (al.vida <= 0) {
                        this.soundIncorrecta.play()
                        //Variable global que almacena el valor del alien que tendra que explotar
                        this.alienBoom = i
                    }
                }
                /*Cuando hayamos hecho click sobre un alien, es decir cuando lo hayamos 
                atrapado la direccion cambia a "noMover"*/
                al.direccion = (al.direccion == "noMover") ? "noMover" : this.props.DecidirDireccion()
            }
        }, 3000)


    }



}
