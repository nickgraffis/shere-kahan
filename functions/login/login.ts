import { Handler } from '@netlify/functions';
import { Call, Client } from 'faunadb';
const { FAUNADB: secret } = process.env;
import safeAwait from '../../utils/safeAwait';

const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') return {
    statusCode: 403,
    body: 'Invalid HTTP Method. POST requests only.'
  };

  if (!event.body) return {
    statusCode: 403,
    body: 'Please provide credentials inside the body of request!'
  };

  if (!secret) return {
    statusCode: 500,
    body: 'Internal Server Error: No FaunaDB server secret is set.'
  };

  const client = new Client({ secret });

  const { username, password } = JSON.parse(event.body);

  if (!username || !password) return {
    statusCode: 403,
    body: 'Please provide username and password inside the body of request!'
  };

  const [error, token] = await safeAwait(
    client.query(
      Call('login', username, password)
    )
  );
  console.log(token);
  console.log('Error', error);

  if (error) return {
    statusCode: parseInt(error.requestResult.statusCode),
    body: JSON.stringify(error.description)
  };
  
  return {
    statusCode: 200,
    body: JSON.stringify(token)
  };
};

module.exports = { handler };
