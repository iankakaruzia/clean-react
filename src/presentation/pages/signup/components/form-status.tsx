import React from 'react'
import { signUpState } from './atoms'
import { useRecoilValue } from 'recoil'

import { FormStatusBase } from '@/presentation/components'

const FormStatus: React.FC = () => {
  const state = useRecoilValue(signUpState)
  return <FormStatusBase {...{ state }} />
}

export default FormStatus
