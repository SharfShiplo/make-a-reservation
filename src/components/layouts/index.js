import React from 'react'
import AppHeader from './header';

function Layout({children}) {
  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center transition-colors duration-150 overflow-x-scroll 2xl:overflow-x-hidden"
    >
        <AppHeader/>
        <main className="w-full bg-white max-w-[1440px] pt-20">
          <div className="p-5 md:p-8 h-full grid place-items-center">{children}</div>
        </main>
    </div>
  )
}

export default Layout;