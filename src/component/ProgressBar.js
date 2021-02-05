import React, { useEffect } from 'react'
import useStorage from '../hooks/useStorage'

const ProgressBar = ({ file, setFile }) => {
  const { url, progress } = useStorage(file)
  //to hide the progress bar upon completion, we will need to setFile to null. To seTfile to null, we have to keep track of the url beacuse url returend from firebase confirms the addition of image to database and progress/fully uploaded. to do that useEffect for sideEffect

  useEffect(() => {
    url && setFile(null)
  }, [url, setFile])


  return (
    <div className="progress-bar" style={{ width: progress + "%" }}>
    </div>
  )
}

export default ProgressBar
