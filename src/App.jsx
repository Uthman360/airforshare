import React, { useEffect } from 'react'
import AppRouter from './config/Router'
import { useSelector } from 'react-redux';

const App = () => {
  const isDark = useSelector((state) => state.DarkMode.isDark);
  useEffect(() => {
    isDark
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [isDark]);

  return (
    <div className={`${isDark ? "dark" : " "}`}>
      <AppRouter />
    </div>
  )
}

export default App