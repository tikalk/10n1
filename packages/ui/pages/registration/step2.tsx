import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from 'reactstrap';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import useAuth from '../../hooks/useAuth';

const Step2 = () => {
  const { userData } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (router.query?.failed) {
      toast('קבלת ההרשאות מסלאק נכשלה אנא נסה שנית', { type: 'warning' });
    }
    if (userData?.slackData?.accessToken) {
      router.push('/registration/step3');
    }
  }, [router.query]);

  return (
    <>
      <Header title="Tikal 10n1 step2" />
      <Container>
        <Row>
          <Col md={8}>
            <Card className="p-4">
              <CardHeader className="pt-2 px-3">
                <h2>Registration Step II - Slack Permissions</h2>
              </CardHeader>
              <CardBody>
                <p>
                  In order to send you notifications about consulting requests
                  and set up meetings reminders we need to get your approval to
                  get such messages.
                </p>
                <Button
                  onClick={() =>
                    window.location.assign(
                      `https://slack.com/oauth/v2/authorize?scope=chat:write&client_id=2341365858.1874186475444&state=${userData?.email}&redirect_uri=https://10n1.tikalk.dev/ds/slackCode`,
                    )
                  }
                  color="primary"
                >
                  <img
                    alt="Add to Slack"
                    height="30"
                    width="30"
                    src="https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg"
                    className="mr-3"
                  />
                  Continue registration
                </Button>
                <Button
                  className="btn-lg"
                  onClick={() => router.push('/registration/step3')}
                >
                  Skip
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col md={4} className="text-center">
            <img
              src="/superHero4.png"
              alt="Be a 10n1 Super hero"
              style={{ maxWidth: '75%' }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Step2;
