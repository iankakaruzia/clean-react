import React from 'react'

import Styles from './error-styles.scss'

type Props = {
  error: string
  reload: () => void
}

const Error: React.FC<Props> = ({ error, reload }) => {
  return (
    <div className={Styles.errorWrap}>
      <span data-testid='error'>{error}</span>
      <button onClick={reload} data-testid='reload'>
        Tentar novamente
      </button>
    </div>
  )
}

export default Error
