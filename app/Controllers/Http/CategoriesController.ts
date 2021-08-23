import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index({ response }: HttpContextContract) {
    return response.json(await Category.all())
  }

  public async show({ params, response }: HttpContextContract) {
    return response.json(await Category.findOrFail(params.id))
  }
}
