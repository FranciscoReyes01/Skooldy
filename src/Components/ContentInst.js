import React, { Component } from 'react'
import './ContentInst.css'
import actividad from '../img/layout_activ.svg'
import borrar from '../img/BORRAR.jpg'

export default class ContentInst extends Component {
    render() {
        return (
            <div style={{padding:"1em"}} className="info-actividad">
                <img className="info-actividad__maestro" src={borrar}></img>
                <img className="info-actividad__actividad" src={actividad}></img>

                <p className="texto-actividad  texto-actividad--clase">{`Programacion Orientada a objetos: `}</p>

                <p className="texto-actividad texto-actividad--tema">{`Vetores `}</p>

                <p className="texto-actividad texto-actividad--inst">{`Contesta correctamente
                        1-no copies
                        2-Se un pro `}</p>
            </div>
        )
    }
}
