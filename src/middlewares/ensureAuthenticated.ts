import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface iPayLoad {
  sub: string
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Receber o Token
  const authToken = request.headers.authorization

  // Validar de o Token está preenchido
  if (!authToken) {
    return response.status(401).end()
  }

  const [, token] = authToken.split(' ')

  // Validar se Token é válido
  try {
    const { sub } = verify(
      token,
      '9e86b6ceede19269b2158ed72d845b32'
    ) as iPayLoad

    // Recuperar informações do usuário
    request.user_id = sub

    next()
  } catch (err) {
    return response.status(401).end()
  }
}
