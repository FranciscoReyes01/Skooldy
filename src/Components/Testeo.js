import React, { Component } from 'react'
import Fondo from '../Imagenes/Fondo.png'
import EmptyPlat from '../Imagenes/EmptyPlat.png'
import Caja from '../Imagenes/Caja.png'
import Plataforma from '../Imagenes/Plataforma.png'
import Player from '../Imagenes/Alien.png'

export default class PlataformasGame extends Component {

    componentDidMount()
    {
        //Inicializa el canvas
        this.canvas = document.getElementById("canvasJuego")
        this.ctx = this.canvas.getContext('2d')

        
        /*Varibale de objeto que almacena las propiedades de la plataforma que al inicio del juego aparece
        para que el alien este sobre ella*/
        this.objPlatInicial={x:100,y:this.canvas.height-55,width:100,height:55,hidde:false}

        //Contiene las propiedes del alien o player
        this.objPlayer={x:this.objPlatInicial.x,y:this.canvas.height-this.objPlatInicial.height-55,width:50,height:55,movido:false}
        this.cajaObj={x:this.canvas.width-250,y:30,width:200,height:400}

        //Funcion que recupera informacion de la tarea en "tareaHacer"
        this.CargarDatos()


        //Se activa cuando se presiona una tecla
        document.addEventListener("keydown",(e)=>{

            //Se creo una copia para no afectar al arreglo original 
            var arrayCopia =  this.propCadenas.slice();
            //Valida que la tecla que se presione se la correcta para hacer saltar al alien
            if(e.key == "f")
            {   
                /*Extraemos los objetos que no esten en la caja es decir las plataformas que 
                esten puestas en la oracion*/
                this.objPlatSaltar= arrayCopia.filter(p => p.x != this.cadPosiciones[0].x)
                        
                
                //Calculamos la distancia qiue hay de cada plataforma fuera de la caja co el alien
                for (const i in this.objPlatSaltar) 
                {
                    var plat = this.objPlatSaltar[i]
                    plat.distAlien =Math.sqrt(Math.pow((plat.x-this.objPlayer.x), 2)+Math.pow((plat.y-this.objPlayer.y),2))
                }

                /*Se ordenan las plataformas de "objPlatSaltar" de acuerdo a la distacia el orden es de menor
                 a mayor
                  */
                var posX = this.objPlatSaltar
                posX.sort(function(a, b) {
                    return a.distAlien - b.distAlien;
                });     
                
                //Puede contener una plataforma o dos 
                this.objPlatSaltar = posX
                this.saltar = true
                console.log(this.objPlatSaltar)
               
            }
           
           
        })

        //Se ejecuta cuando hacermos click
        document.addEventListener("mousedown",click=>{

            //Recorremos a las cadenas es decir a las pltaformas creadas para la oracion 
            for (const i in this.propCadenas) 
            {

                var cad = this.propCadenas[i]

                /*Cada que se hace click se revisa si puntero ha colisionado con alguna de las plataformas*/
                if(this.props.Colisiones(this.puntero,cad))
                {
                     //Condicional para validar que solo podamos atrapar a las plataformas que no han sido atrapadas
                     if(cad.atrapado==false)
                     {
                        //Se la propiedad "atrapado" para que solo esta plataforma siga al puntero
                        cad.atrapado = true

                        //Se almcena la posicion original que tiene la plataforma seleccionada en la caja  


                        /*Variable para saber que objeto es que el se se atrapo*/
                        this.posAtrapado= i

                        /*Condicional para verificar que la plataforma que clikeamos esta o no puesta ya en la
                        oracion*/
                        for (const k in this.propOraciones)
                        {            
                            var pasrteOracion =this.propOraciones[k]
                            /*Para optimizar, y ya que sabemos que la pltaforma solo puede estar
                            haciendo colision de un inicio con las plataformas vacias que tienen su 
                            propiedad "usada" en true*/
                            if(pasrteOracion.usada==true)
                            {
                                /*Verificamo si la pltaforma que agarramos esta haciendo
                                colision con la platafroma vacia*/
                                if(this.props.Colisiones(cad,pasrteOracion))
                                {

                                    console.log("QUITAR USADO")
                                    /*Variable que impedira que se detecte colision entre las plataformas
                                    y plataformas vacias*/
                                    this.colVacias=false

                                    /*Se cambia el estado de la plataforma vacia para poder volver a meter 
                                    un plataforma ahi*/
                                    pasrteOracion.usada = false
                                    
                                    /*Intervalo que despues de 3 segundos vuelve a "colVacias" a true, esto 
                                    significa que ya se detectara colison otra vez de las plastaformas*/
                                    this.tiempoColision=window.setInterval(()=>{
                                        console.log("intervalo lento")
                                        this.colVacias=true
                                        clearInterval(this.tiempoColision)
                                    },3000)
                                }
                            }
                        }
                        break
                     }
                   
                }
              }

        })


        //Se ejecuta cada que movemos el mouse
        document.addEventListener("mousemove",flecha=>{

            //Cada que se mueva el puntero la posicion de este se le asigna a el obj "puntero"
            this.puntero.x = flecha.clientX
            this.puntero.y = flecha.clientY

            let posCadena = -1

            /*Se busca si hay alguna plataforma que haya sido clickeada, si no se encuntra niguna pos "posCdena"
            vale -1*/
            posCadena= this.propCadenas.findIndex(e=> e.atrapado==true)
            if(posCadena !=- 1)
            {
                //La plataformas clickeada en "mousedown" seguira la posicion del cursor
                this.propCadenas[posCadena].x =  flecha.clientX 
                this.propCadenas[posCadena].y = flecha.clientY
            }
        })
    }
    constructor()
    {
        super()
        this.saltar = false
        this.intervaloPrueba = null
        this.segundos=0

        this.canvas = null
        this.intervalo = null
        //Intervalo para esperar a detectar colision cuando saquemos a una plataforma de una plataforma vacia
        this.tiempoColision=null
        this.ctx =null
        this.numOracion =null

        //"oraciones" contiene a todas la oraciones de la actividad
        //"partesOracion" contendra a la cadena ecogida descompuesta por partes
        //"propOraciones" contiene las propiedades para pintar las partes de la oracion en el canvas
        this.oraciones=[]
        this.partesOracion =[]
        this.propOraciones=[]

        this.cadenas=[]
        this.propCadenas=[]
        //Variable para almceenar las posiciones originales de las plataformas por si se regresan a las caja
        this.cadPosiciones=[]
        this.ayuda = true
        
        
        this.fondo = new Image()
        this.fondo.src = Fondo
        //Variable que contendra la iagen de la plataforma vacia
        this.platVacia = new Image()
        this.platVacia.src =EmptyPlat

        //Contenedor dem las plataformas
        this.caja = new Image()
        this.caja.src =Caja

        this.alien = new Image()
        this.alien.src =Player

        this.cajaObj=null
        this.objPlatSaltar = null
        


        this.plataforma =new Image()
        this.plataforma.src=Plataforma

        //Obj para hacer colicion con las plataformas y asi poder moverlas
        this.puntero ={x:0,y:0,width:20,height:20}
        this.objPlayer=null
        this.objPlatInicial=null
        this.posAtrapado = null
        this.calificar = false
        
        //Variables para devolver a las cajas las plataformas

        this.colCaja=false
        this.colVacias=true
        this.califIntervalo = null

        this.state={
            vidas:0,
            correctas:0,
            incorrectas:0
        }


    }

    render() 
    {
        return (
            <div>
                <h3>Plataformas</h3>
                <button onClick={()=>{
                    this.IniciarJuego()
                    this.intervalo = window.setInterval(()=>{this.Update()},1000/55)}
                     }>Iniciar
                </button>
                <h3>Correctas: {this.state.correctas}</h3>
                <h3>Incorrectas: {this.state.incorrectas}</h3>
                <canvas id="canvasJuego"  width="800" height="500"></canvas>
            </div>
        )
    }

    Update()
    {
        //console.log("Update")

       

        //Se dibuja el fondo que sera del mismo tamaño que le canvas
        
        this.ctx.drawImage(this.fondo,0,0,800,500)

        /*Funcion que se ejcutara cuando el proceso de saltar de alien haya terminado osea que las platafomas 
        fueron calificadas*/
        //this.OracionCalificada(this.propOraciones,null) 
        //this.OracionCalificada(this.propCadenas,"checar")

        //Funcion que bajara de la parte superiro del canvas a la oracion que se genero
        this.BajarOracion(this.canvas.height/2)
        this.BajarPlayer()

        //Pinta el contendor de las plataformas
        this.ctx.save()
        this.ctx.drawImage(this.caja,this.cajaObj.x,this.cajaObj.y,this.cajaObj.width,this.cajaObj.height)
        this.ctx.restore()

        this.SaltarAlien()

        //Funcion que pintara las plataformas
        this.DibujarOracion()
        this.DibujarCadenas()
        this.DibujarAlien()
        this.DibujarPuntero()
        this.ColVacia_Plataforma()
    
        
     
        
    }

    CargarDatos()
    {
        //Recuperamos las oraciones totales de la actividad y al ser un obj se convierten a array
        this.oraciones=Object.values(this.props.tareaHacer.preguntas)
        this.setState({vidas:this.props.tareaHacer.vidas})
    }

    IniciarJuego()
    {
        //Genera valor aleatorio para selecionar una pregunta
        var cantOraciones= (Object.keys(this.oraciones).length)-1
        let num =null


        while(num ==null)
        {
            
            num = Math.floor(Math.random() *((cantOraciones+1) - 0) + 0)
    
            if(this.oraciones[num] =="")
            {
                num =null
            }
        }


        //Almacenamos las posicion de la oracion escogida
        this.numOracion = num

        //En "partesOracion" que es un array se almacenaran las cadenas de la oracion descompuesta
        this.partesOracion= this.oraciones[num].split([" "])
       
        
        /*Funcion que crea objs en "propOraciones" de acuerdo al numero de cadenas que se obtuvieron 
        de descomponer la oracion escogida*/ 
        this.CrearObjOracion()

        //Funcion que buscara las cadenas  que le corresponden a la oracion escogida
        this.DatosPregunta(num,this.props.tareaHacer)
       
        /*De acuerdo a las cadenas encontradas para la oracion que se almcenan en "cadenas", se crearan objs
        en "propCadenas" para crear las plataformas en el canvas*/
        this.CrearObjCadenas()
    }


    DatosPregunta(numAleat,obj)
    {
        /*Funcion  que lee directamente de "tareaHacer" las respuestas y almacena en "cadenas" las que les 
        correspondan a la oracion*/
        var objRecorrer =obj.respuestas

        Object.keys(objRecorrer).forEach(r=>{
            if(r[r.length-1] ==numAleat)
            {
                //Almacena las cadenas para la oracion
                this.cadenas= Object.values(objRecorrer[r])
            }
        })
    }

    CrearObjOracion()
    {
        let sumPos=0
        for (const i in this.partesOracion)
        {
            var pedazo = this.partesOracion[i]
            this.propOraciones.push({
                x:100+sumPos,
                y:0,
                oracion:pedazo,
                usada:false
            })
            sumPos+=100
        }
    }

    DibujarOracion()
    {
        let cadEncontrada = undefined
        this.ctx.save()

        //Se recorren las propiedes de las cadenas resultantes de separar la oracion
        for (const i in this.propOraciones)
        {
            var prop= this.propOraciones[i]

            /*Buscamos en las cadenas para la oracion si alguna de ellas es igual a una de las partes de la 
            oracion descompuestas, si no hay un match retorna undefined  */
            cadEncontrada = this.cadenas.find(c=> c == prop.oracion+" ")

            if(cadEncontrada !=undefined)
            {
 
                /*Se econtro una cadena similar a una parte de la oracion descompuesta, lo que significa que 
                dicha cadena es una posible respuesta por lo que enves de pintar la cadena, se pinta 
                una plataforma vacia*/

                /*Se les asigna un ancho y un alto para poder derectar colisiones con las plataformas que 
                arrastremos a la plataformas vacia que se generara aqui*/
                prop.width =100
                prop.height =55
                /*Propiedad importante para despues diferenciar a los objs que enves de pintar texto pintaran 
                una platafroma vacia*/
           
                prop.img=true
                this.ctx.drawImage(this.platVacia, prop.x,prop.y,prop.width,prop.height)
            }
            else
            {
                //No econtro una cadena similar a una parte de la oracion descompuesta
                this.ctx.font = "20px Georgia";
                this.ctx.fillText(prop.oracion, prop.x, prop.y);
            }
            
            
        }
        this.ctx.restore()
    }

    CrearObjCadenas()
    {
        let masPos =0
        for (const i in this.cadenas) 
        {
            this.propCadenas.push({
                x:this.canvas.width-190,
                y:90+masPos,
                width:100,
                height:55,
                text:this.cadenas[i],
                atrapado:false,
                //propieda para saber con que detectar la colision, si con la caja o los inputs
                usado:false
            })

            //Se almacena las posiciones en la caja para cada pltaforma
            this.cadPosiciones.push({
                x:this.canvas.width-190,
                y:90+masPos
            })
            

            masPos+=70
        }
    }
    DibujarCadenas()
    {
        
        this.ctx.save()
        for (const i in this.propCadenas) 
        {
            var cadProp = this.propCadenas[i]
            
            this.ctx.drawImage(this.plataforma,cadProp.x,cadProp.y,cadProp.width,cadProp.height)
            this.ctx.font = "20px Georgia";
            this.ctx.fillText(cadProp.text, cadProp.x+25, cadProp.y+40);
        }
        this.ctx.restore()
    }

    DibujarPuntero()
    {
        this.ctx.save()
        this.ctx.fillStyle='red'
        this.ctx.fillRect(this.puntero.x,this.puntero.y,this.puntero.width,this.puntero.height)
        this.ctx.restore()
    }

    ColVacia_Plataforma()
    {
        
        //Esto solo se ejecutara cuando el usuarion haya clikeado alguna plataforma
        if(this.posAtrapado !=null && this.colVacias==true)
        {
            //Se recorren a los objetos de las partes de la oracion pintada en el canvas
            for (const i in this.propOraciones) 
            {
                var objOracion = this.propOraciones[i]

                /*Para optimizar el juego solo verificaremos colision con aquelos obj que sabemos que enves 
                de cadena tienen una plataforma vacia*/
                if(objOracion.img && objOracion.usada !=true)
                {
                    //Verifica colision de la plataforma con las plataformas vacias
                    if(this.props.Colisiones(this.propCadenas[this.posAtrapado],objOracion))
                    {
                        
                        //Ya no seguira la posicion del cursor
                        this.propCadenas[this.posAtrapado].atrapado = false

                        //La plataforma se coloca en la misma posicion en la que estaba la plataforma vacia
                        this.propCadenas[this.posAtrapado].x = objOracion.x
                        this.propCadenas[this.posAtrapado].y = objOracion.y
                       

                        //Para que ya no se ejecute esta funcion hasta seleccionar otra plataforma
                        this.posAtrapado = null

                        /*Para que no se haga colision con las plataformas vacias que ya tienen una plataforma
                        enciam*/
                        objOracion.usada =true

                    }
                } 
            }
        }

        /*Detecta colision con la caja para devolver la plataforma a su posicion original,*/
        if((this.posAtrapado !=null && this.propCadenas[this.posAtrapado].x <(this.canvas.width-this.cajaObj.width-this.propCadenas[this.posAtrapado].width-60))|| this.colCaja)
        {
            this.colCaja =true
            if(this.props.Colisiones(this.propCadenas[this.posAtrapado],this.cajaObj))
            {
                //Se la asigna a la pltafoirma la posicion que tenia en la caja
                this.propCadenas[this.posAtrapado].x = this.cadPosiciones[this.posAtrapado].x
                this.propCadenas[this.posAtrapado].y = this.cadPosiciones[this.posAtrapado].y
                this.propCadenas[this.posAtrapado].atrapado = false
                
                this.colCaja =false
                this.posAtrapado = null
            }
        }
    }

    DibujarAlien()
    {
        this.ctx.save()
        this.ctx.drawImage(this.alien,this.objPlayer.x,this.objPlayer.y,this.objPlayer.width,this.objPlayer.height)
        
        //Cuando ya hallasmo contestado una oracion la plataforma se oculta
        
        if(this.objPlatInicial.hidde !=true)
        {
            this.ctx.drawImage(this.plataforma,this.objPlatInicial.x,this.objPlatInicial.y,this.objPlatInicial.width,this.objPlatInicial.height)
        }

        
        this.ctx.restore()
    }

    SaltarAlien()
    {
        let valSumar=0
        if(this.saltar)
        {
            try 
        {
            /*Variable que almacenara el valor que se le tiene que sumar a X del alien dependiendo de la plataforma
            a la cual tenga que saltar*/
            /*La operacion para sacar ese valor esta basado en que el alien llega a la posicion en Y maxima en 2
            segundos y haciendo un testeo, se obtuvieron los valores 3 y 445*/
            valSumar  =(this.objPlatSaltar[0].x*3)/445
            
            /*Condicional se cumple hasta que presionemos una tecla y en el evento a "objPlatSaltar" se le asigne
            los objetos de la plataformas que estan puesta en la oracion*/
            if(this.objPlayer.y > this.objPlatSaltar[0].y-this.objPlatSaltar[0].height  && this.ayuda==true)
            {
            
                //Se sumaran valores hasta que el alien llegue a su posicion maxima en Y
                //this.objPlayer.x +=valSumar
                (this.objPlatSaltar[0].x < this.objPlayer.x)?this.objPlayer.x -=valSumar:this.objPlayer.x +=valSumar
                this.objPlayer.y -=3
                this.calificar =true
            }
            else
            {
              
                /*Condicional que se encarga de ejecutar lo que esta dentro solo cuando el alien haya llegado a su
                posicion maxima en Y*/
                if(this.calificar == true)
                {
                    console.log("CAL")
                    
                  

                    /*Se la pasa como segundo parametro la longitusd para que solo mueve la oracion cuando
                     su valor sea 1 es decir calificaria y moveria a la oracion cuando solamente haya un 
                     pltaforma puesta  en la oracion y cuando haya dos esperaria hasta que salte a la segunda 
                     platafroma cuando se califica a esta y como paramtro se veulve a ingresar 1*/
                     //Aqui se califica la primera plataforma
                    this.CalificarPlataforma(0,this.objPlatSaltar.length)
                   
                }
                else
                {
                   
                    //Condicional para saber si hay dos platafpr,as puestas en la oracion
   
                    if(this.objPlatSaltar.length==2)
                    {
                        
                        valSumar  =((this.objPlatSaltar[0].x+this.objPlatSaltar[1].x)*2)/246
                        
                        //Alien brinca para saltar a la otra plataforma
                        if(this.objPlayer.y > (this.objPlatSaltar[0].y-this.objPlatSaltar[0].height) - this.objPlayer.height && this.ayuda==true)
                        {
                            //Se sumaran valores hasta que el alien llegue a su posicion maxima en Y
                            (this.objPlatSaltar[1].x < this.objPlayer.x)?this.objPlayer.x -=valSumar:this.objPlayer.x +=valSumar

                           // this.objPlayer.x +=valSumar
                            this.objPlayer.y -=2

                        }
                        else
                        {
                            //Se vulve a false para ya no entrara a iotras condiciones y asi no se encimen las mecanicas
                            this.ayuda = false

                            valSumar  =((this.objPlatSaltar[0].x+this.objPlatSaltar[1].x)*2)/246

                            //Alien baja a la segunda plataforma
                            if(this.objPlayer.y < this.objPlatSaltar[1].y - this.objPlatSaltar[1].height)
                            {
                                //this.objPlayer.x +=valSumar
                                (this.objPlatSaltar[1].x < this.objPlayer.x)?this.objPlayer.x -=valSumar:this.objPlayer.x +=valSumar

                                this.objPlayer.y +=4
    
                            }
                            else
                            {
                                //Cuando termina de bajar se detiene esta funcion
                                //Aqui se califica la segunda plataforma
                                this.CalificarPlataforma(1,1)
                            }

                        }
                    }
  
                }
                
               
            }
        } catch (error) {
            
        }
        }
        

      
       
    }

    CalificarPlataforma(posPlat,estMover)
    {
        let posArrayOriginal =null
        
        /*Para poder chechar la colision de la plataforma a la que llego el alien
        con la plataforma vacia que se encuentra debajo de ella se necesita el objeto 
        original en "propCadenas" y no la posicion que se copio en "objPlatSaltar"*/
        //Se obtiene la posicion del objeto original
        posArrayOriginal = this.propCadenas.findIndex(c => c.text ==this.objPlatSaltar[posPlat].text)

        //Se recorre a las partes de la operacion
        for (const i in this.propOraciones)
        {
            var parte=this.propOraciones[i]
            
            //Se verifica colision de las plataformas vacias con la plataforma a la que llego el alien
            if(this.props.Colisiones(parte,this.propCadenas[posArrayOriginal]))
            {
                console.log(parte)
                //Verificamos si las los textos de las propiedades coinciden o no
                if(parte.oracion+" " == this.propCadenas[posArrayOriginal].text)
                {
                    console.log("Respuesta correcta")
                    
                    //Para controlar cuando de movera la oracion hacia abajo
                    if(estMover==1)
                    {
                       // this.saltar = false
                        this.objPlayer.movido = true
                        //this.objPlatSaltar= null
                       
                        //La plataforma incial obtiene la posiucion de la ultima plataforma eb la que estuvi el alien
                        this.objPlatInicial.x = this.propCadenas[posArrayOriginal].x
                        this.objPlatInicial.y = this.propCadenas[posArrayOriginal].y
                        
                        
                        this.setState({correctas:this.state.correctas+1})
                        this.EstadoJuego()
                   
                    }
                   
                    this.calificar =false

                }
                else
                {
                   
                    this.saltar = false
                    this.objPlayer.movido = true
                    this.objPlatInicial.hidde = true
                    this.setState({incorrectas:this.state.incorrectas+1})
                    console.log("Respuesta incorrecta")
                    //this.EstadoJuego()
                }
            }
                            
        }
    }

    BajarPlayer()
    {
        if(this.objPlayer.movido)
        {
            this.objPlayer.y+=1
            this.objPlatInicial.y+=1

            if( this.objPlayer.y>this.canvas.height-100)
            {
                this.objPlayer.movido=false
                /*Esta codicional se cumple cuando la respuesta es incorrecta ya que se oculta la plataforma
                incial para hacer que el alien caiga hacia abajo*/
                if(this.objPlatInicial.hidde == true)
                {
                    /*Se vuelve a mostrar la plataforma incial, ademas de que esto funcionara para 
                    que al contestar corrctamente no se inicialize el juego*/
                
                    //Cuando el player haya terminado de caer se etablece su posicion original
                    this.objPlatInicial={x:100,y:this.canvas.height-55,width:100,height:55,hidde:false}
                    this.objPlayer={x:this.objPlatInicial.x,y:this.canvas.height-this.objPlatInicial.height-55,width:50,height:55,movido:false}
                    
                    this.EstadoJuego()
                }
            }
        }
    }


    BajarOracion(lim)
    {
        /*Condicional para optimizar y que solo ejecute el for mientras que las partes de la oracion  
        tengan un valor menor en "y" al de la mitad de la altura del canvas*/
        if(this.propOraciones[0].y <lim)
        {
            for (const i in this.propOraciones) 
            {
                //console.log("Hola")
                var ora = this.propOraciones[i]

                ora.y++                 
                
            }
        }
        
    }

    EstadoJuego()
    {
        let seguir = []
        this.ayuda = true
        this.calificar = false
        /*Se hace una copia para poder extraer la plataforma en la que se quedara parado el alien
        despues de que se borre la oracion y se genere la nueva*/
        
        this.saltar = false
        this.objPlatSaltar= null
        this.oraciones[this.numOracion] = ""
        this.propCadenas=[]
        this.propOraciones=[]

        //Verificamos si todvia hay oraciones para contestar
        seguir = this.oraciones.filter(e => e != "")
        console.log(seguir)
        if(seguir.length !=0)
        {
            this.IniciarJuego()
        }
        else
        {
            clearInterval(this.intervalo)
            let calif = (this.state.correctas *10)/this.oraciones.length

            this.props.TareaFinalizada(this.props.idTarea,calif)
            console.log("SE ACABO EL JUEGO")
        }
    }   
}
