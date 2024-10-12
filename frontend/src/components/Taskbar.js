import React, { useState } from 'react';
import File from './taskbar/File';
import Edit from './taskbar/Edit';

export default function Taskbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);

    const handleMenuOpen = (event, menuName) => {
        setAnchorEl(event.currentTarget);
        setActiveMenu(menuName);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setActiveMenu(null);
    };

    const handleMenuHover = (menuName, event) => {
        if (activeMenu && activeMenu !== menuName) {
            setAnchorEl(event.currentTarget);
            setActiveMenu(menuName);
        }
    };

    function handleListKeyDown(event) {
        console.log('event', event.key);
        if (event.key === 'Tab') {
            handleMenuClose();
        } else if (event.key === 'Escape') {
            handleMenuClose();
        }
    }
    
    return (
        <>
            <File
                open={activeMenu === 'file'}
                anchorEl={anchorEl}
                onMenuOpen={(e) => handleMenuOpen(e, 'file')}
                onMenuClose={handleMenuClose}
                onMenuHover={(e) => handleMenuHover('file', e)}
                onKeyDown={handleListKeyDown}
            />
            <Edit
                open={activeMenu === 'edit'}
                anchorEl={anchorEl}
                onMenuOpen={(e) => handleMenuOpen(e, 'edit')}
                onMenuClose={handleMenuClose}
                onMenuHover={(e) => handleMenuHover('edit', e)}
                onKeyDown={handleListKeyDown}
            />
        </>
    );
}
