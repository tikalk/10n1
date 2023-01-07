import { Request, Response } from 'express';
// @ts-ignore
import tokenizer from 'string-tokenizer';
import { getExpertiseList, getExpertsByExpertise } from './experts';
import { commandNotFound } from '../helpers/slackBlocks';

const CommandToFunctrionMap: {
  // eslint-disable-next-line no-unused-vars
  [key: string]: (req: Request, res: Response) => void;
} = {
  expertise: getExpertiseList,
  experts: getExpertsByExpertise,
  expert: getExpertsByExpertise,
};

// eslint-disable-next-line import/prefer-default-export
export const CommandRouter = async (req: Request, res: Response) => {
  const { text } = req.body;
  const payload: any = tokenizer()
    .input(text)
    .token('command', /(expertise|experts|expert|profile|about)/)
    .resolve();

  const func = CommandToFunctrionMap[payload.command];
  if (func) {
    return func(req, res);
  }
  return res.json({ blocks: commandNotFound(text.split(' ')[0]) });

};
