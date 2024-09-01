import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../features/DarkMode';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const DarkModeToggle = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.DarkMode.isDark);
    return (
        <div>
            {/* <input type="checkbox" class="checkbox" id="checkbox" onClick={() => dispatch(toggleDarkMode())} />
            <label for="checkbox" class="checkbox-label">
                <i class="fas fa-moon"></i>
                <i class="fas fa-sun"></i>
                <span class="ball"></span>
            </label> */}
            <li onClick={() => dispatch(toggleDarkMode())} >
                {isDarkMode ? (
                    <MdLightMode size={24} color="white" />
                ) : (
                    <MdDarkMode size={24} />
                )}
            </li>
        </div >
    );
};

export default DarkModeToggle;
