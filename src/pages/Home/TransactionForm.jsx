import { useFirebase } from 'hooks/useFirebase'
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { MdError } from 'react-icons/md'

// style
import style from './Home.module.css'

export default function TransactionForm({ uid }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const {response, addDocument} = useFirebase('transactions')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !amount) return
    addDocument({ name, amount, uid })
  }

  useEffect(() => {
    if (response.success) {
      setName('')
      setAmount('')
    }
  }, [response.success])

  return (
    <>
      <h2>Add a Transaction</h2>
      <form onSubmit={handleSubmit}>
        {response.error && (
          <div className={style.error}>
            <MdError size={24} />
            {response.error}
          </div>
        )}
        <div className={style.field}>
          <div>Transaction Name:</div>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className={style.field}>
          <div>Amount ($):</div>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        {response.isPending ? (
          <button className={`${style.btn} ${style['btn-loading']}`} disabled>
            <span>Saving...</span>  
            <div className='spin'>
              <AiOutlineLoading3Quarters style={{ width: '100%', height: '100%' }} size={24}/>
            </div>
          </button>
        ) : <button className={style.btn}>Add Transaction</button>}
      </form>
    </>
  )
}
