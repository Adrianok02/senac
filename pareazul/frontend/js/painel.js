function atualizaPainel(){
    atualizaDadosPerfil();
    listarCartoes();
    listarVeiculos();
    listarEstacionamentos();
    listarCreditoAtualizado();
}

function listarCreditoAtualizado(){
    const usuario_logado = localStorage.getItem("usuario_logado");
    const method = "GET";
    const rota = "creditousuario/" + usuario_logado;
    callApi(method, rota, function (data) {


        console.log("CREDITO DO USUARIO:" + data.valor  );
        console.log(data);

        let SALDO_USUARIO_LOGADO = data.valor;        
        document.querySelector("#SALDO_USUARIO_LOGADO").innerHTML = "R$ " + formataNum(SALDO_USUARIO_LOGADO);
    });
}

function atualizaDadosPerfil(){
    const usuario_logado = localStorage.getItem("usuario_logado");

    document.querySelector("#usuario_logado").value = usuario_logado;
    if(parseInt(usuario_logado) > 0){
        const method = "GET";
        const rota = "usuario/" + usuario_logado;
        callApi(method, rota, function (data) {

            console.log("DADOS DO PERFIL - INICIO");

            console.log(data);    
            
            // SETA O USUARIO LOGADO
            const nome_usuario_logado = data.nome;
            const cpf_usuario_logado = data.cpf;
            const email_usuario_logado = data.email;
            
            //document.querySelector("#nome-usuario").innerHTML = nome_usuario_logado;
            
            // Atualiza os dados do modal de Perfil de Usuario
            
            document.querySelector("#nome-usuario-logado").innerHTML = nome_usuario_logado;
            document.querySelector("#nome-usuario").value = nome_usuario_logado;
            document.querySelector("#cpf-usuario").value = cpf_usuario_logado;
            document.querySelector("#email-usuario").value = email_usuario_logado;                                
        });
    } else {
        window.location.href = "login.html";
    }
}

function listarVeiculos(){
    cardVeiculo();
}

function listarCartoes(){
    cardCartao();
}

function listarEstacionamentos(){
    cardEstacionamento();
}

function cardEstacionamento(){
    const method = "GET";
    const id_usuario_logado = document.querySelector("#usuario_logado").value;
    const rota = "estacionamentousuario/"+id_usuario_logado;
    callApi(method, rota, function (aListaDados) {
        console.log(aListaDados);    
        loadDadosEstacionamento(aListaDados);        
    });
}

  function cardCartao(){

    const method = "GET";
    const id_usuario_logado = document.querySelector("#usuario_logado").value;
    const rota = "cartaousuario/"+id_usuario_logado;
    callApi(method, rota, function (aListaDados) {
        console.log(aListaDados);    
        loadDadosCartao(aListaDados);        
    });
}

function cardVeiculo(){
    const method = "GET";
    const id_usuario_logado = document.querySelector("#usuario_logado").value;
    const rota = "veiculousuario/"+id_usuario_logado;
    callApi(method, rota, function (aListaVeiculos) {
        console.log(aListaVeiculos);    
        loadDadosVeiculo(aListaVeiculos);        
    });
}

function loadDadosEstacionamento(aListaDados) {
    document.querySelector("#lista-atividades").innerHTML = "";
    aListaDados.forEach(function (data, key) {
        console.log(data);
        const veiculo_id = data.veiculo;
        const method = "GET";
        const rota = "veiculo/" + veiculo_id;
        let placa = "";
        callApi(method, rota, function (dataVeiculo) {
            placa = dataVeiculo.placa;
            if(placa){
                console.log(data);
                loadDadosEstacionamentoAtual(data, placa);
            } else {
                alert("Erro ao buscar placa do veiculo!" + veiculo_id);
                return false;
            }
        });
    });
}

function loadDadosEstacionamentoAtual(data, placa) {

    const endereco= data.endereco;
    
    // Calculo do valor do estacionamento
    const tempo = data.tempo;
    const valorporhora = parseFloat(data.valorporhora);

    const valorEstacionamento = formataNum(tempo / 60 * valorporhora);

    const cardEstacionamento = ` <div class="ant-row timeline-atividade-conteudo">
                                    <li id="compra" class="ant-timeline-item">
                                        <div class="ant-timeline-item-tail"></div>
                                        <div class="ant-timeline-item-head ant-timeline-item-head-blue">
                                        </div>
                                        <div class="ant-timeline-item-content" >
                                            <div class="ant-row timeline-atividade-conteudo">
                                                <div class="ant-col-xs-5 ant-col-sm-4 ant-col-md-4 ant-col-lg-3 ant-col-xl-4"
                                                    style="text-align: center; margin-right: 3px; margin-top: 7px;">
                                                    <h2 class="timeline-atividade-data">06</h2>
                                                    <h3 class="painel-texto-simples"
                                                        style="margin-bottom: 0px;">SET</h3>
                                                    <h4 class="painel-texto-foco"
                                                        style="margin-bottom: 0px;">19:24</h4>
                                                </div>

                                                <div class="ant-col-1"
                                                    style="border-left: 2px solid white; height: 78px;">
                                                </div>
                                                <div
                                                    class="ant-col-xs-17 ant-col-sm-18 ant-col-md-18 ant-col-lg-19 ant-col-xl-18">
                                                    <h3 class="painel-texto-foco">` + placa + `</h3>
                                                    <h4 class="painel-texto-simples">
                                                        <div>
                                                            <h3 class="painel-texto-simples">` + endereco + `</h3>
                                                        </div>
                                                    </h4>
                                                    <h4 class="painel-texto-simples">R$ ` + valorEstacionamento +`</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                                <hr>`;
   document.querySelector("#lista-atividades").innerHTML += cardEstacionamento;
}

function loadDadosCartao(aListaDados) {
    document.querySelector("#lista-cartao").innerHTML = "";

    aListaDados.forEach(function (data, key) {
        const cartao_id = data.id;
        const numero = data.numero;
        const nome = data.nome;
        const dataexpiracao = data.dataexpiracao;
        const cvv = data.cvv;
        const last5 = numero.slice(-5);
        const id_usuario_logado = document.querySelector("#usuario_logado").value;
        const method = "GET";
        const rota = "cartaousuario/" + id_usuario_logado;

        
        const cardCartaoAtual = `
            <div class="ant-row-flex ant-row-flex-space-between card-apresentacao"
                style="height: 71px;">
                <div class=""><img alt="cartao"
                        src="./index_files/8d76f470350be6230fb4d7bafad79fae.png"
                        style="height: 30px; margin-top: 7px; margin-left: 10px;">
                </div>
                <div class="">
                    <h3 class="card-apresentacao-texto"
                        style="vertical-align: middle; padding-top: 13px;">
                        *** **** **** ` + last5 +`</h3>
                </div>            
                <div class="ant-col-4">
                    <div class="">
                        <button type="button"
                        class="btn btn-danger" onclick="excluirCartao('` + cartao_id + `')">Excluir</button>
                    </div>                                                
                </div>
            </div>`;

        document.querySelector("#lista-cartao").innerHTML += cardCartaoAtual;
        
    });
}

function loadDadosVeiculo(aListaVeiculos) {
    document.querySelector("#lista-veiculos").innerHTML = "";

    aListaVeiculos.forEach(function (data, key) {
        const ano = data.ano;
        const veiculo_id = data.id;
        const placa = data.placa;
        const modelo = data.modelo;

        const cardVeiculoAtual = ` <div class="ant-row-flex ant-row-flex-space-between card-apresentacao">
                    <div class="ant-col-14">
                        <div class="ant-row">
                            <div class="">
                                <h1 class="card-apresentacao-texto">` + placa +`</h1>
                                <div class="painel-texto-simples" 
                                    style="margin-top: 3px; word-break: break-all;">` + modelo +`</div>
                            </div>
                        </div>
                    </div>
                    ` + getEstacionamento(data, veiculo_id) + `
                    <div class="ant-col-4">
                        <div class="">
                            <button type="button"
                            class="btn btn-danger" onclick="excluirVeiculo('` + veiculo_id + `')">Excluir</button>
                        </div>                                                
                    </div>
            </div>`;

        document.querySelector("#lista-veiculos").innerHTML += cardVeiculoAtual;     
    });
}

function getEstacionamento(dadosEstacionamento, veiculo_id) {
    return `<div class="ant-col-6" style="padding-block-start: 10px; margin-left: -5%;">
        
    <!-- MODAL NOVO ESTACIONAMENTO-->
        <button type="button" class="btn-estacionar" data-toggle="modal"
            data-target="#novo-estacionamento-`+ veiculo_id +`">
            Estacionar
        </button>

        <!-- Modal -->
        <div class="modal fade" id="novo-estacionamento-`+ veiculo_id +`" tabindex="-1"
            role="dialog" aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Estacionar</h5>
                        <button type="button" class="close" data-dismiss="modal"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                        <div class="form-group">
                            <label>Veiculo ID:</label>
                            <input type="text" class="form-control" id="veiculo_id-`+ veiculo_id +`" disabled value="` + veiculo_id + `">
                        </div>
                            <div class="form-group">
                                <label for="dados-veiculo">Carro Selecionado</label>
                                <br>
                                <select class="form-control" id="dados-veiculo" disabled>
                                    <option value="2" selected>` + dadosEstacionamento.placa + ` - ` + dadosEstacionamento.modelo + `
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control"
                                    id="placa-estacionamento"
                                    placeholder="PLACA" disabled value="` + dadosEstacionamento.placa +`">
                            </div>

                            <div class="form-group">
                                <input type="text" class="form-control"
                                    id="endereco-estacionamento-`+ veiculo_id +`"
                                    placeholder="ENDEREÇO" value="RUA 29 DEZEMBRO">
                            </div>
                            <div class="form-group">
                                <label for="">Selecione a regra:</label>
                                <br>
                                <input type="radio" checked
                                    id="regra-estacionamento-`+ veiculo_id +`"
                                    class="ant-radio ant-radio-checked">
                                <span>Zona Azul</span>
                            </div>
                            <div class="form-group">
                                <label for="">Selecione o tempo:</label>
                                <br>
                                <input type="radio" checked
                                    id="tempo-30-min-estacionamento-`+ veiculo_id +`"
                                    name="tempo-estacionamento"
                                    class="ant-radio ant-radio-checked">
                                <span>30 minutos: R$ 1,00</span>
                                <br>
                                <input type="radio"
                                    id="tempo-60-min-estacionamento-`+ veiculo_id +`"
                                    name="tempo-estacionamento"
                                    class="ant-radio ant-radio-checked">
                                <span>1 hora: R$ 2,00</span>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="fechar-modal-estacionamento-`+ veiculo_id +`"
                            data-dismiss="modal">Fechar</button>
                        <button type="button"
                            class="btn btn-primary" onclick="confirmarEstacionamento(`+ veiculo_id +`)">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function excluirVeiculo(codigo) {

    // Verifica se existe estacionamento para este veiculo
    const method = "GET";
    const rota = "estacionamentoveiculo/" + codigo;
    callApi(method, rota, function(data){
        console.log(data);

        if(data.length > 0){
            alert("Este veiculo tem vinculo de estacionamento e nao pode ser excluido!");
        } else {
            const method = "DELETE";
            const rota = "veiculo/" + codigo;
            callApi(method, rota, function(data){
                alert("Veiculo excluido com sucesso!");
                listarVeiculos();
            }); 
        }  
    });
}

function excluirCartao(codigo) {
    const method = "DELETE";
    const rota = "cartao/" + codigo;
    callApi(method, rota, function(data){
        listarCartoes();
    });    
}

function confirmarVeiculo(){
    const tipo       = parseInt(document.querySelector("#tipo-veiculo-sistema").value);
    const placa      = document.querySelector("#placa-veiculo").value;
    const ano        = document.querySelector("#ano-veiculo").value;
    const fabricante = document.querySelector("#fabricante-veiculo").value;
    const modelo     = document.querySelector("#modelo-veiculo").value;
    const id_usuario_logado = document.querySelector("#usuario_logado").value;

    let body = { 
        tipo      ,       
        placa:placa.toUpperCase(0)     ,
        ano       ,
        fabricante:fabricante.toUpperCase(0),
        modelo:modelo.toUpperCase(0)    ,
        usuario:id_usuario_logado
    };

    console.log(body)

    const method = "POST";
    const rota = "veiculo";
    callApiPost(
        method,
        rota,
        function (data) {
            console.log("Veiculo gravado!" + JSON.stringify(data));
            fecharModalVeiculo();
            listarVeiculos();
        },
        body
    );
}

function confirmarCartao(){
    let numero      = document.querySelector("#numero-cartao").value;
    const nome        = document.querySelector("#titular-cartao").value;    
    const dataexpiracao = document.querySelector("#data-expiracao-cartao").value;    
    const cvv     = document.querySelector("#cvv-cartao").value;
    const id_usuario_logado = document.querySelector("#usuario_logado").value;

    numero = numero.trim();

    let body = { 
        // removido espaço da string com trim()
        numero:numero.trim(),       
        nome:nome,
        dataexpiracao:dataexpiracao,
        cvv:cvv,
        usuario:id_usuario_logado,
    };

    console.log(body);
    
    const method = "POST";
    const rota = "cartao";
    callApiPost(
        method,
        rota,
        function (data) {
            console.log("Cartao gravado!" + JSON.stringify(data));
            fecharModalCartao();
            listarCartoes();        
        },
        body
    );
}

function confirmarEstacionamento(veiculo_id){
    const endereco = document.querySelector("#endereco-estacionamento-" + veiculo_id).value;
    const regra = document.querySelector("#regra-estacionamento-" + veiculo_id).value;

    const tempo_30_min = document.querySelector("#tempo-30-min-estacionamento-" + veiculo_id);
    const tempo_60_min = document.querySelector("#tempo-60-min-estacionamento-" + veiculo_id);
    const id_usuario_logado = document.querySelector("#usuario_logado").value;

    let tempo = 0;
    if(tempo_30_min.checked){
        tempo = 30;
    } else if(tempo_60_min.checked){
        tempo = 60;
    }

    let body = { 
        veiculo:veiculo_id,     
        endereco,
        regra,
        tempo,
        usuario:id_usuario_logado
    
    };

    console.log(body);

    const method = "POST";
    const rota = "estacionamento";
    callApiPost(
        method,
        rota,
        function (data) {
            console.log("Estacionamento gravado!" + JSON.stringify(data));

            const veiculo_id = data.veiculo;
            console.log("veiculo_id:" + veiculo_id);

            fecharModalEstacionamento(veiculo_id);
            listarEstacionamentos();        
        },
        body
    );
}

function fecharModalVeiculo() {
    const fechar = document.querySelector("#fechar-modal-veiculo");
    fechar.click();
}

function fecharModalCartao() {
    const fechar = document.querySelector("#fechar-modal-cartao");
    fechar.click();
}

function fecharModalEstacionamento(veiculo_id) {
    const fechar = document.querySelector("#fechar-modal-estacionamento-" + veiculo_id);
    fechar.click();
}

