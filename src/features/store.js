import { configureStore } from '@reduxjs/toolkit';
import DarkMode from './DarkMode';

const store = configureStore({
    reducer: {
        DarkMode
    },
});

export default store;
