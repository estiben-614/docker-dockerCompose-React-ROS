import React, { useState } from 'react';
import ReactNipple from 'react-nipple';
import DebugView from 'react-nipple/lib/DebugView';
import ROSLIB from 'roslib';

export default function JoistickROS() {
    const [ros, setRos] = useState(null);
  
    // Conexión a ROS al montar el componente
    React.useEffect(() => {
      const url = 'ws://192.168.1.58:9090'; // Cambiar por la URL correcta
      const ros = new ROSLIB.Ros({
        url: url,
      });
  
      ros.on('connection', function () {
        console.log('Connected to ROS Bridge.');
      });
  
      ros.on('error', function (error) {
        console.log('Error connecting to ROS Bridge: ', error);
      });
  
      ros.on('close', function () {
        console.log('Connection to ROS Bridge closed.');
      });
  
      setRos(ros);
  
      // Limpieza al desmontar el componente
      return () => {
        if (ros) {
          ros.close();
        }
      };
    }, []);
  
    const handleJoystickMove = (data) => {
      if (ros) {
        const twist = new ROSLIB.Message({
          linear: {
            x: data.x,
            y: data.y,
            z: 0.0,
          },
          angular: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
          },
        });
        console.log(twist)
  
        const cmdVelTopic = new ROSLIB.Topic({
          ros: ros,
          name: '/cmd_vel',
          messageType: 'geometry_msgs/Twist',
        });
        console.log(cmdVelTopic)
  
        cmdVelTopic.publish(twist);
        
      }
    };
  
    return (
      <>
        {/* Agrega tu componente del joystick que dispare handleJoystickMove con las coordenadas x e y */}
        {/* Por ejemplo, puedes usar el componente que proporcionaste en preguntas anteriores */}
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
      </>
    );
  }