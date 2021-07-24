import React from 'react'
import { loginState } from './atoms'
import { useRecoilValue } from 'recoil'

import { SubmitButtonBase } from '@/presentation/components'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }) => {
  const state = useRecoilValue(loginState)
  return <SubmitButtonBase {...{ text, state }} />
}

export default SubmitButton
