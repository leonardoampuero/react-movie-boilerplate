import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

export default ({movie, onClick}) => {
  return (
    <Card onClick={() => onClick(movie)}>
      <Image src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`} wrapped ui={false}/>
      <Card.Content>
        <Card.Header>{ movie.title }</Card.Header>
        <Card.Meta>
          <span className='date'>Released { movie.release_date }</span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
          <Icon name='user' />
          votes avg: { movie.vote_average }
      </Card.Content>
    </Card>
  );
};