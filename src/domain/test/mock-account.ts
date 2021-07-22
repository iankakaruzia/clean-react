import { AddAccount } from '@/domain/usecases'
import faker from 'faker'

export const mockAccountModel = (): AddAccount.Model => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName()
})
