import React from "react"

import Sidenav from "../adminComponents/Sidenav"

import useMediaQuery from "./useMediaQuery"

const Layout = ({ children }) => {

  const isMediaSmall = useMediaQuery('(max-width: 1200px)');

  return (
    <>
        <main className="main">
          {isMediaSmall ? 
            <>
              <p className="main__error"><span className="main__error-big">На цьому пристрої адмін панель не доступна.</span> Будь ласка, використайте ноутбук чи планшет із розширенням екрану від 1200px!</p>
            </>
             :
            <>
              <Sidenav/>
              {children}
            </>
          }
        </main>
    </>
  )
}

export default Layout