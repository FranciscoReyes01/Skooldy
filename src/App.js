import React from 'react';
import firebase, { database } from 'firebase'
import "./App.css"
import cerebro from "./img/Cerebro.png"
import 'firebase/database';
import {BrowserRouter as Router,Route, Redirect,Link} from 'react-router-dom';
import AppTeacher from './Components/AppTeacher.js';
import AppStudent from './Components/AppStudent.js';
import { Form, FormInput, FormGroup, Button, Container, Row, Col, ButtonGroup } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

class App extends React.Component {
  constructor()
  {
    super()
    //Varibales para hacer referencia a rutas de la BD
    this.addUser = null
    this.tipoUsuario = null
    this.addClase=firebase.database().ref().child("Clases")
    this.queryTareas =null
    this.addTarea = firebase.database().ref().child("Tareas")
    //Variables que almacenan valores para crar querys 
    this.idUserDB =null
    this.idClase =null
    this.idClaseTarea=null
    this.idTarea =null
    //this.keysTareas=[]
    this.codeQuery =null
    this.queryJuego=null
    this.hola = null
    this.nombreClase=""
    this.codigoClase =""
    
    this.state={
      user:null,
      userName:'',
      pass:'',
      newUserInfo:[],
      datosUsuarioActual:null,
      //Variable utilizada por alumno y maestro
      clases:[],
      studentIncritos:[],
      tareasPendientes:[],
      tareaHacer:[],
      tareasClase:[],
      juegosBuscados:[],
      nombresJuegos:[]
    
    }
  }

  componentDidMount()
  {
    let cont =0
    firebase.auth().onAuthStateChanged(e=>{
      this.setState({user:firebase.auth().currentUser},()=>{
        try{
          /*En caso de que el usuario creado o logueado no este verificado se le 
          enviara un correo de verificacion con una URL de continuacion*/
          if(this.state.user.emailVerified === false){
            var URL={url:"http://localhost:3000/"}
            this.state.user.sendEmailVerification(URL)
              .then(p=>{console.log("Enviando verificacion..")})
              .catch(t=>{console.log("Error al enviar notificacion")})
          }
          else{
            //Se busca en que nodo esta el usuario para saber que tipo de cuenta tiene
            this.AsignarTipoUser("Alumno")
            this.AsignarTipoUser("Docente")
          }
        }
        catch(e){
          console.log(e)
        }
      })      
    })  

    this.addClase.on("child_added",e=>{
      if(this.idClase !== null)
      {
        this.idClase = e.key
        //Linea 85 a 88 se genera el id de la clase que le maestro crea para despues darselo al alumno y as se incriba
        this.GenerarCodigo(this.idClase)
        this.addClase = firebase.database().ref().child(`Clases/${this.idClase}/id`)
        this.addClase.set(this.codigoClase)
        this.codigoClase=""

        this.addClase = firebase.database().ref().child(`ClasesCreadas/${this.idUserDB}/${this.idClase}`)
        this.addClase.set({hora:3434,fecha:34})
        this.addClase = firebase.database().ref().child(`Clases`)
      }
    })

    this.addTarea.on("child_added",t=>{
        this.idTarea = t.key
    })

  }

  render(){
    return (
      <React.Fragment>
        
        {
        /*Funcoion que determina que UI mostrar con base en el valor de la var de 
        estado user*/
        this.AppEstado()
        }

      </React.Fragment>
    );
  }

  AppEstado(){
    if(this.state.user ===null || this.state.user.emailVerified ===false){
      return(
        <div className="App">
        <Router>
            
          <Route path="/Inicio">
            <Container>
              <Row>
                <Col>
                  <Form>
                    <FormGroup>
                      <img src={cerebro} />
                    <br></br>
                      <h1 className="title">Login Usuario</h1> 
                      <FormInput name="userName"  onChange={this.WrittingLogin} />
                    </FormGroup>
                    <FormGroup>
                      <FormInput  name="pass" onChange={this.WrittingLogin} />
                      <br></br>
                      <Button pill theme="success" size="lg" block onClick={this.Login}>Ingresar</Button>
                    </FormGroup>   

                    <ButtonGroup>
                    <Link theme="info" to="/Formulario"><button>Crear cuenta</button></Link>
                    </ButtonGroup>
                    <ButtonGroup>
                    <Button theme="dark" onClick={this.GetOut}>Get Out</Button>
                    </ButtonGroup>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Route>

          <Route path ="/Formulario">
            <h1>Formulario</h1>
            <input onChange={this.WrittingCreating} name="0" placeholder="Tipo de cuenta"></input>
            <input onChange={this.WrittingCreating} name="1" placeholder="Nombre..."></input>
            <input onChange={this.WrittingCreating} name="2" placeholder="Apellidos..."></input>
            <input onChange={this.WrittingCreating} name="3" placeholder="Nacionalidad..."></input>
            <input onChange={this.WrittingCreating} name="4" placeholder="Nivel de estudios..."></input>
            <input onChange ={this.WrittingCreating} name="5" type="hidden" value ={this.state.userName}></input>
            <input name="userName" placeholder="Correo electronico..." onChange={this.WrittingLogin}></input>
            <input  name="pass" placeholder="Password..."  onChange={this.WrittingLogin}></input>
            
            <Link to="/Verificando"><button onClick={this.CreateUser}>Crear Cuenta</button></Link>
            
          </Route>
          
          <Route path="/Verificando">
            <h1>
               Se ha enviado una notificacion a tu correo
               electronico para validar que realmente eres tu :)
            </h1>
          </Route>

          <Redirect to="/Inicio"></Redirect>

        </Router>        
       
      </div>
      )

    }
    else{
      return(    
        <div>
          {
          /*Funcion que determina que tipo de usuario(Alumno/Docente) ha iniciado 
          sesion*/
          this.UserEstado()
          }
         {/*  <button onClick={this.GetOut}>Get Out</button> */}

        </div>
        
      )
      
    }
  }

  UserEstado(){
    /*En este punto ya podemos acceder a la info de un usuario logueado
    ya que estos datos se obtiene en el listent onAuthStateChanged*/
    try{
      if(this.state.datosUsuarioActual.cuenta === "Alumno")
    {
      return(
          <AppStudent JuegosPorEdad={this.JuegosPorEdad} nombreClase={this.nombreClase} nombresJuegos={this.state.nombresJuegos} juegosBuscados={this.state.juegosBuscados} WriteJuego={this.WriteJuego} BuscarJuego={this.BuscarJuego} ReiniciarValores={this.ReiniciarValores} tareasClase={this.state.tareasClase} idTarea={this.idTarea} TareaFinalizada={this.TareaFinalizada} ImprimirTablero={this.ImprimirTablero} CrearTablero={this.CrearTablero} ActualizarEst={this.ActualizarEst} tareaHacer={this.state.tareaHacer}  ConsultarTarea={this.ConsultarTarea} tareasPendientes={this.state.tareasPendientes}  clases={this.state.clases} idUser={this.idUserDB} ConsultaRelacional={this.ConsultaRelacional} GetOut={this.GetOut} ConsultarCodigo={this.ConsultarCodigo}></AppStudent>
      )
    }
    else{
      return(
        <div>
           <AppTeacher ImprimirTablero={this.ImprimirTablero}  CrearTablero={this.CrearTablero} studentIncritos={this.state.studentIncritos} AlumnosIncritos={this.AlumnosIncritos}  CrearTareaPacMan={this.CrearTareaPacMan} CrearTarea={this.CrearTarea} datosUsuarioActual={this.state.datosUsuarioActual} clases={this.state.clases} ConsultaRelacional={this.ConsultaRelacional} CrearClases={this.CrearClases} idUser={this.idUserDB}></AppTeacher>
            <button onClick={this.GetOut}>Salir</button>

        </div>
        
      )
    }

    }
    catch(e){
      //console.log("Hola:",e)

    }
    

  }

  GetOut=()=>
  {
    firebase.auth().signOut()
    .then(e=>{console.log(`Usuario cerro session`)})
    .catch(f=>{console.log(`Error al cerrar sesion ${f.code}`)})
  }

  WrittingLogin=(e)=>
  {
    this.setState({[e.target.name]:e.target.value})
  }

  WrittingCreating=(obj)=>
  {
    /*Esta funcion se comprota diferente a la de WrittingLogin ya que se setea una
    variable de tipo estado array  */
    const {newUserInfo} = this.state
    newUserInfo[obj.target.name] = obj.target.value
      
    this.setState({newUserInfo})
  }

  CreateUser=()=>
  {
    const {newUserInfo} = this.state
    firebase.auth().createUserWithEmailAndPassword(this.state.userName,this.state.pass)
    .then(e=>{

      /*Una vez creado el usuario, creamos un ruta en la BD para este*/ 
      this.addUser=firebase.database().ref().child(`${newUserInfo[0]}`)
      /*e inmeditamente insertamos la informacion dl usuario creado*/ 
      this.addUser.push().set({
        /*newUserInfo variable que obtiene valores al escribir en el fiormulario 
        de crear usuario*/
        cuenta:newUserInfo[0],
        nombre:newUserInfo[1],
        apellidos:newUserInfo[2],
        nacionalidad:newUserInfo[3],
        estudios:newUserInfo[4],
        /*Es importante almacenar el uid porque de esa forma podemos vincular los
         datos del usurio creado con su respectivo nodo en la BD*/
        uid:e.user.uid
      })
      
    })
    .catch(f=>{console.log(`Error al crear usuario: ${f.code}`)})

  }

  Login=()=>{
    firebase.auth().signInWithEmailAndPassword(this.state.userName,this.state.pass)
    .then(e=>{console.log(`Usuario logueado con exito: ${e.user.email}`)})
    .catch(f=>{console.log(`Error al iniciar sesion: ${f.code}`)})
  }

  AsignarTipoUser(tipo)
  {
    //Se hace una consultado al nodo que se pasa como parametro 
    this.tipoUsuario = firebase.database().ref().child(`${tipo}`).orderByChild("uid").equalTo(`${this.state.user.uid}`)

    /*/Listener que ayuda a asignar el valor de usuario encontrado a la variable de 
    estado datosUsuarioActual*/
      this.tipoUsuario.on('value',e=>{
        /*Se requiere de un try catch porque simpre habra un caso en null y al 
        querer recorrer ese obj se produce un error*/
        try{
          Object.keys(e.toJSON()).forEach(t=>{
            //console.log(e.toJSON()[t])
            this.idUserDB = t
            this.setState({datosUsuarioActual:e.toJSON()[t]})

          })
        }  
        //console.log(`${tipo}: ${e.toJSON()}`)
        catch(e){
          //console.log(e)
        }  
      })
  }

  CrearClases=(nomb,desc)=>
  {
    this.idClase = "lista"
    this.addClase.push().set({nombre:nomb,descripcion:desc})
  }

  GenerarCodigo(keyObtenida)
  {
    //Se inicializa en 2 para que inserte un valor en  la primera vuelta del for
    let contGenerar =2
    let contChar= 0

    //For para recorrer la key de la tarea creada
    for(let i =1;i<20;i++)
    {
      //contGenerar variable que cuenta posiciones en general 
      if(contGenerar ==2)
      {
        //contChar variable que cuenta cuando ya se hallan almacenado las 2 posicones
        if(contChar ==2)
        {
          contGenerar=1
          contChar=0
        }
        else
        {
          //Acumulamos los caracteres para ir creando el id de la tarea
          this.codigoClase+=keyObtenida[i]
          //Esto sucede en la primera ejecucion del for ya que solo tomara un caracter
          if(i==1)
          {
            contChar=0
            contGenerar=0;
          }
          else
          {
            contChar++
          }
          
        }
      }
      else
      {
        contGenerar++;
      }
    }

    console.log(this.codigoClase)
  }


 
  CrearTarea=(tem,subTem,nombAct,instruc,pos,words,tipoAct,up,idClase)=>
  {
    this.addTarea.push().set({tema:tem,subtema:subTem,nombre:nombAct,instrucciones:instruc,posiciones:pos,palabras:words,tipo:tipoAct,vidas:up})
    this.RutasTareas(idClase)

  }

 
  CrearTareaPacMan=(tem,subTem,nombAct,instruc,time,preg,resps,repsCorrectas,tip,idClase)=>
  {
    this.addTarea.push().set({tema:tem,subtema:subTem,nombre:nombAct,instrucciones:instruc,tiempo:time,preguntas:preg,respuestas:resps,correctas:repsCorrectas,tipo:tip})
    this.RutasTareas(idClase)
  }

  RutasTareas(idClase)
  {
    this.addTarea = firebase.database().ref().child(`/TareasDeClases/${idClase}/${this.idTarea}`)
    this.addTarea.set({creada:true})
    this.addTarea = firebase.database().ref().child(`/TareasDocentes/${this.idTarea}/${this.idUserDB}`) 
    this.addTarea.set({estado:"usuario creador"})
    this.addTarea = firebase.database().ref().child("Tareas")

  }
  ConsultarCodigo=(code)=>
  {
    let key = ""
    
    this.codeQuery= firebase.database().ref().child("/Clases").orderByChild("id").equalTo(code)
    console.log(this.codeQ)

    this.codeQuery.on("value",r=>{
      console.log(r.toJSON())
      Object.keys(r.toJSON()).forEach(y=>{key =y})
      this.codeQuery = firebase.database().ref().child(`/InscripcionClase/${this.idUserDB}/${key}`)
      this.codeQuery.set({code:code})

      this.codeQuery = firebase.database().ref().child(`/ListaAlumnos/${key}/${this.idUserDB}`)
      this.codeQuery.set({inscrito:true})

    })

  }

  ConsultaRelacional=(idObjClick,nodoPrincipal,nodoReferencia,classHomework)=>
  {
    
    const {studentIncritos,clases,tareasPendientes,tareasClase} = this.state
    let contTareas =0;
    let tarea =true
    //Operador ternario de If para saber que tipo de valor asignar a una variable dependiendo de que tipo de parametro recibe
    let id =(nodoPrincipal=="ListaAlumnos" || nodoPrincipal=="TareasDeClases" )? idObjClick.target.id:idObjClick
    this.nombreClase= (nodoPrincipal=="TareasDeClases" )?idObjClick.target.title:null

    //Varibale que almacena un id, que solo es necesario cuando se activa esta funcion para ver tareas de las clases
    this.idClaseTarea = id

    studentIncritos.splice(0,studentIncritos.length)
    this.codeQuery = firebase.database().ref().child(`/${nodoPrincipal}/${id}`)

    this.codeQuery.on("value",p=>{
     // console.log(p.toJSON())

      Object.keys(p.toJSON()).forEach(t=>
        {
          //console.log(t)
          this.codeQuery = firebase.database().ref().child(`/${nodoReferencia}/${t}`)

          this.codeQuery.on("value",y=>{

            //Es llamada desde una sesion de docente para ver que alumnos estan incritos en su clase
            if(nodoPrincipal == "ListaAlumnos")
            {
              this.EstadoConsulta(studentIncritos,y.key,y,"ListaAlumnos")
            }
            else
            {
              //Es llamada por una session de alumno para ver en que clases esta incrito
              if(nodoPrincipal === "InscripcionClase")
              {
                this.EstadoConsulta(clases,y.key,y,"InscripcionClase")
              } 
              else
              {
                //Es llamado desde el parrafo de cada clase a la que estas incrito desde el componente de Paizarron
                if(nodoPrincipal =="TareasDeClases")
                {
                  if(classHomework ==null)
                  {
                    //Se hace una referencia a "TareasRealizadas" para saber que tareas ha hecho ya el alumno
                    this.codeQuery = firebase.database().ref().child(`TareasRealizadas/${this.idUserDB}/${this.idClaseTarea}`)
                    
                    this.codeQuery.on("value",a=>{
                      try {
                         //Leemos los datos del nodo para ver si la tarea que se va a insertar ya esta en "TareasRealizadas"
                      Object.keys(a.toJSON()).forEach(u=>{
                        
                        /*Vefificamos si la tarea a insertar coincide con alguna de las tareas que ya ha hecho el 
                        usuario para ya no insertarlas en "tareasPendientes" y que no se muestren otra vez*/
                        //y.key = tarea a insertar | u = tareas de "TareasRealizadas"
                        if(y.key == u)
                        {
                          tarea = false
                        }

                      })

                      //En caso de que la tarea a insertar no este realizada, se inserta en la vafiable de estado
                      if(tarea ==true)
                      {
                        this.EstadoConsulta(tareasPendientes,y.key,y,"TareasDeClases")
                        this.setState({tareasPendientes})
                      }
                      tarea = true
                      contTareas++
                        
                      } catch (error) {
                        console.log(error)
                        this.EstadoConsulta(tareasPendientes,y.key,y,"TareasDeClases")
                        this.setState({tareasPendientes})
                      }
                     
                      
                    })
                  }
                  else
                  {
                    /*Esto sucede cuando clickeamos una <p> de una clase desde el pizarron, estando el la route
                    de /Calificaciones */
                    this.EstadoConsulta(tareasClase,y.key,y,"TodasTareas")
                  }
                  
                
                }
                else{
                  //Es llamada por un maestro para saber que clases ha creado
                  if(nodoPrincipal =="ClasesCreadas")
                  {
                    this.EstadoConsulta(clases,y.key,y,"ClasesCreadas")  
                  }
                }
              }

            }

        })
      })
    })
    
  }


  EstadoConsulta(varEst,keyConsulta,registro,accion)
  {
    let estInsertar =true
    const {tareasClase} = this.state

    //Verificamos si en la variable estado ya existe un obj igual al que se quiere insertar
    varEst.map(k=>{
      if(k.key == keyConsulta)
      {
        estInsertar = false
      }
    })

    if(estInsertar == true)
    {
      if(accion == "ListaAlumnos")
      {
        varEst.push({nombre:registro.toJSON().nombre,apellidos:registro.toJSON().apellidos})
      }
      if(accion == "InscripcionClase")
      {
        varEst.push({key:registro.key,nombre:registro.toJSON().nombre})
      }

      if(accion == "TareasDeClases")
      {
        varEst.push({key:registro.key,nombre:registro.toJSON().nombre})
      }

      if(accion == "ClasesCreadas")
      {
        varEst.push({key:registro.key,nombre:registro.toJSON().nombre,descripcion:registro.toJSON().descripcion})
      }
      if(accion == "TodasTareas")
      {
        /*Ademas de mostrar las tareas en la route /Calificaciones tenemos que mostrar la nota obtenida para esa
        tarea si la hay*/

        //Es por eso que hay que hacer referencia al nodo de TareasRealizadas ya que este almacena la nota
        this.codeQuery = firebase.database().ref().child(`TareasRealizadas/${this.idUserDB}/${this.idClaseTarea}/${registro.key}`)
       
        this.codeQuery.on("value",y=>{
          /*Es necesario un try porque no todas las tareas estan en TareasRelizadas por tanto tampoco tinen una nota
           y por eso puede que el "value" no devuelva nada*/
          try 
          {
            console.log(y.toJSON())                                             //Extraemos la nota
            varEst.push({key:registro.key,nombre:registro.toJSON().nombre,nota:y.toJSON().calificacion})
            
          } 
          catch (error) 
          {
            console.log(error)
            varEst.push({key:registro.key,nombre:registro.toJSON().nombre,nota:null})
            
          }
          this.setState({tareasClase})
        })
      }
     this.setState({varEst})
      
    }
    else
    {
      console.log("registro ya almacenado: "+registro)
    }
    estInsertar =true
  }

  //Funcion ejecutada desde el componente de pizarron
  ConsultarTarea=(keyTarea)=>
  {
    console.log(keyTarea)
    this.codeQuery = firebase.database().ref().child(`Tareas/${keyTarea}`)
    this.idTarea = keyTarea
    this.codeQuery.on("value",p=>{
      console.log(p.toJSON())
      //variable que almacena los datos la tarea seleccionada para hacer para despues utilizarlos en la act.
      this.state.tareaHacer = p.toJSON()
      
    })
  }

  ActualizarEst=()=>
  {
    /*Esta variable estado se actualiza aqui porque esta funcion es llamada cuando presionas el boton iniciar
    del <Pizarron>*/ 
    let {tareaHacer} = this.state
    this.setState({tareaHacer})
  }

  CrearTablero(varEst,letrasColor){
    const letras = ["a","b","c","d","e","f","j","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

    //Ciclo que accede a los elemntos del array de estado tablero 
    for(let f=0; f<12; f++)
    {
         for(let c=0; c<24; c++)
        {
            /*Genera un valor aleatorio de 0 a 25, porque son estas el total de letras
             del array "letras" que ya contiene por defecto*/
            
            var num = Math.floor((Math.random() * 24) + 1);
            varEst[f][c] =letras[num]

            if(letrasColor == null)
            {
              console.log("No se hace nada")
            }
            else
            {
              letrasColor[f][c]={color:"black"}
            }
        }
            
    }
}

ImprimirTablero=(tab,ValidarPosicion,letrasColor,ClickLetras)=>
    {
        let c =-1
        let f =-1
        return(
            <table>
            {
                //Este map se recorre 12 veces ya que son los elemntos totales que tiene el array
                    tab.map(p=>{
                    c=-1;
                    f++
                    return(
                        <tr>
                            {
                                /*"p" es la posicion de array "tablero" que a su vez tambien es un array que contiene
                                24 letras
                                
                                ClickLetras funcion que va a ser ejecutada por cualquiera de las letras del tablero
                                */
                                p.map(g=>{
                                    c++
                                    return(
                                        <th><p style={(ValidarPosicion != null)?letrasColor[f][c]:null} id={c}  title={f}  className="parrafo" onClick={(ValidarPosicion != null)?(e)=>{ValidarPosicion(e,g)}:ClickLetras}>{g}</p></th>
                                    )
                                    
                                })
                            }
                        </tr>
                    )
                })  
            }

        </table>

        )  
        
    }

    //Funcion llamada desde SopaGame que se ejecuta cuando el juego acaba
    TareaFinalizada=(idTarea,calif)=>
    {
      this.codeQuery = firebase.database().ref().child(`TareasRealizadas/${this.idUserDB}/${this.idClaseTarea}/${idTarea}`)
      this.codeQuery.set({calificacion:calif})
    }

    ReiniciarValores=()=>{
      this.setState({tareasPendientes:[],tareasClase:[]})
    }

    WriteJuego=(busqueda)=>
    {
      const {nombresJuegos} = this.state
      if(busqueda !="")
      {
        this.queryJuego = firebase.database().ref().child("/Tareas").orderByChild("nombre").startAt(busqueda).endAt(`${busqueda}\uf8ff`)
        this.queryJuego.on("value",p=>{
          console.log(p.toJSON())
          Object.keys(p.toJSON()).forEach(v=>{
            if(nombresJuegos.length ==0)
            {
              nombresJuegos.push({nombre:p.toJSON()[v].nombre})
              this.setState({nombresJuegos})
            }
            else
            {
              nombresJuegos.map(g=>{
                console.log("g.nombre: ",g.nombre)
                console.log("p.toJSON()[v].nombre: ",p.toJSON()[v].nombre)
                if(g.nombre != p.toJSON()[v].nombre)
                {
                  nombresJuegos.push({nombre:p.toJSON()[v].nombre})
                  this.setState({nombresJuegos})
                }
              })   
            }         
          })
        })
      }
      else
      {
        this.setState({nombresJuegos:[]})
      }
     
    }

    BuscarJuego=(busqueda)=>{
      console.log(busqueda)
      const {juegosBuscados,nombresJuegos} = this.state
      nombresJuegos.splice(0,nombresJuegos.length)
      juegosBuscados.splice(0,juegosBuscados.length)
      //Se busca la tarea de acuerdo a lo que escribes en elinput haciendo query a un child
      this.queryJuego = firebase.database().ref().child("/Tareas").orderByChild("nombre").startAt(busqueda).endAt(`${busqueda}\uf8ff`)
      
      //Tareas encontradas
      this.queryJuego.on("value",p=>{
        
        //Se recorre cada una de las tareas
        Object.keys(p.toJSON()).forEach(k=>{
          console.log("Tarea ID: "+k)
          
          //Con la key de las tareas encontradas puedes acceder a un nodo que permite ver que docente creo la tarea
          this.queryJuego = firebase.database().ref().child(`/TareasDocentes/${k}`)

          //Accedemos a los datos dentro del nodo resultante que seria el key del docenyte que creo la tarea
          this.queryJuego.on("value",x=>{

            //Accedemos al key del docente encontrado
            Object.keys(x.toJSON()).forEach(l=>{
              console.log(l)

              //Ya con la key del docente,ahora si procedemos a buscarlo en el nodo de Docentes
              this.queryJuego = firebase.database().ref().child(`/Docente/${l}`)

              /*Obtenemos la informacion del docente y ahora insertamos los datos de la tarea y 
              del docente en una variable de estado*/
              this.queryJuego.on("value",t=>{
                console.log(t.toJSON())
                juegosBuscados.push({keyTarea:k,nombre:p.toJSON()[k].nombre,tipo:p.toJSON()[k].tipo,fecha:null,UserName:t.toJSON().nombre,from:t.toJSON().nacionalidad})
                this.setState({juegosBuscados})
              })
            })

          })
        })
      })
    }

    JuegosPorEdad=(tipoJuego)=>
    {
      //Array para almacenar los juegos 
      let arrayJuegos=[]
      var num = 0 
      
      /*Se consultan las tareas de acuerdo a su propiedad edad que es la misma que la
      la edad del alumno que este usasno la app*/
      this.queryJuego = firebase.database().ref().child("/Tareas").orderByChild("edad").equalTo(15)
      this.queryJuego.on("value",p=>{
        console.log(p.toJSON())
        Object.keys(p.toJSON()).forEach(k=>{

          if(tipoJuego == p.toJSON()[k].tipo)
          {
              arrayJuegos.push({tema:p.toJSON()[k].tema,subtema:p.toJSON()[k].subtema,
              nombre:p.toJSON()[k].nombre,instrucciones:p.toJSON()[k].instrucciones,
            palabras:p.toJSON()[k].palabras,posiciones:p.toJSON()[k].posiciones,
            tipo:p.toJSON()[k].tipo,vidas:p.toJSON()[k].vidas,key:k})
          }

        })
      })
      console.log(arrayJuegos)
      //Se genera un numero aleatorio de entre la longitud de las tareas encontradas

      num =Math.floor((Math.random() * (arrayJuegos.length-1)) + 1);
      this.idTarea = arrayJuegos[num].key
      console.log(this.idTarea)
      console.log(arrayJuegos[num])

      /*Se hace referencia a una tarea del array y se le asigna a una variable 
      de estado que almacenara la informacion del juego que jugara el alumno*/
      this.setState({tareaHacer:arrayJuegos[num]})
    }
}

export default App;
