import { Routes, Route } from 'react-router-dom';
import PaginaBaseAdmin from './paginas/Administracao/PaginaBaseAdmin';
import AdiministracaoPratos from './paginas/Administracao/Pratos/AdministracaoPrato';
import FormularioPrato from './paginas/Administracao/Pratos/FormularioPratos';
import AdiministracaoRestaurante from './paginas/Administracao/Restaurantes';
import FormularioRestaurante from './paginas/Administracao/Restaurantes/FormularioRestaurante';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path='/admin' element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdiministracaoRestaurante />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
        
        <Route path="pratos" element={<AdiministracaoPratos />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />
        
      </Route>

    </Routes>
  );
}

export default App;
 