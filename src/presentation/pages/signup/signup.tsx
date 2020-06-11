import React, { useState } from 'react'
import Styles from './signup-styles.scss'
import { Footer, LoginHeader, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/context/form/form-context'

const Signup: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    mainError: '',
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório'
  })

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state }}>
        <form className={Styles.form}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <button
            data-testid='submit'
            className={Styles.submit}
            type="submit"
            disabled
          >
            Entrar
          </button>
          <span className={Styles.link}>Voltar Para Login</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
