import React,{Component} from 'react'

export default class ListaAlumnos extends Component{
    render()
    {
        return(
            
            <div>
                <h1>{this.props.NombreClase}</h1>
                <div>
                    {
                         this.props.studentIncritos.map(r=>{
                             return(
                                 <div>
                                    <p>{r.nombre}</p>    
                                    <p>{r.apellidos}</p>
                                    <br></br> 
                                 </div>
                                 
                            )
                         })
                    }
                </div>
               
            </div>
        )
    }
}