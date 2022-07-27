import {
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';
import { useQuery } from '@apollo/client';
import { TagCloud } from 'react-tagcloud';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import Header from '../../components/Header';
import { EXPERTISE, EXPERTS_LIST } from '../../graphql/queries';
import ExpertCard from '../../components/ExpertCard';

const Index = () => {
  const { data } = useQuery(EXPERTS_LIST);
  const { data: expertise } = useQuery(EXPERTISE);
  const [searchString, setSearchString] = useState('');
  const [experts, setExperts] = useState([]);
  const [expertiseFilter, setExpertiseFilter] = useState('');

  useEffect(() => {
    if (!searchString && !expertiseFilter) {
      setExperts(data?.experts);
    } else if (searchString && !expertiseFilter) {
      setExperts(
        data.experts.filter(
          (expert) =>
            expert.name.toLowerCase().search(searchString.toLowerCase()) > -1,
        ),
      );
    } else if (expertiseFilter && !searchString) {
      setExperts(
        data.experts.filter((expert) => {
          const regex = new RegExp(
            _.map(expert.expertise, 'name').join('|'),
            'i',
          );
          return regex.test(expertiseFilter) && expert.expertise.length;
        }),
      );
    } else {
      setExperts(
        data.experts.filter((expert) => {
          const regex = new RegExp(expert.expertise.join('|'), 'i');
          return (
            regex.test(expertiseFilter) &&
            expert.expertise.length &&
            expert.name.toLowerCase().search(searchString.toLowerCase()) > -1
          );
        }),
      );
    }
  }, [searchString, expertiseFilter, data?.experts]);

  return (
    <>
      <Header title="10n1 - Expert List" />
      <Container className="mt-4">
        <h1 className="d-flex align-items-center">
          Experts List ({experts?.length})&nbsp;&nbsp;&nbsp;
          {expertiseFilter && (
            <span style={{ fontSize: 20 }}>
              {'     '}- Filtered by: {expertiseFilter}
            </span>
          )}{' '}
          {searchString && (
            <span style={{ fontSize: 20 }}>
              {'     '}- Filtered by name starting with: {searchString}
            </span>
          )}
        </h1>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="now-ui-icons users_single-02" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Search Expert by name"
            onChange={(e) => setSearchString(e.target.value)}
          />
        </InputGroup>
        {expertise?.expertise?.length > 0 && (
          <TagCloud
            minSize={14}
            maxSize={60}
            tags={expertise?.expertise}
            onClick={(tag) => {
              if (tag.value === expertiseFilter) {
                setExpertiseFilter('');
              } else {
                setExpertiseFilter(tag.value);
              }
            }}
            shuffle
          />
        )}
        <hr className="mb-5" />
        <Row>
          {data &&
            experts?.length &&
            experts?.map((expert) => (
              <Col key={expert.email} md={6}>
                <ExpertCard expert={expert} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default Index;
