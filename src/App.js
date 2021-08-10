import './App.css';
import FormLoading from './components/Form';
import { Container, Grid } from 'semantic-ui-react'

function App() {
  return (
    <Container>
    <Grid>
      <Grid.Row>
        <FormLoading></FormLoading>
      </Grid.Row>      
    </Grid>
    </Container>
  );
}

export default App;
