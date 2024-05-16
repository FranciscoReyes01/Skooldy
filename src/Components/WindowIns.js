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
               
                <div className="window window--menu" style={(window.innerWidth > 1000)?{width:"35%",height:"50%"}:{width:"80%",height:"35%"}}>

                    <div className="window-header" style={null}>
                        <p className="window-header__titulo">{this.props.titulo}</p>
                    </div>

                    <div className="window-contenido" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <p style={{margin:"2em",color:"#B5B5B5",fontSize:"2vh", textAlign:"center"}}>{this.props.instrucciones}</p>
                        <p style={{margin:"2em",color:"#B5B5B5",fontSize:"2vh", textAlign:"center"}}>PRESIONA UNA TECLA PARA CONTINUAR...</p>

                    </div>
                    <button className="buttons buttons--window" onClick={(e)=>{
                        e.preventDefault()
                        this.props.setScrollFunction("auto")
                        this.props.cerrarWindowInstruc()
                        //this.props.startGame()
                        }}>Comenzar</button>


                </div>
            </div>
        )
    }

}
