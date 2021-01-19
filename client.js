// Inicialmente mesmo codigo para server e client para carregar e definir contrato
// Importa biblioteca de comunicacao rpc
const grpc = require("@grpc/grpc-js");
// Importa biblioteca de parsing do arquivo contrato
const protoLoader = require("@grpc/proto-loader");
// Caminho do arquivo contrato
const PROTO_PATH = __dirname + "/calculator.proto";
// Carrega arquivo contrato
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const calculator_proto = grpc.loadPackageDefinition(packageDefinition);

// Configura conexao com server
const client = new calculator_proto.Calculator(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

console.log("Somando 65 com 15");
client.Sum({ firstNumber: 65, secondNumber: 15 }, function (err, response) {
  console.log("Resultado:", response.result);
});

console.log("Subtraindo 59 por 60");
client.Subtraction(
  { firstNumber: 59, secondNumber: 60 },
  function (err, response) {
    console.log("Resultado:", response.result);
  }
);

console.log("Multiplicando 8 por 34");
client.Multiplication(
  { firstNumber: 8, secondNumber: 34 },
  function (err, response) {
    console.log("Resultado:", response.result);
  }
);

console.log("Dividindo 77 com 19");
client.Division(
  { firstNumber: 77, secondNumber: 19 },
  function (err, response) {
    console.log("Resultado:", response.result);
  }
);
