import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import {
  Footer,
  LoginHeader,
  currentAccountState
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'
import { loginState, Input, SubmitButton, FormStatus } from './components'
import Styles from './login-styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const resetLoginState = useResetRecoilState(loginState)
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const history = useHistory()
  const [state, setState] = useRecoilState(loginState)

  useEffect(() => {
    resetLoginState()
  }, [])

  useEffect(() => {
    validate('email')
  }, [state.email])

  useEffect(() => {
    validate('password')
  }, [state.password])

  const validate = (field: string): void => {
    const { email, password } = state
    const formData = { email, password }

    setState((oldState) => ({
      ...oldState,
      [`${field}Error`]: validation.validate(field, formData)
    }))
    setState((oldState) => ({
      ...oldState,
      isFormInvalid: !!oldState.emailError || !!oldState.passwordError
    }))
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState((oldState) => ({ ...oldState, isLoading: true }))
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      setState((oldState) => ({
        ...oldState,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input type='email' name='email' placeholder='Digite seu email' />
        <Input type='password' name='password' placeholder='Digite sua senha' />
        <SubmitButton text='Entrar' />
        <Link data-testid='signup-link' to='/signup' className={Styles.link}>
          Criar conta
        </Link>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login
