//This component will to help to separate firebase logic from the components
//To do this, create custom hook
//This custome hook is a function will be responsible for handling the file upload and return usefule values regarding that upload like upload progress, image url, etc.

import React, { useState, useEffect } from 'react'
import { projectStorage } from '../firebase/config'


const useStorage = (file) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(null)//image url that we get back from storaage after image is fully uploaded

  useEffect(() => {
    //References
    const storageRef = projectStorage.ref(file.name)//creating a ref to a file inside a default firebase bucket. 

    storageRef.put(file)
      .on('state_changed',
        (snapshot) => {
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setProgress(percentage)
        },
        (error) => {
          setError(error)
        },
        async () => {
          const url = await storageRef.getDownloadURL()
          setUrl(url)
        }
      )
  }, [file])//Everytime we have new 'file' value, this function will run

  return { progress, url, error }
}

export default useStorage


