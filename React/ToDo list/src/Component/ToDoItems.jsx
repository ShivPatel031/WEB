
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useTodoArray } from "../Context/Context";
import { useState } from "react";
import { FaSave } from "react-icons/fa";

export default function ToDoItems({val}){
    const [editText,setEditText] =  useState(val.value);
    const [togal,setTogal]=useState(false);
    const [readonly,setReadonly]=useState(true)
    const {setDataArray,dataArray} = useTodoArray();

    let edit=(e)=>{
        setEditText(e.target.value);
    }

    let editTodo=()=>{
        setReadonly((readonly)=>!readonly)
    }

    let changetogal=()=>{
        setTogal(!togal)
    }
    
    let updateme=(id)=>{
        setDataArray(dataArray.map(element => {  
            if (element.id == id){
                element.value = editText;
                editTodo();
                return element
            }else{
                return element
            }
        }))
    }
    let deleteTodo=(id)=>{
        setDataArray(dataArray.filter((val)=>val.id != id));
      }
    
    return(   
            <div id={val.id} className={`mt-5 flex w-[560px] h-[40px] ${togal ?"bg-green-200":"bg-slate-200"} items-center rounded-lg`}>
                <input 
                    type="checkbox" 
                    className="ml-2"
                    checked={togal}
                    onChange={()=>{
                        if(!readonly){
                            return
                        }else{
                            changetogal()
                        }
                    }}
                    
                 />
                <input 
                    value={editText}
                    readOnly={readonly} 
                    onChange={edit} 
                    className={`w-[460px] ml-4 ${togal ?"line-through":"text-black"} text-lg rounded-lg border-[1px] ${!readonly?'border-black px-2':' border-transparent'} bg-transparent outline-none`}/>
                
                <div className="w-[100px] flex justify-evenly">
                    <button 
                        onClick={()=>{
                            if(togal) return
                            else if (readonly){
                                editTodo()  
                            }else{
                                updateme(val.id);
                            }
                            
                        }}
                        className={`w-[33px] h-[33px] rounded-md ${togal?"opacity-30":"opacity-100" } text-2xl`}>{readonly? <MdEdit />:<FaSave />}</button>
                    <button 
                        onClick={()=>deleteTodo(val.id)}
                        className="w-[33px] h-[33px] rounded-md text-4xl"><IoClose /></button>
                </div>
            </div>   
    )
}