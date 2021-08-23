import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
import View from '@ioc:Adonis/Core/View'
import mjml from 'mjml'

export default class PasswordResetMailer extends BaseMailer {
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()

  constructor(private params: { user: User; link: string }) {
    super()
  }

  /**
   * The prepare method is invoked automatically when you run
   * "PasswordResetMailer.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public async prepare(message: MessageContract) {
    const contactMail = Env.get('CONTACT_EMAIL')

    message
      .subject('Réinitialisation de votre mot de passe')
      .embed(Application.publicPath('logo.png'), 'logo')
      .from(contactMail)
      .replyTo(contactMail)
      .to(this.params.user.email)
      .html(mjml(await View.render('mails/password/html', this.params)).html)
      .textView('mails/password/text', this.params)
  }
}
