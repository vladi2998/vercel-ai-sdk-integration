"use client"
import Canvas from "../components/canvas";
import Nodes from "../components/nodes";
import OutputResults from "../components/outputResults";
import { useState} from 'react';

interface NodesData{
  type: string,
  system: string,
  pre: string,
  post: string
}



export default function Home() {

  const [nodes, setNodes] = useState<NodesData[]>([]); 
  const [outputSteps, setOutputSteps] = useState<string[]>([]) 

  return (
    <main className="bg-slate-900 flex min-h-screen flex-row p-24 justify-between scroll-auto">

      <Nodes nodes={nodes} setNodes={setNodes} />
      <Canvas nodes={nodes} setNodes={setNodes} outputSteps={outputSteps} setOutputSteps={setOutputSteps}/>
      <OutputResults outputSteps={outputSteps}/>
      
    </main>
  );
}
