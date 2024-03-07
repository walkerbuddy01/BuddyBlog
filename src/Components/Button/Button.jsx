import React, { forwardRef } from "react";

function Button({ children, type, className = "" ,...props}, ref) {
  return (
    <button type={type} className={`${className}`} ref={ref} {...props}>
      {children}
    </button>
  );
}

export default forwardRef(Button);
