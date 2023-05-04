import { Container } from 'reactstrap';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
import ExpertCard from '../components/ExpertCard';

const Home = () => {
  const { userData, refetch } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userData?.expertise?.length) {
      router.push('/');
    }
    refetch();
  }, []);

  return (
    <>
      <Header title="1 On 1 Home" />
      <Container className="mt-4">
        {userData?.availability && <ExpertCard expert={userData} me key={1} />}
      </Container>
    </>
  );
};

export default Home;
