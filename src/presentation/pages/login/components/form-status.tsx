import React from 'react'
import { loginState } from './atoms'
import { useRecoilValue } from 'recoil'

import { FormStatusBase } from '@/presentation/components'

const FormStatus: React.FC = () => {
  const state = useRecoilValue(loginState)
  return <FormStatusBase {...{ state }} />
}

export default FormStatus
