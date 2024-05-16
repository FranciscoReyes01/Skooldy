import React, { Component } from 'react'
import iconCalif from '../img/Ranking/iconCalif.svg'
import imgPrueba from '../img/BORRAR.jpg'
import iconItem from '../img/iconItem.svg'

export default class Header extends Component {
    render() {
        return (
            <div className={`card-user-rank ${this.props.modifificador}`}>
                <div className="card-user-body">
                    <div className="card-parte-izq">
                        <p className="card-parte-izq__numero">{this.props.cont}</p>
                        <img className="card-parte-izq__img-user" src={imgPrueba}></img>
                    </div>

                    <div className="card-parte-der">
                        <p className="card-parte-der__user-name">{this.props.nombre}</p>
                        <div className="content-info-rank">
                            <div className="puntos">
                                <img className="puntos__img puntos__img--estrellas" src={iconItem}></img>
                                <p className="puntos__desc" >{this.props.estrellas}</p>
                            </div>

                            <div className="puntos">
                                <img className="puntos__img" src={iconCalif}></img>
                                <p className="puntos__desc" >{this.props.promedio}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="linea-ranking"></div>

            </div>

        )
    }

}
