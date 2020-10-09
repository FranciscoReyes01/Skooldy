import React,{Component} from 'react';
import Formulario from './FormTareas.js';

export default class Pacman extends Component
{
    constructor()
    {
        super();
        this.posInicial = 0;
        this.posFinal  =0;
        this.newContent ="";
        this.incisos =["a","b","c","d","e","f"]
        this.pregSelect =null

        this.state={
            answerCorrect:{},
            respPacManInp:[],
            estPreguntasInp:[],
            respPregToInsert:{},
            respuestasPreg:[], 
            preguntasPac:[],
            tiempo:0
        }
    }
    render()
    {
        const {respPregToInsert,answerCorrect,respuestasPreg,preguntasPac,tiempo,estPreguntasInp,respPacManInp} =this.state
        return(
            <Formulario  respPregToInsert={respPregToInsert} answerCorrect={answerCorrect} respuestasPreg={respuestasPreg} preguntasPac={preguntasPac} tiempo={tiempo} CrearTareaPacMan={this.props.CrearTareaPacMan} SetTiempo = {this.SetTiempo} AlmacenarPrguntas={this.AlmacenarPrguntas}estPreguntasInp={estPreguntasInp}  respPacManInp={respPacManInp} RespuestasCorrectas={this.RespuestasCorrectas} tipoJuego="PacMan" AlmacenarResp={this.AlmacenarResp}  InsertarRespuestas={this.InsertarRespuestas}CargarRespuestas={this.CargarRespuestas}></Formulario>
        )
    }

    RespuestasCorrectas=(e)=>
    {
        let contPosCorrecta =0
        const {answerCorrect} = this.state
        const correcta = e.target.value.toLowerCase()
        let cad = ""
        console.log(`Pegyunta selecionada: ${this.pregSelect}`)
        for(let i =0; i<6; i++)
        {
            if(correcta != this.incisos[i])
            {
                contPosCorrecta++
            }
            else
            {
                cad = `respPregunta ${this.pregSelect}`
                //answerCorrect.push({[cad]:contPosCorrecta})
                answerCorrect[cad] =contPosCorrecta
                i=20
            }
        }
        this.setState({answerCorrect})
    }

    InsertarRespuestas=()=>{
        let c =0;
        const  {respPacManInp,respuestasPreg,respPregToInsert} = this.state
        let objRespuestas =[]
        /*Recorre un rango de 6 posiciones dentro del arreglo para itroducir las respuestas, son 6 porque
         son las maximas trepuestas que puede tener una preguntas*/
           for(let i=this.posInicial;i<=this.posFinal;i++)
           {
            if(respPacManInp[c] != undefined)
            {

             this.newContent = respPacManInp[c].substring(0,respPacManInp[c].length-1)
             //console.log("Nuevo: "+this.newContent )
             objRespuestas[c] = this.newContent
             respuestasPreg[i] = this.newContent
             
             c++
            }
            
           }
           respPregToInsert[`pregunta ${this.pregSelect}`]=objRespuestas
           this.setState({respuestasPreg,respPregToInsert})
    }

    //PACMAN
    CargarRespuestas=(e)=>{

        const {respPacManInp,estPreguntasInp,respuestasPreg} = this.state

        let c =0;
        this.pregSelect =  e.target.name
        /*De acuerdo al radiobutton que ejecuto esta funcion se sacan las posiciones inicial y final
        para despues recorrer a respuestasPreg en un rango*/
        this.posInicial = e.target.name*6
        this.posFinal = this.posInicial+5

        //Se borra todo de este array para poder generar respuestas en caso de que la pregunta ya cuente con unas
        respPacManInp.splice(0,respPacManInp.length)

        
        /*Cuando seleccionas un nuevo input hay que cambiar el checked de todos los demas a false
        para que se desactiven y asi no haya mas de 1 seleccionado a la vez*/ 
        for(let i=0;i<estPreguntasInp.length;i++)
        {
            estPreguntasInp[i] = false
        }
        //Cambias el estado del input seleccionado 
        estPreguntasInp[e.target.name] = true
        

        for(let i=this.posInicial;i<=this.posFinal;i++)
        {
            //Solamnete asignaremos valores a respPacManInp si los valos dentro del rango contienen una respuesta
            if(respuestasPreg[i] != null)
            {                               
                this.contObj=1;                   //)¨[=?(/(&/%$))]
                respPacManInp.push(respuestasPreg[i]+(c+1))/*+"    "+(c)*/;
                c++;
            }
        
        }

        this.setState({respPacManInp,estPreguntasInp})

    }

    AlmacenarResp=(e)=>{
        //respPacManInp variable de estado que controla las respuestas de cada pregunta
        //Se insertan datos para despues insertarlos en un array de respuestas para todas las preguntas 
        let contenido ="";
        const {respPacManInp} = this.state
        let nombre = parseInt(e.target.name);
        let ope = nombre+1;

        if(e.target.value =="")
        {
            contenido = e.target.placeholder
        }
        else
        {
            contenido =e.target.value
        }
        
        respPacManInp[e.target.name] = contenido+""+ope;
    }

    AlmacenarPrguntas=(p)=>
    {
        const {preguntasPac} = this.state
        preguntasPac[p.target.name] = p.target.value
        this.setState({preguntasPac})
    }

    SetTiempo=(e)=>
    {
        this.setState({tiempo:e.target.value})
    }
}