import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';

const AdiministracaoPratos = () => {

  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {

    http.get('pratos/')
      .then(response => setPratos(response.data));

  }, []);

  const excluirPratos = (pratoParaSerExcluido: IPrato) => {
    http.delete(`pratos/${pratoParaSerExcluido.id}/`)
      .then(() => {
        const listaPratos = pratos.filter(prato => prato.id !== pratoParaSerExcluido.id);
        setPratos(listaPratos);
      });
  };

  return (
    <TableContainer component={Paper} sx={{ padding: 5, boxSizing: 'border-box' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>
                <a href={prato.imagem} rel='noreferrer' target='_blank'>[ver imagem]</a>
              </TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                <Link to={`/admin/pratos/${prato.id}`}>[editar]</Link>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='error' onClick={() => excluirPratos(prato)}>
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

export default AdiministracaoPratos;