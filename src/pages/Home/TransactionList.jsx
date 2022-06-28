import { useFirebase } from 'hooks/useFirebase'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

// style
import style from "./Home.module.css"

export default function TransactionList({ transactions }) {
  const { deleteDocument } = useFirebase('transactions')

  return transactions.map(transaction => (
    <div className={style.transaction} key={transaction.id}>
      <div className={style.name}>{transaction.name}</div>
      <div className={style.amount}>${transaction.amount}</div>
      <button
        className={style['btn-close']}
        onClick={() => deleteDocument(transaction.id)}
      >
        <AiOutlineClose style={{ width: '100%', height: '100%' }} />
      </button>
    </div>
  ))
}
