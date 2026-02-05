package com.purrfectmatch.controller;

import com.purrfectmatch.entity.Animal;
import com.purrfectmatch.entity.Animal.Species;
import com.purrfectmatch.entity.Animal.Gender;
import com.purrfectmatch.entity.Animal.Status;
import com.purrfectmatch.entity.User;
import com.purrfectmatch.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/animals")
@CrossOrigin(origins = "*")
public class AnimalController {
    
    @Autowired
    private AnimalRepository animalRepository;
    
    @GetMapping
    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Animal> getAnimalById(@PathVariable Long id) {
        return animalRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search")
    public List<Animal> searchAnimals(
            @RequestParam(required = false) Species species,
            @RequestParam(required = false) Gender gender,
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) Integer minAge,
            @RequestParam(required = false) Integer maxAge,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Boolean goodWithKids,
            @RequestParam(required = false) Boolean goodWithDogs,
            @RequestParam(required = false) Boolean goodWithCats
    ) {
        return animalRepository.searchAnimals(
            species, gender, status, minAge, maxAge, 
            location, goodWithKids, goodWithDogs, goodWithCats
        );
    }
    
    @GetMapping("/status/{status}")
    public List<Animal> getAnimalsByStatus(@PathVariable Status status) {
        return animalRepository.findByStatus(status);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Animal> createAnimal(@RequestBody Animal animal, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        animal.setCreatedByUserId(user.getId());
        Animal savedAnimal = animalRepository.save(animal);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAnimal);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Animal> updateAnimal(@PathVariable Long id, @RequestBody Animal animalDetails) {
        return animalRepository.findById(id)
                .map(animal -> {
                    animal.setName(animalDetails.getName());
                    animal.setSpecies(animalDetails.getSpecies());
                    animal.setBreed(animalDetails.getBreed());
                    animal.setAge(animalDetails.getAge());
                    animal.setGender(animalDetails.getGender());
                    animal.setSize(animalDetails.getSize());
                    animal.setWeight(animalDetails.getWeight());
                    animal.setColor(animalDetails.getColor());
                    animal.setLocation(animalDetails.getLocation());
                    animal.setDescription(animalDetails.getDescription());
                    animal.setPersonalityTraits(animalDetails.getPersonalityTraits());
                    animal.setGoodWithKids(animalDetails.getGoodWithKids());
                    animal.setGoodWithDogs(animalDetails.getGoodWithDogs());
                    animal.setGoodWithCats(animalDetails.getGoodWithCats());
                    animal.setEnergyLevel(animalDetails.getEnergyLevel());
                    animal.setSpecialNeeds(animalDetails.getSpecialNeeds());
                    animal.setVaccinationStatus(animalDetails.getVaccinationStatus());
                    animal.setSpayedNeutered(animalDetails.getSpayedNeutered());
                    animal.setAdoptionFee(animalDetails.getAdoptionFee());
                    animal.setStatus(animalDetails.getStatus());
                    animal.setImageUrl(animalDetails.getImageUrl());
                    
                    Animal updatedAnimal = animalRepository.save(animal);
                    return ResponseEntity.ok(updatedAnimal);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteAnimal(@PathVariable Long id) {
        return animalRepository.findById(id)
                .map(animal -> {
                    animalRepository.delete(animal);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = Map.of(
            "total", animalRepository.count(),
            "available", animalRepository.countByStatus(Status.AVAILABLE),
            "pending", animalRepository.countByStatus(Status.PENDING),
            "adopted", animalRepository.countByStatus(Status.ADOPTED)
        );
        return ResponseEntity.ok(stats);
    }
}
