import React,{Component} from 'react'
import {BrowserRouter as Router,Link,Redirect,Route} from 'react-router-dom'
import Pizarron from './Pizarron.js';
import PacmanGame from './PacmanGame.js'
import SopaGame from './SopaGame.js'

export default class AppStudent extends Component
{
    constructor(){
        super()
        this.code =""
        this.tareaBuscada =""
        this.keyTarea =""
    }

    render()
    {
        return(
                 <div>
                     {this.EstadoApp()}
                 </div>
        )
    }

    EstadoApp()
    {
        /*variable que recibe valor cuando seleccionamos una tarea <Pizarron> lo cual indica
        que el usuario quiere comenzar a hacer su actividad*/
        if(this.props.tareaHacer.length ==0)
        {
            return(
                <div>
                <h3>Estas logueado como alumno</h3>
                
                <Router>
                    <Route path="/Menu">
                        <h1>Menu</h1>
                        <Link to="/Jugar"><button>Jugar</button></Link>
                        <Link to="/Ranking"><button>Ranking</button></Link> 
                        <Link to="/Inscribirme"><button>Inscribirme</button></Link> 
                        <Link to="/Clases"><button onClick={()=>{
                            console.log(this.props.idUser)
                            this.props.ConsultaRelacional(this.props.idUser,"InscripcionClase","Clases",null)
                            }}>Clases</button></Link> 
                        <Link to="/Buscar"><button>Buscar Juego</button></Link> 
                        <Link to="/Logros"><button onClick={()=>{
                            console.log(this.props.idUser)
                            this.props.ConsultaRelacional(this.props.idUser,"InscripcionClase","Clases",null)
                            }}>Logros</button></Link> 
                    </Route>
                    


                    <Route path="/Jugar"></Route>

                    <Route path="/Ranking"></Route>
                    <Route path="/Inscribirme">
                        <h1>Inscribirme</h1>
                        <p>Codigo de clase:</p>
                        <input onChange={(e)=>{this.code = e.target.value}} type="text"></input>
                        <button onClick={()=>{
                            console.log(this.code)
                            this.props.ConsultarCodigo(this.code)}
                            }>Aceptar</button>
                    </Route>

                    <Route path="/Clases">
                        <h1>Clases</h1>
                        <Pizarron ReiniciarValores={this.props.ReiniciarValores} queryCorrecta="pendientes" ActualizarEst={this.props.ActualizarEst} ConsultarTarea={this.props.ConsultarTarea} ConsultaRelacional={this.props.ConsultaRelacional} tareasPendientes={this.props.tareasPendientes} ConsultarTareas={this.props.ConsultarTareas} arrayDatos={this.props.clases}></Pizarron>

                    </Route>

                    

                    <Route path="/Buscar">
                        <Router>
                            <Route path="/BuscarTarea">
                                <div>
                                    {this.UIBuscarJuego()}
                                    <Link to="/TareasEcontradas"><button onClick={(e)=>{this.props.BuscarJuego(this.tareaBuscada)}}>Buscar</button></Link> 
                                </div>
                            </Route>

                            <Route path="/TareasEcontradas">
                                <Link to="/BuscarTarea">Back</Link>
                                {this.UIBuscarJuego()}
                                <button onClick={(e)=>{this.props.BuscarJuego(this.tareaBuscada)}}>Buscar</button> 


                                {
                                    this.props.juegosBuscados.map(k=>{
                                        return(
                                            <div id={k.keyTarea} onClick={(e)=>{
                                                this.keyTarea = e.target.id
                                                console.log(`this.keyTarea: ${this.keyTarea}`)
                                                this.props.ConsultarTarea(e.target.id)
                                                this.props.ActualizarEst()
                                                }}>
                                                <p>{k.nombre}</p>
                                                <p>Autor:{k.UserName}</p>
                                                <p>Naconalidad{k.from}</p>
                                                <p>Fecha:{k.fecha}</p>
                                                <p>Tipo juego:{k.tipo}</p>
                                            </div>
                                        )
                                    }) 
                                }
                            </Route>

                            <Redirect to="/BuscarTarea"></Redirect>
                        </Router>
                        
                    </Route>
                    <Route path="/Logros">
                        <h1>Calificaciones</h1>
                        {
                            //Funcion para llamar a pizzaron con el array correcto de acuerdo a lo que se necesite
                            this.PizarronCorrecto()
                        }
                    </Route>


                    <Link to="/Menu">Menu</Link>
                
                    <Redirect to="/Menu"></Redirect>
                </Router>
                 
                
                <button onClick={this.props.GetOut}>Salir</button>
            </div>   
            )
        }
        else
        {
            return(
                <div>
                    {
                        this.TipoJuego()
                    }
                </div>
            )
            
        }
    }

    UIBuscarJuego()
    {
        return(
            <div>

                <input type="text" onChange={(e)=>{
                this.props.WriteJuego(e.target.value)
                this.tareaBuscada = e.target.value
                }} placeholder="Juego...">

                 </input>
                {
                    this.props.nombresJuegos.map(c=>{
                        return <p>{c.nombre}</p>
                    })
                }
            </div>
        )
        
    }

    PizarronCorrecto()
    {
        //La variable recibe datos cuando hacenmos click sobre un <p> de una clase
        if(this.props.tareasClase.length ==0)
        {
            //La variable array que recibe son los valores de this.props.clases
            return <Pizarron  ReiniciarValores={this.props.ReiniciarValores} queryCorrecta="totales"  ConsultaRelacional={this.props.ConsultaRelacional} tareasPendientes={this.props.tareasPendientes} arrayDatos={this.props.clases}></Pizarron>


        }
        else
        {
            //La variable array que recibe son los valores de this.props.tareasClase
             return <Pizarron ReiniciarValores={this.props.ReiniciarValores} queryCorrecta={null}  ConsultaRelacional={this.props.ConsultaRelacional} tareasPendientes={this.props.tareasPendientes} arrayDatos={this.props.tareasClase}></Pizarron>

        }
    }   
    TipoJuego()
    {
        if(this.props.tareaHacer.tipo =="PacMan")
        {
            return(
                <PacmanGame></PacmanGame>
            )
        }
        else
        {
            if(this.props.tareaHacer.tipo =="Sopa")
            {
                return(
                    <SopaGame nombreClase={this.props.nombreClase} idTarea ={this.props.idTarea} TareaFinalizada={this.props.TareaFinalizada} ImprimirTablero={this.props.ImprimirTablero} CrearTablero={this.props.CrearTablero} tareaHacer={this.props.tareaHacer} ></SopaGame>
                )
            }
            
        }
    }
}