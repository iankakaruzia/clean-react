import faker from 'faker'
import { MinLengthValidation } from './min-length-validation'
import { InvalidFieldError } from '@/validation/errors'

const makeSut = (field: string): MinLengthValidation => {
  return new MinLengthValidation(field, 5)
}

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if field does not exists in schema', () => {
    const sut = makeSut('any_field')
    const error = sut.validate({ invalid_field: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })
})
