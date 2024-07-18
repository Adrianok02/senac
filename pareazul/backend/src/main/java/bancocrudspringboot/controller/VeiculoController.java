package bancocrudspringboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import bancocrudspringboot.exception.ResourceNotFoundException;
import bancocrudspringboot.model.Estacionamento;
import bancocrudspringboot.model.Veiculo;
import bancocrudspringboot.repository.VeiculoRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class VeiculoController {

	@Autowired
	private VeiculoRepository veiculoRepository;

	// Listar todos os veiculos
	@GetMapping("/veiculo")
	@ResponseStatus(HttpStatus.OK)
	public List<Veiculo> getAllCadastros() {
		return this.veiculoRepository.findAll();
	}

	// Listar um veiculo
	@GetMapping("/veiculo/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Veiculo> getCadastroById(@PathVariable(value = "id") Long cadastroId)
			throws ResourceNotFoundException {
		Veiculo cadastro = veiculoRepository.findById(cadastroId)
				.orElseThrow(() -> new ResourceNotFoundException(
						"Cadastro de veiculo não encontrado para o ID : " + cadastroId));

		return ResponseEntity.ok().body(cadastro);
	}
	@GetMapping("/veiculousuario/{usuario}")
	@ResponseStatus(HttpStatus.OK)
	public List<Veiculo> getCadastroByUsuario(@PathVariable(value = "usuario") Long usuario)
	throws ResourceNotFoundException {
		return veiculoRepository.findVeiculoByUsuario(usuario);
	}
	// Inserir veiculo
	@PostMapping("/veiculo")
	@ResponseStatus(HttpStatus.CREATED)
	public Veiculo createCadastro(@RequestBody Veiculo cadastro) {
		return this.veiculoRepository.save(cadastro);
	}

	/// alterar veiculo
	@PutMapping("/veiculo/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Veiculo> updateCadastro(@PathVariable(value = "id") Long cadastroId,
			@Validated @RequestBody Veiculo cadastroCaracteristicas) throws ResourceNotFoundException {
		Veiculo cadastro = veiculoRepository.findById(cadastroId)
				.orElseThrow(() -> new ResourceNotFoundException("Cadastro não encontrado para o ID : " + cadastroId));

		cadastro.setTipo(cadastroCaracteristicas.getTipo());
		cadastro.setPlaca(cadastroCaracteristicas.getPlaca());
		cadastro.setAno(cadastroCaracteristicas.getAno());
		cadastro.setFabricante(cadastroCaracteristicas.getFabricante());
		cadastro.setModelo(cadastroCaracteristicas.getModelo());

		return ResponseEntity.ok(this.veiculoRepository.save(cadastro));
	}

	// deletar veiculo
	@DeleteMapping("/veiculo/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Map<String, Boolean> deleteCadastro(@PathVariable(value = "id") Long cadastroId)
			throws ResourceNotFoundException {
		Veiculo cadastro = veiculoRepository.findById(cadastroId)
				.orElseThrow(() -> new ResourceNotFoundException("Cadastro não encontrado para o ID : " + cadastroId));

		this.veiculoRepository.delete(cadastro);

		Map<String, Boolean> resposta = new HashMap<>();

		resposta.put("cadastro deletado", Boolean.TRUE);

		return resposta;
	}

}