// src/page/Routes.js
import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './Frontend/Home'
import Notes from './Frontend/Notes'
import Contact from './Frontend/Contact'
import Auth  from '../Auth'

export default function index() {
  return (
    <BrowserRouter>
    <Routes>

      <Route Path='/' element={< Home />} />
      <Route Path='/notes' element={< Notes />} />
      <Route Path='/contact' element={< Contact />} />
      <Route path="/auth/*" element={<Auth />} />
      
    </Routes>
    </BrowserRouter>
  )
}
