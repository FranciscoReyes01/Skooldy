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
            tiempo:0,
            partesCadena:[],
            viewCadena:[]
        }
    }
    render()
    {
        const {respPregToInsert,answerCorrect,respuestasPreg,preguntasPac,tiempo,estPreguntasInp,respPacManInp} =this.state
        return(
            <Formulario quitarRespuestas={this.quitarRespuestas} activarWindowMensaje={this.props.activarWindowMensaje} nombreJuego={this.props.tipoJuego} Clases={this.props.Clases} BotonesTiempo={this.BotonesTiempo} CrearTareaPlataformas={this.props.CrearTareaPlataformas} BotonesCorrecta={this.BotonesCorrecta}  EstadosCadena={this.EstadosCadena} ImprimirCadena={this.ImprimirCadena} DecomponerCadena={this.DecomponerCadena}  respPregToInsert={respPregToInsert} answerCorrect={answerCorrect} respuestasPreg={respuestasPreg} preguntasPac={preguntasPac} tiempo={tiempo} CrearTareaPacMan={this.props.CrearTareaPacMan} SetTiempo = {this.SetTiempo} AlmacenarPrguntas={this.AlmacenarPrguntas}estPreguntasInp={estPreguntasInp}  respPacManInp={respPacManInp} RespuestasCorrectas={this.RespuestasCorrectas} tipoJuego={this.props.tipoJuego} AlmacenarResp={this.AlmacenarResp}  InsertarRespuestas={this.InsertarRespuestas}CargarRespuestas={this.CargarRespuestas}></Formulario>
        )
    }

    quitarRespuestas=()=>{
        this.setState({respPacManInp:[]})
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
        
        respPacManInp[e.target.name] = contenido+" "+ope;
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

    DecomponerCadena=(pos)=>
    {
        //Recibe una posicion que es el "name" del radio button seleccionado en el formulario
        let cont=0
        let {preguntasPac,partesCadena,viewCadena} = this.state
        
        /*Condicional para asergurar que ya se haya escrito algo en el input y por tanto en la posicion del array 
        que le corresponde*/
        if(preguntasPac[pos] !="")
        {
            //"split" separa a una cadena en un array, hace la separacion por medio del caracter que se le indique
            partesCadena= preguntasPac[pos].split([" "])

            /*De acuerdo al numero de cadenas que se extrajo del input se incializan estados de view para 
            los parrafos que se crearan por cada cadena*/
            for (const i in partesCadena) 
            {
                viewCadena[cont] = "visible"
                cont++
            }
            this.setState({partesCadena,viewCadena})
        }
    }

    ImprimirCadena=(creadorInputs)=>
    {
        let cont =-1;
        let {viewCadena} = this.state
        return(
            <div style={{display:"flex"}}>
                {
                    //Se recorren las cadenas que se extrajeron de la oracion o pregunta del canvas 1
                    this.state.partesCadena.map(c=>{

                        cont++
                        return(
                        <h4 className={cont} id={c} onClick={(k)=>{
                            
                            //Variable que almacena la longitud actual del array que contiene a las respuestas creadas
                            let  crear= this.state.respPacManInp.length+1

                            //Esta funcion siempre creara solo un respuesta
                            creadorInputs({target:{value:`${crear}`}},this.state.respPacManInp,"respPacManInp",null,k.target.id)
                            
                            //Se oculta el parrafo clickeado
                            viewCadena[k.target.className]="hidden"
                            this.setState({viewCadena})
                            }} style={{marginRight:"10px",visibility:`${viewCadena[cont]}`,color:"white"}}>{c}
                        </h4>
                    )
                    })
                }
            </div>
        )
        
    }

    EstadosCadena=()=>
    {

        /*Funcion que es llamada cuando escribimos en los inputs de las respuestas o cambiando el numero total
        de inputs*/
        let cad =""
        let {viewCadena} = this.state
        console.log("Hola")

        //Ciclo que recorre a las partes de la cadena 
        for(let c=0;c<this.state.partesCadena.length;c++)
        {
            //Buscamos cada cadena el el array de respuestas
            cad = this.state.respPacManInp.find(e => e == this.state.partesCadena[c]+" "+e[e.length-1])
            
            if(cad !=undefined)
            {
                 //La cadena sigue existiendo en las respuestas por tanto se mantiene oculta
                viewCadena[c] = "hidden"
                this.setState({viewCadena})
            }
            else
            {
                //La cadena ya no esta en el array de respuestas por tanto se activa el parrafo que la contiene
                viewCadena[c] = "visible"
                this.setState({viewCadena})
            }
            
        }

        
    }

    BotonesCorrecta=()=>
    {
        //Input para establecer la respuesta correcta en el juego de PacMan
        if(this.props.tipoJuego=="PacMan")
        {
            return(
                <div>
                     <p className="content-inline_text">Correcta:</p>
                     <input id="inputCorrecta" disabled={true} className="inputs-form inputs-form--inciso-correcto"  type="text" onChange={(x)=>{this.RespuestasCorrectas(x)}}></input>
                </div>
            )
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

    
}