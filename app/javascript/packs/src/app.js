import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router, Routes,
  Route,
} from 'react-router-dom';
import { isSignedIn } from './services/auth.services'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navBar';
import HomePage from './pages/homePages';
import Auth from './components/auth';

export default function App() {
  const [user, setUser] = useState(null)
  const [signedIn, setSignedIn] = useState(false)
  const ifSignedIn = () => {
    isSignedIn()
    .then((res) => {
      setUser(res.user)
      setSignedIn(res.signedIn)
      console.log(res)
    })
  }

  useEffect(() => {
    ifSignedIn()
  }, [])
  return (
    <div>
      <Router>
        <Navbar user={user} />
        <ToastContainer autoClose={4000}/>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<Auth signIn  signedIn={signedIn} />} />
        </Routes>
      </Router>
    </div>
  )
}
