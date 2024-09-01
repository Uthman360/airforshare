import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import TabsExample from '../components/Tab';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/tab' element={<TabsExample />} />

            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;