package com.purrfectmatch.repository;

import com.purrfectmatch.entity.Animal;
import com.purrfectmatch.entity.Animal.Species;
import com.purrfectmatch.entity.Animal.Gender;
import com.purrfectmatch.entity.Animal.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    
    // Find by status
    List<Animal> findByStatus(Status status);
    
    // Find by species
    List<Animal> findBySpecies(Species species);
    
    // Find by species and status
    List<Animal> findBySpeciesAndStatus(Species species, Status status);
    
    // Search by name (case insensitive)
    @Query("SELECT a FROM Animal a WHERE LOWER(a.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Animal> searchByName(@Param("name") String name);
    
    // Advanced search with multiple filters
    @Query("SELECT a FROM Animal a WHERE " +
           "(:species IS NULL OR a.species = :species) AND " +
           "(:gender IS NULL OR a.gender = :gender) AND " +
           "(:status IS NULL OR a.status = :status) AND " +
           "(:minAge IS NULL OR a.age >= :minAge) AND " +
           "(:maxAge IS NULL OR a.age <= :maxAge) AND " +
           "(:location IS NULL OR LOWER(a.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:goodWithKids IS NULL OR a.goodWithKids = :goodWithKids) AND " +
           "(:goodWithDogs IS NULL OR a.goodWithDogs = :goodWithDogs) AND " +
           "(:goodWithCats IS NULL OR a.goodWithCats = :goodWithCats)")
    List<Animal> searchAnimals(
        @Param("species") Species species,
        @Param("gender") Gender gender,
        @Param("status") Status status,
        @Param("minAge") Integer minAge,
        @Param("maxAge") Integer maxAge,
        @Param("location") String location,
        @Param("goodWithKids") Boolean goodWithKids,
        @Param("goodWithDogs") Boolean goodWithDogs,
        @Param("goodWithCats") Boolean goodWithCats
    );
    
    // Count animals by status
    long countByStatus(Status status);
    
    // Get recent animals
    List<Animal> findTop10ByStatusOrderByDateAddedDesc(Status status);
}
