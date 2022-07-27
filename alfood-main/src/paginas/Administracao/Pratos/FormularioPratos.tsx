import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';
import ITag from '../../../interfaces/ITag';

const FormularioPrato = () => {

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const [tags, setTags] = useState<ITag[]>([]);
  const [tag, setTag] = useState('');

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [restaurante, setRestaurante] = useState('');

  const [imagem, setImagem] = useState<File | null>(null);

  useEffect(() => {
    http.get<{ tags: ITag[] }>('tags/')
      .then(response => setTags(response.data.tags));

    http.get<IRestaurante[]>('restaurantes/')
      .then(response => setRestaurantes(response.data));
  }, []);

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const formData = new FormData();

    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('tag', tag);
    formData.append('restaurante', restaurante);

    if (imagem) formData.append('imagem', imagem);

    http.request({
      url: 'pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(() => {
        setNome('');
        setDescricao('');
        setTag('');
        setRestaurante('');
        setImagem(null);
        alert('prato cadastrado com sucesso');
      })
      .catch(error => console.error(error));

  };

  return (
    <Box>
      <Typography component='h1' variant='h6'>Formulário de Pratos</Typography>
      <Box component='form' onSubmit={aoSubmeterForm}>
        <TextField
          value={nome}
          onChange={event => setNome(event.target.value)}
          id='name'
          label='Nome'
          variant='standard'
          fullWidth
          required
          margin='dense'
        />
        <TextField
          value={descricao}
          onChange={event => setDescricao(event.target.value)}
          id='name'
          label='Descrição'
          variant='standard'
          fullWidth
          required
          margin='dense'
        />

        <FormControl
          margin='dense'
          fullWidth
        >
          <InputLabel id='select-tag'>Tag</InputLabel>
          <Select labelId='select-tag' value={tag} onChange={(evento) => setTag(evento.target.value)}>
            {tags.map(tag => (
              <MenuItem key={tag.id} value={tag.value}>{tag.value}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          margin='dense'
          fullWidth
        >
          <InputLabel id='select-restaurante'>Restaurante</InputLabel>
          <Select labelId='select-restaurante' value={restaurante} onChange={(evento) => setRestaurante(evento.target.value)}>
            {restaurantes.map(restaurante => (
              <MenuItem key={restaurante.id} value={restaurante.id}>{restaurante.nome}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <input type='file' onChange={(evento) => evento.target.files && setImagem(evento.target?.files[0])}></input>

        <Button sx={{ marginTop: 1 }} variant='outlined' fullWidth type='submit'>Salvar</Button>
      </Box>
    </Box>
  );
};

export default FormularioPrato;