import { Avatar } from '@material-ui/core';
import { AccessTime, HelpOutline, Search } from '@material-ui/icons';
import React from 'react';
import { useStateValue } from './StateProvider';
import './Header.css';

function Header() {
    const [{ user }] = useStateValue();

    return (
        <div className='header'>
            <div className='header__left'>
                {/* Avatar for logged in user */}
                <Avatar 
                    className='header__avatar'
                    src={user?.displayName}
                    alt={user?.photoURL}
                />
                {/* time icon */}
                <AccessTime />
            </div>

            <div className='header__search'>
                {/* search__icon */}
                <Search />
                {/* input */}
                <input placeholder='Search here' />
            </div>
            <div className='header__right'>
                <HelpOutline />
                {/* help icon */}
            </div>
        </div>
    )
}

export default Header
