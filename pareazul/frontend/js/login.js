function onloadLogin() {
    var url_atual = window.location.href;
    if (url_atual.includes("http://127.0.0.1:5500/")) {
        // sessionStorage.setItem("token_logado", "54a80097f23822cb26b6d5a980968601")
        // window.location.href = `index.html`
        // return true
    }
}

function validaSessao(pagina) {
    const token_logado = localStorage.getItem("token_logado");
    if (token_logado == "54a80097f23822cb26b6d5a980968601") {
        // redireciona para a pagina home pois usuario ja esta logado
        atualizaMenu();

        // Atualiza a aba ativa
        pagina = pagina.slice(0, -5);

        document.querySelector("#aba-" + pagina + " a").classList.add("active");

        loadingPagina();
    } else {
        window.location.href = "login.html";
    }
}

function validaSessaoSemLogin(pagina) {
    // redireciona para a pagina home pois usuario ja esta logado
    atualizaMenu();

    // Atualiza a aba ativa
    pagina = pagina.slice(0, -5);
    document.querySelector("#aba-" + pagina + " a").classList.add("active");
    loadingPagina();
}

function loadingPagina() {
    setTimeout(() => {
        document.querySelector(".box-load").style.display = "none";
        document.querySelector(".content").style.display = "block";
    }, 1000);
}

function redirecionaPagina(pagina) {
    window.location.href = pagina;
}

function atualizaMenu() {
    var url_atual = window.location.href;
    // let baseUrl = "https://b2system.vercel.app/";
    let baseUrl = "https://b2systemsenac.vercel.app/";
    if (url_atual.includes("http://127.0.0.1:5500/")) {
        baseUrl = "http://127.0.0.1:5500/";
    }

    const menu = ` <li id="aba-index">
                        <a href="index.html">
                            <i class='bx bx-grid-alt'></i>
                            <span class="links_name">Principal</span>
                        </a>
                    </li>
                    <li id="aba-produtos">
                        <a href="${baseUrl}produtos.html">
                            <i class='bx bx-box'></i>
                            <span class="links_name">Produtos</span>
                        </a>
                    </li>
                    <li id="aba-clientes">
                        <a href="${baseUrl}clientes.html">
                            <i class='bx bx-list-ul'></i>
                            <span class="links_name">Clientes</span>
                        </a>
                    </li>
                    <li id="aba-vendas">
                        <a href="${baseUrl}vendas.html">
                            <i class='bx bx-list-ul'></i>
                            <span class="links_name">Vendas</span>
                        </a>
                    </li>
                    <li id="aba-notasfiscais">
                        <a href="${baseUrl}notasfiscais.html">
                            <i class='bx bx-barcode'></i>
                            <span class="links_name">Notas Fiscais</span>
                        </a>
                    </li>
                    <li id="aba-relatorios">
                        <a href="relatorios.html">
                            <i class='bx bx-pie-chart-alt-2'></i>
                            <span class="links_name">Relatórios</span>
                        </a>
                    </li>
                    <li id="aba-configuracoes">
                        <a href="${baseUrl}configuracoes.html">
                            <i class='bx bx-cog'></i>
                            <span class="links_name">Configurações</span>
                        </a>
                    </li>
                    <li class="log_out">
                    <a href="${baseUrl}login.html" onclick="logout()">
                            <i class='bx bx-log-out'></i>
                            <span class="links_name">Sair</span>
                        </a>
                    </li>`;

    document.querySelector("#menu").innerHTML = menu;
}

function logout() {
    localStorage.setItem("token_logado", "");
    localStorage.setItem("usuario_logado", "");

    // Remove o token da sessao
    localStorage.removeItem("token_logado");

    // Remove all saved data from sessionStorage
    localStorage.clear();

    window.location.href = "login.html";
}

function login() {
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    const body = {
        email : email,
        senha : senha
    };
    
    callApiPost("POST", "login", function(data) {

        // VALIDAR LOGIN 
        if(data.mensagem != "" && data.mensagem != undefined){
            alert(data.mensagem);
            return false;
        }

        // SETA O TOKEN
        localStorage.setItem("token_logado", "54a80097f23822cb26b6d5a980968601");
                
        const usuario_logado = data.id;
        localStorage.setItem("usuario_logado", usuario_logado);
                
        // REDIRECIONA PARA A HOME
        window.location.href = "index.html";

    }, body);
}

function gravaRegistroLogin() {
    // chama a api de cadastro de login
    const nome = document.querySelector("#cadastro-nome").value;
    const email = document.querySelector("#cadastro-email").value;
    const senha = document.querySelector("#cadastro-senha").value;

    const body = {
        usunome: nome,
        usuemail: email,
        ususenha: senha,
        usutoken: "token",
        usuativo: 1,
    };

    callApi("POST", "usuarios", body, function(data) {
        // pega os dados de token retornados e seta na sessao do navegador
        sessionStorage.setItem("token_logado", data.usutoken);

        // redireciona para a pagina home
        window.location.href = "home.html";
    });
}

function resetsenha() {
    const email = document.querySelector("#login-email").value;
    const senha = document.querySelector("#login-senha").value;
    const senha2 = document.querySelector("#login-senha2").value;

    if (senha == "" || senha2 == "") {
        alert("Informe os dois campos de senha!");
        return false;
    }

    if (senha !== senha2) {
        alert("Senha não confere!");
        return false;
    }
    const body = {
        usuemail: email,
        ususenha: senha,
    };

    callApi("POST", "resetpassword", body, function(data) {
        // Remove all saved data from sessionStorage
        sessionStorage.clear();

        // redireciona para a pagina de login
        window.location.href = "index.html";
    });
}

function confirmarUsuario(){
        let email      = document.querySelector("#email-usuario").value;
        const senha        = document.querySelector("#senha-usuario").value;
        const senha2        = document.querySelector("#senha-usuario2").value;
        const nome = document.querySelector("#nome-usuario").value;
        const cpf     = document.querySelector("#cpf-usuario").value;
        const telefone     = document.querySelector("#telefone-usuario").value;

        if(senha!=senha2){
            alert("Senha não confere");
            return false;
        }
    
        let body = {
            // removido espaço da string com trim()
            email,
            senha,
            nome,
            cpf,
            telefone,
           
    
        };
        console.log(body);
        const method = "POST";
        const rota = "usuario";
        callApiPost(
            method,
            rota,
            function (data) {
                console.log("usuario gravado!" + JSON.stringify(data));
                fecharModalUsuario();
            },
            body
        );
}

function confirmarAlteracaoSenha(){
    const email = document.querySelector("#email-usuario").value;
    const senha = document.querySelector("#senha-atual-usuario").value;

    const body = {
        email : email,
        senha : senha
    };
    
    callApiPost("POST", "login", function(data) {

        // VALIDAR LOGIN 
        if(data.mensagem != "" && data.mensagem != undefined){
            alert(data.mensagem);
            return false;
        }

        // APOS VALIDAR O LOGIN
        // ALTERA A SENHA
        alterarSenhaUsuario();
    }, body);
}

function alterarSenhaUsuario(){
    const senha = document.querySelector("#senha-usuario").value;
    const body = {
        senha : senha
    };
    const id_usuario_logado = document.querySelector("#usuario_logado").value;
    callApiPost("PUT", "senhausuario/" + id_usuario_logado, function(data) {        
    }, body);
}


function fecharModalUsuario(){
    // fecharModalUsuario
    const fechar = document.querySelector("#fecharModalUsuario");
    fechar.click();
}



