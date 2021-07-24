import React from 'react'
import { signUpState } from './atoms'
import { useRecoilValue } from 'recoil'

import { SubmitButtonBase } from '@/presentation/components'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }) => {
  const state = useRecoilValue(signUpState)
  return <SubmitButtonBase {...{ text, state }} />
}

export default SubmitButton
