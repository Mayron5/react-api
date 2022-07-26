import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';

const AdiministracaoRestaurante = () => {

  const [restaudantes, setRestaudantes] = useState<IRestaurante[]>([]);

  useEffect(() => {

    axios.get('http://localhost:8000/api/v2/restaurantes/')
      .then(response => setRestaudantes(response.data));

  }, []);

  const excluirRestaurante = (restauranteParaSerExcluido: IRestaurante) => {
    axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteParaSerExcluido.id}/`)
      .then(() => {
        const listaRestaurante = restaudantes.filter(restaurante => restaurante.id !== restauranteParaSerExcluido.id);
        setRestaudantes(listaRestaurante);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaudantes.map((restaurante => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                <Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='error' onClick={() => excluirRestaurante(restaurante)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdiministracaoRestaurante;