import { gql } from '@apollo/client';

const EXPERT_FRAGMENT = gql`
  fragment expertAttributes on Expert {
    name
    email
    bio
    phone
    image
    expertise {
      name
    }
    availability {
      day
      startTime
      endTime
      key
    }
    slackData {
      accessToken
      authedUserId
    }
  }
`;

export const GET_EXPERT_BY_EMAIL = gql`
  query getExpertByEmail($email: String!) {
    expert(email: $email) {
      ...expertAttributes
    }
  }
  ${EXPERT_FRAGMENT}
`;

export const EXPERTS_LIST = gql`
  {
    experts {
      ...expertAttributes
    }
  }
  ${EXPERT_FRAGMENT}
`;

export const EXPERTISE = gql`
  {
    expertise {
      value: _id
      count
    }
  }
`;
