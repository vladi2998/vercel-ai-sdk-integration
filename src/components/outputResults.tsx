interface Output {
    outputSteps: any[];
  }

export default function OutputResults(props:Output) {
    return (
      <aside className =" h-[80dvh] w-[30%] ">
          <div className="w-full h-full flex flex-col justify-between">
                <h1 className = "flex w-full justify-center bg-slate-700  rounded-3xl py-6 text-4xl text-white border border-slate-300"> OUTPUT </h1>
                <div className="flex flex-col justify-start w-full h-5/6 bg-slate-800 rounded-3xl border border-slate-300 py-10 px-4 overflow-auto no-scrollbar">
                    {props.outputSteps.map((value, idx)=>(
                        <div key={idx} className="flex flex-col w-full">
                            <h2 className="font-bold text-white text-2xl "> Step #{idx+1}</h2>
                            <br/>
                            <p className="font-medium text-white text-xl text-justify indent-6">{value}</p>
                            <br/>
                        </div>
                    ))}
                </div>
          </div>
      </aside>
    );
  }
  
  
  