import { useState } from "react";
import GeneralModalCard from "./generalModal";

interface ListNodesProps {
  nodes: any[];
  setNodes: React.Dispatch<React.SetStateAction<any[]>>;
}


export default function Nodes(props : ListNodesProps) {

  const [hidden, setHidden] = useState(true)
  const [currentModalName, setCurrentModalName] = useState("")

  const [formData, setFormData] = useState({ "type": "", "system": "", "pre": "", "post": ""})


  const handleSelect = (type: string) =>{
    setFormData({ "type": type, "system": "", "pre": "", "post": ""})
    setCurrentModalName(type)
    setHidden(false)

  }

  const handleFormData = (key: string, data: string)=>{
    setFormData((prevData) => ({
      ...prevData,
      [key]: data
    }));
  }

const handleAddNode = () =>{
  props.setNodes([...props.nodes, formData])
  setHidden(true)
}


  const handleModal = (type: string) =>{

    if(type=="ai"){
      return(
        <div className="flex flex-col justify-center content-center p-4">
          <textarea cols={100} rows={6} placeholder={"Add context to your LLM"} className="w-full h-full p-4 border-0 bg-gray-800 focus:ring-0 text-white text-xl font-bold placeholder-gray-400 rounded-2xl" value={formData.system} onChange={(e)=>handleFormData("system", e.target.value)}/>
          <button onClick = {handleAddNode} className="h-full w-full my-4 py-3 bg-orange-200 rounded-3xl font-bold text-3xl hover:bg-orange-300 hover:ring-2 hover:ring-white" >Add</button>
        </div>
      )
    }

    if(type=="if"){
      return(
        <div className="flex flex-col justify-center content-center p-4">
          <textarea cols={100} rows={4} placeholder={"Write a if statement"} className="w-full h-full my-4 p-4 border-0 bg-gray-800 focus:ring-0 text-white text-xl font-bold placeholder-gray-400 rounded-2xl" value={formData.pre} onChange={(e)=>handleFormData("pre", e.target.value)}/>
          <textarea cols={100} rows={4} placeholder={"Write a else statement"} className="w-full h-full p-4 border-0 bg-gray-800 focus:ring-0 text-white text-xl font-bold placeholder-gray-400 rounded-2xl"value={formData.post} onChange={(e)=>handleFormData("post", e.target.value)}/>
          <button onClick = {handleAddNode} className="h-full w-full my-4 py-3 bg-orange-200 rounded-3xl font-bold text-3xl hover:bg-orange-300 hover:ring-2 hover:ring-white" >Add</button>
      </div>
      )
    }

    if(type=="wrap"){
      return(
        <div className="flex flex-col justify-center content-center p-4">
          <textarea cols={100} rows={4} placeholder={"Text before your prompt"} className="w-full h-full my-4 p-4 border-0 bg-gray-800 focus:ring-0 text-white text-xl font-bold placeholder-gray-400 rounded-2xl" value={formData.pre} onChange={(e)=>handleFormData("pre", e.target.value)}/>
          <textarea cols={100} rows={4} placeholder={"Text after your prompt"} className="w-full h-full p-4 border-0 bg-gray-800 focus:ring-0 text-white text-xl font-bold placeholder-gray-400 rounded-2xl" value={formData.post} onChange={(e)=>handleFormData("post", e.target.value)}/>
          <button onClick = {handleAddNode} className="h-full w-full my-4 py-3 bg-orange-200 rounded-3xl font-bold text-3xl hover:bg-orange-300 hover:ring-2 hover:ring-white" >Add</button>
        </div>
      )
    }
  }


  return (
    <aside className =" h-[80dvh] w-[15%] ">
        <div className="w-full  h-full flex flex-col justify-between">
            <h1 className = "flex w-full justify-center bg-slate-700  rounded-3xl py-6 text-4xl text-white border border-slate-300"> NODES </h1>
            <div className=" flex flex-col justify-start w-full h-5/6 bg-slate-700 rounded-3xl border border-slate-300 py-10 px-7 overflow-y-auto no-scrollbar">
              <button onClick={()=>{handleSelect("ai")}} className="bg-green-300 my-4 text-center w-full font-black rounded-3xl py-6 text-2xl text-slate-950 border border-slate-950 hover:bg-green-400">LLM</button>
              <button onClick={()=>{handleSelect("if")}} className="bg-blue-300 my-4 text-center w-full font-black rounded-3xl py-6 text-2xl text-slate-950 border border-slate-950 hover:bg-blue-400">IF</button>
              <button onClick={()=>{handleSelect("wrap")}} className="bg-yellow-300 my-4 text-center w-full font-black rounded-3xl py-6 text-2xl text-slate-950 border border-slate-950 hover:bg-yellow-400">WRAP</button>
            </div>

           
        </div>
        <GeneralModalCard name={"Node " + currentModalName} hidden={hidden} setHidden={setHidden}> 
          {handleModal(currentModalName)}
        </GeneralModalCard>
    </aside>
  );
}


