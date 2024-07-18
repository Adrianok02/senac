package bancocrudspringboot.controller;

import bancocrudspringboot.exception.ResourceNotFoundException;
import bancocrudspringboot.model.Cartao;
// import bancocrudspringboot.model.ConsultaPadrao;
// import bancocrudspringboot.model.OperadoresConsulta;
import bancocrudspringboot.repository.CartaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class CartaoController {

	@Autowired
	private CartaoRepository cartaoRepository;
    
	// Listar todos os cartões
	@GetMapping("/cartao")
	@ResponseStatus(HttpStatus.OK)
	public List<Cartao> getAllCadastros() {
		return this.cartaoRepository.findAll();
	}
    
	// Listar um cartao pelo usuario
	@GetMapping("/cartaousuario/{usuario}")
	
	// http://localhost:8080/api/v1/cartao

	@ResponseStatus(HttpStatus.OK)
	public List<Cartao> getCadastroByUsuario(@PathVariable(value = "usuario") Long usuario)
		throws ResourceNotFoundException {
		return cartaoRepository.findCartaoByUsuario(usuario);
	}

	// Listar um cartao pelo id
	@GetMapping("/cartao/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Cartao> getCadastroById(@PathVariable(value = "id") Long cadastroId)
	throws ResourceNotFoundException {
		Cartao cadastro = cartaoRepository.findById(cadastroId)
				.orElseThrow(() -> new ResourceNotFoundException("Cadastro de cartão não encontrado para o ID : " + cadastroId));
		
		return ResponseEntity.ok().body(cadastro);
	}
		
	// Inserir cartao
	@PostMapping("/cartao")
	@ResponseStatus(HttpStatus.CREATED)
	public Cartao createCadastro(@RequestBody Cartao cadastro){
		return this.cartaoRepository.save(cadastro);
	}
    
	// alterar cartao    
	@PutMapping("/cartao/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Cartao> updateCadastro(@PathVariable(value = "id") Long cadastroId,
												  @Validated 
												  @RequestBody 
                Cartao cadastroCaracteristicas) throws ResourceNotFoundException {
                Cartao cadastro = cartaoRepository.findById(cadastroId)
				.orElseThrow(() -> new ResourceNotFoundException("Cadastro não encontrado para o ID : " + cadastroId));

		cadastro.setNumero(cadastroCaracteristicas.getNumero());
		cadastro.setNome(cadastroCaracteristicas.getNome());
		cadastro.setDataexpiracao(cadastroCaracteristicas.getDataexpiracao());
		cadastro.setCvv(cadastroCaracteristicas.getCvv());

		return ResponseEntity.ok(this.cartaoRepository.save(cadastro));
	}

	// deletar cartao
	@DeleteMapping("/cartao/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Map<String, Boolean> deleteCadastro(@PathVariable(value = "id") Long cadastroId)
			throws ResourceNotFoundException {
                Cartao cadastro = cartaoRepository.findById(cadastroId)
				.orElseThrow(() -> new ResourceNotFoundException("Cadastro não encontrado para o ID : " + cadastroId));

		this.cartaoRepository.delete(cadastro);

		Map<String, Boolean> resposta = new HashMap<>();

		resposta.put("cartão deletado", Boolean.TRUE);

		return resposta;
	}

	// // consulta por campo e operadores no insomnia em POST consulta
    // @PostMapping("/consultacartao")
	// @ResponseStatus(HttpStatus.OK)
	// public List<Cartao> consultaCadastro(@Validated @RequestBody ConsultaPadrao cadastro) throws ResourceNotFoundException {

	// 	String campoConsulta = cadastro.getCampo();
	// 	List<Cartao> listaCartao = new ArrayList<>();

	// 	// consulta cartao por valor1=id, onde pesquisa pelo id existente ou ""(vazio) onde retorna todos (findAll)
	// 	if(cadastro.getValor1() == null){
	// 		return this.cartaoRepository.findAll();
	// 	} else if(cadastro.getValor1().equals("")){
	// 		return this.cartaoRepository.findAll();
	// 	}


	// 	// OPERADOR -> TODOS
	// 	// ex insomnia:
	// 	// {
	// 	// 	"campo":"codigoConsulta",
	// 	// 	"operador":"todos",
	// 	// 	"valor1":"1"	aqui ignora valor e traz todos os registros
	// 	// }

	// 	String operador = cadastro.getOperador();
	// 	if(operador.equals(OperadoresConsulta.OPERADOR_TODOS)){
	// 		return this.cartaoRepository.findAll();
	// 	}
		
	// 	// Prof orientou deixar por ultimo	
	// 	// "placa": "MFI-7815",
	// 	// "ano": "2015",
	// 	// "fabricante": "HONDA",
	// 	// // "modelo": "NXR BROS"
		
	// 	if(operador.equals(OperadoresConsulta.OPERADOR_IGUAL)){
	// 		switch (campoConsulta) {

	// 			// valor1 = id
	// 			case "codigoConsulta":
    //             Cartao cartao = cartaoRepository.findCartaoById(Long.parseLong(cadastro.getValor1()))
	// 						.orElseThrow(() -> new ResourceNotFoundException("Registro não encontrado para o veiculo de ID: " + cadastro.getValor1()));
	// 				listaCartao.add(cartao);
	// 				break;

	// 			// tipo(de veiculo) ---  (1 = MOTO)   (2 = CARRO)  (3 = CAMINHÃO)
	// 			// no insomnia procurar por
	// 			case "numeroConsulta":
    //             listaCartao = this.cartaoRepository.findCartaoByNumero(cadastro.getValor1());
	// 				break;

	// 			// placa
	// 			case "nomeConsulta":
    //             listaCartao = this.cartaoRepository.findCartaoByNome(cadastro.getValor1());
	// 				break;

	// 			// ano, pesquisa por ano exatamente igual o valor digitado
	// 			case "dataexpiracaoConsulta":
    //             listaCartao = this.cartaoRepository.findCartaoByDataExpiracao(cadastro.getValor1());
	// 				break;


	// 			case "cvvConsulta":
    //             listaCartao = this.cartaoRepository.findCartaoByCvv(cadastro.getValor1());
	// 				break;		
		
		
	// 			default:
	// 				throw new ResourceNotFoundException("Campo inexistente na tabela do banco de dados!" + cadastro.getCampo());				
	// 		}

	// 	}

    //     return listaCartao;
    // } 



}




