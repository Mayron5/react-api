import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioRestaurante = () => {

  const [nome, setNome] = useState('');
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
        .then(response => {
          setNome(response.data.nome);
        });
    }
  }, [parametros]);

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, { nome })
        .then(() => console.log('atualizado com sucesso'));
    } else {
      axios.post('http://localhost:8000/api/v2/restaurantes/', { nome })
        .then(() => console.log('cadastrado com sucesso!'));
    }

  };

  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField value={nome} onChange={event => setNome(event.target.value)} id='name' label='Nome' variant='standard' />
      <Button variant='outlined' type='submit'>Salvar</Button>
    </form>
  );
};

export default FormularioRestaurante;