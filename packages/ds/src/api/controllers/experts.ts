import { Request, Response } from 'express';
import _ from 'lodash';
// @ts-ignore
import tokenizer from 'string-tokenizer';
import { Expert, ExpertModel } from '../../schema/expert';
import { expertiseTemplate, profileTemplate } from '../helpers/slackBlocks';

export const getExpertsByExpertise = async (req: Request, res: Response) => {
  const { text, user_name: userName } = req.body;
  const payload: any = tokenizer()
    .input(text)
    .token('command', /(experts|expert)/)
    .token('expertise', /.+/)
    .resolve();

  try {
    let expertsByExpertises: Expert[];
    if (payload.expertise) {
      expertsByExpertises = await ExpertModel.find({
        expertise: {
          $elemMatch: {
            name: { $regex: payload.expertise.trim(), $options: 'i' },
          },
        },
      });
    } else {
      expertsByExpertises = [];
    }
    if (expertsByExpertises.length === 0) {
      try {
        const ExpertisesList = await ExpertModel.aggregate([
          {
            $match: {
              expertise: { $not: { $size: 0 } },
            },
          },
          { $unwind: '$expertise' },
          {
            $group: {
              _id: { $toLower: '$expertise.name' },
            },
          },
          { $limit: 100 },
        ]);

        const blocks = expertiseTemplate(
          ExpertisesList || [],
          `:octagonal_sign:  No experts found for '${
            payload.expertise ?? ''.trim()
          }' \n See other expertise list:`,
        );

        return res.json({ blocks });
      } catch (err) {
        console.error(err);
      }
    }

    const blocks = _.flatten(
      expertsByExpertises.map((expert) =>
        profileTemplate(expert, userName, payload.expertise.trim()),
      ),
    );

    return res.json({ blocks });
  } catch (err) {
    console.error(err);
  }
  return false;
};

export const getExpertiseList = async (req: Request, res: Response) => {
  try {
    const ExpertisesList = await ExpertModel.aggregate([
      {
        $match: {
          expertise: { $not: { $size: 0 } },
        },
      },
      { $unwind: '$expertise' },
      {
        $group: {
          _id: { $toLower: '$expertise.name' },
        },
      },
      { $limit: 100 },
    ]);

    const blocks = expertiseTemplate(ExpertisesList || [], undefined);

    return res.json({ blocks });
  } catch (err) {
    console.error(err);
  }
  return false;
};
