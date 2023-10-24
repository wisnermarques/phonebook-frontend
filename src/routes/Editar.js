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

  return (
    <div className="container">
      <h2>Edição de Dados</h2>
      <FormularioEdicao
        nome={nome}
        numero={numero}
        onNomeChange={handleNomeChange}
        onNumeroChange={handleNumeroChange}
        onEditar={editPerson}
      />
    </div>
  );
}

export default Editar;
