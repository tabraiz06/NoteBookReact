import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  let history = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token')
    history('/login')
  }
  let location = useLocation();

  React.useEffect(() => {
    // Google Analytics
    console.log(location.pathname);
  }, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid ">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse ms-5" id="navbarNav" >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">ABOUT</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/signupform' ? 'active' : ''}`} to="/signupform">Sign up form </Link>
              </li>

            </ul>

          </div>
          {!localStorage.getItem('token')?<form id='navForm' className="d-flex " style={{ flexDirection: 'row' }}>
            <Link to='/login'>
              <button style={{ color: 'black' }} className="btn btn-outline-success mx-1 " type="submit">Login </button>
            </Link >
            <Link to='/signupform'>
              <button style={{ color: 'black' }} className="btn btn-outline-success mx-1" type="submit">Sign Up </button>
            </Link>

          </form >:<button onClick={handleLogout} style={{ color: 'black' }} className="btn btn-outline-success mx-1" type="submit">Log Out </button>}
        </div>
      </nav>
    </div>
  )
}

export default Navbar

