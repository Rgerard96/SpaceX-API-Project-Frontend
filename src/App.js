import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import 'bootswatch/dist/cyborg/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import LaunchesPage from './components/LaunchesPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LaunchPage from './components/LaunchPage';

const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_API,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Container>
        <div className='logoBox my-4'>
          <img src='/images/SpaceX-White-Logo.wine.svg' alt='SpaceX Logo' />
        </div>
        <Router>
          <Route exact path='/' component={LaunchesPage} />
          <Route exact path='/launch/:id' component={LaunchPage} />
        </Router>
      </Container>
    </ApolloProvider>
  );
}

export default App;
