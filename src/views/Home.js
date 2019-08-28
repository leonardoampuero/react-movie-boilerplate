import React from 'react';
import { Button, Form, Grid, Rating, Loader} from 'semantic-ui-react';
import axios from 'axios';
import '../App.css';
import CardComponent from '../components/card';
import ModalComponent from '../components/modal';

const API = 'https://api.themoviedb.org';
const API_KEY = 'APIXXXXX';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      title: '',
      loading: false,
      stars: 3,
      min: 0,
      max: 10,
      modalOpen: false
    };
  }

  fetch = () => {
    let url = ''
    if (this.state.title === '') {
      url = `${API}/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    } else {
      url = `${API}/3/search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.title}`
    }
    this.setState({loading: true});
    axios.get(url).then(result => {
      this.setState({movies: [...result.data.results]})
    }).catch(error => {
      console.error(error);
    }).finally(() => {
      this.setState({loading: false})
    })
  }

  componentDidMount = () => {
    this.fetch();
  }

  handleChange = (event, data) =>  {
    this.setState({ [event.target.name]: data.value });
  }

  handleRatioChange = (event, data) =>  {
    let min = 0, max = 0;

    switch (data.rating){
      case 1:
        min = 0;
        max = 2;
        break;
      case 2:
        min = 2;
        max = 4;
        break;
      case 3:
        min = 4;
        max = 6;
        break;
      case 4:
        min = 6;
        max = 8;
        break;
      case 5:
        min = 8;
        max = 10;
        break;
      default:
        min = 0;
        max = 10;
        break;
    }
    this.setState({ min, max });
  }

  handleSubmit = (event) => {
    this.fetch();
  }

  handleOpen = (movie) => {
    this.setState({ modalOpen: true, selectedMovie: movie })
  }

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    const {movies, loading, min, max, selectedMovie} = this.state;
    const cards = movies.filter(movie => movie.vote_average >= min && movie.vote_average <= max)

    return (
      <div >
        <Grid.Row className="custom-row">
          <Form onSubmit={this.handleSubmit}>
              <Form.Input 
                fluid 
                type='text' 
                icon='disk' 
                iconPosition='left' 
                placeholder='Movie Title' 
                value={this.state.title} 
                name='title'
                onChange={this.handleChange} />

              <Rating 
                maxRating={5} 
                name= 'stars'
                icon='star' 
                size='huge' 
                clearable={true}
                className='custom-pad-10-bottom' 
                onRate={this.handleRatioChange}/>

              <Button color='teal' fluid size='large'>
                Search
              </Button>
          </Form>
        </Grid.Row>     
        <Grid.Row className="custom-row">
          {loading && <Loader active inline='centered' /> }
          <Grid relaxed columns={4}>
            { cards && cards.map( movie => (
              <Grid.Column key={ movie.id }>
                <CardComponent movie={movie} onClick={this.handleOpen}></CardComponent>
              </Grid.Column>
            ))}
          </Grid>
        </Grid.Row>  

        {selectedMovie && (
          <ModalComponent movie={selectedMovie} modalOpen={this.state.modalOpen} handleClose={this.handleClose}></ModalComponent>)
        }
      </div>
    );
  }
}

export default Login;
