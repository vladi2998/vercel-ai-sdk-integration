import React, { useState, useEffect, useRef, ReactNode } from "react";

interface GeneralModalCardProps {
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
  name: string;
  children: ReactNode;
}

const GeneralModal: React.FC<GeneralModalCardProps> = ({ hidden, setHidden, name, children }) => {
  const newRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (newRef.current && !newRef.current.contains(e.target as Node)) {
        setHidden(true);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setHidden]);

  return (
    <div hidden={hidden}>
      <div className="bg-gray-900/85 dark:bg-gray-900/80 fixed inset-0 z-40"></div>
      <div className="fixed left-0 right-0 z-50 items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full flex" role="dialog" aria-modal="true" id="add-user-modal">
        <div ref={newRef} className="relative w-full max-w-2xl px-6 md:h-auto">
          <div className="relative bg-slate-700 rounded-2xl shadow dark:bg-gray-800 px-4 border border-white">
            <div className="flex items-center justify-between p-5 pt-6 px-2 border-b-2 border-gray-300 rounded-t dark:border-gray-700">
              <h3 className="text-4xl font-black text-gray-200 dark:text-white">
                {name}
              </h3>
              <button onClick={() => setHidden(true)} type="button" className="text-gray-400 bg-transparent hover:bg-slate-400 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralModal;