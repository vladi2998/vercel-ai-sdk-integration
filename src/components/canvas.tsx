import { useState, useEffect } from "react";
import GeneralModalCard from "./generalModal";
import { generateText } from 'ai';
import { ollama } from 'ollama-ai-provider';

interface ListNodesProps {
    nodes: any[];
    setNodes: React.Dispatch<React.SetStateAction<any[]>>;
    outputSteps: any[];
    setOutputSteps: React.Dispatch<React.SetStateAction<string[]>>;
  }

interface NodesData{
    type: string,
    system: string,
    pre: string,
    post: string
  }

  const if_else = "You will act as an if else condition, you will be given the conditions and a prompt, according to the conditions it returns a coherent response taking into account the prompt"
  

export default function Canvas(props: ListNodesProps) {

    const [hidden, setHidden] = useState(true)
    const [contextHidden, setContextHidden] = useState(true)
    const [executeHidden, setExecuteHidden] = useState(true)
    const [idx, setIdx] = useState(0)
    const [updateNodeData, setUpdateNodeData] = useState({ "type": "", "system": "", "pre": "", "post": ""})
    const [generalContext, setGeneralContext] = useState("")
    const [input, setInput] = useState<string>("")

    const model = ollama('llama3.1');

    useEffect(() => {
        if (hidden){
            setUpdateNodeData({ "type": "", "system": "", "pre": "", "post": ""})
        }
    }, [hidden]);


    const handelExecute = async () =>{

        setExecuteHidden(true)
        props.setOutputSteps([])

        let prompt = input

        for (let i=0; i < props.nodes.length; i++){
    
            const node = props.nodes[i]
            const response = await executeModel(node.type, prompt, node.system, node.pre, node.post)
            prompt = String(response)
            props.setOutputSteps(prevSteps => [...prevSteps, prompt])
        }
    }

    const executeModel = async (type: string, prompt: string, system: string, pre: string, post: string) =>{

        if (type =="ai"){
            const { text } = await generateText({
                model: model,
                system: "General context: "+generalContext + "Local context: " + system,
                prompt: prompt,
            });

            return text

        }

        if(type == "if"){
            const { text } = await generateText({
                model: model,
                system: "General context: "+ generalContext + " . " + if_else,
                prompt: `if condition: ${pre}, else condition: ${post}, prompt: ${prompt}`,
            });

            return text
        }

        if (type == "wrap"){
            return `${pre} \n ${prompt} \n ${post}`
        }
    }

    const openModal = (index: number) => {
        
        setUpdateNodeData({...props.nodes[index]})
        setIdx(index)
        setHidden(false)
    }


    const handleUpdate = () => { 
        const nodes = props.nodes
        nodes[idx] = updateNodeData
        props.setNodes(nodes)
        setHidden(true)

    }

    const handleDelete = () => { 
        const nodes = props.nodes
        nodes.splice(idx, 1);
        props.setNodes(nodes)
        setHidden(true)

    }

    const handleUpdateNodeData = (key: string, data: string)=>{
        setUpdateNodeData((prevData) => ({
          ...prevData,
          [key]: data
        }));
      }

    const handelNodes = (node: NodesData, index: number) =>{
        if (node.type == "ai"){
            return(
                <div onClick ={()=>openModal(index)} key={index} className="flex flex-row justify-center items-center bg-green-300 my-4 text-center w-full font-black rounded-3xl py-6 text-2xl text-slate-950 border border-slate-950 hover:bg-green-400"> 
                    <p>{node.type}</p>
                </div>
            )
        }
        if (node.type == "if"){
            return(
                <div onClick ={()=>openModal(index)} key={index} className="flex flex-row justify-center items-center bg-blue-300 my-4 text-center w-full font-black rounded-3xl py-6 text-2xl text-slate-950 border border-slate-950 hover:bg-blue-400"> 
                    <p>{node.type}</p>
                </div>
            )
        }
        if (node.type == "wrap"){
            return(
                <div onClick ={()=>openModal(index)} key={index} className="flex flex-row justify-center items-center bg-yellow-300 my-4 text-center w-full font-black rounded-3xl py-6 text-2xl text-slate-950 border border-slate-950 hover:bg-yellow-400"> 
                    <p>{node.type}</p>
                </div>
            )
        }
    }

    const handleModal = (index: number) =>{

        if(props.nodes[index]?.type =="ai"){
            return(
                <div className="flex flex-col justify-center content-center p-4">
                    <textarea cols={100} rows={6} placeholder={"Add context to your LLM"} className="w-full h-full p-4 border-0 bg-gray-800 focus:ring-0 text-white text-xl font-bold placeholder-gray-400 rounded-2xl" value={updateNodeData.system} onChange={(e)=>handleUpdateNodeData("system", e.target.value)}/>
                    <div className="flex flex-row w-full">
                        <button onClick = {handleUpdate} className="h-full w-full my-4 py-3 mr-4 bg-orange-200 rounded-3xl font-bold text-3xl hover:bg-orange-300 hover:ring-2 hover:ring-white" >Update</button>
                        <button onClick = {handleDelete} className="h-full w-full my-4 py-3 bg-orange-200 rounded-3xl font-bold text-3xl hover:bg-orange-300 hover:ring-2 hover:ring-white" >Delete</button>
                    </div>
                    
                </div>
            )
        }
    
        if(props.nodes[index]?.type=="if"){
            return(
                <div className="flex flex-col justify-center content-center p-4">
                    <textarea cols={100} rows={4} placeholder={"Write a if statement"} className="w-full h-full my-4 p-4 border-0 bg-gray-800 focus:ring-0 text-white text-xl font-bold placeholder-gray-400 rounded-2xl" value={updateNodeData.pre} onChange={(e)=>handleUpdateNodeData("pre", e.target.value)}/>
                    <textarea cols={100} rows={4} placeholder={"Write a else statement"} className="w-full h-full p-4 border-0 bg-gray-800 focus:ring-0 text-white text-xl font-bold placeholder-gray-400 rounded-2xl"value={updateNodeData.post} onChange={(e)=>handleUpdateNodeData("post", e.target.value)}/>
                    <div className="flex flex-row w-full">
                        <button onClick = {handleUpdate} className="h-full w-full my-4 py-3 mr-4 bg-orange-200 rounded-3xl font-bold text-3xl hover:bg-orange-300 hover:ring-2 hover:ring-white" >Update</button>
                        <button onClick = {handleDelete} className="h-full w-full my-4 py-3 bg-orange-200 rounded-3xl font-bold text-3xl hover:bg-orange-300 hover:ring-2 hover:ring-white" >Delete</button>
                    </div>
                </div>
            )
        }
    
        if(props.nodes[index]?.type=="wrap"){
            return(
                <div className="flex flex-col justify-center content-center p-4">
                    <textarea cols={100} rows={4} placeholder={"Text before your prompt"} className="w-full h-full my-4 p-4 border-0 bg-gray-800 focus:ring-0 text-white text-xl font-bold placeholder-gray-400 rounded-2xl" value={updateNodeData.pre} onChange={(e)=>handleUpdateNodeData("pre", e.target.value)}/>
                    <textarea cols={100} rows={4} placeholder={"Text after your prompt"} className="w-full h-full p-4 border-0 bg-gray-800 focus:ring-0 text-white text-xl font-bold placeholder-gray-400 rounded-2xl" value={updateNodeData.post} onChange={(e)=>handleUpdateNodeData("post", e.target.value)}/>
                    <div className="flex flex-row w-full">
                        <button onClick = {handleUpdate} className="h-full w-full my-4 py-3 mr-4 bg-orange-200 rounded-3xl font-bold text-3xl hover:bg-orange-300 hover:ring-2 hover:ring-white" >Update</button>
                        <button onClick = {handleDelete} className="h-full w-full my-4 py-3 bg-orange-200 rounded-3xl font-bold text-3xl hover:bg-orange-300 hover:ring-2 hover:ring-white" >Delete</button>
                    </div>
                </div>
            )
        }
      }
 
    return (
      <aside className =" h-[80dvh] w-[50%] ">
          <div className="w-full h-full flex flex-col justify-between">
              <h1 className = "flex w-full justify-center bg-slate-700  rounded-3xl py-6 text-4xl text-white border border-slate-300"> CANVAS </h1>
              <div className="flex w-full h-4/6 bg-slate-700 rounded-3xl border border-slate-300 justify-center py-10 px-4 overflow-y-auto no-scrollbar">
                <div className="w-full h-full grid grid-cols-5 grid-rows gap-4 ">
                    {props.nodes.map((node, index)=>(
                        handelNodes(node, index)
                    ))}
                </div>
              </div>
              <div className="flex w-full">
                <button onClick={()=>setExecuteHidden(false)} className="h-full w-full m-2 mx-4 py-3 bg-orange-200 rounded-3xl text-3xl hover:bg-orange-300 hover:ring-2 hover:ring-white" >Execute</button>
                <button onClick={()=>setContextHidden(false)} className="h-full w-full m-2 mx-4 py-3 bg-orange-200 rounded-3xl text-3xl hover:bg-orange-300 hover:ring-2 hover:ring-white">Add Context</button>
              </div>
          </div>
        <GeneralModalCard name={"Update or Delete"} hidden={hidden} setHidden={setHidden}> 
          {handleModal(idx)}
        </GeneralModalCard>
        <GeneralModalCard name={"Add General Context"} hidden={contextHidden} setHidden={setContextHidden}> 
            <div className="flex flex-col justify-center content-center p-4">
                <textarea cols={100} rows={6} placeholder={"Add context to your LLM"} className="w-full h-full p-4 border-0 bg-gray-800 focus:ring-0 text-white text-xl font-bold placeholder-gray-400 rounded-2xl" value={generalContext} onChange={(e)=>setGeneralContext(e.target.value)}/>
            </div>
        </GeneralModalCard>
        <GeneralModalCard name={"Write and Execute"} hidden={executeHidden} setHidden={setExecuteHidden}> 
            <div className="flex flex-col justify-center content-center p-4">
                <textarea cols={100} rows={6} placeholder={"Write your initial prompt"} className="w-full h-full p-4 border-0 bg-gray-800 focus:ring-0 text-white text-xl font-bold placeholder-gray-400 rounded-2xl" value={input} onChange={(e)=>setInput(e.target.value)}/>
                <button onClick = {handelExecute} className="h-full w-full my-4 py-3 mr-4 bg-orange-200 rounded-3xl font-bold text-3xl hover:bg-orange-300 hover:ring-2 hover:ring-white" >Execute</button>
            </div>
        </GeneralModalCard>
          
      </aside>
    );
  }
  
  
  