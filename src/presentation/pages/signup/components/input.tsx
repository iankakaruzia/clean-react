import React from 'react'
import { signUpState } from './atoms'
import { useRecoilState } from 'recoil'

import { InputBase } from '@/presentation/components'

type Props = {
  type: string
  name: string
  placeholder: string
}

const Input: React.FC<Props> = ({ type, name, placeholder }) => {
  const [state, setState] = useRecoilState(signUpState)
  return <InputBase {...{ type, name, placeholder, state, setState }} />
}

export default Input
