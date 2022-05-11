import { MailAdapter, SendMaildata } from "../Imail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
   host: "smtp.mailtrap.io",
   port: 2525,
   auth: {
     user: "aa2a1b003f1968",
     pass: "2589d71673c1c7"
   }
 });


export class NodemailerMailAdapter implements MailAdapter{
   async sendMail({subject, body}: SendMaildata) {
      await transport.sendMail({
         from: 'Equipe Feedget <oi@feedget.com>',
         to: 'Vinicius de Paula <vinivdps@gmail.com>',
         subject,
         html: body,
      });
   }
}