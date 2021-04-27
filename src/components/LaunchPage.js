import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  Button,
  Carousel,
  Col,
  Image,
  ListGroup,
  Row,
  Spinner,
} from 'react-bootstrap';
import moment from 'moment';

const GET_LAUNCH = gql`
  query LaunchQuery($id: String!) {
    getLaunch(id: $id) {
      id
      flight_number
      name
      success
      details
      date_local
      links {
        patch {
          small
        }
      }
      rocket {
        name
        first_flight
        description
        flickr_images
        engines {
          type
          version
        }
      }
    }
  }
`;

function LaunchPage({ match }) {
  const id = match.params.id;

  const { loading, error, data } = useQuery(GET_LAUNCH, {
    variables: { id },
  });

  if (loading)
    return (
      <div className='d-flex justify-content-center'>
        <Spinner animation='border' />
      </div>
    );
  if (error) return <h2>No Mission Found</h2>;

  return (
    <>
      {data.getLaunch && (
        <Row className='my-3'>
          <Col>
            <Button
              variant='secondary'
              onClick={() => {
                window.history.back();
              }}
            >
              Back
            </Button>
            <Image
              src={
                data.getLaunch.links.patch.small
                  ? data.getLaunch.links.patch.small
                  : '/images/space-shuttle.svg'
              }
              alt='N.A'
              width='100'
              className='float-right'
            />
            <h3 className='my-3'>
              Mission:{' '}
              <span
                style={{
                  color: data.getLaunch.success
                    ? 'green'
                    : data.getLaunch.success === null
                    ? 'white'
                    : 'red',
                }}
              >
                {data.getLaunch.name}
              </span>
            </h3>
            <h5>Launch Details</h5>
            <ListGroup className='my-3'>
              <ListGroup.Item>
                <span style={boldText}>Flight Number: </span>
                {data.getLaunch.flight_number}
              </ListGroup.Item>
              <ListGroup.Item>
                <span style={boldText}>Launch Year: </span>
                {moment(data.getLaunch.date_local).format('YYYY')}
              </ListGroup.Item>
              <ListGroup.Item>
                <span style={boldText}>Mission Details: </span>{' '}
                {data.getLaunch.details ? data.getLaunch.details : 'N/A'}
              </ListGroup.Item>
              <ListGroup.Item>
                <span style={boldText}>Launch Succesful: </span>
                <span
                  style={{
                    color: data.getLaunch.success
                      ? 'green'
                      : data.getLaunch.success === null
                      ? 'white'
                      : 'red',
                  }}
                >
                  {data.getLaunch.success ? 'Yes' : 'No'}
                </span>
              </ListGroup.Item>
            </ListGroup>
            <h5 className='mt-5'>Rocket Details</h5>
            <ListGroup className='my-3'>
              <ListGroup.Item>
                <span style={boldText}>Rocket Name: </span>
                {data.getLaunch.rocket.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <span style={boldText}>Rocket Type: </span>{' '}
                {data.getLaunch.rocket.engines.type}{' '}
                {data.getLaunch.rocket.engines.version}
              </ListGroup.Item>
              <ListGroup.Item>
                <span style={boldText}>First Flight: </span>
                {moment(data.getLaunch.rocket.first_flight).format(
                  'DD-MM-YYYY'
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <span style={boldText}>Rocket Description: </span>{' '}
                {data.getLaunch.rocket.description
                  ? data.getLaunch.rocket.description
                  : 'N/A'}
              </ListGroup.Item>
              {data.getLaunch.rocket.flickr_images && (
                <ListGroup.Item>
                  <Carousel>
                    {data.getLaunch.rocket.flickr_images.map((img) => (
                      <Carousel.Item>
                        <img
                          className='d-block w-100'
                          src={img}
                          alt='Rocket Slide'
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
}

const boldText = {
  fontWeight: 'Bold',
  color: 'GhostWhite',
};

export default LaunchPage;
