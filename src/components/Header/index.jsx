import './index.scss'
import { Link, useLocation } from "react-router-dom";
import logo from '@/assets/logo.png';


const Header = () => {
  const location = useLocation()
  
  return (
    <div className='header'>
      <div className='backdrop'>
        <div className='container'>
          <div className='logo'>
            <img src={logo} alt="logo" />
          </div>
          <input className="checkbox" type="checkbox" id="toggle" />
          <label className="hambuger-container" htmlFor="toggle">
            <span></span>
            <span></span>
            <span></span>
          </label>
          <div className='nav-container'>
            <ul className="nav">
              <li><Link className={`nav__item ${ location.pathname.indexOf('instructions') === 1 && 'nav__item--active'}`} to='/instructions'>使用說明</Link></li>
              <li><Link className={`nav__item ${ location.pathname.indexOf('billing') === 1 && 'nav__item--active'}`} to='/billing'>收費方式</Link></li>
              <li><Link className={`nav__item ${ location.pathname.indexOf('stations') === 1 && 'nav__item--active'}`} to='/stations'>站點資訊</Link></li>
              <li><Link className={`nav__item ${ location.pathname.indexOf('news') === 1 && 'nav__item--active'}`} to='/news'>最新消息</Link></li>
              <li><Link className={`nav__item ${ location.pathname.indexOf('activities') === 1 && 'nav__item--active'}`} to='/activities'>活動專區</Link></li>
            </ul>
            <button className='login-btn'>登入</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header