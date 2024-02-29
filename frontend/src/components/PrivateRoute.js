import React from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'

const PrivateRoute = ({children}) => {
    const {users} = useSelector((state) => ({...state.auth}))
  return users ? children : <LoadingToRedirect />
}

export default PrivateRoute