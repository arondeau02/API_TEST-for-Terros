import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Application from '@ioc:Adonis/Core/Application'
import randomstring from 'randomstring'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public title: string

  @column()
  public subtitle: string

  @column()
  public content: string

  @column()
  public picture_url: string

  @column.dateTime()
  public eventDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public async savePicture(picture) {
    const avatarHash = randomstring.generate()
    await picture.move(Application.publicPath('uploads/events'), {
      name: `${avatarHash}.${picture.extname}`,
    })
    return `/uploads/events/${avatarHash}.${picture.extname}`
  }
}
