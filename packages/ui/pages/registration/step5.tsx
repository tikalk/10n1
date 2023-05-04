/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Row,
} from 'reactstrap';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import Header from '../../components/Header';
import { UPDATE_EXPERT } from '../../graphql/mutations';
import useAuth from '../../hooks/useAuth';

const RegistrationSchema = Yup.object().shape({
  bio: Yup.string(),
});

const Step5 = () => {
  const { userData, refetch } = useAuth();
  const router: any = useRouter();
  const [updateExpert] = useMutation(UPDATE_EXPERT);

  const formik = useFormik({
    initialValues: {
      bio: userData?.bio || '',
    },
    enableReinitialize: true,
    validationSchema: RegistrationSchema,
    onSubmit: () => {},
  });

  const submit = useCallback(async () => {
    await updateExpert({
      variables: {
        input: {
          email: userData?.email,
          bio: formik.values.bio,
        },
      },
    });
    await refetch();
    router.push('/me');
  }, [userData, formik.values, refetch]);

  return (
    <>
      <Header title="Tikal 10n1 step3" />
      <Container>
        <Row>
          <Col md={8}>
            <Card className="p-4">
              <CardHeader className="pt-2 px-3">
                <h2>Registration Step V - Write your bio</h2>
              </CardHeader>
              <CardBody>
                <p>
                  Here we want you to write your BIO information in order to
                  tell people why they should contact you and get you as there
                  champion
                </p>
                <Input
                  type="textarea"
                  placeholder="Write your bio information here. (Optional)"
                  className="border-1 border border-dark p-3 rounded"
                  name="bio"
                  id="bio"
                  value={formik?.values?.bio}
                  onChange={formik.handleChange}
                  {...formik.getFieldProps('bio')}
                />
                <Button size="lg" color="primary" onClick={submit}>
                  Finish the registration process.
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col md={4} className="text-center">
            <img
              src="/superHero1.png"
              alt="Be a 10n1 Super hero"
              style={{ maxWidth: '75%' }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Step5;
