package bancocrudspringboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import bancocrudspringboot.exception.ResourceNotFoundException;
import bancocrudspringboot.model.Cartao;
import bancocrudspringboot.model.Estacionamento;
import bancocrudspringboot.repository.EstacionamentoRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class EstacionamentoController {

	@Autowired
	private EstacionamentoRepository estacionamentoRepository;

	// Listar
	@GetMapping("/estacionamento")
	@ResponseStatus(HttpStatus.OK)
	public List<Estacionamento> getAllCadastros() {
		return this.estacionamentoRepository.findAll();
	}

	// Listar
	@GetMapping("/estacionamentoordenado")
	@ResponseStatus(HttpStatus.OK)
	public List<Estacionamento> getAllCadastrosOrdenado() {
		return this.estacionamentoRepository.findAllOrderByIdDesc();
	}

	@GetMapping("/estacionamentousuario/{usuario}")
	@ResponseStatus(HttpStatus.OK)
	public List<Estacionamento> getCadastroByUsuario(@PathVariable(value = "usuario") Long usuario)
	throws ResourceNotFoundException {
		return estacionamentoRepository.findEstacionamentoByUsuario(usuario);
	}

	// Listar todos os estacionamento do veiculo
	@GetMapping("/estacionamentoveiculo/{veiculo}")
	@ResponseStatus(HttpStatus.OK)
	public List<Estacionamento> getCadastroByVeiculo(@PathVariable(value = "veiculo") Long veiculo) {
		return estacionamentoRepository.findEstacionamentoByVeiculo(veiculo);
	}

	// Inserir
	@PostMapping("/estacionamento")
	@ResponseStatus(HttpStatus.CREATED)
	public Estacionamento createCadastro(@RequestBody Estacionamento cadastro) {
		cadastro.setValorporhora("2");
		return this.estacionamentoRepository.save(cadastro);
	}
}