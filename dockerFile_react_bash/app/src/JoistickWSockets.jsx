import React, { useState } from 'react';
import ReactNipple from 'react-nipple';
import { io } from "socket.io-client";
import ROSLIB from 'roslib';
import { useEffect } from 'react';

//Conecta al client con el websocket server
const socket=io('http://localhost:3000')

export default function JoistickWSockets() {
  //maneja el estado de conexión con el servidor

    const [conexionWS, setConexionWS] = useState(false)
    const [ros, setRos] = useState(null);

    useEffect(() => {
      socket.on("connect",()=>setConexionWS(true))

      
    }, [])
  
    
    
  
    const handleJoystickMove = (data) => {
      const valorX=(data.x-768)/75
      const valorZ=((data.y-369.6000061035156)*-1)/75
        const twist = new ROSLIB.Message({
          linear: {
            x:valorX,
            y: 0.0,
            z: 0.0,
          },
          angular: {
            x: 0.0,
            y: 0.0,
            z: valorZ,
          },
        });

        //mensaje
        console.log(twist)
  
        const cmdVelTopic = new ROSLIB.Topic({
          ros: ros,
          name: '/cmd_vel',
          messageType: 'geometry_msgs/Twist',
        });

        //topico
        console.log(cmdVelTopic)

        //enviamos el mensaje y el topico al servidor
        socket.emit('mensaje_a_topico',{
          topico:cmdVelTopic,
          mensaje:twist
        })
  
        // cmdVelTopic.publish(twist);
        
      
    };
  
    return (
      <>
        {/* Agrega tu componente del joystick que dispare handleJoystickMove con las coordenadas x e y */}
        {/* Por ejemplo, puedes usar el componente que proporcionaste en preguntas anteriores */}

        {
          (conexionWS) ? (<h2>Conectado</h2>) : (<h2>Desconectado</h2>)
        }
        <div>
        <ReactNipple
          options={{
            mode: 'static',
            color: 'hsl(219, 84%, 56%)',
            position: { top: '50%', left: '50%' },
            size: 150,
            treshold: 0.1,
          }}
          style={{
            width: 250,
            height: 250,
          }}
          onMove={(evt, data) => handleJoystickMove(data.position)}
          
        />

        </div>
      </>
    );
  }