import React, { Component } from 'react'
import Header from './Header.js';
import footer from '../img/Menu/footer.svg';
import control from '../img/control.svg'
//import firebase, {storage} from 'firebase'
import Derecha from '../img/Derecha.svg'
import Izq from '../img/Izq.svg'
import alienGame1 from '../img/Instrucciones/AlienGame1.gif'
import alienGame2 from '../img/Instrucciones/AlienGame2.gif'
import alienGame3 from '../img/Instrucciones/AlienGame3.gif'
import alienGame4 from '../img/Instrucciones/AlienGame4.gif'
import platGame1 from '../img/Instrucciones/PlataformasGame1.gif'
import platGame2 from '../img/Instrucciones/PlataformasGame2.gif'
import platGame3 from '../img/Instrucciones/PlataformasGame3.gif'
import platGame4 from '../img/Instrucciones/PlataformasGame4.gif'
import platGame5 from '../img/Instrucciones/PlataformasGame5.gif'
import platGame6 from '../img/Instrucciones/PlataformasGame6.gif'
import platGame7 from '../img/Instrucciones/PlataformasGame7.gif'
import numerosGame1 from '../img/Instrucciones/NumerosGame1.gif'
import numerosGame2 from '../img/Instrucciones/NumerosGame2.gif'
import numerosGame3 from '../img/Instrucciones/NumerosGame3.gif'
import numerosGame4 from '../img/Instrucciones/NumerosGame4.gif'



export default class Instrucciones extends Component {

    componentDidMount()
    {
        if(this.props.tipo=="Conjuntos")
        {
            this.imagenes=[alienGame1,alienGame2,alienGame3,alienGame4]
            this.instrucciones=[
                "Aliens aparecen cada cierto tiempo, saliendo de los portales",
                "Apresurarte a atraparlos porque los aliensexplotan, si esto sucede pierdes el juego",
                "Cuando atrapes uno arrástralo a la caja correcta,si te equivocas explotan y perderas el juego",
                "Ganaras el juego cuando todos aliens estén atrapados en las cajas"]
        }
        else {
            if (this.props.tipo=="Plataformas") 
            {
                this.imagenes=[platGame1,platGame2,platGame3,platGame4,platGame5,platGame6,platGame7]
                this.instrucciones=[
                    "Ayuda al duendecillo a escalar para llegar a la cima donde se encuentra su oro",
                    "El juego inicia cuando baja una oración con un espacio para colocar una plataforma",
                    "En la parte inferior de la pantalla se encuentran las plataformas con las palabras para completar la oracion",
                    "Para colocar un plataforma en el espacio de la oracion solo arrastra la plataforma",
                    "Presiona al duendecillo para que salte a la plataforma que pusiste en el espacio vacio",
                    "Cuando el duendecillo llegue a la plataforma se calificara tu respuesta que pusiste en la oracion",
                    "Ganaras el juego si consigues que el duendecillo llegue a la cima"
                    ]
            }
            else{
                if (this.props.tipo=="Numeros") 
                {
                    this.imagenes=[numerosGame1,numerosGame2,numerosGame3,numerosGame4]
                    this.instrucciones=[
                        "Resuelve las operaciones que aparecen en pantalla",
                        "Para cada operación se generan 3 respuestas que se mueven hacia abajo, de las cuales solo una es la correcta",
                        "Escoge la respuesta que creas correcta presionando el botón adecuado",
                        "Contesta correctamente o de lo contrario perderás vidas y podrías perder el juego"
                    ]
                }
            }
        }
       

        this.setState({contImage:0})
    }

    constructor()
    {
        super()
        this.imagenes=[]
        this.instrucciones=[]
        this.state={
            contImage:null
        }
    
        //this.ConsultarImagen()
        

    }

    render() {
        return (
            <div className="InstruccionesApp">
                
                <Header funcionamiento="noLink"></Header>
       
                
                <div  className="modulo">
                    <div className="modulo-parte-top">
                        <img className="modulo-parte-top__icon" src={control}></img>
                  
                        <p className="modulo-parte-top__titulo">¿Como jugar?</p>
                        <p className="modulo-parte-top__desc">{this.instrucciones[this.state.contImage]}</p>
                        
                    </div>
                    
                    
                    <div className="modulo-parte-down">
                        <img src={this.imagenes[this.state.contImage]} className="modulo-parte-down_animGame" id="Alien"></img>
                        <button className="buttons buttons--instruc" onClick={()=>{

                            if(this.imagenes.length==0){
                                this.props.TermineLeer()
                            }

                           this.setState({contImage:this.state.contImage+1},()=>{
                            if(this.state.contImage ==  this.imagenes.length)
                            {
                                console.log("SE ACABARON LAS INSTRUCCIONES")
                                this.props.TermineLeer()
                            } 
                            })
                          
                            }}>Entiendo</button>
                    </div>
                    

                </div>

                <img className="fondo-figuras fondo-figuras--der" src={Derecha}></img>
                <img className="fondo-figuras fondo-figuras--izq" src={Izq}></img>
                <footer className="footer-menu">
                    <img className="footer-menu__fondo" src={footer}></img>
                    
                </footer>
            </div>
            
        )
    }

/*     ConsultarImagen()
    {
        var storage = firebase.storage();
        var storageRef = storage.ref();

            storageRef.child(`Aliens/${this.contImage}.gif`).getDownloadURL().then(function(url) {

           
                var img = document.getElementById('Alien');
                img.src = url;
                img.onload = () => {console.log("Cargo Imagen")}
                console.log(url)
              }).catch(function(error) 
              {
                
              });
    } */
}
