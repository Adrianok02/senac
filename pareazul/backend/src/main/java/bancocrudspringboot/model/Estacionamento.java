package bancocrudspringboot.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Estacionamento")
public class Estacionamento {

    private long id;

    private long veiculo;
    private String endereco;
    private String regra;
    private long tempo; // Tempo em minutos
    private String valorporhora; // Valor por Hora
    private long usuario;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

}