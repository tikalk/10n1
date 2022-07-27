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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import Header from '../../components/Header';
import { UPDATE_EXPERT } from '../../graphql/mutations';
import useAuth from '../../hooks/useAuth';
import AvailabilitySelector from '../../components/AvailabilitySelector';

const RegistrationSchema = Yup.object().shape({
  availability: Yup.array()
    .of(
      Yup.object({
        day: Yup.string(),
        startTime: Yup.string(),
        endTime: Yup.string(),
        key: Yup.string(),
      }),
    )
    .min(1)
    .required(),
});

const Step4 = () => {
  const { userData, refetch } = useAuth();
  const router: any = useRouter();
  const [updateExpert] = useMutation(UPDATE_EXPERT);

  const formik = useFormik({
    initialValues: {
      availability: userData?.availability || [],
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
          availability: [...formik.values.availability],
        },
      },
    });
    await refetch();
    router.push('/registration/step5');
  }, [formik.values, userData, refetch]);

  return (
    <>
      <Header title="Tikal 10n1 step3" />
      <Container>
        <Row>
          <Col md={8}>
            <Card className="p-4">
              <CardHeader className="pt-2 px-3">
                <h2>Registration Step IV - Choose your availability</h2>
              </CardHeader>
              <CardBody>
                <p>
                  Please select at least one available time slot, that you can
                  help someone on them.
                </p>
                <AvailabilitySelector
                  values={formik.values?.availability}
                  onChange={(value) => {
                    formik.setFieldValue('availability', value);
                  }}
                />
                <Button
                  size="lg"
                  color="primary"
                  disabled={formik?.values?.availability?.length === 0}
                  onClick={submit}
                >
                  Next Step
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col md={4} className="text-center">
            <img
              src="/superHero2.png"
              alt="Be a 10n1 Super hero"
              style={{ maxWidth: '75%' }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Step4;
