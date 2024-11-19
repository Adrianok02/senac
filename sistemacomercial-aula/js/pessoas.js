function loadMenu(){
    document.querySelector("#menu").innerHTML = `
        <nav>
        <ul>
            <li><a href="produtos.html">Produtos</a></li>
            <!-- Falta abaixo -->
            <li><a href="usuarios.html">Usuarios</a></li>
            <li><a href="pessoas.html">Pessoas</a></li>
            <li><a href="vendas.html">Vendas</a></li>
            <li><a href="login.html">Login</a></li>
            <li><a href="#" onclick="logout()">Logout</a></li>
        </ul>
    </nav>
    `;
}

function loadPessoas(){
    if(validaSessaoSistema()){
        loadMenu();
        const method = "GET";
        const rota = "pessoas";
        callApi(method, rota, function (data) {
            carregaTabelaConsulta(data);
        });
    }
}

function carregaTabelaConsulta(aListaDados) {
    // Se não for array, coloca como array
    if (!Array.isArray(aListaDados)) {
        aListaDados = new Array(aListaDados);
    }

    console.log("totalPessoas: " + aListaDados.length);

    const tabela = document.querySelector("#consulta-Pessoa");
    tabela.innerHTML = "";
    aListaDados.forEach(function (data, key) {
        const codigo    = data.id;
        const nome = data.nome;
        const cidade     = data.cidade;
        const estado   = data.estado;
        const endereco   = data.endereco;
        const telefone   = data.telefone;
        
        const acoes = getAcoes(codigo);

        tabela.innerHTML +=
            `
        <tr>
            <td class="text-center">` +
            codigo +
            `</td>
            <td style="text-align: left;">` +
            nome +
            `</td>
            <td class="text-center" style="text-align: right;">` +
            cidade +
            `</td>
            <td class="text-center">` +
            estado +
            `</td>           
            <td class="text-center">` +
            endereco +
            `</td>           
            <td class="text-center">` +
            telefone +
            `</td>           
            <td>` +
            acoes +
            `</td>
        </tr>
        `;
    });
}

function getAcoes(codigo) {
    return (
        `<div class="acoes text-center">
                <button class="btn btn-warning" onclick="alterarPessoa(` +
        codigo +
        `)">Alterar</button>
                <button  class="btn btn-danger" onclick="excluirPessoa(` +
        codigo +
        `)">Excluir</button>
        </div>
    `
    );
}

function excluirPessoa(codigo){
    const method = "DELETE";
    const rota = "pessoas/" + codigo;
    callApi(method, rota, function (data) {
        loadPessoas();
    });
}

function incluirPessoa(){
    // limpa os dados antes de incluir
    document.querySelector("#nome").value = "";
    document.querySelector("#cidade").value     = "";
    document.querySelector("#estado").value   = "";
    document.querySelector("#endereco").value   = "";
    document.querySelector("#telefone").value   = "";

    const method = "GET";
    const rota = "pessoas";
    let novoCodigo = 0;
    callApi(method, rota, function (data) {
        const proximoCodigo = parseInt(data.length) + 1;
        
        novoCodigo = parseInt(proximoCodigo);

        // Recebe os dados do servidor
        const aListaDados = data;

        // Percorrer o array e ver se nao tem um codigo maior
        aListaDados.forEach(function (data, key) {
            const codigo = data.id;
            if(codigo >= novoCodigo){
                novoCodigo = parseInt(codigo) + 1;
            }
        });

        console.log("Proximo codigo:" + novoCodigo);

        // Seta o proximo codigo na tela
        document.querySelector("#id").value = novoCodigo;
    });
}

async function confirmarPessoa(){
    // Pegar os dados do formulario
    const id = document.querySelector("#id").value;
    const nome = document.querySelector("#nome").value;
    const cidade = document.querySelector("#cidade").value;
    const estado = document.querySelector("#estado").value;
    const endereco = document.querySelector("#endereco").value;
    const telefone = document.querySelector("#telefone").value;
    
    // Salvar na minha API
    salvarDados(id,
        nome,
        cidade,
        estado,
        endereco,
        telefone
    );
}

function salvarDados(id,
    nome,
    cidade,
    estado,
    endereco,
    telefone){
    const method = "POST";
    const rota = "pessoas";
    const body = {
        id : id.toString(),
        nome,
        cidade,
        estado,
        endereco,
        telefone
    };

    callApiPost(method, rota, function (data) {}, body);
}

function alterarPessoa(id){
    // Para abrir o modal, precisa "simular" o clique no botao de incluir
    
    // Abrir o modal
    const btnIncluirPessoa = document.querySelector("#btnIncluirPessoa");
    btnIncluirPessoa.click();

    // Após abrir o modal, precisa carregar os dados do Pessoa
    const method = "GET";
    const rota = "pessoas/" + id;
    callApi(method, rota, function (data) {
        // Pessoa retornado da API

        // Pegar os dados e setar no formulario
        document.querySelector("#id").value = data.id;
        document.querySelector("#nome").value = data.nome;
        document.querySelector("#cidade").value = data.cidade;
        document.querySelector("#estado").value = data.estado;
        document.querySelector("#endereco").value = data.endereco;
        document.querySelector("#telefone").value = data.telefone;
    });
}