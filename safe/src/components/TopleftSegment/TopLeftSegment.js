import React, {useEffect} from 'react'

function TopLeftSegment({topLeftSegment, safeCodeValues}) {

  // console.log("#############", safeCodeValues)

  useEffect(() => {

  }, [safeCodeValues])
  
  return (
    <div>
        <h3 className='top-left-segment '>{topLeftSegment}</h3>

        <div className=''></div>
    </div>
  )
}

export default TopLeftSegment