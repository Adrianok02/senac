# Backend - Projeto "apiareazul"
* Alteração 00
    * Adicionar as classes abaixo na apiareaazul
        ```
        apiareaazul/main/model/Perfil.java
        apiareaazul/main/model/Estacionamento.java
        ```
* Alteração 01
     * Alterar o banco de dados para o banco do seu grupo em:
          * apiareaazul\src\main\resources\application.properties

* Alteração 02
    * Criar os arquivos Controller de cada model:
        * Cartao
        * Veiculo
        * Usuario
            * Login - ok
            * inserir - falta
        * Perfil
        * Estacionamento
    * Criar os arquivos Repository de cada model:
        * Cartao
        * Veiculo
        * Usuario
        * Perfil
        * Estacionamento

* Alteração 03
    * Na Classe Repository, inicialmente testar apenas com a classe herdada para o metodo findAll()
    * Depois ao criar o metodo consultaCadastro() no controller, criar os metodos que forem necessarios;

* Alteração 04
    * Na Classe Controller de cada tabela [Exemplo de ProdutoController], criar os metodos abaixo:
        * getAll() - Deve listar todos os registros da tabela;
        * getCadastroById() - Deve listar apenas 1 registro pelo id da tabela;
        * createCadastro() - Vai inserir um novo registro no banco de dados
        * updateCadastro() - Vai alterar um registro no banco de dados
        * deleteCadastro() - Vai excluir um registro no banco de dados
        * consultaCadastro() - Vai consultar os registros no banco de dados
            * Deve ter o Operador "IGUAL" para todos os campos da tabela
            * Para campo do tipo String, deve ser usado SQL com operador ilike "%"
            como foi feito em:ProdutoController::consultaCadastro(), com o operador "OperadoresConsulta.OPERADOR_IGUAL"
                * produtoRepository.findProdutoByDescricao()
* Alteração 05
    * No ControllerUsuario, criar o metodo de Login, criando tambem uma classe de Login com os dados de Login do projeto com os campos abaixo:
        * Telefone - 
        * Cidade - 
        * Senha -
    * Usar a classe de Login do projeto "apijavasenac" como exemplo, apenas adicionar os campos do tipo String 

# Frontend - Projeto "areazul"
* Alteração 01 - Login
    * Criar a autenticação via Login, assim como foi feito no projeto "b2systemsenac"
    * Criar a inserção de um novo usuario no botão de nome "Criar Nova Conta", adicionando uma funcao onclick() nele e gravando os dados 
    pela rota da api de nome createCadastro()
        * Atenção!
            * Se houver erro ao criar o cadastro por motivo de "Telefone Duplicado", mostrar esta mensagem ao usuario, 
            usando a funcao do proprio js:
             * alert("Telefone já cadastrado!");

* Alteração 02 - Cartão
    * Ao clicar em confirmar(), deve chamar a rota da api de nome * Metodo POST e rota = "cartao"
    * que chama a funcao createCadastro()

* Alteração 03 - Veículo
    * Ao clicar em confirmar(), deve chamar a rota da api de nome * Metodo POST e rota = "veiculo"
        * que chama a funcao createCadastro()
        
* Alteração 04 - Perfil
    * Ao clicar em confirmar(), deve chamar a rota da api de nome "perfil"
        * Metodo POST e rota = "perfil" que chama a funcao createCadastro()
        * Deve inserir um novo perfil no banco de dados
    
* Alteração 05 - Estacionar
    * Ao clicar em confirmar(), deve chamar a rota da api de nome "estacionamento"
        * Metodo POST e rota = "perfil" que chama a funcao createCadastro()
        * Deve inserir um novo perfil no banco de dados

[ALTERACAO AULA - 08-07-2024]
FINALIZAR API COM AS SEGUINTES ROTAS
USUARIO - VALIDAR O LOGIN

CARTAO
VEICULO
ESTACIONAMENTO

se der tempo
	PERFIL 

[GRUPOS DE ALUNOS]
YAN CARLOS SCHAFFER JUNTO DO GRUPO DO ADRIANO

	