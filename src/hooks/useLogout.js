import { auth } from "firebase/config"
import { useEffect, useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)

  const logout = async () => {
    setIsPending(true)
    setError(null)
    try {
      await auth.signOut()
      dispatch({ type: 'LOGOUT' })

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

  return { logout, isPending, error }
}