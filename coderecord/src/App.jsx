import React from 'react'
import './App.scss'
import Header from './components/header/header'

export default function App() {
  const userDetails = {
    isAuthenticated: 'true',
  }
  return (
    <div className="app-body">
       <Header userDetails={userDetails}></Header>
    </div>
  )
}
