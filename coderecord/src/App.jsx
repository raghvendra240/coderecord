import React, {useState} from 'react'
import './App.scss'
import Header from './components/header/header'
import Welcome from './components/welcome/welcome'
import AuthenticationForm from './components/authenticationForm/authenticationForm'
import Loader from './components/loader/loader'
function getAuthenticatedView (userName) {

}

export default function App() {
  const [isAuthenticationModalOpen, setAuthenticationModal] = useState(false)
  const userName = 'Raghav';
  const isAuthenticated = 'false';
  const userDetails = {
    isAuthenticated: isAuthenticated,
  }
  return (
    <div className="app-body">
       <Header userDetails={userDetails} authenticationModalHandler={setAuthenticationModal}></Header>
       {(!isAuthenticated || isAuthenticated === 'false') && (<Welcome></Welcome>)}
       {isAuthenticated === 'true' && getAuthenticatedView(userName)}
        {isAuthenticationModalOpen && <AuthenticationForm closeModalFn={() => {  setAuthenticationModal(false)}}></AuthenticationForm>}
    </div>
  )
}
