package bancocrudspringboot.controller;

import bancocrudspringboot.exception.ResourceNotFoundException;
import bancocrudspringboot.model.Cartao;
import bancocrudspringboot.model.Credito;
import bancocrudspringboot.repository.CreditoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class CreditoController {

	@Autowired
	private CreditoRepository creditoRepository;

	@GetMapping("/creditousuario/{usuario}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<Credito> getCadastroByUsuario(@PathVariable(value = "usuario") Long usuario)
			throws ResourceNotFoundException {
		return creditoRepository.findCreditoByUsuario(usuario);
	}

	// Inserir credito
	@PostMapping("/credito")
	@ResponseStatus(HttpStatus.CREATED)
	public Credito createCadastro(@RequestBody Credito cadastro) {
		return this.creditoRepository.save(cadastro);
	}

	// Listar todos os cartões
	@GetMapping("/credito")
	@ResponseStatus(HttpStatus.OK)
	public List<Credito> getAllCadastros() {
		return this.creditoRepository.findAll();
	}

}