import React, { Component } from 'react'
import iconEquis from '../img/icon_cerrar.svg'
import { screen } from '@testing-library/react'
import iconItem from '../img/iconItem.svg'
import iconCalif from '../img/iconCalif.jpg'


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
            <div style={{display:this.props.estWindowGameOver,top:null}} className="fondo-window fondo-window--menu">
               
                <div className="window window--menu" style={(window.innerWidth > 1000)?{width:"35%",height:"50%"}:{width:"80%",height:"35%"}}>

                    <div className="window-header" style={null}>
                        <p className="window-header__titulo">{this.props.titulo}</p>
                    </div>

                    <div className="window-contenido" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <p style={{margin:"2em",color:"#B5B5B5",fontSize:"1.2em", textAlign:"center"}}>{this.props.total}</p>

                        <p style={{color:"#B5B5B5",fontSize:"1.2em", textAlign:"center"}}>{this.props.correctas}</p>
                        <div style={{display:"flex",flexDirection:"row",alignContent:"center"}}>
                            <img className="header-element__item" src={(this.props.juegoLibre ==true)?iconItem:iconCalif}></img>
                            <p style={{color:"#B5B5B5",fontSize:"1.5em", textAlign:"center"}}>{this.props.calif}</p>
                        </div>
                        
                    </div>
                    <button className="buttons buttons--window" onClick={()=>{
                        this.props.setScrollFunction("auto")
                        window.location.reload()}}>Aceptar</button>

                </div>
            </div>
        )
    }

}
