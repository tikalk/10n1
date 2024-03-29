import { Request, Response } from 'express';
import moment from 'moment';
import { verify } from 'jsonwebtoken';
import _ from 'lodash';
import { sendMeetingEmailToExpert } from '../helpers/mailSender';
import { sendMeetingSlackToExpert } from '../helpers/slackSender';

// eslint-disable-next-line import/prefer-default-export
export const MeetingController = async (req: Request, res: Response) => {
  let meetingData: any;

  try {
    meetingData = verify(
      req?.query?.data.toString(),
      `10n1Secret-${moment().isoWeekday()}`,
    );
  } catch (e) {
    console.error(e);
  }

  if (!meetingData) {
    return res.status(404);
  }

  const title = `1 on 1 Meeting - ${_.capitalize(meetingData?.userName)} <> ${
    meetingData?.expert.name
  }`;
  const dates = `${`${moment(meetingData.time)
    .utc()
    .format('yyyyMMDDTHHmm')}00Z`}/${`${moment(meetingData.time)
    .utc()
    .add(1, 'hour')
    .format('yyyyMMDDTHHmm')}00Z`}`;
  const details = 'This is automate Event generated by 10n1 app';

  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURI(
    title,
  )}&details=${encodeURI(details)}&dates=${encodeURI(dates)}`;

  sendMeetingEmailToExpert({
    expertEmail: meetingData.expert.email,
    expertName: meetingData.expert.name,
    url,
    meetingTime: moment(meetingData.time).format('DD/MM/YYYY HH:mm'),
    topic: _.capitalize(meetingData?.expertise) || 'unknown topic',
    userName: meetingData?.userName,
  });
  console.warn(
    'meetingData',
    meetingData.expert?.slackData?.accessToken,
    meetingData.expert?.slackData,
    meetingData.expert,
  );
  if (meetingData.expert?.slackData?.accessToken) {
    await sendMeetingSlackToExpert({
      url,
      slackData: meetingData.expert?.slackData,
      meetingTime: moment(meetingData.time).format('DD/MM/YYYY HH:mm'),
      topic: _.capitalize(meetingData?.expertise) || 'unknown topic',
      userName: meetingData?.userName,
    });
  }
  // res.send(url);
  return res.redirect(url);
};
