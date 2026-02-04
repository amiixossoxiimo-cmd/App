package com.purrfectmatch.controller;

import com.purrfectmatch.entity.Cat;
import com.purrfectmatch.repository.CatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cats")
@CrossOrigin(origins = "*")
public class CatController {
    
    @Autowired
    private CatRepository catRepository;
    
    @GetMapping
    public List<Cat> getAllCats() {
        return catRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Cat> getCatById(@PathVariable Long id) {
        return catRepository.findById(id)
                .map(cat -> ResponseEntity.ok(cat))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Cat> createCat(@RequestBody Cat cat) {
        Cat savedCat = catRepository.save(cat);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCat);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Cat> updateCat(@PathVariable Long id, @RequestBody Cat catDetails) {
        return catRepository.findById(id)
                .map(cat -> {
                    cat.setName(catDetails.getName());
                    cat.setDescription(catDetails.getDescription());
                    cat.setAge(catDetails.getAge());
                    cat.setImageUrl(catDetails.getImageUrl());
                    Cat updatedCat = catRepository.save(cat);
                    return ResponseEntity.ok(updatedCat);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCat(@PathVariable Long id) {
        return catRepository.findById(id)
                .map(cat -> {
                    catRepository.delete(cat);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
