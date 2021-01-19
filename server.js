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

// Cria servidor
const server = new grpc.Server();

// Declara implementacoes do contrato
server.addService(calculator_proto.Calculator.service, {
  Sum: sum,
  Subtraction: subtraction,
  Multiplication: multiplication,
  Division: division,
});

// Configura e inicia servidor
server.bindAsync(
  "localhost:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);

// Implementacao dos metodos
function sum(call, callback) {
  const { firstNumber, secondNumber } = call.request;
  callback(null, {
    result: firstNumber + secondNumber,
  });
}
function subtraction(call, callback) {
  const { firstNumber, secondNumber } = call.request;
  callback(null, {
    result: firstNumber - secondNumber,
  });
}
function multiplication(call, callback) {
  const { firstNumber, secondNumber } = call.request;
  callback(null, {
    result: firstNumber * secondNumber,
  });
}
function division(call, callback) {
  const { firstNumber, secondNumber } = call.request;
  callback(null, {
    result: firstNumber / secondNumber,
  });
}
