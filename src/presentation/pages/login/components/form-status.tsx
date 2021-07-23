import React from 'react'
import { loginState } from './atoms'
import { useRecoilState } from 'recoil'

import { FormStatusBase } from '@/presentation/components'

const FormStatus: React.FC = () => {
  const [state] = useRecoilState(loginState)
  return <FormStatusBase {...{ state }} />
}

export default FormStatus
