/* eslint-disable react/no-unescaped-entities */
import { Button, Col, Container, Row } from 'reactstrap';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { isLoggedIn, login } = useAuth();
  const router = useRouter();

  return (
    <>
      <Header title="1 On 1 Home" />
      <Container className="mt-4">
        <Row>
          <Col md={8}>
            <h1>What is 10n1?</h1>
            <p>
              Have you gotten stuck in the middle of assignment? in the middle
              of a task?
              <br />
              The task you have is crystal clear but you stuck on the same
              problem for hours?
              <br />
              Someone asked you to do something in technology You don't know?
            </p>
            <h3>10n1 is here to help!!!</h3>
            <p>
              10n1 contains a list of experts in different expertise, willing to
              help other people on a specific time slots. Each of us know
              something better than other, and need others help from time to
              time. <strong>This is the time for giving!!!</strong>
              Our community built only giving fundamentals. and dosn't cost
              nothing. all you need to do is sign in, tell us what you good at
              and fell confidante enough to help others in.
            </p>
            {!isLoggedIn ? (
              <Button onClick={login} color="primary" size="lg">
                Login/Registration
              </Button>
            ) : (
              <Button
                onClick={() => router.push('/me')}
                color="primary"
                size="lg"
              >
                To my profile
              </Button>
            )}
          </Col>
          <Col md={4}>
            <img src="/superHero6.png" alt="" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
