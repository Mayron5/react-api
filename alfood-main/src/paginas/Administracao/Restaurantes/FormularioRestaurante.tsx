import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

const FormularioRestaurante = () => {

  const [nome, setNome] = useState('');

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    axios.post('http://localhost:8000/api/v2/restaurantes/', {nome: nome})
      .then(() => console.log('cadastrado com sucesso!'));

  };

  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField value={nome} onChange={event => setNome(event.target.value)} id='name' label='Nome' variant='standard' />
      <Button variant='outlined' type='submit'>Salvar</Button>
    </form>
  );
};

export default FormularioRestaurante;