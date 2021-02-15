const express = require('express');
const morgan = require('morgan');
const { request, gql } = require('graphql-request');

require('dotenv').config();

const app = express();
const environment = process.env.NODE_ENV;
const protocol = process.env.SERVER_PROTOCOL;
const host = process.env.SERVER_HOST;
const port = environment !== 'development' ? process.env.PORT : 6005;
const client = process.env.CLIENT_ENDPOINT;

app.use(morgan('combined'));

app.get('/', (_, res) => {
  res.send('Teneo Spacex Server');
});

const QUERY_ROCKETS = gql`
  {
    rockets {
      id
      name
      type
    }
  }
`;

app.get('/rockets', async (_, res) => {
  const data = await request(client, QUERY_ROCKETS);

  res.send(data);
});

const QUERY_MISSONS = gql`
  {
    missions {
      id
      name
      description
    }
  }
`;

app.get('/missions', async (_, res) => {
  const data = await request(client, QUERY_MISSONS);

  res.send(data);
});

app.listen(port, () => {
  console.log(`Teneo Spacex Server is listening at ${protocol}://${host}:${port}`);
});
