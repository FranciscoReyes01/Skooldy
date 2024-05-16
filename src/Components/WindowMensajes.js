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
            <div style={{display:this.props.estWindowMensaje,top:null}} className="fondo-window fondo-window--menu">
               
                <div className="window window--menu">

                    <div style={{display:"block"}}  className="window__content-back" onClick={() => {this.cerrarWindow() }}>
                        <img className="window__back" src={iconEquis}></img>
                    </div>

                    <div className="window-header" style={null}>
                        <p className="window-header__titulo">{this.props.titulo}</p>
                    </div>


                    <div className="window-contenido" style={{display:"flex",alignItems:"center", height:"65%"}}>
                        <p style={{ width:"100%",margin:"10%",color:"#B5B5B5",fontSize:"1.2em", textAlign:"center"}}>{this.props.mensaje}</p>
                    </div>

                </div>
            </div>
        )
    }

    cerrarWindow(){
        this.props.CerrarVentana()
        this.props.setScrollFunction("auto")
    }




}
