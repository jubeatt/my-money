import { useSignup } from 'hooks/useSignup'
import React, { useState } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { MdError } from "react-icons/md"

// style
import style from "./signup.module.css"

export default function Signup() {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { isPending, error, signup } = useSignup()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName)
  }

  return (
    <div className={style.signup}>
      <div className='container-sm'>
        <h2>Sigup</h2>
        <form autoComplete='off' onSubmit={handleSubmit}>
          {error && (
            <div className='message text-red my-15'>
              <MdError size={24} />
              {error}
            </div>
          )}
          <div className={style.field}>
            <div>email:</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={style.field}>
            <div>password:</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={style.field}>
            <div>display name:</div>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          {isPending ? (
            <button className='btn-loading' disabled>
              <span>Sending...</span>  
              <div className='spin'>
                <AiOutlineLoading3Quarters style={{ width: '100%', height: '100%' }} size={24}/>
              </div>
            </button>
          ) : <button className='btn'>Signup</button>}
        </form>
      </div>
    </div>
  )
}
