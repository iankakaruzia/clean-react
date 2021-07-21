import faker from 'faker'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { GetStorageSpy, HttpClientSpy, mockHttpRequest } from '@/data/test'
import { HttpRequest } from '@/data/protocols/http'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  sut: AuthorizeHttpClientDecorator
  getStorageSpy: GetStorageSpy
  httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpClientSpy = new HttpClientSpy()
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy)

  return {
    sut,
    getStorageSpy,
    httpClientSpy
  }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.request(mockHttpRequest())

    expect(getStorageSpy.key).toBe('account')
  })

  test('Should not add headers if GetStorage is invalid', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'post', 'delete', 'put']),
      headers: {
        field: faker.random.words()
      }
    }
    await sut.request(httpRequest)

    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.method).toBe(httpRequest.method)
    expect(httpClientSpy.headers).toEqual(httpRequest.headers)
  })

  test('Should add headers to HttpGetClient', async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'post', 'delete', 'put'])
    }
    await sut.request(httpRequest)

    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.method).toBe(httpRequest.method)
    expect(httpClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('Should merge headers to HttpGetClient', async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const field = faker.random.words()
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'post', 'delete', 'put']),
      headers: {
        field
      }
    }
    await sut.request(httpRequest)

    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.method).toBe(httpRequest.method)
    expect(httpClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('Should the same result as HttpGetClient', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResponse = await sut.request(mockHttpRequest())

    expect(httpResponse).toBe(httpClientSpy.response)
  })
})
