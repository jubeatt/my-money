import { useState, useEffect } from "react"
import { db } from "firebase/config"


export const useCollection = ({ collection, query, orderBy }) => {
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    let ref = db.collection(collection)


    if (query) {
      ref = ref.where(...query)
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy)
    }

    const unsubscribe = ref.onSnapshot((snapshot) => {
      setIsPending(true)
      const result = []
      snapshot.docs.forEach(doc => {
        result.push({
          ...doc.data(),
          id: doc.id
        })
      })
      setDocuments(result)
      setIsPending(false)
    }, (error) => {
      // For developer
      console.log(error.message)
      setError('Can not fetch that collection')
      setIsPending(false)
    })
    
    return () => unsubscribe()
  }, [collection, query, orderBy])

  return {isPending, error, documents}
}