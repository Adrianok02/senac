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

function loadUsuarios(){
    if(validaSessaoSistema()){
        loadMenu();
        const method = "GET";
        const rota = "usuarios";
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

    console.log("totalUsuarios: " + aListaDados.length);

    const tabela = document.querySelector("#consulta-usuarios");
    tabela.innerHTML = "";
    aListaDados.forEach(function (data, key) {
        const codigo    = data.id;
        const nome = data.nome;
        const email     = data.email;
        const senha   = data.senha;
        
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
            email +
            `</td>
            <td class="text-center">` +
            senha +
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
                <button class="btn btn-warning" onclick="alterarUsuarios(` +
        codigo +
        `)">Alterar</button>
                <button  class="btn btn-danger" onclick="excluirUsuarios(` +
        codigo +
        `)">Excluir</button>
        </div>
    `
    );
}

function excluirUsuarios(codigo){
    const method = "DELETE";
    const rota = "usuarios/" + codigo;
    callApi(method, rota, function (data) {
        loadUsuarios();
    });
}

function IncluirUsuarios(){
    // limpa os dados antes de incluir
    document.querySelector("#nome").value = "";
    document.querySelector("#email").value     = "";
    document.querySelector("#senha").value   = "";

    const method = "GET";
    const rota = "usuarios";
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
        document.querySelector("#acao").value = "ACAO_INCLUIR";
    });
}

async function confirmarUsuarios(){
    // Pegar os dados do formulario
    const id = document.querySelector("#id").value;
    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    // Salvar na minha API
    salvarDados(id,
        nome,
        email,
        senha
    );
}

function salvarDados(id,
    nome,
    email,
    senha){
    const method = "POST";
    const rota = "usuarios";
    const body = {
        id : id.toString(),
        nome,
        email,
        senha
    };

    callApiPost(method, rota, function (data) {}, body);
}

function alterarUsuarios(id){
    // Para abrir o modal, precisa "simular" o clique no botao de incluir
    
    // Abrir o modal
    const btnIncluirUsuarios = document.querySelector("#btnIncluirUsuarios");
    btnIncluirUsuarios.click();

    // Após abrir o modal, precisa carregar os dados do produto
    const method = "GET";
    const rota = "usuarios/" + id;
    callApi(method, rota, function (data) {
        // Produto retornado da API

        // Pegar os dados e setar no formulario
        document.querySelector("#id").value = data.id;
        document.querySelector("#nome").value = data.nome;
        document.querySelector("#email").value = data.email;
        document.querySelector("#senha").value = data.senha;

        // Seta a ação para "Alterar"
        document.querySelector("#acao").value = "ACAO_ALTERAR";
    });
}