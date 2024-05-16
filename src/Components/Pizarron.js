import React, { Component } from 'react'
import './Pizarron.css';
import info from '../img/Clases/info.svg'
import Back from '../img/icon_cerrar.svg'
import control from '../img/control.svg'

export default class Pizarron extends Component {

    constructor() {
        super()
        this.keyHomework = null
        this.contTareasPendientes =0
        this.numTareaPendiente =0


        this.state = {
            coleccionDatos: null,
            nombreClase: "",
            estWindow: "none",

        }

    }


    //Ciclo de vida que se ejecuta cuando salimos del componente 
    componentWillUnmount() {
        //Es una funcion desde APP que lo que hace es reiniciar variables para no generar valores acumulados
        this.props.ReiniciarValores()
        console.log("DID UNMOUNT")

    }

    render() {
        this.contArrayDatos =0 
        this.contTareasPendientes =0

        return (
            <div className="modulo modulo--up modulo--up-window">
                <img className="titulo-modulo" src={this.props.tituloModulo}></img>

                <div className="pizarron">
                    {
                        this.props.arrayDatos.map(x => {
                            
                            /*queryCorrecta: propiedad para saber que funcion debe de tomar el parrafo para cuando
                            se clickeado dado que esto se utiliza para las rutas /logros y /clases
                            en clases debe de mostrar solo las tareas pendientes y en logros todas las tareas*/
                            return (
                                <div className="pizarron-item" onClick={(this.props.queryCorrecta == "pendientes") ? (e) => { this.setState({ nombreClase: e.target.title, estWindow: "block" }) } : null} title={x.nombre} >
                                    <p className="item-text" title={x.nombre} onClick={(this.props.queryCorrecta == "pendientes") ? (e) => { this.props.ConsultaRelacional(document.getElementById(x.key), "TareasDeClases", "Tareas", null) } : (e) => {
                                        this.props.setEstadoClickClaseFromCalificaciones(true)
                                        this.props.ConsultaRelacional(document.getElementById(x.key), "TareasDeClases", "Tareas", "allHomework") }} id={x.key}>{x.nombre}</p>
                                    <p className="item-text" >{x.nota}</p>
                                    <img className="pizarron-item__info" src={info}></img>
                                </div>)

                        })

                        
                    }

                    <div id="noElements" style={{display:(this.props.arrayDatos.length ==0)?"flex":"none",flexDirection:"column",width:"100%",height:"100%",padding:"1em"}}>
                        <p className="item-text" style={{textAlign:"center",fontSize:"1.5em",margin:"auto"}}>No hay {this.props.elementos} para mostrar...</p>

                    </div>


                </div>
                <div style={{ display: this.state.estWindow }} className="fondo-window">
                    <div className="window window--menu">

                        <div className="window__content-back" onClick={() => { this.setState({ estWindow: "none" }) }}>
                            <img className="window__back" src={Back}></img>
                        </div>

                        <div className="window-header">
                            <p className="window-header__titulo">{this.state.nombreClase}</p>

                        </div>


                        <div className="window-contenido" style={{padding:"0 2em"}}>
                            <p className="window__act" style={{display:(this.props.tareasPendientes.length!=0)?"block":"none"}}>Actividades</p>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                {this.props.tareasPendientes.map(u => {
                                    this.contTareasPendientes++
                                    return (

                                        <label class="custom-checkbox">

                                            <input class="custom-checkbox__input" id={u.key} type="checkbox" disabled={(this.contTareasPendientes!=1)?true:false} onChange={(e) => {
                                                this.keyHomework = e.target.id
                                              
                                                console.log(`NUM TAREA: ${this.numTareaPendiente}`)

                                                //Funcion  para almacenar los valores de la actividad seleccionada
                                                this.props.ConsultarTarea(this.keyHomework)
                                            }}></input>

                                            <span class="custom-checkbox__show custom-checkbox__show--checkbox"></span>
                                            <span class="custom-checkbox__text">{u.nombre}</span>
                                        </label>


                                    )

                                })}
                                
                            </div>
                            <div style={{display:(this.props.tareasPendientes.length==0)?"flex":"none",width:"100%",height:"100%"}}>
                                <p className="window__act" style={{width:"100%", textAlign:"center",margin:"auto 1em",fontSize:"1.5em"}}>No hay actividades pendientes...</p>

                            </div>
                        </div>
                        <button style={{display:(this.props.tareasPendientes.length!=0)?"block":"none"}} className="buttons buttons--window" onClick={() => { 
                           this.props.ActualizarEst()
                            }}>Iniciar</button>


                    </div>
                </div>



            </div>
        )
    }
    /*  */

}
