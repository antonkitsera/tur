import React, { useEffect } from "react"
import API from "../adminAPI";

import Sidenav from "../adminComponents/Sidenav"

import useMediaQuery from "./useMediaQuery"

const Layout = ({ children }) => {

  useEffect(() => {
    if(localStorage.getItem('adminToken')) {
        API.get("/admin/language")
        .then(res => {
            if(res.status !== 200) {
                window.location.pathname = "/admin"
            }    
        })
        .catch(error => {
          window.location.pathname = "/admin"
          return error;
        })
    }
  }, []);

  const isMediaSmall = useMediaQuery('(max-width: 1024px)');

  return (
    <>
        <main className="main">
          {isMediaSmall ? 
            <>
              <p className="main__error"><span className="main__error-big">На цьому пристрої адмін панель не доступна.</span> Будь ласка, використайте ноутбук чи планшет із розширенням екрану від 1024px!</p>
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