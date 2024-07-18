function gravarCartao(){
    // <input type="text" class="form-control" id="numero-cartao" placeholder="Número Cartão">
    const numeroCartao = document.querySelector("#numero-cartao").ariaValueMax;

    const body = {
        email : email,
        senha : senha
    };

    // function callApi(method, rota, fn = false) {
    callApiPost("POST", "cartao", function(data) {

        // VALIDAR LOGIN 
        if(data.mensagem != "" && data.mensagem != undefined){
            alert(data.mensagem);
            return false;
        }

        const nome = data.nome;
        // SETA O TOKEN
        sessionStorage.setItem("token_logado", "54a80097f23822cb26b6d5a980968601");

        // SETA O USUARIO LOGADO
        sessionStorage.setItem("usuario_logado", nome);

        // REDIRECIONA PARA A HOME
        window.location.href = "index.html";

    }, body);
}