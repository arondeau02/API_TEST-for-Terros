import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    let tmp: any[] = []
    for (const role of Object.values(User.ROLES)) {
      tmp.push({
        firstName: role,
        lastName: `${role}${role}`,
        email: `${role}@terros.io`,
        password: 'password',
        status: role,
      })
    }

    await User.createMany(tmp)
  }
}
