/* eslint-disable react/no-unescaped-entities */
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
import _ from 'lodash';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useCallback, useEffect, useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import Header from '../../components/Header';
import { UPDATE_EXPERT } from '../../graphql/mutations';
import useAuth from '../../hooks/useAuth';
import radar from '../../data/radar.json';

const RegistrationSchema = Yup.object().shape({
  expertise: Yup.array().min(1).required(),
});

const Step3 = () => {
  const { userData, refetch } = useAuth();
  const router: any = useRouter();
  const [options, setOptions] = useState([]);
  const [updateExpert] = useMutation(UPDATE_EXPERT);

  const formik = useFormik({
    initialValues: {
      expertise: userData?.expertise ?? [],
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
          expertise: [
            ...formik.values.expertise.map((theme) =>
              typeof theme === 'object'
                ? _.pick(theme, ['name'])
                : { name: theme },
            ),
          ],
        },
      },
    });
    await refetch();
    router.push('/registration/step4');
  }, [formik.values, userData]);

  useEffect(() => {
    const techs = [];
    radar.blips.forEach((blip) => {
      techs.push(blip.name);
    });
    setOptions(_.uniq(techs));
  }, []);

  return (
    <>
      <Header title="Tikal 10n1 step3" />
      <Container>
        <Row>
          <Col md={8}>
            <Card className="p-4">
              <CardHeader className="pt-2 px-3">
                <h2>Registration Step III - Choose your expertise</h2>
              </CardHeader>
              <CardBody>
                <p>
                  Please select from the list of expertise the technologies you
                  fell comfortable to help others with. If one of the tech's is
                  missing type the name of the tech and click "New selection"
                </p>
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
                  placeholder="Choose expertise, You can choose several expertise..."
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
                <br />
                {formik?.values?.expertise?.length === 0 && (
                  <span className="text-danger">
                    Please select at least one expertise in order to proceed.
                  </span>
                )}
                <br />
                <Button
                  size="lg"
                  color="primary"
                  disabled={formik?.values?.expertise?.length === 0}
                  onClick={submit}
                >
                  Next Step
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col md={4} className="text-center">
            <img
              src="/superHero3.png"
              alt="Be a 10n1 Super hero"
              style={{ maxWidth: '75%' }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TagCloud
              minSize={14}
              maxSize={60}
              tags={[]}
              onClick={
                (tag) => alert(tag)
                // setSelectedFilters({
                //   ...selectedFilters,
                //   themes: tag.value,
                // })
              }
              shuffle
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Step3;
