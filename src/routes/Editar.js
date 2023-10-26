import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import personService from "../services/phonebook";
import FormularioEdicao from "../layout/FormularioEdicao"; // Importe o novo componente

function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");

  useEffect(() => {
    personService.getOne(id).then((response) => {
      setNome(response.data[0].nome);
      setNumero(response.data[0].numero);
      console.log(response.data)
    });
    
  }, [id]);

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleNumeroChange = (event) => {
    setNumero(event.target.value);
  };

  const editPerson = async (event) => {
    event.preventDefault();

    const personObject = {
      nome: nome,
      numero: numero,
    };

    await personService.update(id, personObject);

    navigate("/");
  };

  const cancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Edição de Dados</h2>
<<<<<<< HEAD
      <form onSubmit={editPerson}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome:
          </label>
          <input
            type="text"
            className="form-control"
            defaultValue={nome}
            onChange={handleNomeChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="numero" className="form-label">
            Número:
          </label>
          <input
            type="text"
            className="form-control"
            defaultValue={numero}
            onChange={handleNumeroChange}
          />
          <button className="btn btn-secondary mt-4">Editar</button>
          <button className="btn btn-warning mt-4 mx-3" onClick={cancel}>
            Cancelar
          </button>
        </div>
      </form>
=======
      <FormularioEdicao
        nome={nome}
        numero={numero}
        onNomeChange={handleNomeChange}
        onNumeroChange={handleNumeroChange}
        onEditar={editPerson}
      />
>>>>>>> 1e4605488021efe1bd3509dd0a02534f1cd96408
    </div>
  );
}

export default Editar;
