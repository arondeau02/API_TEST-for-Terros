import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
import mjml from 'mjml'
import View from '@ioc:Adonis/Core/View'

export default class ContactMailer extends BaseMailer {
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()

  constructor(
    private params: { message: string; subject: string; name: string; email: string; phone: string }
  ) {
    super()
  }

  /**
   * The prepare method is invoked automatically when you run
   * "ContactMailer.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public async prepare(message: MessageContract) {
    message
      .subject(this.params.subject)
      .from(Env.get('CONTACT_EMAIL'))
      .replyTo(this.params.email)
      .to(Env.get('TARGET_EMAIL'))
      .embed(Application.publicPath('logo.png'), 'logo')
      .html(mjml(await View.render('mails/contact/html', this.params)).html)
      .textView('mails/contact/text', this.params)
  }
}
