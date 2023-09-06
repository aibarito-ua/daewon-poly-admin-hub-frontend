import React from 'react';
export default function registMouseDownDrag(
    onDragChange: (deltaX: number, deltaY: number) => void,
    stopPropagation?: boolean,
  ) {
    return {
      onMouseDown: (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
        // 2️⃣
        if (stopPropagation) clickEvent.stopPropagation();
        
        // 3️⃣
        const mouseMoveHandler = (moveEvent: MouseEvent) => {
          // 4️⃣
          const deltaX = moveEvent.screenX - clickEvent.screenX;
          const deltaY = moveEvent.screenY - clickEvent.screenY;
          onDragChange(deltaX, deltaY);
        };
  
        // 5️⃣
        const mouseUpHandler = () => {
          document.removeEventListener('mousemove', mouseMoveHandler);
        };
  
        // 1️⃣
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler, { once: true });
      },
    };
  }
