import React from 'react'

interface ArrowProps {
  direction: "left" | "right",
  onClick: Function
}

const X = "10%";
const Y = "200px"


const Arrow: React.FC<ArrowProps> = ({ direction, onClick }) => {
  return (
    <div className='arrow' style={direction === 'left' ? { top: Y, left: X } : { top: Y, right: X }} onClick={() => { onClick(direction) }}>
      {direction === "left" ? "<" : ">"}
    </div>
  )
}

export default Arrow
