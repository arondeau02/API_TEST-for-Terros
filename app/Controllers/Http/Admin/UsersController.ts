import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Application from '@ioc:Adonis/Core/Application'
import * as fs from 'fs'
import UserUpdateValidator from 'App/Validators/Users/UserUpdateValidator'
import UserStoreValidator from 'App/Validators/Users/UserStoreValidator'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    return response.json(await User.all())
  }

  public async show({ params, response }: HttpContextContract) {
    return response.json(await User.findOrFail(params.id))
  }

  public async store({ request, response }: HttpContextContract) {
    const userDetails = await request.validate(UserStoreValidator)

    const avatarUrl = userDetails.avatar ? await User.saveAvatar(userDetails.avatar) : null
    delete userDetails.avatar

    const user = await User.create({
      ...userDetails,
      // @ts-ignore
      avatar_url: avatarUrl,
    })

    if (!user.$isPersisted)
      return response.internalServerError({ status: 'ko', message: "Une erreur s'est produite" })

    return response.json(user)
  }

  public async update({ params, request, response }: HttpContextContract) {
    let user = await User.findOrFail(params.id)
    const userDetails = await request.validate(UserUpdateValidator)

    const avatarUrl = userDetails.avatar ? await User.saveAvatar(userDetails.avatar) : null
    delete userDetails.avatar

    if (userDetails.password) {
      userDetails.password = await Hash.make(userDetails.password)
    }

    await User.query()
      .where('id', params.id)
      .update({
        ...userDetails,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      })

    return response.ok(await user.save())
  }

  public async destroy({ params, response }: HttpContextContract) {
    let user = await User.findOrFail(params.id)

    return response.json(await user.delete())
  }

  public async destroy_avatar({ params, response }: HttpContextContract) {
    let user = await User.findOrFail(params.id)

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

    return response.ok(await user.save())
  }
}
