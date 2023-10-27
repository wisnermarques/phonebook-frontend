import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import personService from "../services/phonebook";

function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");

  useEffect(() => {
    personService.getOne(id).then((response) => {
      setNome(response.data.nome);
      setNumero(response.data.numero);
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
        </div>
        <button className="btn btn-secondary">Editar</button>
        <button className="btn btn-warning mx-3" onClick={cancel}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default Editar;
