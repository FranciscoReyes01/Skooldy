import React, { Component } from 'react'


export default class Pizarron extends Component {

    constructor(){
        super()
        this.keyHomework =null
        this.state={
            coleccionDatos:null
        }
       
    }

    //Ciclo de vida que se ejecuta cuando salimos del componente 
    componentWillUnmount()
    {
        //Es una funcion desde APP que lo que hace es reiniciar variables para no generar valores acumulados
        this.props.ReiniciarValores()
    }

    render() {
       
        return (
            <div>
                {
                    
                    this.props.arrayDatos.map(x=>{
                            /*queryCorrecta: propiedad para saber que funcion debe de tomar el parrafo para cuando
                            se clickeado dado que esto se utiliza para las rutas /logros y /clases
                            en clases debe de mostrar solo las tareas pendientes y en logros todas las tareas*/ 
                            return(
                            <div>
                                <p title={x.nombre} onClick={(this.props.queryCorrecta =="pendientes")?(e)=>{this.props.ConsultaRelacional(e,"TareasDeClases","Tareas",null)}:(e)=>{this.props.ConsultaRelacional(e,"TareasDeClases","Tareas","allHomework")}} id={x.key}>{x.nombre}</p>
                                <p>{x.nota}</p>
                            </div>)

                    })
                }
                {/* Ventana Emergente */}
                 <div>
                    <h2>Tareas</h2>
                    {
                        
                        this.props.tareasPendientes.map(u=>{
                        return(
                            <div>
                                <input id={u.key} type="checkbox" onChange={(e)=>{
                                    this.keyHomework = e.target.id
                                    //Funcion  para almacenar los valores de la actividad seleccionada
                                    this.props.ConsultarTarea(this.keyHomework)
                                    }}></input> 
                                <p>{u.nombre}</p>   
                            </div>
                        
                        )
                        })
                    }
                    <button onClick={()=>{this.props.ActualizarEst()}}>Iniciar</button>
                </div>
    
             </div>
        )
    }

  
}
