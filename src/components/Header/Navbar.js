import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div><header>
    <nav className="navbar navbar-expand-lg navbar-light bg-dark navbar-dark">
  <div className="container">
    <Link to="/" className="navbar-brand" >Logo</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/" className="nav-link active" >Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/notes" className="nav-link" >Notes</Link>
        </li>
        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Hooks
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link to="hooks/useState" className="dropdown-item" >useState</Link></li>
            <li><Link to="hooks/useEffect" className="dropdown-item" >useEffect</Link></li>
            <li><Link to="hooks/useRef" className="dropdown-item" >useRef</Link></li>
            <li><Link to="hooks/useMemo" className="dropdown-item" >useMemo</Link></li>
            <li><Link to="hooks/useContext" className="dropdown-item" >useContext</Link></li>
          </ul>
        </li> */}
        <li className="nav-item">
          
        <Link to="/contact" className="nav-link" >Contact</Link>
        </li>
      </ul>
      <div className='d-flex'>

<Link to="/auth/login" className='btn btn-info'>login</Link>
      </div>
    </div>
  </div>
</nav>
    </header></div>
  )
}
