import { useEffect, useState } from "react";

import personService from "../services/phonebook";

import Table from "../layout/Table";
import Input from "../layout/Input";

function Home() {
  const [persons, setPersons] = useState([]);
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(); // Carrega os dados iniciais
  }, []);

  const fetchData = () => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response.data);
        setShowForm(false);
      })
      .catch((error) => {
        if (error.response) {
          // O servidor respondeu com um status de erro
          console.error("Erro na requisição:", error.response);
        } else if (error.request) {
          // A requisição foi feita, mas não houve resposta do servidor
          console.error("Não foi possível se conectar ao servidor.");
          setError(
            "Não foi possível se conectar ao servidor. Verifique sua conexão de rede."
          );
        } else {
          // Algo aconteceu na configuração da requisição que causou o erro
          console.error("Erro na configuração da requisição:", error.message);
        }
      });
  };

  const addPerson = async (event) => {
    event.preventDefault();
    const personObject = {
      nome: nome,
      numero: numero,
    };

    await personService.create(personObject);

    setNome("");
    setNumero("");

    // Após a criação, atualize a lista de persons chamando fetchData novamente
    fetchData();
  };

  const handleNomeChange = (event) => {
    // console.log(event.target.value);
    setNome(event.target.value);
  };

  const handleNumeroChange = (event) => {
    // console.log(event.target.value);
    setNumero(event.target.value);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleDelete = async (id) => {
    await personService.remove(id);
    // Após a exclusão, atualize a lista de persons chamando fetchData novamente
    fetchData();
  };

  return (
    <div className="container">
      <h2 className="mt-2">Listar e Cadastrar Pessoas</h2>
      {error ? (
        <p className="alert alert-warning" role="alert">
          {error}
        </p>
      ) : (
        <>
          <button onClick={toggleForm} className="btn btn-success">
            {showForm ? "Voltar para a Tabela" : "Cadastrar Pessoa"}
          </button>

          {showForm ? (
            <>
              <hr />
              <form onSubmit={addPerson} className="bg-success-subtle p-2">
                <div className="mb-3">
                  <Input
                    textLabel="nome"
                    text="Nome"
                    textPlaceholder="Digite o seu nome..."
                    onChange={handleNomeChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="telefone" className="form-label">
                    Telefone:
                  </label>
                  <input
                    type="text"
                    placeholder="Digite o seu telefone..."
                    className="form-control"
                    onChange={handleNumeroChange}
                    required
                  />
                  <button className="btn btn-success mt-4">Cadastrar</button>
                </div>
              </form>
            </>
          ) : (
            <div>
              <hr />
              <Table persons={persons} handleDelete={handleDelete} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
