import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, beforeDelete } from '@ioc:Adonis/Lucid/Orm'
import Application from '@ioc:Adonis/Core/Application'
import randomstring from 'randomstring'
import fs from 'fs'

export default class User extends BaseModel {
  public static readonly ROLES = {
    ADMIN: 'admin',
    USER: 'user',
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public avatarUrl?: string

  @column()
  public status: string

  @column()
  public phone?: string

  @column()
  public address?: string

  @column()
  public zipcode?: string

  @column()
  public city?: string

  @column()
  public stripeId?: string

  @column.dateTime()
  public lastLogin?: DateTime

  @column.dateTime()
  public subscriptionEndAt?: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeDelete()
  public static async deleteAvatar(user: User) {
    if (user.avatarUrl) {
      try {
        fs.unlinkSync(Application.publicPath(user.avatarUrl))
      } catch (err) {
        console.log(err)
      }
      user.avatarUrl = undefined
    }
  }

  public static async saveAvatar(avatar) {
    const avatarHash = randomstring.generate()
    await avatar.move(Application.publicPath('uploads/users'), {
      name: `${avatarHash}.${avatar.extname}`,
    })
    return `/uploads/users/${avatarHash}.${avatar.extname}`
  }
}
