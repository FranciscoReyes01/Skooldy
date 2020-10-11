import React, { Component } from 'react'

export default class SopaGame extends Component {
    constructor()
    {
        super()
        this.contLetras = 1
        this.palabra =""
        this.contLabels = 0
        this.est = " "
        this.numIzq = 1;
        this.numDer = 1;
        
        this.numIzqCI = 1;
        this.numDerCI = 1;
        this.state={
            tableroGame:[[],[],[],[],[],[],[],[],[],[],[],[]],
            letrasColor:[[],[],[],[],[],[],[],[],[],[],[],[]],
            posLetras:[],
            contMal:0,
            score:0,
            vidas:[]
        }
    }
    componentDidMount()
    {
        const {tableroGame,letrasColor} = this.state
        this.props.CrearTablero(tableroGame,letrasColor)
        this.setState({letrasColor})
        this.IntroducirPalabras()
       
        document.addEventListener("keydown",(e)=>{this.EnterEvent(e)} , false); 
        this.GenerarVidas()
        console.log(this.props.idTarea)
        //this.IntroducirPalabras()    
    }

    
    /*componentWillUnmount(){ 
        document.removeEventListener("keydown", (e)=>{this.EnterEvent(e)}, false); 
        }*/ 

    render() {
        return (
            <div>
                <h1>Juego Sopa</h1>
                <img></img>
                <p>Profesor</p>
                <p>Actividad</p>
                <p>{`Clase: ${this.props.nombreClase}`}</p>
                <p>{`Tema: ${this.props.tareaHacer.tema}`}</p>
                <p>{`Instrucciones: ${this.props.tareaHacer.instrucciones}`}</p>
                
                {
                    this.props.ImprimirTablero(this.state.tableroGame,this.ValidarPosicion,this.state.letrasColor)
                }
                <p>{`Incorrectas: ${this.state.contMal}`}</p>
                <div style={{display:"flex"}}>
                    <p>Vidas: </p>
                    {
                        this.state.vidas.map(p=>{
                            return <h2> * </h2>
                        })
                    }
                </div>
                <p>{`Score: ${this.state.score}`}</p>
            </div>
        )
    }


    ValidarPosicion=(obj,letra)=>
    {   
          
        const {letrasColor,posLetras} = this.state
        let valorC = 0;
        let valorF = 0;
        let sumaStrings = 0
        let restaStrings= 0
        

       

        if (this.contLetras==1)
        {
            letrasColor[obj.target.title][obj.target.id]={color:"blue"}     
            this.palabra = this.palabra + letra;
            this.AlmacenarPosiciones(obj.target.title,obj.target.id);
            console.log("Letra 1: "+"F: "+obj.target.title +" "+ "C: "+obj.target.id)
        }
        else
        {
            this.AlmacenarPosiciones(obj.target.title,obj.target.id);

            valorC = posLetras[this.contLabels - 1];
            valorF = posLetras[this.contLabels - 2];

            
          
            /*console.log("Letra: "+"F: "+obj.target.title +" "+ "C: "+obj.target.id)
            console.log("Condicion 1: "+posLetras[0]+" =="+posLetras[this.contLabels - 2])
            console.log("Condicion 2: "+posLetras[1]+" == "+(valorC - this.numDer))
            console.log("Condicion 3: "+posLetras[1]+"== "+`${sumaCond3}`)
            console.log("If adentro: "+posLetras[1]+" < "+valorC)*/

            if(this.est ==" " || this.est =="F")
            {
                sumaStrings =  parseInt(valorC)+ parseInt(this.numIzq)
                restaStrings= parseInt(valorC) - parseInt(this.numDer)
                //Filas iguales
                if (parseInt(posLetras[0]) == parseInt(posLetras[this.contLabels - 2]) && (parseInt(posLetras[1]) == restaStrings || posLetras[1] == sumaStrings))
                {
                    this.palabra = this.palabra + letra;
                    this.est = "F";
                    if (parseInt(posLetras[1]) < parseInt(valorC))
                    {
                        //Derecha 
                        console.log(this.numDer)
                        this.numDer++;
                        console.log("Hacia derecha +1");
                        console.log(this.numDer)
                    }
                    else
                    {
                        console.log("CONTlABELS: "+this.contLabels)
                       
                        console.log("posLetras[1] : "+posLetras[1] )
                        console.log("ValorC: "+valorC)
                        //Izquierda
                        this.numIzq++;
                        console.log("Hacia izquierda +1");
                      
                        
                    }

                    letrasColor[obj.target.title][obj.target.id]={color:"blue"} 
                    //((Label)sender).Enabled = false;
                }
                else
                {
                    if (this.contLetras == 2)
                    {
                        console.log("No hacer nada");
                    }
                    else
                    {
                        console.log("Posicion No valida");
                        this.contLabels -=2;
                        this.contLetras--;
                    }
                }
            }
            

          

            if (this.est == " " || this.est == "C")
            {
                sumaStrings =  parseInt(valorF)+ parseInt(this.numIzqCI)
                restaStrings= parseInt(valorF) - parseInt(this.numDerCI)  
                //Columnas iguales
                if (parseInt(posLetras[1]) == parseInt(posLetras[this.contLabels - 1]) && (parseInt(posLetras[0]) == restaStrings || parseInt(posLetras[0]) == sumaStrings))
                {
                    this.palabra = this.palabra + letra;
                    this.est = "C";
                    if (parseInt(posLetras[0]) < parseInt(valorF))
                    {

                        //Derecha 
                        this.numDerCI++;
                        console.log("Hacia derecha +1");
                    }
                    else
                    {

                        //Izquierda
                        this.numIzqCI++;
                        console.log("Hacia izquierda +1");
                    }

                    
                    letrasColor[obj.target.title][obj.target.id]={color:"blue"} 
                    //((Label)sender).Enabled = false;
                }
                else
                {
                    if (this.contLetras == 2)
                    {
                        console.log("No hacer nada");
                    }
                    else
                    {
                        console.log("Posicion No valida");
                        this.contLabels -= 2;
                        this.contLetras--;
                    }
                }
            }

                

        }
        this.setState({letrasColor})
        this.contLetras++;
        
    }

    AlmacenarPosiciones=(posFila,posColum)=>
    {
        const {posLetras} = this.state
        posLetras[this.contLabels] = posFila;
        this.contLabels++;
        posLetras[this.contLabels] = posColum;
        this.contLabels++;
        this.setState({posLetras})
    }


    IntroducirPalabras()
    {
        console.log("Introducir pal")
        
        const {tableroGame} = this.state
        let posFil=this.props.tareaHacer.posiciones[0]
        let posColum=this.props.tareaHacer.posiciones[1]
        let longPal = 0
        let palabra=""
        let cantPalabras =Object.keys(this.props.tareaHacer.palabras).length
        let arrayPos = []

        for(let p=0; p<Object.keys(this.props.tareaHacer.posiciones).length;p++)
        {
            arrayPos.push(this.props.tareaHacer.posiciones[p])
        }
        
        for(let j =0;j<cantPalabras;j++)
        {
 

            palabra = this.props.tareaHacer.palabras[j]
            longPal = this.props.tareaHacer.palabras[j].length
            console.log()
            //Iteramos en columnas
            if (arrayPos[0] == arrayPos[2])
            {
                
                //Derecha
                if(arrayPos[1] < arrayPos[3])
                {
                    console.log("DERECHA")
                    console.log(palabra)
                    for(let i =0; i<longPal; i++)
                    {
                        tableroGame[arrayPos[0]][posColum] = palabra[i]
                        //console.log(tablero[this.posLetras[0]][posColum])
                        posColum++;
                    }
                }
                else //Izquierda
                {
                    console.log("IZQUIERDA")
                    for (let i =0; i<longPal; i++)
                    {
                        tableroGame[arrayPos[0]][posColum] = palabra[i]
                        posColum--;
                    }
                }
            }
            else //Iteramos en filas
            {
                //Abajo
                if (arrayPos[0] < arrayPos[2])
                {
                    console.log("ABAJO")
                    for (let i =0; i<longPal; i++)
                    {
                        console.log("posFil: "+posFil)
                        console.log("arrayPos:"+arrayPos[1])
                        tableroGame[posFil][arrayPos[1]] = palabra[i]
                        posFil++;
                    }
                }
                else //Arriba
                {
                    console.log("ARRIBA")
                    for (let i =0; i<longPal; i++)
                    {
                        tableroGame[posFil][arrayPos[1]] = palabra[i]
                        posFil--;
                    }
                }
            }

            arrayPos.splice(0,4)
            posFil=arrayPos[0]
            posColum=arrayPos[1]
        }
            this.setState({tableroGame})
    }


    EnterEvent(e)
    {
        if(e.key == "h")
            {
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
    

    CalificarPalabra()
    {
        let mal = true;
        
        //Leemos la longitud de un array de objs
        let cantPalabras = Object.keys(this.props.tareaHacer.palabras).length
        console.log(this.palabra)
        console.log(cantPalabras)
        let {vidas} = this.state
        let calif =0
        for(let i=0; i<cantPalabras;i++)
        {
            console.log(this.props.tareaHacer.palabras[i])
            if(this.palabra == this.props.tareaHacer.palabras[i])
            {
                mal = false;
                this.setState({score:(this.state.score+1)})
                
                //pals[i].ForeColor = Color.Red;
            }
        }

        if(mal == true)
        {
            vidas.shift()
            this.setState({contMal:(this.state.contMal+1)})
            this.setState({vidas})
        }

        //Si las vidas se acaban o el socore llega a su valor maximo el juego finaliza
        if(this.state.vidas.length == 0 || this.state.score ==cantPalabras)
        {
            console.log("Juego terminado")
            console.log(`Aciertos: ${this.state.score}`)
            console.log(`Errores: ${this.state.contMal}`)

            /*Variable rellenada desde AppStudent, el condicional indica si el juego que se esta jugando
            es una actividad de clase o el uausrio esta jugando en modo libre*/
            if(this.props.juegoLibre == false)
            {
                calif =(this.state.score*10)/cantPalabras
                console.log("Tu calificacion es: "+calif)
                this.props.TareaFinalizada(this.props.idTarea,calif)
            }
            else
            {
                if(this.props.juegoLibre == true)
                {
                    
                }
            }
   
  
        }
    }

    GenerarVidas(){
        let cantVidas = parseInt(this.props.tareaHacer.vidas)
        let {vidas} = this.state
        for(let i =0;i<cantVidas;i++)
        {
            vidas.push("vida")
        }
        this.setState({vidas})
    }

   
}
