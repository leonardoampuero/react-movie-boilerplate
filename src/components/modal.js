import React from 'react';
import { Modal, Icon, Image, Button } from 'semantic-ui-react';

export default ({modalOpen, handleClose, movie}) => {
  return (
    <Modal 
      open={modalOpen}
      onClose={() => handleClose()}
      trigger={<Button>Show Modal</Button>} centered={false}>
        <Modal.Header>{movie.title}</Modal.Header>
        <Modal.Content image>
          <Image src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`} />
          <Modal.Description>
            {movie.overview}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={() => handleClose()} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
  );
};