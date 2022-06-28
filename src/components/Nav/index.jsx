import { useAuthContext } from 'hooks/useAuthContext'
import { useLogout } from 'hooks/useLogout'
import React from 'react'
import { Link } from 'react-router-dom'

// style
import style from './Nav.module.css'

export default function Nav() {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  return (
    <nav className={style.nav}>
      <div className={`${style.container} container`}>
        <h1 className={style.title}>
          <Link to="/">mymoney</Link>
        </h1>
        <div className={style.options}>
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <>
              <div>Hello, {user.displayName}</div>
              <button className="btn" onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
