/* eslint-disable import/no-extraneous-dependencies */
import { Badge, Button, Card, CardBody } from 'reactstrap';
import { sign } from 'jsonwebtoken';
import moment from 'moment';
import Link from 'next/link';
import _ from 'lodash';
import useAuth from '../hooks/useAuth';
import { getNext3AppointmentOptions } from '../dateHelper';

const ExpertCard = ({ expert, me }: any) => {
  const { userData } = useAuth();
  return (
    <Card>
      <CardBody>
        <div className="d-flex align-items-center mb-2">
          {expert?.image && (
            <img
              src={expert?.image}
              alt={expert?.name}
              className="float-right mr-3 rounded-circle"
            />
          )}
          <div>
            <h3 className="m-0 p-0">{expert?.name}</h3>
            <h5 className="m-0 p-0 font-weight-bold">{expert?.email}</h5>
          </div>
        </div>
        <div className="mb-4">
          <strong className="mr-3">Bio:</strong> {expert?.bio}
        </div>
        <div className="d-flex align-items-start">
          <strong className="mr-3">Expertise:</strong>{' '}
          <div className="w-100">
            {expert?.expertise?.map((exp) => (
              <Badge
                color="warning"
                pill
                className="mr-2"
                key={`expertise-${_.snakeCase(exp.name)}-${expert.id}`}
              >
                {exp.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="d-flex align-items-start mt-2">
          <strong className="mr-3">Availability:</strong>{' '}
          <div className="w-100">
            {expert?.availability?.map((exp) => (
              <Badge
                color="success"
                pill
                className="mr-2 text-black"
                key={`availability-${exp.key}-${expert.id}`}
              >{`${exp.day} ${exp.startTime}-${exp.endTime}`}</Badge>
            ))}
          </div>
        </div>
        <hr />
        {me && (
          <Link href={`/experts/edit/${expert.email}`}>
            <Button color="warning">Edit your profile.</Button>
          </Link>
        )}
        {!me && (
          <div className="d-flex align-items-center">
            <span className="mr-2">📅: </span>
            {getNext3AppointmentOptions(expert?.availability).map((slot) => {
              // todo: remove this duplication
              const baseUrl =
                process.env.NODE_ENV === 'production'
                  ? 'https://10n1.tikalk.dev'
                  : 'http://localhost:4000';

              const meeting = {
                time: slot,
                expert,
                userName: userData.name,
                expertise: 'experts list',
              };
              const data = sign(meeting, `10n1Secret-${moment().isoWeekday()}`);
              const url = `${baseUrl}/ds/meeting/?data=${data}`;
              return (
                <Button
                  color="success"
                  className="mr-2 my-2 text-black font-weight-bold"
                  size="sm"
                  onClick={() => window.open(url)}
                  key={`availability-btn-${slot}-${expert.id}`}
                >
                  <span style={{ fontSize: 9 }}>
                    {slot.format('dddd - DD/MM/YY HH:mm')}
                  </span>
                </Button>
              );
            })}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default ExpertCard;
