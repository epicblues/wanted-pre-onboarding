import React from 'react'

interface ArrowProps {
  direction: "left" | "right"
}

const Arrow: React.FC<ArrowProps> = () => {
  return (
    <div className='arrow'>

    </div>
  )
}

export default Arrow
