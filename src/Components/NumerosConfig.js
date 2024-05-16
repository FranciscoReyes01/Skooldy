import React, { Component } from 'react'
import Formulario from './FormTareas.js';
import imagenA from '../Imagenes/imgA.png'
import imagenS from '../Imagenes/imgS.png'
import imagenD from '../Imagenes/imgD.png'
import fondo from '../Imagenes/FondoN.png'
import imagenResp from '../Imagenes/imgNumero.png'
import { object } from 'shards-react';


export default class NumerosConfig extends Component {
   

    constructor(){
        super()
        this.partesOpe=[]
        this.signos = ["*","/","+","-"]
        this.imgA = new Image()
        this.imgA.src = imagenA
        this.imgS = new Image()
        this.imgS.src = imagenS
        this.imgD = new Image()
        this.imgD.src = imagenD
        this.imgFondo= new Image()
        this.imgResp = new Image()
        this.imgResp.src = imagenResp
        this.imgFondo.src = fondo 
        this.figurasBoton=[]
        this.figuras=[this.imgA,this.imgS,this.imgD]
        this.figRespuestas =[]
        this.velocidad =1
        this.isPossibleInsertar = false

        this.state={
            operaciones:[],
            respuestas:[],
            respXpregunta:["","",""]
            
        }
    }
    render() {
        return (
            <div>
                <Formulario  activarWindowMensaje={this.props.activarWindowMensaje} cleanPartesOperacion={this.cleanPartesOperacion} setIsPosibleInsertar={this.setIsPosibleInsertar} isPossibleInsertar={this.isPossibleInsertar} Clases={this.props.Clases} nombreJuego={"Numeros"}  ConvertirObjs={this.ConvertirObjs}velocidad={this.velocidad} CrearTareaNumeros={this.props.CrearTareaNumeros} DibujarTextos={this.DibujarTextos} MoverRespuestas={this.MoverRespuestas} SetVelocidad={this.SetVelocidad} figRespuestas={this.figRespuestas}   DibujarFondo={this.DibujarFondo}   DibujarFiguras={this.DibujarFiguras} figurasBoton={this.figurasBoton} IniciarFiguras={this.IniciarFiguras} EliminarOperacion={this.EliminarOperacion} respuestas={this.state.respuestas} GuardarRespuestas={this.GuardarRespuestas} respXpregunta={this.state.respXpregunta}  AlmacenarCaracteres={this.AlmacenarCaracteres} operaciones={this.state.operaciones} GuardarPreguntas={this.GuardarPreguntas} tipoJuego="Numeros"></Formulario>
            </div>
        )
    }

    GuardarPreguntas=(numOpe)=>
    {
        let {operaciones} = this.state
        var cadenaOpe =""
        //Accedemos a los caracteres almacenados y los pasamos a una cadena
        for (const c in this.partesOpe) 
        {
            cadenaOpe+=this.partesOpe[c]
        }
        
        //Las operaciones se almacenaran un un obj para insertarlos depues en la BD de manera mas facil
        operaciones.push({[`P ${numOpe}`]:cadenaOpe})
        this.setState({operaciones})
    }

    GuardarRespuestas=(numOpe)=>
    {
        let {respuestas} = this.state
        respuestas.push({[`R ${numOpe}`]:this.state.respXpregunta})
        this.setState({respuestas})
    }

    setIsPosibleInsertar=(est)=>{
        this.isPossibleInsertar = est
    }

    //Funcion que se manda a llamar cuando el docente escribe valores en los inputs de la operacion
    AlmacenarCaracteres=(carac,pos,longTotal)=>
    {
        let array=[]
        let cont =0
        let {respXpregunta} = this.state
        let cantSignos =0
        var limFinal =0
        var num=0
        var estInsertR =null

        /*Los caracteres escritos en los inputs de la operacion se almacenan de acuerdo a su posicion en el propiedad name
        para mantener un orden */

        this.partesOpe[pos] = carac
        console.log("CARACTER: ",carac)
        console.log(this.partesOpe)

        /*Filter que valida cuando el usuaruio haya rellenado por completo todos los espacios del array es decir 
        que haya metido los datos en los inputs de la operacion*/
        array =this.partesOpe.filter(e=> e!= null && e !="")
        console.log("partesOpe: ",this.partesOpe)
        //Condicional para verificar que el docente ya haya escrtito datos en todos los inputs para la operacion
        if(this.partesOpe.length == longTotal && array.length == longTotal)
        {
            
            //Calcula la respuesta correcta
            console.log("HORA DE EGENRAR RESPUESTAS")

            this.setIsPosibleInsertar(true)

            /*La condicion ya no se cumple cuando la operacion se ha realizado completamente y solo queda el valor del 
            resultado en el array entonces las length es 1*/
            while(array.length !=1)
            {
                /*Buscamos cuantos signos hay de un detrminado tipo, de acuerdo a la jeraquia de operaciones 
                este empieza con * que esta almacenado en un array*/
                array.forEach(e=>{(e ==this.signos[cont])?cantSignos++:console.log()})

                //Ciclo que se encarga de que el numero de signos encontrados de un tipo sean realizados
                for(let k =0; k<cantSignos; k++)
                {
                    //Recorre los caracteres de la operacion 
                    for(let i=0;i<array.length; i++)
                    {
                        //Se compara a los caracteres de la operacion con el signo que se quiere buscar
                        if(array[i] == this.signos[cont])
                        {
                            /* Funcion que se encarga de hacer la operacion y eliminar los carcteres que ya no formen parte
                             de la operacion*/
                            this.GenerarResultado(array,i) 
                            i=20
                        }
                    }

                }
                //Se vuelve a 0 para que no acumule
                cantSignos=0

                //contador se itera para apuntar al siguinet signo
                cont++
            }
            respXpregunta.splice(0,respXpregunta.length)

            /*Insertmos el el valor de la unica posicion de "array" resulto de while anterior, ose las repuestas
            correcta */
            var posRespuestaCorrecta = Math.floor((Math.random() * 2) + 1)
            respXpregunta[posRespuestaCorrecta ] =array[0]

            var valRespCorrecta = array[0] > 3 ?array[0]:20

            //Limite para generar valores aleatorios para las otras dos respuestas de la operacion
            limFinal = parseInt(valRespCorrecta)*2
            cont =0

            //Se ejcuta 2 veces porue son los 2 valores que debe de generar
            while(cont<3)
            {
                if(cont !=posRespuestaCorrecta  ){
                    num = Math.floor((Math.random() * limFinal) + 1);

                    //Validamos si el valor generado ya se encuntra en el array
                    estInsertR = respXpregunta.find(e=> e ==num)
                    console.log("estInsertR: ",estInsertR)
                    //Solo se almacenara un numero para la respuesta si este no se encontro antes en el array
                    if(estInsertR ==null)
                    {
                        respXpregunta[cont]= num 
                        cont++
                    }
                    
                }
                else{         
                    cont++
                }
                
            }
            this.setState({respXpregunta}) 
        }
        else
        {
            this.setState({respXpregunta:["","",""]})
            this.setIsPosibleInsertar(false)
        }

    }

    cleanPartesOperacion=()=>{
        this.partesOpe.splice(0,this.partesOpe.length)
        this.setState({respXpregunta:["","",""]})
    }

    


    GenerarResultado(array,posSigno)
    {
        console.log("array[posSigno]: ",array[posSigno])
        var ope=0
        if(array[posSigno] =="*")
        {
            ope =  parseInt(array[posSigno-1]) * parseInt(array[posSigno+1])
        }
        if(array[posSigno] =="/")
        {
            ope =  parseInt(array[posSigno-1])/ parseInt(array[posSigno+1])
            console.log("ope: ",ope)

        }
        if(array[posSigno] =="+")
        {
            ope =  parseInt(array[posSigno-1]) + parseInt(array[posSigno+1])
        }
        if(array[posSigno] =="-")
        {
            ope =  parseInt(array[posSigno-1]) - parseInt(array[posSigno+1])
        }

        //Se almacena el resultado en la posicion anterior en donde se econtro el signo
        array[posSigno-1] =ope.toString()
        //Se eliminnan el signo econtrado y el caracter siguiente
        array.splice(posSigno,2)
    }

    EliminarOperacion=(pos)=>
    {
        //"pos"  es el name del boton que tiene cada conjunto de respuestas para las operaciones
        const {operaciones,respuestas} = this.state
        operaciones.splice(pos,1)
        respuestas.splice(pos,1)
        this.setState({operaciones,respuestas})
    }

    IniciarFiguras=(varArray,posY,accion)=>
    {
        //Inserta objs a las variables "figurasBoton","figRespuestas" dependiendo
        
        for(let i=1; i<4; i++)
        {
            varArray.push({
                width:45,
                height:30,
                x:80+(i*55),
                y:posY,
                /*Dependiendo del valor del parametro "accion", en caso de que sea figuras se le asignaran 
                las imagnes de los botones que se encuentran en el array de "figuras", en caso contrairio
                se asigna para las respuestas un unica imagen */
                img:(accion =="figuras")?this.figuras[(i-1)]:this.imgResp
            })
    
        }
    }

    DibujarFiguras=(ctx,arrayDibujar)=>
    {
        //Dibuja los objs de las variables "figurasBoton","figRespuestas" 

        ctx.save()
        for (const i in arrayDibujar)
        {
            var figura = arrayDibujar[i]
            ctx.drawImage(figura.img,figura.x,figura.y,figura.width,figura.height)

        }
        ctx.restore()
    }

    DibujarFondo=(ctx,canv)=>
    {
        //Se dibuja el fondo
        ctx.drawImage(this.imgFondo,0,0)

        //Se pinta el texto de ejemplo de la operacion
        ctx.save()
        ctx.fillStyle  = "#FFFFFF";
        ctx.font = "30px Segoe UI";
        
        ctx.fillText("5 + 7 =", 20, canv.height/2);
        ctx.restore()
    }

    SetVelocidad=(velNueva)=>
    {
        if(velNueva !="")this.velocidad=  parseInt(velNueva) 
        
    }

    MoverRespuestas=(canvHeigth)=>
    {
        //Recorremos las figuras de las respuestas
        for (const i in this.figRespuestas) 
        {
            var resp = this.figRespuestas[i]
            
            //A cada una de las figureas le sumamos un valor en para que haga este efecto de que se mueven
            resp.y +=this.velocidad

            /*Verificamos por cada figura de las repuesta cuando esta haya salido del canvas y si 
            es asi la eliminamos*/
            if( resp.y>canvHeigth) this.figRespuestas.splice(i,1)
        }

        return this.figRespuestas.length
    }


    DibujarTextos=(ctx)=>
    {
        for (const i in this.figRespuestas) {
            var fig = this.figRespuestas[i]
            ctx.save()
            ctx.fillStyle  = "#000000";
            ctx.font = "15px Segoe UI";
            ctx.fillText("7", fig.x+20, fig.y+20);
            ctx.restore()
        }
        
    }

    ConvertirObjs=(obj)=>
    {
        var ope ={}

        /*Funcion que quita las posiciones de los array que contenian a
         las operaciones y sus respuestas, pasando su informacion a un oibjeto para
         asi poder insertar los datos en la BD sin nodos inesesarios*/
        obj.map(u=>{
            //Convierte lo que devuelve u que es un object a un obj que ya se pueda leer
            Object.values(u)
            
            /*Creamos una nueva coleccion en el objeto que corresponde al nombre de 
            los objetos que hay almacenados los array, y le asignamos el valor que hay 
            en el obj u*/
            ope[`${Object.keys(u)}`] =u[`${Object.keys(u)}`]
        })

        return ope
    }

}
