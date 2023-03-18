import React from 'react'
import './LogOut.scss'
import { saveLocalData } from '../../services/localDataService'


export default function LogOut({setAuthenticatedCB}) {
    const logoutHandler = () => {
        saveLocalData();
        setAuthenticatedCB(false);
    }
  return (
    <div className='log-out-btn' onClick={logoutHandler}></div>
  )
}
