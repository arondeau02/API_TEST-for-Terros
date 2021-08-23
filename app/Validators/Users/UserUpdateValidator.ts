import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email', whereNot: { id: this.ctx.params.id } }),
    ]),
    password: schema.string.optional({ trim: true }),
    first_name: schema.string({ trim: true }),
    last_name: schema.string({ trim: true }),
    status: schema.string({ trim: true }),
    avatar: schema.file.optional({
      size: '10mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
    phone: schema.string.optional({ trim: true }),
    address: schema.string.optional({ trim: true }),
    zipcode: schema.string.optional({ trim: true }),
    city: schema.string.optional({ trim: true }),
  })

  public messages = {}
}
