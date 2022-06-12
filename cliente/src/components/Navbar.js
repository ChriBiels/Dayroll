import {Link, useMatch, useResolvedPath} from 'react-router-dom'
import '../Styles/Navbar.css'
import LoginButton from './LoginButton';
import { LogoutButton } from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
export default function NavBar() {
    const {isAuthenticated} = useAuth0()
    return (
    <nav className='nav'>
        <Link to="/home" className='site-title  '><img className='logo d-none d-lg-block d-xl-block d-md-block' src='https://i.imgur.com/ZeAqJgn.png'/>Dayroll</Link>
        <ul>
        <CustomLink to="/home">Home</CustomLink>
        <CustomLink to="/recipes">Recetas</CustomLink>
        {isAuthenticated ? <CustomLink to="/account">Cuenta</CustomLink>: <></> }
        {isAuthenticated ? (
          <>
            <LogoutButton className="button" />
          </>
        ) : (
          <LoginButton className="button" />
        )}
        </ul>

    </nav>
    )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}