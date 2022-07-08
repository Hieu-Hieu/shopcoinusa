import {Link} from 'react-router-dom'

import './header.scss';
import Logo from '../../assets/images/logo.png'

function Header(){

    return (
        <header className='header'>
            <div className='header__inner'>
                <Link to="/" className='header__logo'>
                    <img src={Logo} alt='logo'/>
                </Link>
            </div>
        </header>
    )
}

export default Header;