import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CategoryValidator from 'App/Validators/CategoryValidator'

export default class CategoriesController {
  public async index({ response }: HttpContextContract) {
    return response.json(await Category.all())
  }

  public async show({ params, response }: HttpContextContract) {
    return response.json(await Category.findOrFail(params.id))
  }

  public async store({ response, request }: HttpContextContract) {
    const body = await request.validate(CategoryValidator)
    const category = await Category.create(body)

    if (!category.$isPersisted)
      return response.internalServerError({ status: 'ko', message: "Une erreur s'est produite" })

    return response.json(category)
  }

  public async update({ params, response, request }: HttpContextContract) {
    const body = await request.validate(CategoryValidator)
    await Category.findOrFail(params.id)
    const category = await Category.updateOrCreate({ id: params.id }, body)

    if (!category.$isPersisted)
      return response.internalServerError({ status: 'ko', message: "Une erreur s'est produite" })

    return response.json(category)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const category = await Category.findOrFail(params.id)

    return response.json(await category.delete())
  }
}
