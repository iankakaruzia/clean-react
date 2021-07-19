import React from 'react'
import { render, screen } from '@testing-library/react'
import { Calendar } from '@/presentation/components'

const makeSut = (date: Date): void => {
  render(<Calendar date={date} />)
}

describe('Calendar Component', () => {
  test('Should Calendar render with correct values', () => {
    const date = new Date('2021-01-10T00:00:00')
    makeSut(date)

    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
  })

  test('Should render with correct values', () => {
    const date = new Date('2020-03-08T00:00:00')
    makeSut(date)

    expect(screen.getByTestId('day')).toHaveTextContent('08')
    expect(screen.getByTestId('month')).toHaveTextContent('mar')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })
})
