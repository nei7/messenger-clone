import { Injectable } from '@nestjs/common';
import * as sendGrid from '@sendgrid/mail';
import mailConfig from '../../config/sendgrid';

@Injectable()
export class MailService {
  public async sendMail(options: {
    to: string;
    subject: string;
    html: string;
  }) {
    return await sendGrid.send({ ...mailConfig, ...options });
  }
}
