import React, { useState } from 'react';

function App() {
  const [selectedText, setSelectedText] = useState<string | null>(null);

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    const selectedText = window.getSelection()?.toString();
    if (selectedText) {
      setSelectedText(selectedText);
    }
  };

  const clearSelectedText = () => {
    setSelectedText(null);
  };

  return (
    <div className='flex flex-1 w-full' onContextMenu={handleContextMenu}>
      <div>
        <span>Some </span>
        <span>text </span>
        <span>surrounded </span>
        <span>by </span>
        <span>multiple </span>
        <span>layers </span>
        <span>of </span>
        <span>spans.</span>
      </div>
      <div>
        {selectedText ? (
          <div className="highlight" onClick={clearSelectedText}>
            {selectedText}
          </div>
        ) : null}
      </div>
        
    </div>
  );
}

export default App;
