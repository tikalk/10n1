import moment, { Moment } from 'moment';
import { sign } from 'jsonwebtoken';
import { Expert } from '../../schema/expert';
import { getNext3AppointmentOptions } from './dateHelper';
import { SlackMessageData } from './slackSender';

const createText = (expert: Expert) => {
  const expertise = expert.expertise.map((exp: any) => `\`${exp.name}\` `);
  const text = `*Name:* ${expert.name}\n
*Email:* ${expert.email}\n
*Phone:* ${expert.phone}\n
*Bio:* ${expert.bio}\n\n
*Expertise:* 
${expertise}`;

  return {
    type: 'mrkdwn',
    text,
  };
};

export const setButtonUrl = (
  expert: Expert,
  slot: Moment,
  userName: string,
  expertise: string,
) => {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://10n1.tikalk.dev'
      : 'http://localhost:4000';

  const meeting = {
    time: slot,
    expert,
    userName,
    expertise,
  };
  const data = sign(meeting, `10n1Secret-${moment().isoWeekday()}`);
  return `${baseUrl}/ds/meeting/?data=${data}`;
};

// eslint-disable-next-line import/prefer-default-export
export const profileTemplate = (
  expert: Expert,
  userName: string,
  expertise: string,
) => {
  const appointmentOptions = getNext3AppointmentOptions(expert.availability);
  const buttons = appointmentOptions.map((slot, key) => ({
    type: 'button',
    style: 'primary',
    text: {
      type: 'plain_text',
      text: `:calendar:  ${slot.format('DD/MM/YY HH:mm')}`,
      emoji: true,
    },
    url: setButtonUrl(expert, slot, userName, expertise),
    value: 'schedule a meeting_123',
    action_id: `schedule_a_meeting-${key}`,
  }));

  return [
    {
      type: 'section',
      text: createText(expert),
      accessory: {
        type: 'image',
        image_url: expert.image,
        alt_text: `${expert.name}'s profile`,
      },
    },
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text:
          'Next available appointment slots for this expert: \n(click on one to setup 1 On 1 meeting)',
      },
    },
    {
      type: 'actions',
      elements: buttons,
    },
    {
      type: 'divider',
    },
  ];
};

export const expertiseTemplate = (expertise: any[], title?: string) => {
  // eslint-disable-next-line no-underscore-dangle
  const expertiseText = expertise.map((exp: any) => `- \`${exp._id}\` \n`);

  return [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: title || 'Expertise list:',
        emoji: true,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: expertiseText.join(' '),
      },
    },
  ];
};
export const commandNotFound = (command: string) => {
  return [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `:octagonal_sign:  Command not found '${command}'`,
        emoji: true,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `You can try the following commands: \n
              - \`/10n1 expert [expertise]\` - to get list of experts in specific expertise \n
              - \`/10n1 expertise\` - to get the list of expertise \n        
        `,
      },
    },
  ];
};

export const expertMettingMessage = (messageData: SlackMessageData) => {
  return [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `:calendar:  New 10n1 meeting scheduled to ${messageData.meetingTime}`,
        emoji: true,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `${messageData.userName} scheduled meeting about ${messageData.topic}`,
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          style: 'primary',
          text: {
            type: 'plain_text',
            text: `:calendar:  ADD TO YOUR CALENDAR`,
            emoji: true,
          },
          url: messageData.url,
          value: 'schedule a meeting_1235',
          action_id: `schedule_a_meeting-54321`,
        },
      ],
    },
  ];
};
