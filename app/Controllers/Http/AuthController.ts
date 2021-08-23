import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import RegisterValidator from 'App/Validators/Auth/RegisterValidator'
import { DateTime } from 'luxon'
import Route from "@ioc:Adonis/Core/Route";
import Env from "@ioc:Adonis/Core/Env";
import { schema } from "@ioc:Adonis/Core/Validator";
import PasswordResetMailer from "App/Mailers/PasswordResetMailer";

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const credentialsDetails = await request.validate(LoginValidator)
    const token = await auth
      .use('api')
      .attempt(credentialsDetails.email, credentialsDetails.password, {
        expiresIn: '30 days',
      })

    const user = await User.findByOrFail('email', credentialsDetails.email)
    user.lastLogin = DateTime.now()
    await user.save()

    return { ...user!.toJSON(), ...token.toJSON() }
  }

  public async register({ request, response }: HttpContextContract) {
    const userDetails = await request.validate(RegisterValidator)
    const user = await User.create(userDetails)

    if (!user)
      return response.internalServerError({ status: 'ko', message: "Une erreur s'est produite" })

    return response.json({
      status: 'ok',
      message: 'Votre compte a bien étét créé',
    })
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.use('api').logout()

    return response.json({
      status: 'ok',
      message: 'Vous avez bien été déconnecté',
    })
  }

  public async passwordResetLink({ request, response }: HttpContextContract) {
    const { email } = request.all()

    const user = await User.findByOrFail('email', email)
    const signedUrl = Route.makeSignedUrl('password.reset', { id: user.id, expiresIn: '30m' })

    const link = encodeURI(
      Env.get('FRONT_URL') + `/account/password?uri=${encodeURIComponent(signedUrl!)}`
    )

    await new PasswordResetMailer({ user, link }).send()

    return response.ok({
      status: 'ok',
      message:
        'Un message avec un lien de réinitialisation vous a été envoyé par e-mail. Veuillez suivre ce lien pour réinitialiser votre mot de passe.',
    })
  }

  public async passwordReset({ response, request, params }: HttpContextContract) {
    if (!request.hasValidSignature()) return response.forbidden()

    const userDetails = await request.validate({
      schema: schema.create({
        password: schema.string({ trim: true }),
      }),
    })

    const user = await User.findOrFail(params.id)
    user.password = userDetails.password
    return response.ok(await user.save())
  }
}
