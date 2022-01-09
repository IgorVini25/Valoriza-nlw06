import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface iAuthenticateRequest {
  email: string
  password: string
}

class AuthenticateUserService {
  async execute({ email, password }: iAuthenticateRequest) {
    // Verify if email exists
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findOne({
      email
    })

    if (!user) {
      throw new Error('Email or Password be incorrect')
    }

    // Verify if password it's correct
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Email or Password be incorrect')
    }

    // Generate Token
    const token = sign(
      {
        email: user.email
      },
      '9e86b6ceede19269b2158ed72d845b32',
      {
        subject: user.id,
        expiresIn: '1d'
      }
    )

    return token
  }
}

export { AuthenticateUserService }
