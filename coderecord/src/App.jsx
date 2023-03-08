import React from 'react'
import './App.scss'
import Header from './components/header/header'
import Welcome from './components/welcome/welcome'
function getAuthenticatedView (userName) {

}

export default function App() {
  const userName = 'Raghav';
  const isAuthenticated = 'false';
  const userDetails = {
    isAuthenticated: isAuthenticated,
  }
  return (
    <div className="app-body">
       <Header userDetails={userDetails}></Header>
       {(!isAuthenticated || isAuthenticated === 'false') && (<Welcome></Welcome>)}
       {isAuthenticated === 'true' && getAuthenticatedView(userName)}
    </div>
  )
}
