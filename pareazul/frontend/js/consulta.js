const TIPO_CAMPO_NUMERICO = "numerico";
const TIPO_CAMPO_TEXTO = "texto";
const TIPO_CAMPO_DATA = "data";

function atualizaTipoConsulta() {
    // LISTA DE TIPOS POSSIVEIS
    // NUMERICO
    // STRING/TEXTO
    // DATA
    // data-tipo-codigoConsulta="integer"
    const campoValor = document.querySelector("#filtroConsulta").value;
    const campoConsulta = document.querySelector("#" + campoValor);
    const tipoCampoConsulta = campoConsulta.getAttribute("data-tipo");

    atualizaListaOperadoresConsulta(tipoCampoConsulta);
}

function atualizaListaOperadoresConsulta(tipoCampoConsulta) {
    const operadores = document.querySelector("#operadorConsulta");
    operadores.innerHTML = "";
    operadores.innerHTML += `<option value='todos' selected>Todos</option>`;

    if (tipoCampoConsulta == TIPO_CAMPO_NUMERICO) {
        operadores.innerHTML += `<option value='menor_igual'>Menor ou Igual</option>`;
        operadores.innerHTML += `<option value='menor_que'>Menor que</option>`;
        operadores.innerHTML += `<option value='igual'>Igual</option>`;
        operadores.innerHTML += `<option value='diferente'>Diferente de</option>`;
        operadores.innerHTML += `<option value='maior_que'>Maior que</option>`;
        operadores.innerHTML += `<option value='maior_igual'>Maior ou igual</option>`;
        operadores.innerHTML += `<option value='entre'>Entre</option>`;
        operadores.innerHTML += `<option value='contido'>Contido em</option>`;
        operadores.innerHTML += `<option value='naocontido'>Não Contido em</option>`;
    } else if (tipoCampoConsulta == TIPO_CAMPO_TEXTO) {
        operadores.innerHTML += `<option value='contem'>Contém</option>`;
        operadores.innerHTML += `<option value='naocontem' >Não Contém</option>`;
        operadores.innerHTML += `<option value='igual'>Igual</option>`;
        operadores.innerHTML += `<option value='diferente'>Diferente de</option>`;
        operadores.innerHTML += `<option value='preenchido'>Preenchido</option>`;
        operadores.innerHTML += `<option value='naopreenchido'>Não Preenchido</option>`;
        operadores.innerHTML += `<option value='inicia_com'>Inicia com</option>`;
        operadores.innerHTML += `<option value='termina_com'>Termina com</option>`;
    } else if (tipoCampoConsulta == TIPO_CAMPO_DATA) {
        operadores.innerHTML += `<option value='menor_igual'>Menor ou Igual</option>`;
        operadores.innerHTML += `<option value='menor_que'>Menor que</option>`;
        operadores.innerHTML += `<option value='igual'>Igual</option>`;
        operadores.innerHTML += `<option value='diferente'>Diferente de</option>`;
        operadores.innerHTML += `<option value='maior_que'>Maior que</option>`;
        operadores.innerHTML += `<option value='maior_igual'>Maior ou igual</option>`;
        operadores.innerHTML += `<option value='preenchido'>Preenchido</option>`;
        operadores.innerHTML += `<option value='naopreenchido'>Não Preenchido</option>`;
        operadores.innerHTML += `<option value='entre' selected>Entre</option>`;
    }

    atualizaCampoSegundoValor();
}
atualizaTipoConsulta();

function onlyNumbers(text) {
    // Replace regex '/[^0-9]/g'
    text = text.replace(/[^0-9]/g, "");

    return text;
}

function atualizaCampoSegundoValor() {
    const operador = document.querySelector("#operadorConsulta").value;

    document.querySelector("#campoValor2").style.display = "none";
    if (operador == "entre") {
        // Habilita campo de segundo valor
        document.querySelector("#campoValor2").style.display = "block";
    }
}
