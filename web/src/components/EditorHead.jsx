import React from 'react'
import SelectLang from './SelectLang';
import EditorThemeSelect from './EditorThemeSelect';





const EditorHead = () => {
  return (
    <div
      className="h-12  border-b border-gray-200 px-4 
                flex items-center justify-between"
    >
     
      <span className="text-black font-bold text-xl tracking-wide">
        Code Editor
      </span>

   
      <div className="flex items-center gap-3">
        
        <EditorThemeSelect/>

        
        <SelectLang />
      </div>
    </div>
  );
}

export default EditorHead
