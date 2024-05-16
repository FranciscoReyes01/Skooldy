import React, { Component } from 'react'
import control from '../img/control.svg'
import yyy from '../yyy.png';
import iconItem from '../img/iconItem.svg'
import "./Header.css";
import imgUser from '../img/User.png'
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom'



export default class Header extends Component {


    constructor()
    {
        super()
        this.cambioFunc = 1
    }

    render() {
        return (
            <header>
                <div className="header">
                    <div className="header-element">
                        <img className="header-element__logo" src={control} />
                        <h1 className="header-element__nombre">Skooldy</h1>
                    </div>
                    
                    <div className="header-element">
                        <p className="header-element__star">{this.props.estrellas}20</p>
                        <img className="header-element__item" src={iconItem}></img>
                        {this.BotonImgUser()}
                    </div>
                </div>
            </header>
        )
    }

    BotonImgUser()
    {
        /*Condicional para llamar a la imagen de usuario y esta se comporte de manera diferente dependiendo de la resolucion. 
        Podria fucionar como un link en caso de utilizar la app con un dispositivo movil o como boton al utiliza dispositivos grandes*/
        if (window.screen.width < 769) 
        {
            if(this.props.funcionamiento =="Link")
            {
                return(

                    <Link className="link-perfil" to="/VerPerfil"><img className="header-element__imgUser" src={imgUser}></img></Link> 
                     )
            }
            else{
                return(

                     <img className="header-element__imgUser" src={imgUser}></img>
                     )
            }
            
            
        }
        else{
            return(
                <div className="link-perfil" onClick={(r)=>{
                    //Condicional para camiar poder aparecer y desaparecer la ventana emergente al hacer click sobre la imagen de usuario
                    if(this.cambioFunc ==1)
                    {
                        this.props.ActivarVentana()
                        this.cambioFunc=0
                    }    
                    else{
                        this.props.DesactivarVentana()
                        this.cambioFunc=1
                    }                
                    }}>
                    <img className="header-element__imgUser" src={imgUser}></img>
                </div>
                
            )
        }
    }

}
