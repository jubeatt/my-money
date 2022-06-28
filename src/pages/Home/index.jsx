import React, { useRef } from 'react'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'
import { useAuthContext } from 'hooks/useAuthContext'
import { useCollection } from 'hooks/useCollection'
import { MdError } from 'react-icons/md'
import { AiOutlineLoading3Quarters, AiFillWarning } from 'react-icons/ai'

// style
import style from './Home.module.css'

export default function Home () {
  const { user } = useAuthContext()
  const config = useRef({
    collection: 'transactions',
    query: ['uid', '==', user.uid],
    orderBy: ['createdAt', 'desc']
  })
  const {isPending, error, documents} = useCollection(config.current)


  return (
    <div className={style.home}>
      <div className={`${style.container} container`}>
        {isPending && (
          <div className='spin-large mt-30'>
            <AiOutlineLoading3Quarters style={{ width: '100%', height: '100%' }} size={24}/>
          </div>
        )}
        {error && (
          <div className='message text-red my-30 items-center text-medium'>
            <MdError size={24} />
            {error}
          </div>
        )}
        <div className={style.content}>
          {!error && !isPending && documents.length === 0 && (
            <div className='message text-yellow my-30 items-center text-medium'> 
              <AiFillWarning size={32} />
              No Transactions...
            </div>
          )}
          {documents && <TransactionList transactions={documents} />}
        </div>
        <div className={style.sidebar}>
          <TransactionForm uid={user.uid} />
        </div>
      </div>
    </div>
  )
}
