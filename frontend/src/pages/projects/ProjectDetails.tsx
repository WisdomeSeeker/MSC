import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Détails du projet
        </Typography>
        <Typography variant="body1">
          ID du projet : {id}
        </Typography>
      </Box>
    </Container>
  );
};

export default ProjectDetails;
