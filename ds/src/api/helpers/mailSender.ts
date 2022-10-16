// @ts-ignore
import SibApiV3Sdk from 'sib-api-v3-sdk';

const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey =
  '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';

export interface EmailData {
  expertEmail: string;
  expertName: string;
  url: string;
  meetingTime: string;
  topic: string;
  userName: string;
}
// eslint-disable-next-line import/prefer-default-export
export const sendMeetingEmailToExpert = (emailData: EmailData) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

  sendSmtpEmail = {
    to: [
      {
        email: emailData.expertEmail,
        name: emailData.expertName,
      },
    ],
    templateId: 1,
    params: {
      url: emailData.url,
      meetingTime: emailData.meetingTime,
      topic: emailData.topic,
      userName: emailData.userName,
    },
    headers: {
      'X-Mailin-custom':
        'custom_header_1:custom_value_1|custom_header_2:custom_value_2',
    },
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data: any) {
      console.log(
        `API called successfully. Returned data: ${JSON.stringify(data)}`,
      );
    },
    function (error: any) {
      console.error(error);
    },
  );
};
