import { Container } from 'reactstrap';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_EXPERT_BY_EMAIL } from '../../graphql/queries';

import 'react-day-picker/lib/style.css';
import Header from '../../components/Header';
import ExpertCard from '../../components/ExpertCard';

const ExpertProfile = () => {
  const router = useRouter();
  const { email } = router.query;

  const { data } = useQuery(GET_EXPERT_BY_EMAIL, {
    variables: { email },
  });

  return (
    <>
      <Header title="Expert Profile" />
      <Container className="mt-4">
        {data?.expert && <ExpertCard expert={data?.expert} />}
      </Container>
    </>
  );
};

export default ExpertProfile;
