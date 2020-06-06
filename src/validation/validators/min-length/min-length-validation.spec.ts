import { MinLengthValidation } from './min-length-validation'
import { InvalidFieldError } from '@/validation/errors'

describe('MinLengthValidation', () => {
  test('Should return email if value is invalid', () => {
    const sut = new MinLengthValidation('field', 5)
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  })
})
