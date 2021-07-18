import React, { memo, useContext } from 'react'
import { Logo } from '@/presentation/components'
import { ApiContext } from '@/presentation/context'
import { useLogout } from '@/presentation/hooks'
import Styles from './header-styles.scss'

const Header: React.FC = () => {
  const logout = useLogout()
  const { getCurrentAccount } = useContext(ApiContext)

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault()

    logout()
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid='username'>{getCurrentAccount().name}</span>
          <a data-testid='logout' href='#' onClick={handleLogout}>
            Sair
          </a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
