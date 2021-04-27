import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Button, Card, Col, Image, Row, Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import moment from 'moment';

const GET_LAUNCHES = gql`
  query LaunchesQuery {
    launches {
      id
      name
      success
      date_local
      links {
        patch {
          small
        }
      }
    }
  }
`;

function Launches() {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading)
    return (
      <div className='d-flex justify-content-center'>
        <Spinner animation='border' />
      </div>
    );
  if (error) return <h2>No Mission Found</h2>;

  return (
    <>
      {data.launches.map((launch) => (
        <Card
          key={launch.id}
          className='my-3 animate__animated animate__fadeInUp'
        >
          <Card.Body>
            <Row className='align-items-center'>
              <Col>
                <Card.Title>
                  Mission:{' '}
                  <span
                    style={{
                      color: launch.success
                        ? 'green'
                        : launch.success === null
                        ? 'white'
                        : 'red',
                    }}
                  >
                    {launch.name}
                  </span>
                </Card.Title>
                <Card.Text>
                  {moment(launch.date_local).format('DD-MM-YYYY hh:mm A')}
                </Card.Text>
                <LinkContainer to={`launch/${launch.id}`}>
                  <Button variant='secondary'>Launch Details</Button>
                </LinkContainer>
              </Col>
              <Col>
                <Image
                  src={
                    launch.links.patch.small
                      ? launch.links.patch.small
                      : '/images/space-shuttle.svg'
                  }
                  alt='N.A'
                  width='100'
                  className='float-right'
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default Launches;
