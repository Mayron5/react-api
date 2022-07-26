import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';

const AdiministracaoRestaurante = () => {

  const [restaudantes, setRestaudantes] = useState<IRestaurante[]>([]);

  useEffect(() => {

    axios.get('http://localhost:8000/api/v2/restaurantes/')
      .then(response => setRestaudantes(response.data));

  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaudantes.map((restaurante => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdiministracaoRestaurante;