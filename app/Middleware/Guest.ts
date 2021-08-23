import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Guest {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const authenticated = await auth.check()
    if (authenticated) {
      return response.unauthorized({
        status: 'ko',
        message: 'Vous devez être déconnecté.',
      })
    }
    await next()
  }
}
