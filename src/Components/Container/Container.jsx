import React from 'react'

function Container({
    classname = "",
    children,
    ...props
}) {
  return (
    <div className={`${classname}`}  {...props} >
        {children}
    </div>
  )
}

export default Container