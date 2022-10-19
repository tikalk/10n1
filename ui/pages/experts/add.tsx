/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { useFormik } from 'formik';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useLazyQuery, useMutation } from '@apollo/client';
import _ from 'lodash';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import AvailabilitySelector from '../../components/AvailabilitySelector';
import Header from '../../components/Header';
import { CREATE_EXPERT, UPDATE_EXPERT } from '../../graphql/mutations';
import useAuth from '../../hooks/useAuth';
import { GET_EXPERT_BY_EMAIL } from '../../graphql/queries';

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'To short!')
    .max(50, 'To long!')
    .required('Required!'),
  phone: Yup.string()
    .min(7, 'To short!')
    .max(15, 'To long!')
    .required('Required!'),
  email: Yup.string().email('Invalid email').required('Required!'),
  bio: Yup.string(),
  expertise: Yup.array().min(1, 'Minimum 1 expertise').required('Required!'),
  availability: Yup.array()
    .of(
      Yup.object({
        day: Yup.string(),
        startTime: Yup.string(),
        endTime: Yup.string(),
        key: Yup.string(),
      }),
    )
    .min(1, 'Minimum 1 Availability')
    .required('Required!'),
});

const Add = () => {
  const [options, setOptions] = useState([]);
  const [createExpert] = useMutation(CREATE_EXPERT);
  const [updateExpert] = useMutation(UPDATE_EXPERT);
  const { userData } = useAuth();
  const router = useRouter();
  const { email } = router.query;
  const [getExpertData, { data }] = useLazyQuery(GET_EXPERT_BY_EMAIL, {
    variables: { email },
  });

  const expertData = data?.expert || {};

  const formik = useFormik({
    initialValues: {
      name: userData?.name || expertData?.name || '',
      phone: userData?.phone || expertData?.phone || '',
      email: userData?.email || expertData?.email || '',
      bio: expertData?.bio || '',
      image: userData?.image || expertData?.image || '',
      expertise: expertData?.expertise || [],
      availability: expertData?.availability || [],
    },
    enableReinitialize: true,
    validationSchema: RegistrationSchema,
    onSubmit: (values) => {
      if (email) {
        updateExpert({
          variables: {
            input: {
              ...values,
              expertise: [
                ...values.expertise.map((theme) =>
                  typeof theme === 'object'
                    ? _.pick(theme, ['name'])
                    : { name: theme },
                ),
              ],
            },
          },
        }).then(() => {
          router.push(`/experts/${email}`);
        });
      } else {
        createExpert({
          variables: {
            input: {
              ...values,
              expertise: [
                ...values.expertise.map((theme) =>
                  typeof theme === 'object'
                    ? _.pick(theme, ['name'])
                    : { name: theme },
                ),
              ],
            },
          },
        }).then(() => {
          router.push('/');
        });
      }
    },
  });

  useEffect(() => {
    if (email) {
      getExpertData();
    }
  }, [email]);

  useEffect(() => {
    fetch('/api/radar')
      .then((res) => res.json())
      .then((resData) => {
        const techs = [];
        resData.forEach((tech, idx) => {
          if (idx) {
            techs.push(tech[0] || '');
          }
        });
        setOptions(_.uniq(techs));
      });
  }, []);

  return (
    <>
      <Header title="1 On 1 - Registration page" />
      <Container fluid>
        <Row className="mt-4">
          <Col md={3} />
          <Col md={6}>
            <Card className="p-3">
              <CardBody>
                <Form>
                  <Row>
                    <Col md={6} sm={12}>
                      <FormGroup className="d-flex flex-column">
                        <Label for="name">Name:</Label>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          value={formik?.values?.name}
                          onChange={formik.handleChange}
                          placeholder="Enter your name..."
                          {...formik.getFieldProps('name')}
                        />
                        {formik.errors?.name && formik.touched.name && (
                          <FormFeedback>{formik.errors?.name}</FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6} sm={12}>
                      <FormGroup className="d-flex flex-column">
                        <Label for="phone">Phone #:</Label>
                        <Input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formik?.values?.phone}
                          onChange={formik.handleChange}
                          placeholder="Enter your phone #..."
                          {...formik.getFieldProps('phone')}
                        />
                        {formik.errors?.phone && formik.touched.phone && (
                          <FormFeedback>{formik.errors?.phone}</FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <FormGroup className="d-flex flex-column">
                        <Label for="email">Email:</Label>
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          value={formik?.values?.email}
                          onChange={formik.handleChange}
                          placeholder="Enter your email..."
                          {...formik.getFieldProps('email')}
                        />
                        {formik.errors?.email && formik.touched.email && (
                          <FormFeedback>{formik.errors?.email}</FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <FormGroup className="d-flex flex-column">
                        <Label for="bio">Bio:</Label>
                        <Input
                          type="textarea"
                          name="bio"
                          id="bio"
                          value={formik?.values?.bio}
                          onChange={formik.handleChange}
                          {...formik.getFieldProps('bio')}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <FormGroup className="d-flex flex-column">
                        <Label for="expertise">Expertise:</Label>
                        <Typeahead
                          id="expertise"
                          name="expertise"
                          labelKey="name"
                          size="large"
                          multiple
                          allowNew
                          onChange={(value) => {
                            formik.setFieldValue('expertise', value);
                          }}
                          options={options}
                          placeholder="Choose several expertise..."
                          selected={
                            formik?.values?.expertise ??
                            [].map((expertise) => expertise.name)
                          }
                          className={
                            formik.errors?.expertise && formik.touched.expertise
                              ? 'border-danger border rounded'
                              : ''
                          }
                        />
                        {formik.errors?.expertise && (
                          <div className="text-danger">
                            {formik.errors?.expertise}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <FormGroup
                        className={
                          formik.errors?.availability &&
                          formik.touched.availability
                            ? 'border-danger border rounded d-flex flex-column'
                            : 'd-flex flex-column'
                        }
                      >
                        <Label for="availability">Availability:</Label>
                        <AvailabilitySelector
                          values={formik.values?.availability}
                          onChange={(value) => {
                            formik.setFieldValue('availability', value);
                          }}
                        />
                      </FormGroup>
                      {formik.errors?.availability && (
                        <div className="text-danger">
                          {formik.errors?.availability}
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className="d-flex justify-content-end ">
                      <Button
                        color="warning"
                        onClick={formik.submitForm}
                        disabled={!formik.isValid}
                      >
                        Edit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Add;
