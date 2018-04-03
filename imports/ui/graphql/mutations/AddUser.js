import gql from 'graphql-tag';

export default gql`
mutation ($name:String!,$email:String!,$number:String!,$gender:String!,$password:String!,$createdAt:String!,$type:String!){
  addUser(
    name:$name,
		email:$email,
		number:$number,
    gender:$gender,
		password:$password,
		createdAt:$createdAt,
		type:$type
  ){
    id
    type
  }
}`;
