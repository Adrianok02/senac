package bancocrudspringboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import bancocrudspringboot.exception.ResourceNotFoundException;
import bancocrudspringboot.model.Login;
import bancocrudspringboot.model.Usuario;
import bancocrudspringboot.repository.UsuarioRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class UsuarioController {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@GetMapping("/usuario")
	@ResponseStatus(HttpStatus.OK)
	public List<Usuario> getAllCadastros() {
		return this.usuarioRepository.findAll();
	}

	// Criar usuario
	@PostMapping("/usuario")
	@ResponseStatus(HttpStatus.CREATED)
	public Usuario createCadastro(@RequestBody Usuario cadastro) {
		return this.usuarioRepository.save(cadastro);
	}

    // Listar um usuario
	@GetMapping("/usuario/{usuario_id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Usuario> getCadastroById(@PathVariable(value = "usuario_id") Long cadastroId)
			throws ResourceNotFoundException {
				Usuario cadastro = usuarioRepository.findById(cadastroId)
				.orElseThrow(() -> new ResourceNotFoundException(
						"Usuario não encontrado para o ID : " + cadastroId));

		return ResponseEntity.ok().body(cadastro);
	}

	// Login
	@PostMapping("/login")
	@ResponseStatus(HttpStatus.OK)
	public Usuario login(@Validated @RequestBody Login cadastro) throws ResourceNotFoundException {

		String email = cadastro.getEmail();
		String senha = cadastro.getSenha();

		Usuario usuario = this.usuarioRepository.findUsuarioByEmailAndSenha(email, senha)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario ou senha inválido!"));

		return usuario;
	}

	// alterar Senha do usuario    
	@PutMapping("/senhausuario/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Usuario> updateSenhaUsuario(@PathVariable(value = "id") Long cadastroId,
															  @RequestBody 
                Usuario cadastroCaracteristicas) throws ResourceNotFoundException {

					
                Usuario cadastro = usuarioRepository.findById(cadastroId)
				.orElseThrow(() -> new ResourceNotFoundException
						("Cadastro não encontrado para o ID : " + cadastroId));

		cadastro.setSenha(cadastroCaracteristicas.getSenha());
		
		return ResponseEntity.ok(this.usuarioRepository.save(cadastro));
	}
}