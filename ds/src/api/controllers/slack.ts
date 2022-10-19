import { Request, Response } from 'express';
import http from 'axios';
import * as querystring from 'querystring';
import { ExpertModel } from '../../schema/expert';

// eslint-disable-next-line import/prefer-default-export
export const slackCode = async (req: Request, res: Response) => {
  const { data } = await http.post(
    'https://slack.com/api/oauth.v2.access',
    querystring.stringify({
      client_id: '2341365858.1874186475444',
      client_secret: '21d3bb486440ddf85d3a0ffefbcf6674',
      // @ts-ignore
      code: req.query.code,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  if (data.ok && req.query.state) {
    await ExpertModel.findOneAndUpdate(
      // @ts-ignore
      { email: req.query.state },
      {
        slackData: {
          authedUserId: data.authed_user.id,
          accessToken: data.access_token,
        },
      },
    );
    console.warn(data);
    res.redirect(`localhost:3000/registration/step3`);
  } else {
    console.warn(data);
    res.redirect(`localhost:3000/registration/step2&status=failed`);
  }
};
