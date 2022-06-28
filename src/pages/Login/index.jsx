import { useLogIn } from 'hooks/useLogin'
import React, { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { MdError } from 'react-icons/md'
// style
import style from './Login.module.css'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, error, isPending } = useLogIn()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div className={style.login}>
      <div className='container-sm'>
        <h2>Login</h2>
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
          {isPending ? (
            <button className='btn-loading' disabled>
              <span>Login...</span>  
              <div className='spin'>
                <AiOutlineLoading3Quarters style={{ width: '100%', height: '100%' }} size={24}/>
              </div>
            </button>
          ) : <button className='btn'>Login</button>}
        </form>
      </div>
    </div>
  )
}
