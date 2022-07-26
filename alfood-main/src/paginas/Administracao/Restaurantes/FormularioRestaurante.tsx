import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioRestaurante = () => {

  const [nome, setNome] = useState('');
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(response => {
          setNome(response.data.nome);
        });
    }
  }, [parametros]);

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, { nome })
        .then(() => alert('atualizado com sucesso'));
    } else {
      http.post('restaurantes/', { nome })
        .then(() => alert('cadastrado com sucesso!'));
    }

  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component='h1' variant='h6'>Formulário de Restaurantes</Typography>
      <Box component='form' onSubmit={aoSubmeterForm}>
        <TextField
          value={nome}
          onChange={event => setNome(event.target.value)}
          id='name'
          label='Nome'
          variant='standard'
          fullWidth
          required
        />
        <Button sx={{marginTop: 1}} variant='outlined' fullWidth type='submit'>Salvar</Button>
      </Box>
    </Box>
  );
};

export default FormularioRestaurante;