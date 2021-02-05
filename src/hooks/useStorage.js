//This component will to help to separate firebase logic from the components
//To do this, create custom hook
//This custome hook is a function will be responsible for handling the file upload and return usefule values regarding that upload like upload progress, image url, etc.

import { useState, useEffect } from 'react'
import { projectStorage, projectFirestore, timestamp } from '../firebase/config'


const useStorage = (file) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(null)//image url that we get back from storaage after image is fully uploaded

  useEffect(() => {
    //References
    const storageRef = projectStorage.ref(file.name)//creating a ref to a file inside a default firebase bucket. 

    const collectionRef = projectFirestore.collection('images')//This is used to get data from firebase database

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
          const createdAt = timestamp()//To create timestamp, the best way is to create is from firebase server timestamp, 'timestamp' from firebase config
          collectionRef.add({ url, createdAt })
          setUrl(url)
        }
      )
  }, [file])//Everytime we have new 'file' value, this function will run

  return { progress, url, error }
}

export default useStorage


