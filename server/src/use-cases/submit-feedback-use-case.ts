import { MailAdapter } from "../adapters/Imail-adapter";
import { IFeedbacksRepository } from "../repositories/IFeedbacksRepository";

interface SubmitFeedbackUseCaseRequest{
   type: string;
   comment: string;
   screenshot?: string;
}

export class SubmitFeedbackUseCase{
   
   constructor(private feedbacksRepository: IFeedbacksRepository, private mailAdapter: MailAdapter){}

   async execute (request: SubmitFeedbackUseCaseRequest){
      const { type, comment, screenshot } = request;
   
   if(!type){
      throw new Error('Type is required.');
   }

   if(!comment){
      throw new Error('Comment is required.');
   }

   if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid screenshot format');
   }

      await this.feedbacksRepository.create({
         type, comment, screenshot,
      })

      await this.mailAdapter.sendMail({
         subject: 'Novo Feedback',
         body:  [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
               `<p>Tipo de feeedback: ${type}</p>`,
               `<p>Comentário: ${comment}</p>`,
               screenshot && `<img  src="${screenshot}" width="300" height="180" />`,
            `</div>`,
         ].join('\n')
      })
   }
}