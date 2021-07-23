import React from 'react'
import { loginState } from './atoms'
import { useRecoilState } from 'recoil'

import { SubmitButtonBase } from '@/presentation/components'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }) => {
  const [state] = useRecoilState(loginState)
  return <SubmitButtonBase {...{ text, state }} />
}

export default SubmitButton
