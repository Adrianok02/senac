package bancocrudspringboot.repository;

import bancocrudspringboot.model.Estacionamento;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EstacionamentoRepository extends JpaRepository<Estacionamento, Long>{

    @Query(value = "select * from estacionamento order by id desc", nativeQuery = true)
    List<Estacionamento> findAllOrderByIdDesc();

    List<Estacionamento> findEstacionamentoByVeiculo(Long veiculo);   
    List<Estacionamento> findEstacionamentoByUsuario(Long usuario);   
}
