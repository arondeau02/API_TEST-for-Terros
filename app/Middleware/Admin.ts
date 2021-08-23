import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    // @ts-ignore
    if (auth.user.status !== 'admin') {
      return response.unauthorized({
        status: 'ko',
        message: 'Accès non autorisé',
      })
    }
    await next()
  }
}
