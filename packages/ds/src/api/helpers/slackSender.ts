import http from 'axios';
import { SlackData } from '../../schema/expert';
import { expertMettingMessage } from './slackBlocks';

export interface SlackMessageData {
  url: string;
  slackData: SlackData;
  meetingTime: string;
  topic: string;
  userName: string;
}
export const sendMeetingSlackToExpert = async (
  messageData: SlackMessageData,
) => {
  const blocks = expertMettingMessage(messageData);
  const { data } = await http.post(
    'https://slack.com/api/chat.postMessage',
    {
      channel: messageData.slackData.authedUserId,
      blocks,
      as_user: true,
    },
    {
      headers: { Authorization: `Bearer ${messageData.slackData.accessToken}` },
    },
  );
  console.warn('sendMeetingSlackToExpert', data);
};
