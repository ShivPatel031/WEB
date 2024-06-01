import { useTodoArray } from "../Context/Context"
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Add(){
    const [text,setText] = useState('');
    const {dataArray,setDataArray}=useTodoArray();

    let changeText=(e)=>{
        setText(e.target.value);
    }

    let keyCheck=(e)=>{
        if (e.code == 'Enter'){
            addInDataArray();
        }
    }

    let addInDataArray = ()=>{
        let val={id:uuidv4(),value:text,complete:false}
        setDataArray([...dataArray,val])
    }
    return(
        <div className="flex">
            <input 
                type="text" 
                placeholder="Write Todo..."
                onChange={changeText}
                onKeyDown={keyCheck} 
                className=" text-white w-[500px] h-[40px] rounded-tl-lg rounded-bl-lg bg-white bg-opacity-20 px-3 outline-none"/>

            <button
                onClick={addInDataArray} 
                className="bg-green-500 w-[60px] h-[40px] rounded-tr-lg rounded-br-lg text-white">Add</button>
        </div>
    )
}