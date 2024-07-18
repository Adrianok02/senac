package bancocrudspringboot.repository;

import bancocrudspringboot.model.Veiculo;

import java.util.*;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface VeiculoRepository extends JpaRepository<Veiculo, Long>{
    
    @Query(value = "select * from veiculo where placa ilike concat('%', :placa, '%')", nativeQuery = true)
    List<Veiculo> findVeiculoByPlaca(@Param("placa")String placa);

    List<Veiculo> findVeiculoByTipo(int tipo);

    List<Veiculo> findVeiculoByAno(String ano);
    List<Veiculo> findVeiculoByUsuario(Long usuario);

    @Query(value = "select * from veiculo where fabricante ilike concat('%', :fabricante, '%')", nativeQuery = true)
    List<Veiculo> findVeiculoByFabricante(@Param("fabricante")String fabricante);

    @Query(value = "select * from veiculo where modelo ilike concat('%', :modelo, '%')", nativeQuery = true)
    List<Veiculo> findVeiculoByModelo(@Param("modelo")String modelo);
    
}
