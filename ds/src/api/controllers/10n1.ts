import { Request, Response } from 'express';
// @ts-ignore
import tokenizer from 'string-tokenizer';
import { getExpertiseList, getExpertsByExpertise } from './experts';
import { commandNotFound } from '../helpers/slackBlocks';

// eslint-disable-next-line import/prefer-default-export
export const CommandRouter = async (req: Request, res: Response) => {
  const { text } = req.body;
  const payload: any = tokenizer()
    .input(text)
    .token('command', /(expertise|experts|expert|profile|about)/)
    .resolve();

  switch (payload.command) {
    case 'expert':
    case 'experts':
      return getExpertsByExpertise(req, res);
    case 'expertise':
      return getExpertiseList(req, res);
    default:
      return res.json({ blocks: commandNotFound(text.split(' ')[0]) });
    // return res.send(`Unknown command (${text.split(' ')[0]})`);
  }
};
