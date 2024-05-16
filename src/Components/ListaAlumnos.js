import React, { Component } from 'react'

export default class ListaAlumnos extends Component {
    /*  componentDidMount()
     {
         var buscra = document.getElementById("Parrafo")
         console.log("ECONTRADO: ",buscra)
         buscra.style = "grid-column:"
     } */

    componentWillUnmount() {
        //Borramos lo datis de tareas para que no acumule nada la varibale al seleccionar otras tareas
        this.props.tareasClase.splice(0, this.props.tareasClase.length)
    }

    constructor() {
        super()
        this.contTareas = 0;
        this.contCelda = 1
        this.contColum = 1
        this.contFilas = 1

    }
    render() {

        /*Estas variables reinician su valor aqui porque hay procesos dentro de esta funcion que es el "render" que se ejecutan
        muchas veces y puede ocacionar que las variables acumulen un valor muy grande*/
        this.contTareas = 0
        this.contCelda = 1
        this.contColum = 1
        this.contFilas = 1
        return (
            
            <div className="contenedor-lista">

                {/*  /*En base al numero de tareas "numTareas" de la clase que se haya seleccionado se crean las columnas de la tabla y en base
                al numero de alumnos incritos en la clase "numStudents" se crean las filas del grid ademas se crea un tablero que se le asignara
                a la propiedad "gridTemplateAreas" para poder asignar nombres a las celdas del grid y trabajar mejor para posicionar los datos
                que conformaran la tabla*/}
                <div style={{ gridTemplateColumns: `9em repeat(${this.props.numTareas},2em)`, gridTemplateRows: `3em repeat(${this.props.numStudents},3em)`, justifyContent: "start", gridTemplateAreas: `${this.CrearArea(this.props.numStudents, this.props.numTareas)}`,gap:"1.3em"}} className="lista-alumnos" >
                    {/*Se utilizan los React.Fragment para que lo parrafos sean hijos directos del contenedor grid */}
                    <React.Fragment>

                        {/*Esta es la nomenclatura para posicionar los datos en la grilla formada en el Grid, se hace los mismo para
                    datos que se obtinen con ayuda de un ciclo, por ejemplo las calificaciones, estas se posicionan de las misma forma
                    solo que se necesita un contador para iterar en columnas o filas */}
                        <p className="lista-alumnos-textHeader" style={{ gridArea: "y11",justifySelf:"start" }}>Nombre</p>

                        {
                            //Se imprimern las columnas con las nomenclatura "T1..T2" de acuerdo a las tareas que haya
                            this.props.tareasClase.map(p => {
                                this.contTareas++
                                this.contCelda++

                                return <p className="lista-alumnos-textHeader" style={{ gridArea: `y1${this.contCelda}` }}>T{this.contTareas}</p>
                            })
                            
                        }
                        
                    </React.Fragment>

                    {
                        //Por cada alumno encontrado en el array se generara un fila <tr>
                        this.props.studentIncritos.map(r => {
                            this.contColum = 1
                            this.contFilas++
                            return (
                                <React.Fragment>
                                    <p style={{ gridArea: `y${this.contFilas}1`}} className="lista-alumnos-text">{r.nombre}</p>
                                    {
                                        /*se recorre el array de calificaciones del alumno y en base a ellas
                                        se generan <td> para rellenar la tabla de calificaciones*/
                                        r.calif.map(j => {

                                            this.contColum++
                                            return <p style={{ gridArea: `y${this.contFilas}${this.contColum}` }} className="lista-alumnos-text">{j}</p>
                                        })

                                    }
                                    
                                </React.Fragment>
                            )

                        })
                    }

                </div>

                <div className="lista-tareas" style={{ gridTemplateRows: `3em repeat(${this.props.numTareas+1},3em)`, gridTemplateAreas: `${this.CrearArea(this.props.numTareas+1, 3)}`,gridRowGap:"3em" }}>
                    <div className="lista-tareas_titulo">
                        <p className="lista-alumnos-textHeader tareas-asignadas">Tareas asignadas</p>
                    </div>
                    
                    <p className="lista-tareas_tarea lista-alumnos-textHeader">Tarea</p>
                    <p className="lista-tareas_fecha lista-alumnos-textHeader">Fecha</p>
                    <p className="lista-tareas_hora lista-alumnos-textHeader">Hora</p>
                    {this.InfoTareas()}
                   
                </div>

            </div>

        )
    }

    InfoTareas=()=>
    {
        let contFilas =2
        let contColum =1

        return(
            <React.Fragment>
                 {
                        this.props.tareasClase.map(p => {
                            
                            contFilas++
                            return(
                                <React.Fragment>
                                    <p className="lista-alumnos-text" style={{ gridArea: `y${contFilas}${contColum}`,justifySelf:"start",paddingLeft:"0.5em" }}>{p.nombre}</p>
                                    <p className="lista-alumnos-text" style={{ gridArea: `y${contFilas}${contColum+1}` }}>{p.fecha}</p>
                                    <p className="lista-alumnos-text" style={{ gridArea: `y${contFilas}${contColum+2}` }}>{p.hora}</p>
                                </React.Fragment>
                            ) 
                        })
                    } 
            </React.Fragment>
        )
    }



    //Funcion que creara el mapa de nombres para las celdas del GRID
    CrearArea = (numFilas, numColum) => {
        let tablero = ""
        for (let f = 0; f <= numFilas; f++) {
            //Comilla para iniciar las cadenas de nombres para un fila
            tablero += "'"
            for (let c = 0; c <= numColum; c++) {
                //El nombre de cada celda tuve que empezar con una letra de lo contrario no se podia asignar como valor para el grid
                tablero += `y${f + 1}${c + 1} `

            }
            //Comilla para finalizar las cadenas de nombres para un fila
            tablero += "'"
            tablero += "\n"

        }
        console.log("Tablero:", tablero)

        //Retorna la cadena de nombres para el grid
        return tablero
    }
}