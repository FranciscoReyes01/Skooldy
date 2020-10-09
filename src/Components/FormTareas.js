import React,{Component} from 'react'
import './FormTareas.css'
import { Button } from 'shards-react'
import Pacman from '../Imagenes/Pacman.png'
class FormTareas extends Component
{
    constructor(){
        super()
        this.palabra = ""
        this.cont =0
  
        this.numRadioButton = 0
        this.numResp =0

        this.contObj =0;
        this.contPosObj =0;
        this.dif=0
        this.newContent = "";

        this.state ={
            arrayPalabras:[],
            tema:"",
            subtema:"",
            nombre:"",
            instrucciones:"",
            idClase:"",
            vidas:null
            
        }
    }
   

    render()
    {
        return(
        <div>   
            {/*Estrcutura basica para crear una actividad*/}
            <h1>Formulario</h1>         
            <input name="tema" onChange={this.WrittingInfo} placeholder="Tema..."></input>
            <input name="subtema" onChange={this.WrittingInfo}placeholder="Subtema..."></input>
            <input name="nombre" onChange={this.WrittingInfo} placeholder="Nombre de actividad..."></input>
            <input name="instrucciones" onChange={this.WrittingInfo} placeholder="Instrucciones..."></input>
            <input name="idClase" placeholder="idClase de BD" onChange={this.WrittingInfo}></input>
            {
                /*Funcion que delimita que mostrar en pantalla dependiendo de la props que se recibe 
                y hace referencia a un juego*/
                this.EstadoFormulario()
            }
        </div>)
    }

    EstadoFormulario(){
        //Indica que mostrar en pantalla de acuerdo al que juego selecciono el docente
        const{tema,subtema,nombre,instrucciones,arrayPalabras} = this.state
      
        if(this.props.tipoJuego === "Sopa"){
            return(
            <div>
                <p>No. palabras:</p>
                {/* CreadorInputs ->Funcion que inserta datos de tipo string en un array parametro*/}
                <input onChange={(e)=>{this.CreadorInputs(e,this.state.arrayPalabras,"dont",null)}} type="number"></input>
                <input  name="vidas" placeholder="vidas" onChange={this.WrittingInfo}></input>

                 <p>Palabra:</p>
                 <input onChange={(e)=>{
                     //Se almacena el valor que se haya escrito en el input para despues insertarlo en el arrayPalabras
                     this.palabra =e.target.value
                }} type="text"></input>

                 <Button onClick={()=>{
                     arrayPalabras[this.cont]= this.palabra
                     this.setState({arrayPalabras})
                     this.cont++
                     }}>Insertar
                </Button>

                <div className ="padre">
                    <div className ="hijo1">
                        <p>Panel 1</p>
                        {
                            //Array llenado en la funcion CreadorInputs
                            this.state.arrayPalabras.map(e=>{
                                return(
                                    <div>
                                        {/*A cada input se le asigna un nombre para despues al seleccionarlo cambiar el valor 
                                           de la varibale palabra para despues meterla al tablero
                                        */}
                                        <input type="radio" name={e} onChange={()=>{

                                            //Funcion que cambia el valor de varibales del Script Sopa para poder meter palabras en el tablero
                                            this.palabra = e
                                            this.props.Cambiar(this.palabra)
                                        }} value="Hola"></input>
                                        <p>{e}</p>
                                    </div>
                                )
                            })
                        
                        }
                    </div>

                    <div className ="hijo2">
                        <p>Panel 2</p>
                        {
                            this.props.ImprimirTablero(this.props.tablero,null,null,this.props.ClickLetras)
                        }
                    </div>
                </div>

                <Button onClick={()=>{this.props.CrearTarea(tema,subtema,nombre,instrucciones,this.props.posiciones,this.props.palabras,this.props.tipoJuego,this.state.vidas,this.state.idClase)}}>Aceptar</Button>
            </div>)

        }
        else{

            if(this.props.tipoJuego === "PacMan"){
                return(

                    <div>
                        <p>Tiempo x pregunta:</p>
                        <input onClick={(t)=>{
                            this.props.SetTiempo(t)
                           
                        }}></input>
                        <p>No. preguntas:</p>
                        <input onChange={(e)=>{
                            this.CreadorInputs(e,this.state.arrayPalabras,"arrayPalabras",this.props.estPreguntasInp)
                    
                            }}></input>
                        <div className ="padre">
                            <div className ="hijo1">
                                <p>Panel 1</p>
                                {
                                    this.state.arrayPalabras.map(e=>{
                                        return(
                                            <div>
                                                {/*e[e.length-1]-1 se hace esto porque al arrayPalabras se asignaron datos con tipo 
                                                    Palabra 1,2,3,4,5,6... entonces se hace refencia a la ultiuma 
                                                    posicion de la cedena que almacena la posicion y se le resta 1
                                                    para poder trabajar con ellas en un array
                                                */}
                                                <input type="text"  name={e[e.length-1]-1} onChange={(p)=>{ 
                                                    this.props.AlmacenarPrguntas(p)
                                                    }}>

                                                </input>
                                                <input type="radio" checked={this.props.estPreguntasInp[e[e.length-1]-1]} name={e[e.length-1]-1} onChange={(p)=>{
                                                    this.contObj =0
                                                    this.contPosObj=0
                                                    this.props.CargarRespuestas(p)   
                                                    }}>
                                                </input>
                                            </div>
                                        )
                                    })
                                }

                            </div>

                            <div className ="hijo2">
                                <p>Panel 2</p>
                                <p>No. de respuestas:</p>
                                <input type="number" onChange={(e)=>{
                                   /* this.contObj=0
                                    this.contPosObj=0*/
                                    this.CreadorInputs(e,this.props.respPacManInp,"respPacManInp",null)
                                    }}></input>
                                <button>Ok</button>
                                <p>Correcta:</p>
                                <input type="text" onChange={(x)=>{this.props.RespuestasCorrectas(x)}}></input>
                                <div>
                                    {
                                        
                                        this.props.respPacManInp.map(e=>
                                            {
                                                /*Varibale que modifica la cadena y eliminar 
                                                el dato numerico que la cadena tiene al final para que este 
                                                no se vea en el placeholder del input*/
                                                this.newContent = e.substring(0,e.length-1)
                                                return(
                                                <div>
                                                    <p>a)</p>
                                                    <img src={Pacman}></img>
                                                    <input name={e[e.length-1]-1}  placeholder={this.newContent} onChange={(y)=>{this.props.AlmacenarResp(y)}} type="text"></input>
                                                </div>)
                                            }
                                        )
                                        
                                    }
                                </div>
                                

                                <Button onClick={()=>{
                        
                                    this.props.InsertarRespuestas()
                                    
                                    }}>Insertar</Button>
                            </div>
                        </div>
                        <Button onClick={()=>{this.props.CrearTareaPacMan(tema,subtema,nombre,instrucciones,this.props.tiempo,this.props.preguntasPac,this.props.respPregToInsert,this.props.answerCorrect,this.props.tipoJuego,this.state.idClase)}}>CREAR TAREA</Button>

                    </div>
                )
    
            }
        }
    }
    

    CreadorInputs=(e,varEst,estSting,estPreguntasInp)=>{
        /*
        e - Almacena el objeto que ejecute este funcion.
        varEst - Almacena el array de estado al que haya que modificar.
        estString - Almacen un dato para saber especificmente cuando es llamada esta funcion para crear 
                    preguntas en el pacman
        */

        //this.contObj es iniciada en 0 por lo que se le suma 1 y entra al primer if
         
        this.contObj++
        
        if(this.contObj ==1)
        {
            //Ciclo que se ejecuta el numero de veces que haya insertado el docente el el objeto que ejecuto la funcion
            for(let i =0;i<e.target.value;i++)
            {
                /*Se llena un array de strings para posteriormente  recorrerlo con map, y en base a los datos
                 almacenados retornar un <input></input> */

                 /*Es importante asignar como valor al arreglo un dato con un coeficiente numerico al final para 
                 asi poder identificarlo despues*/
                 varEst[i]=`Palabra ${i+1}`

                 //Esto solo se ejecita cuando se crean preguntas para el pacman
                 if(estSting =="arrayPalabras")
                 {
                    //Almacenamos estados de los radiobuttons por cada pregunta creada
                    estPreguntasInp[i] = false
                 }
                 /*Variable que va interandoce para saber en que posicion hay que meter datos  
                 en caso de entrar al otro if*/
                 this.contPosObj++;
            }
            //Varibale que almacena el dato numerico del numero de obj a crear para despues compararlo con el actual
            this.numResp = e.target.value
        }
        else
        {
            if(this.contObj ==2)
            {
                //Comparamos el valor anterior con el actual para saber si crear mas objs o quitar
                if(this.numResp < e.target.value)
                {
                     //GENERAR DATOS
                    //Calcula cuantos datos hay que crear
                    this.dif = e.target.value - this.numResp
                  
                    for(let i =0;i<this.dif;i++)
                    {
                       
                        /*Se llena un array de strings para posteriormente  recorrerlo con map, y en base a los datos
                         almacenados retornar un <input></input> */
                         varEst[this.contPosObj]=`Palabra ${this.contPosObj+1}`

                         if(estSting =="arrayPalabras")
                         {
                            estPreguntasInp[this.contPosObj] = false
                         }
                         
                         this.contPosObj++;
                    }
                }
                else
                {
                    if(this.numResp > e.target.value)
                    {
                        //QUITAR DATOS
                        this.dif =  this.numResp - e.target.value
                        this.contPosObj-=(this.dif);
                       
                        varEst.splice(e.target.value,(this.numResp-1));
                       

                        if(estSting =="arrayPalabras")
                        {
                            estPreguntasInp.splice(e.target.value,(this.numResp-1));
                            
                        }
                        
                        
                    }
                }

                this.numResp = e.target.value
                this.contObj=1

            }
        }
        //Su funion es no hacer nada con los inputs en caso de dar un valor null
       if(e.target.value !="")
       {
        this.setState({varEst,estPreguntasInp})
       }
        

    }

    WrittingInfo=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    
}

export default FormTareas;