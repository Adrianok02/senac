package bancocrudspringboot.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Veiculo", uniqueConstraints = { @UniqueConstraint(columnNames = { "placa" }) })
public class Veiculo {

    private long id;

    private int tipo;
    private String placa;
    private String ano;
    private String fabricante;
    private String modelo;
    private long usuario;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

}
