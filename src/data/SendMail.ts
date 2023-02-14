//import { render } from '@react-email/render';
//import sendgrid from '@sendgrid/mail';
//import { Email } from './email';
import { MyFormValues } from "./GlobalState";
//import axios from "axios";


type SendMailApiData =
  {
    SendToFirstEmail: boolean;
    SendToSecondEmail: boolean;
    Subject: string;
    BodyText: string;

    Attachment: string;
    AttachmentFilename: string;
    AttachmentTypeName: string;
  }

// //const apiKey = process.env.SENDGRID_API_KEY;
// sendgrid.setApiKey(apiKey);

//const emailHtml = render(<Email url="https://example.com" />);

// const options = {
//   from: 'support@ehlib.com',
//   to: 'support@ehlib.com',
//   subject: 'hello SendGrid',
//   //html: emailHtml,
//   text: 'And easy to use sendgrid',
// };

function ObjectValueAsStringList(fromValues: MyFormValues): string {
  let res: string = "";

  for (const [key, value] of Object.entries(fromValues)) {
    if (!key.startsWith("_"))
    {
      res = res + `[${key}]: '${value}' \n`;
    }
  }

  return res;
}

function GetMailJSonText(fromValues: MyFormValues): string {
  function replacer(this: any, key: string, value: any): any
  {
    if (key.startsWith("_")){
      return undefined;
    }
    return value;
  }

  let res: string = JSON.stringify(fromValues, replacer);
  return res;
}

async function SendMail(formValues: MyFormValues) : Promise<string> {
  let smData: SendMailApiData = {
    SendToFirstEmail: false,
    SendToSecondEmail: true,
    Subject: "",
    BodyText: "",
    Attachment: '',
    AttachmentFilename: '',
    AttachmentTypeName: '',
  }

  let payMethId: string = formValues.PaymentMethodID;
  let typCode: string = formValues.SoftLicenTypeID;
  let eMail: string = formValues.BuyerEmail;

  smData.Subject = `[EhLibPayRequest]-[${payMethId}]-[${typCode}]-[${eMail}]`;
  smData.BodyText = ObjectValueAsStringList(formValues);
  smData.Attachment = GetMailJSonText(formValues);
  smData.AttachmentFilename = "EhLibCustomPaymentinfo.Json";
  smData.AttachmentTypeName = "application/json";


  //sendgrid.send(options);

  let sendMailHost: string;
  let isDevelopment: boolean = true; //Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";
  if (isDevelopment)
    sendMailHost = "https://localhost:7095/";
  else
    sendMailHost = "https://ehlibdirpaywebfrm.azurewebsites.net/";

  let sendPath = sendMailHost + "api/sendmail";

  let jsonStr = JSON.stringify(smData);

  try {

    const response = await fetch(sendPath, {
      //    mode: 'no-cors',
      method: 'POST',
      body: jsonStr,
      //body: smData as any,
      headers: {
        //"Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    //console.log(response); //

    if (response.status !== 200)
    {
      //let result: string = await response.json() as string;
      let result: string =  
        'Error code: ' + response.status.toString() + '\n' + 
        await response.text();
      return result;
    }

  } catch (error) {
    if (typeof error === "string") {
        return error;
    } 
    else if (error instanceof Error) {
      return error.message;
    } 
    else {
      return "Error: Ошибка отправки сообщения. \n" +
      "Не удается получить текст ошибки.";
    }
  }

  return "";

  //axios.post(sendPath, smData);
}

export default SendMail;