import { Eye, Pencil, Trash2 } from "lucide-react";

const columnsClients = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "CPF/CNPJ",
    accessor: "cpf_cnpj",
  },
  {
    Header: "IE",
    accessor: "ie",
  },
  {
    Header: "CEP",
    accessor: "cep",
  },
  {
    Header: "City",
    accessor: "city",
  },
  {
    Header: "CAR - Rural Environmental Certificate",
    accessor: "car",
  },
  {
    Header: "Actions",
    accessor: "actions",
  },
];

const dataClients = [
  {
    id: "INV001",
    name: "Carlos Daniel",
    cpf_cnpj: "000.000.000-00",
    ie: "1111111111111111-11",
    cep: "36902-368",
    road: "BR-262",
    number: "123",
    neighborhood: "Centro",
    city: "Manhuaçu",
    car: "MG-3112901-8031 FF274DFE4B47B2B8E9DABABA6CE5AD5FWCA",
    actions: (
      <>
        <Pencil size={18} /> <Eye size={18} /> <Trash2 size={18} color="red" />
      </>
    ),
  },
  {
    id: "INV002",
    name: "Maria Clara",
    cpf_cnpj: "111.111.111-11",
    ie: "2222222222222222-22",
    cep: "12345-678",
    road: "BR-381",
    number: "123",
    neighborhood: "Centro",
    city: "Belo Horizonte",
    car: "MG-2112901-1234 ABCDEFE4B47B2B8E9DABABA6CE5A12345",
    actions: (
      <>
        <Pencil size={18} /> <Eye size={18} /> <Trash2 size={18} color="red" />
      </>
    ),
  },
  {
    id: "INV003",
    name: "João Silva",
    cpf_cnpj: "222.222.222-22",
    ie: "3333333333333333-33",
    cep: "87654-321",
    road: "BR-116",
    number: "123",
    neighborhood: "Centro",
    city: "São Paulo",
    car: "SP-3112901-8031 FF274DFE4B47B2B8E9DABABA6CE5AD5XXXX",
    actions: (
      <>
        <Pencil size={18} /> <Eye size={18} /> <Trash2 size={18} color="red" />
      </>
    ),
  },
  // Adicione mais clientes conforme necessário
];

export { columnsClients, dataClients };
