import React, { memo, useContext } from 'react'
import { useHistory } from 'react-router'
import { Logo } from '@/presentation/components'
import { ApiContext } from '@/presentation/context'
import Styles from './header-styles.scss'

const Header: React.FC = () => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

  const logout = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault()

    setCurrentAccount(undefined)
    history.replace('/login')
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span>Ianka Karúzia</span>
          <a data-testid='logout' href="#" onClick ={logout}>Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
