import React from 'react'
import { loginState } from './atoms'
import { useRecoilState } from 'recoil'

import { InputBase } from '@/presentation/components'

type Props = {
  type: string
  name: string
  placeholder: string
}

const Input: React.FC<Props> = ({ type, name, placeholder }) => {
  const [state, setState] = useRecoilState(loginState)
  return <InputBase {...{ type, name, placeholder, state, setState }} />
}

export default Input
