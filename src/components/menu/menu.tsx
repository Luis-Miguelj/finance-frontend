import { useEffect, useState } from 'react'
import { MenuDesktop } from './menu-desktop'
import { MenuMobile } from './menu-mobile'

interface User {
  name?: string
  createdAt: Date
}

export function Menu({ name, createdAt }: User) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set initial state
    handleResize()

    // Add event listener for window resize
    window.addEventListener('resize', handleResize)

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function handleLogout() {
    localStorage.removeItem('token')
    location.reload()
  }

  return (
    <>
      {isMobile ? (
        <MenuMobile
          name={name}
          createdAt={createdAt}
          handleLogout={handleLogout}
        />
      ) : (
        <MenuDesktop
          name={name}
          createdAt={createdAt}
          handleLogout={handleLogout}
        />
      )}
    </>
  )
}
