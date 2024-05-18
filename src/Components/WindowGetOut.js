import React, { Component } from 'react'

//Iconos para la informacion de usuario
import iconName from '../img/Perfil/Profile.svg'
import iconCorreo from '../img/Perfil/Messages.svg'
import iconLugar from '../img/Perfil/Nacion.svg'
import iconEstudio from '../img/Perfil/Estudios.svg'
import iconCuenta from '../img/Perfil/iconCuenta.svg'
import iconEdad from '../img/Perfil/iconEdad.svg'
import imgUser from '../img/User.png'
import './WindowGetOut.css'
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom'
import { app } from 'firebase'
import AppStudent from './AppStudent'
export default class Header extends Component {
    render() {
        return (
            <div style={{display:this.props.windowVisible}} className={`content-window ${(window.screen.width > 769)?"content-window--emergente":"content-window--up"}`}>
                <img className="img-User" src={imgUser}></img>

                <div className="info-user">
                    <div className="linea-info-user"></div>
                    <p className="info-user__texto">{(this.props.datosUsuarioActual.cuenta).toUpperCase()}</p>
                    <div className="linea-info-user"></div>
                </div>

                <div className="info-item">

                    <img className="info-item__icon" src={iconName}></img>
                    <p className="info-item__texto">Usuario: {`${this.props.datosUsuarioActual.nombre} ${this.props.datosUsuarioActual.apellidos}`}</p>
                </div>



                <div className="info-item">
                    <img className="info-item__icon" src={iconEdad}></img>
                    <p className="info-item__texto">Edad: {this.props.datosUsuarioActual.edad}</p>
                </div>


                <div className="info-item">
                    <img className="info-item__icon" src={iconCorreo}></img>
                    <p className="info-item__texto">Correo: {this.props.user.email}</p>
                </div>
                

                <div style={{display:(this.props.datosUsuarioActual.cuenta == "Docente")?"none":"visible"}} className="info-item">
                    <img className="info-item__icon" src={iconEstudio}></img>
                    <p className="info-item__texto">Grado escolar: {this.props.datosUsuarioActual.estudios}°</p>
                </div>



                <button className="buttons buttons--GetOut" onClick={(e) => { 
                    
                    this.props.GetOut() }}>Cerrar sesion</button>
            
                {/* {this.BotonBack()} 
                 */}

            </div>
        )

        
    }


    BotonBack()
    {
        /*Solo en versiones de movil o tableta se podra retornar este Link, ya que solo en estos casos este componente se invoca dentro de una
        ruta en AppStudent por tanto no marca error al utilizar este tag sin un router en este componente*/
        if(window.screen.width < 769)
        {
            return(<Link to="/Menu"><button >Cerrar</button></Link>)

        }
    }

}
