import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import Styles from './signup-styles.scss'
import {
  Footer,
  LoginHeader,
  currentAccountState
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases'
import { signUpState, Input, SubmitButton, FormStatus } from './components'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const Signup: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const resetSignUpState = useResetRecoilState(signUpState)
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const history = useHistory()
  const [state, setState] = useRecoilState(signUpState)

  useEffect(() => {
    resetSignUpState()
  }, [])

  useEffect(() => {
    validate('email')
  }, [state.email])

  useEffect(() => {
    validate('name')
  }, [state.name])

  useEffect(() => {
    validate('password')
  }, [state.password])

  useEffect(() => {
    validate('passwordConfirmation')
  }, [state.passwordConfirmation])

  const validate = (field: string): void => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }

    setState((oldState) => ({
      ...oldState,
      [`${field}Error`]: validation.validate(field, formData)
    }))
    setState((oldState) => ({
      ...oldState,
      isFormInvalid:
        !!oldState.nameError ||
        !!oldState.emailError ||
        !!oldState.passwordError ||
        !!oldState.passwordConfirmationError
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

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
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
    <div className={Styles.signupWrap}>
      <LoginHeader />
      <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
        <h2>Criar Conta</h2>
        <Input type='text' name='name' placeholder='Digite seu nome' />
        <Input type='email' name='email' placeholder='Digite seu email' />
        <Input type='password' name='password' placeholder='Digite sua senha' />
        <Input
          type='password'
          name='passwordConfirmation'
          placeholder='Repita sua senha'
        />
        <SubmitButton text='Cadastrar' />
        <Link
          to='/login'
          data-testid='login-link'
          replace
          className={Styles.link}
        >
          Voltar Para Login
        </Link>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Signup
