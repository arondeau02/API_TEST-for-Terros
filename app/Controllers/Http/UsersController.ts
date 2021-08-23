import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import * as fs from 'fs'
import ProfileValidator from 'App/Validators/Users/ProfileValidator'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response, auth }: HttpContextContract) {
    return response.json(auth.user!)
  }

  public async update({ auth, request, response }: HttpContextContract) {
    let user = auth.user!
    const userDetails = await request.validate(ProfileValidator)

    const avatarUrl = userDetails.avatar ? await User.saveAvatar(userDetails.avatar) : null
    delete userDetails.avatar
    if (userDetails.password) {
      userDetails.password = await Hash.make(userDetails.password)
    }
    userDetails.status = user.status
    await User.query()
      .where('id', user.id)
      .update({
        ...userDetails,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      })

    return response.ok(await user.save())
  }

  public async destroy_avatar({ auth, response }: HttpContextContract) {
    let user = auth.user!

    if (user.avatarUrl) {
      try {
        fs.unlinkSync(Application.publicPath(user.avatarUrl))
      } catch (err) {
        return response.internalServerError({
          status: 'ko',
          message: "Une erreur s'est produite",
        })
      }
      // @ts-ignore
      user.avatar_url = null
      await user.save()
    }

    return response.ok(user)
  }
}
