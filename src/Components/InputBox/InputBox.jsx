import React, { forwardRef, useState, useId } from "react";

function InputBox(
  { label = "", labelclass = "", type = "text", placeholder, classname = " ", ...props },
  ref
) {
  const [value, setValue] = useState("");
  const id = useId();
  return (
    <div className="w-full">
      {label && (<label htmlFor={id} className={`font-medium text-sm ${labelclass}`}>{label}</label>)}
      <input
        type={type}
        placeholder={placeholder}
        className={`${classname}`}
        {...props}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        ref={ref}
        id={id}
        
      />
    </div>
  );
}

export default forwardRef(InputBox);
