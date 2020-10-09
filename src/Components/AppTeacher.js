import React,{Component} from 'react'
import {BrowserRouter as Router, Route,Link,Redirect} from 'react-router-dom'
import Pacman from './Pacman.js';
import Sopa from './Sopa.js';
import ListaAlumnos from './ListaAlumnos.js';


export default class AppTeacher extends Component
{

    constructor(){
        super()
        this.state={
            className:"",
            desc:""
        }

        
    }
    render()
    {
        return(
            <div>
          <h3>Estas loguueado como docente</h3>
          <Router>
            <Route path="/Menu">
             <Link to="/Create"><button>Crear Clases</button></Link>
             <Link to="/Clases"><button onClick={()=>{this.props.ConsultaRelacional(this.props.idUser,"ClasesCreadas","Clases",)}}>Clases</button></Link>
             <Link to="/Perfil"><button>Perfil</button></Link>
             <Link to="/Actividad"><button>Crear actividad</button></Link>
            </Route>
            

            <Route path="/Create">
              <h1>Crear Clases</h1>
              <input onChange={this.Writting} name="className" placeholder="Nombre de clase..."></input>
              <input onChange={this.Writting} name="desc" placeholder="Descripcion..."></input>
              <button onClick={()=>{this.props.CrearClases(this.state.className,this.state.desc)}}>Crear</button>
            </Route>

            <Route path="/Clases">
              <h1>Clases</h1>
              <Router>
              {
                
                this.props.clases.map(e=>{
                  //console.log(e[0].nombre)
                  return(
                    <div>

                      <Route path="/HomeClases">

                        <Link to={`/${e.key}`}>
                          <button onClick={(r)=>{this.props.ConsultaRelacional(r,"ListaAlumnos","Alumno")}} id={e.key} >
                          <h1>{e.nombre}</h1>
                          <p>{e.descripcion}</p>
                          </button>
                        </Link>

                      </Route>

                      <Route path={`/${e.key}`}>
                         
                          <ListaAlumnos studentIncritos={this.props.studentIncritos} NombreClase ={e.nombre}></ListaAlumnos>
                      </Route>

                    </div>
                 
                  
                  
                  )
                }      
                ) 
                
              }
              
               <Redirect to="/HomeClases"></Redirect>
               </Router>
               <Link to="/Menu">Atras</Link>
            </Route>


            <Route path="/Perfil">
              <h1>Perfil</h1>
              <p>
                {this.props.datosUsuarioActual.nombre} -  
                {this.props.datosUsuarioActual.apellidos} -
                {this.props.datosUsuarioActual.nacionalidad} - 
                {this.props.datosUsuarioActual.estudios} - 
                {this.props.datosUsuarioActual.cuenta}
              </p>
            </Route>

            <Route path="/Actividad">
              <h1> Crear Actividad</h1>

              <p>Tipo de juego</p>
              <Router>
                <Link to="/PacMan"><button>Pac-Man</button></Link>
                <Link to="/Memorama"><button>Memorama</button></Link>
                <Link to="/Sopa"><button>Sopa de letras</button></Link>

                <Route path="/PacMan">
                  <p>Pac-Man</p>
                  
                  <Pacman  CrearTareaPacMan={this.props.CrearTareaPacMan}></Pacman>
                </Route>
                
                <Route path="/Sopa">
                  <p>Sopa</p>
                  <Sopa ImprimirTablero={this.props.ImprimirTablero} CrearTablero={this.props.CrearTablero} CrearTarea={this.props.CrearTarea}></Sopa>
                  {/*iMPORTANTE MANDAR A LLAMAR A LA FUNCION DE CREAR TAREA*/}

                </Route>

                <Route path="/Memorama">
                  <p>Memorama</p>

                </Route>
              </Router>
              
              
            
              {/*Controladores para setear el juego */}
              
            </Route>
            
            <Redirect to="/Menu"></Redirect>
          </Router>
        </div>
        )
    }

    Writting=(e)=>
    {
        this.setState({[e.target.name]:e.target.value})
    }

    
}