import React from 'react'

function MainSegment({mainSegmentText}) {
  return (
    <div>
        <h3 className='main-segment' data-testid="mainSegment">{mainSegmentText}</h3>
    </div>
  )
}

export default MainSegment