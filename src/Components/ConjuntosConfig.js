import React, { Component } from 'react'
import Formulario from './FormTareas.js';

export default class ConjuntosConfig extends Component {

    constructor()
    {
        super()

        
        this.state={
            //Variable para respuestas de caja 2 del juego de conjuntos
            arrayPalabras2:[],
            aliensDiv1:[],
            aliensDiv2:[],
            nombCajas:[]
            
        }
    }
    render() {
        return (
            <div>
                <Formulario activarWindowMensaje={this.props.activarWindowMensaje} nombreJuego={"Conjuntos"} Clases={this.props.Clases} GuardarValInput={this.GuardarValInput} nombCajas={this.state.nombCajas} CrearTareaConjuntos={this.props.CrearTareaConjuntos} MostrarInputs={this.MostrarInputs} aliensDiv2={this.state.aliensDiv2} aliensDiv1={this.state.aliensDiv1}  arrayPalabras2={this.state.arrayPalabras2} tipoJuego="Conjuntos"></Formulario>
            </div>
        )
    }

    GuardarValInput=(pos,array,cadena)=>
    {
        array[pos] = cadena
        this.setState({array})
    }

    MostrarInputs=(arrayPal,imgAlien,arrayDiv,funcAudio,tipoActi)=>
    {
        //Recorre a los array llenados en "creadorDeInputs"
        /*"arrayDiv" es el array que almacenara las cadenas que se van escribiendo en los inputs de 
        las cajas,se pasa como parametro para poder especificar en que arreglo se va a almcenar dependiendo
        de la caja en la que estemos llenando*/
        return(
        <div>
            {
                arrayPal.map(k=>{
                    return(
                        <div className="content-alien-resp">
                            {funcAudio(tipoActi,k[k.length-1]-1,arrayDiv,false)}
                            <p className="content-inline_text">{k[k.length-1]}</p> 
                            <img width="70" height="80" src={imgAlien}></img>
                            <input className="inputs-form" name={k[k.length-1]-1} onChange={(e)=>{
                               this.GuardarValInput(e.target.name,arrayDiv,e.target.value)
                            }}></input>
                        </div>
                    )
                }) 
            }
        </div>)
        
    }

}
