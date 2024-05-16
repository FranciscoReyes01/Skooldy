import React, { Component } from 'react'
import iconEquis from '../img/icon_cerrar.svg'
import { screen } from '@testing-library/react'

export default class Window extends Component {

    constructor()
    {
        super()
        this.code = null
        
        this.state={
            contImagenes:0
        }
    }

    render() {
        return (
            <div style={{display:(this.props.layout=="inscribir")?this.props.estWindow:this.props.windowIns,top:(this.props.layout=="instrucciones")?0:null}} className="fondo-window fondo-window--menu">
               
                <div className={(this.props.layout=="instrucciones")?"window window--menu window--instrucciones":"window window--menu window--incripcion"}>

                    <div style={{display:(this.props.layout=="instrucciones")?"none":"block"}}  className="window__content-back" onClick={() => {this.props.CerrarVentana() }}>
                        <img className="window__back" src={iconEquis}></img>
                    </div>

                    <div className="window-header" style={(this.props.layout=="instrucciones")?{height:"20%"}:null}>
                        <p className="window-header__titulo">{this.props.titulo}</p>
                    </div>

                    <div className="window-contenido" style={(this.props.layout=="inscribir")?{overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",justifyItems:"center"}:{display:"none"}}>
                        <p className="window__act">Codigo de clase</p>
                        <input className="window-contenido__input" onChange={(e) => { this.code = e.target.value }} type="text"></input>
                    </div>

                    <div className="window-contenido" style={(this.props.layout=="instrucciones")?{overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",justifyItems:"center",top:"20%",height:"65%"}:{display:"none"}}>
                        <p style={{margin:"5% 5% 2% 5%",color:"#B5B5B5"}}>{(this.props.layout=="instrucciones")?this.props.instrucciones[this.state.contImagenes]:null}</p>
                        <img style={{width:"90%",height:"70%"}}  src={(this.props.layout=="instrucciones")?this.props.imagenes[this.state.contImagenes]:null}></img>
                    </div>

                    <button className="buttons buttons--window" style={(this.props.layout=="instrucciones")?{height:"9%",marginTop:"5%"}:null} onClick={(e) => {
                        e.preventDefault()
                        if(this.props.layout=="inscribir")
                        {
                            var mensajeIncripcion =  this.props.ConsultarCodigo(this.code)
                            this.props.clikIncribirse(mensajeIncripcion)

                        }
                        else
                        {
                            this.setState({contImagenes:this.state.contImagenes+1},()=>{
                                if(this.state.contImagenes == this.props.instrucciones.length)
                                {
                                    //Cuando se hayan leido todas las instrucciones la ventana se cierra y se inicia el juego que se selecciono
                                    this.props.CloseIns()
                                    this.props.IniciarJuego()
                                }
                            })          
                        }
                        
                    }}
                    >Aceptar</button>


                </div>
            </div>
        )
    }

}
