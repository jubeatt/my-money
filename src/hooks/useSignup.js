import { useEffect, useState } from "react"
import { auth } from "firebase/config"
import { useAuthContext } from "./useAuthContext"

export function useSignup () {
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName) => {
    setIsPending(true)
    setError(null)
    try {
      // create user
      const response = await auth.createUserWithEmailAndPassword(email, password)
      if (!response.user) throw new Error('Signup failed.')
      // update profile
      await response.user.updateProfile({ displayName })
      // update global state
      dispatch({
        type: 'LOGIN',
        payload: response.user
      })
      // update state
      if (!isCancelled) {
        setIsPending(false)
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { error, isPending, signup }
}