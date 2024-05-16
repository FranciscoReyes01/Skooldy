import React,{Component} from 'react'
import Formulario from './FormTareas.js';

export default class Sopa extends Component{
    constructor()
    {
        super()
        this.addPal =false
        this.letrasSel =0;
        this.palabra=""
        this.posLetras=[]
        this.vidas=""
        
        this.state={
            tablero:[[],[],[],[],[],[],[],[],[],[],[],[]], 
            posiciones:[],
            palabras:[],
            tiempo:0
            

        }
    }

    componentDidMount(){
        //SOPA
        const {tablero} = this.state
        this.props.CrearTablero(tablero,null)
        this.setState({tablero})
    }




    render()
    {
        return(
            <Formulario activarWindowMensaje= {this.props.activarWindowMensaje}  tiempo={this.state.tiempo} BotonesTiempo={this.BotonesTiempo} Clases={this.props.Clases} nombreJuego={"Sopa De Letras"} ImprimirTablero={this.props.ImprimirTablero} palabras={this.state.palabras} posiciones={this.state.posiciones} CrearTarea={this.props.CrearTarea} tipoJuego="Sopa" Cambiar={this.Cambiar} tablero={this.state.tablero}   ClickLetras={this.ClickLetras}></Formulario>
        )
    }


    ClickLetras=(e)=>{

        console.log("HICISTE CLICK SOBRE UNA LETRA")
        const {posiciones} = this.state
        //Varibale que se inicializa en false pero cambia su valor al seleccionar un input de palabra
        if(this.addPal == true)
        {
            console.log("TRUE")
            //Detecta si es primera corrida ya que la varibale letrasSel es =0 por defecto
            if(this.letrasSel <1)
            {
                //letrasSel es un contador para saber cuantas letras han sido sleccionadas ya
                console.log("ME EJECUTE")
                console.log(this.posLetras)
                //Dato de filas
                this.posLetras[0]=e.target.title
                //Datios de columnas
                this.posLetras[1] =e.target.id
                this.letrasSel++
            }
            else{
                //Se almacenan las posiciones de la segunda letra seleccionada
                this.posLetras[2] =e.target.title
                this.posLetras[3] =e.target.id
                
                for(let i =0; i<4; i++)
                {
                    //Se almacenan en un solo arreglo las posiciones de las dos letras guardadas
                    posiciones.push(this.posLetras[i])
                }
                console.log(this.posLetras)
                this.setState({posiciones})
                this.IntroducirPalabra()
                this.letrasSel=0
            }
        }
      
    }

    BotonesTiempo=()=>
    {

        
        return(
            <div>
                <p className="content-inline_text">Tiempo total en minutos:</p>
                <input className="inputs-form" onChange={(t)=>{
                this.SetTiempo(t)
        
                }}></input>
            </div>
        )
    
        
    }

    SetTiempo=(e)=>
    {
        this.setState({tiempo:e.target.value})
    }


    IntroducirPalabra()
    {
        const {tablero,palabras} = this.state
        let posFil=this.posLetras[0]
        let posColum=this.posLetras[1]
        const longPal = this.palabra.length

            //Iteramos en columnas
            if (this.posLetras[0] == this.posLetras[2])
            {
               
                //Derecha
                if(this.posLetras[1]<this.posLetras[3])
                {
                    console.log("DERECHA")
                    console.log(this.palabra)
                    for(let i =0; i<longPal; i++)
                    {
                        tablero[this.posLetras[0]][posColum] = this.palabra[i]
                        console.log(tablero[this.posLetras[0]][posColum])
                        posColum++;
                    }
                }
                else //Izquierda
                {
                    console.log("IZQUIERDA")
                    for (let i =0; i<longPal; i++)
                    {
                        tablero[this.posLetras[0]][posColum] = this.palabra[i]
                        posColum--;
                    }
                }
            }
            else //Iteramos en filas
            {
                //Abajo
                if (this.posLetras[0] < this.posLetras[2])
                {
                    console.log("ABAJO")
                    for (let i =0; i<longPal; i++)
                    {
                        tablero[posFil][this.posLetras[1]] = this.palabra[i]
                        posFil++;
                    }
                }
                else //Arriba
                {
                    console.log("ARRIBA")
                    for (let i =0; i<longPal; i++)
                    {
                        tablero[posFil][this.posLetras[1]] = this.palabra[i]
                        posFil--;
                    }
                }
            }
        palabras.push(this.palabra)
        this.setState({tablero,palabras})
    }

    Cambiar=(obj)=>
    {
        //Variable para validar si una palabra puede ser insertada en el tablero
        this.addPal = true

        //Almacena el dato el contenido de la palabra seleccionada para desúes meterla en el tablero
        this.palabra = obj
    }
}