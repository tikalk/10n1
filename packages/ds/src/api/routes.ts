import express from 'express';
import { CommandRouter } from './controllers/10n1';
import { MeetingController } from './controllers/meeting';
import { slackCode } from './controllers/slack';

const Router = express.Router();

Router.use(express.json());
Router.use(express.urlencoded({ extended: true }));

Router.route('/health').get((req, res) => res.send('ok'));
Router.route('/test').get((req, res) => res.json(JSON.stringify(req.query)));

Router.route('/10n1').post(CommandRouter);

Router.route('/meeting').get(MeetingController);

Router.route('/slackCode').get(slackCode);

export default Router;
