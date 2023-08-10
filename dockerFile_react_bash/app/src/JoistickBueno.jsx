import React, { useState } from 'react';
import ReactNipple from 'react-nipple';
import DebugView from 'react-nipple/lib/DebugView';

export default function JoistickBueno() {
    const [data, setData] = useState();
    const [coordenadas, setCoordenadas] = useState({
        x:null,
        y:null
    })
    const handleEvent = (evt, data) => {
        const valores=data
        console.log(evt)
        if(!data.position){
            return
        }
       
        const valorX=(valores.position.x-768)/75
        const valorY=((valores.position.y-369.6000061035156)*-1)/75

        setCoordenadas({
            x:valorX,
            y:valorY
        })
        setData({
            ...data,
            position:{
                x:valorX,
                y:valorY
            }
        });   
        console.log({coordenadas})
    };

    return (
        <>
            <div>
                <ReactNipple
                    options={{ mode: "static",
                    color: "hsl(219, 84%, 56%)",
                    position: { top: "50%", left: "50%" },
                    size: 150,
                    treshold: 0.1,}}
                    style={{
                        width: 250,
                        height: 250,
                      }}
                    onStart={handleEvent}
                    onEnd={handleEvent}
                    onMove={handleEvent}
                    onDir={handleEvent}
                    onPlain={handleEvent}
                    onShown={handleEvent}
                    onHidden={handleEvent}
                    onPressure={handleEvent}
                />
                <DebugView data={data} />
            </div>
        </>
    );
}
