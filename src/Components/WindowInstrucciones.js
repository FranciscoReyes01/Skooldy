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
            <div style={{display:this.props.estWindowInstruc,top:null}} className="fondo-window fondo-window--menu">
               
                <div className="window window--menu window--instrucciones" >

                    <div className="window-header" style={null}>
                        <p className="window-header__titulo">{this.props.titulo}</p>
                    </div>

                    <div className="window-contenido" style={{display:"flex", flexDirection:"column", alignItems:"center",height:"90%", padding:"1em 0"}}>
                        <p style={{margin:"1.5em",color:"#B5B5B5",fontSize:"1.5em", textAlign:"center"}}>{this.props.instrucciones}</p>
                        <p style={{color:"#B5B5B5",fontSize:"1.5em", textAlign:"center",padding:"1em"}}>PRESIONA UNA TECLA PARA CONTINUAR...</p>

                    </div>
                </div>
            </div>
        )
    }

}
