import gql from 'graphql-tag';
export default gql`
mutation getUserByEmail($email:String!){
  getUserByEmail(email:$email){
  id
  name
  email
 }
}
`;
