import React from 'react'
import AppHeader from './header';

function Layout({children}) {
  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center transition-colors duration-150"
    >
        <AppHeader/>
        <main className="w-full bg-white w-[1440px] pt-20 h-[85vh] overflow-y-auto overflow-x-scroll 2xl:overflow-x-hidden">
          <div className="p-5 md:p-8 grid place-items-center">{children}</div>
        </main>
    </div>
  )
}

export default Layout;