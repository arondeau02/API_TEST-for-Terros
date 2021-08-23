import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email').unique()
      table.string('password', 180)
      table.string('first_name')
      table.string('last_name')
      table.string('avatar_url').nullable()
      table.string('status').defaultTo('user')
      table.string('phone').nullable()
      table.string('address').nullable()
      table.string('zipcode').nullable()
      table.string('city').nullable()
      table.string('stripe_id').nullable()
      table.dateTime('last_login').nullable()
      table.dateTime('subscription_end_at').nullable()
      // table.string('remember_me_token').nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
