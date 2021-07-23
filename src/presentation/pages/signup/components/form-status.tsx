import React from 'react'
import { signUpState } from './atoms'
import { useRecoilState } from 'recoil'

import { FormStatusBase } from '@/presentation/components'

const FormStatus: React.FC = () => {
  const [state] = useRecoilState(signUpState)
  return <FormStatusBase {...{ state }} />
}

export default FormStatus
