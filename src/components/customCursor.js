import React, { useEffect } from 'react';
import '../pages/App.css'; 

function CustomCursor() {
  useEffect(() => {
    const cursor = document.querySelector('.cursor');

    const updateCursorPosition = (e) => {
      cursor.style.top = e.pageY - 10 + 'px';
      cursor.style.left = e.pageX - 10 + 'px';
    };

    document.addEventListener('mousemove', updateCursorPosition);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);

  return (
    <div className="cursor">
    </div>
  );
}

export default CustomCursor;
