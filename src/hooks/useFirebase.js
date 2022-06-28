import { useState, useReducer, useEffect } from "react"
import { db, timestamp } from "firebase/config"

const initialValues = {
  documents: null,
  isPending: false,
  error: null,
  success: false
}

const firebaseReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        documents: null,
        isPending: true,
        error: null,
        success: false
      }
    case 'ADD_DOCUMENT':
      return {
        ...state,
        documents: action.payload,
        isPending: false,
        success: true
      }
    case 'DELETE_DOCUMENT':
      return {
        ...state,
        isPending: false,
        success: true
      }
    case 'ERROR':
      return {
        ...state,
        isPending: false,
        error: action.payload
      }
    default:
      return state
  }
}

export const useFirebase = (collection) => {
  const [response, dispatch] = useReducer(firebaseReducer, initialValues)
  const [isCancelled, setIsCancelled] = useState(false)
  const ref = db.collection(collection)

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })
    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({ ...doc, createdAt })
      dispatchIfNotCancelled({
        type: 'ADD_DOCUMENT',
        payload: addedDocument
      })
    } 
    catch (error) {
      dispatchIfNotCancelled({
        type: 'ERROR', 
        payload: error.message
      })
    }
  }

  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })
    try {
      await ref.doc(id).delete()
      dispatchIfNotCancelled({ type: 'DELETE_DOCUMENT' })
    }
    catch (error) {
      dispatchIfNotCancelled({
        type: 'ERROR', 
        payload: error.message
      })
    }
  }

  // when component unmount
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { response, addDocument, deleteDocument }
}