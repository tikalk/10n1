import { gql } from '@apollo/client';

export const CREATE_EXPERT = gql`
  mutation createExpert($input: ExpertInput!) {
    addExpert(input: $input) {
      name
    }
  }
`;

export const UPDATE_EXPERT = gql`
  mutation updateExpert($input: ExpertInput!) {
    updateExpert(input: $input) {
      name
    }
  }
`;
