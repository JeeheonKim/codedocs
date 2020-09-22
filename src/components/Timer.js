import { Input, Button, TextField, MenuItem, NativeSelect} from '@material-ui/core';
import React, { useState, useEffect } from "react";

const Timer = ({started}) => {
    const [timer, setTimer] = React.useState(0);
    const [hour, setHour] = useState(1);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);

    const id =React.useRef(null);
    const clear= () => {
        window.clearInterval(id.current);
    }
    React.useEffect(()=>{
       id.current = window.setInterval(()=>{
        setTimer((time) => time-1)
      }, 1000)
      return () => clear();
    },[])
    React.useEffect(()=>{
        if(timer === 0){
          clear()
        }
      },[timer])

    const secondsToHMS = (d) => {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    }
    
    let i = 0; let options60=[]; let options3=[]; let MenuItem;
    for (i = 0; i < 60; ++i){
        if (i<3) { options3.push(i)}
        options60.push(i)
    }
    const handleChange = (event) => {
        const id = event.target.id
        const value = event.target.value
        if (id ==="select-hours"){
            setHour(value);
        } else if (id === "select-minutes"){
            setMinute(value);
        } else {
            setSecond(value);
        }
    };

    return(
        !started ? (
        <span className="timer" style={{display: "inline-block"}}>
            <table>
                <tbody>
                <tr>
                    <td>
                        <NativeSelect onChange={handleChange} id="select-hours" label="hours" value={hour}>
                            {options3.map((o) => {
                                return <option value={o}>{("0" + o).slice(-2)}</option>;
                            })}
                        </NativeSelect>
                    </td>
                    <td>:</td>
                    <td>
                        <NativeSelect onChange={handleChange} id="select-minutes" label="minutes" value={minute}>
                            {options60.map(o => {
                                return <option value={o}>{("0" + o).slice(-2)}</option>;
                            })}
                        </NativeSelect>
                    </td>
                    <td>:</td>
                    <td>
                        <NativeSelect onChange={handleChange} id="select-seconds" label="seconds" value={second}>
                            {options60.map(o => {
                                return <option value={o}>{("0" + o).slice(-2)}</option>;
                            })}
                        </NativeSelect>
                    </td>
                </tr>
                </tbody>
            </table>
        </span>
        ): ( <span className="timer" style={{display: "inline-block"}}>
            {/* {setTimer(hour*60*60+minute*60+second)} */}
        </span>
        ) 
)};

export default Timer;