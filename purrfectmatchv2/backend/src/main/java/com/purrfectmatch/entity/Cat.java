package com.purrfectmatch.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cats")
public class Cat {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(length = 1000)
    private String description;
    
    @Column(nullable = false)
    private Integer age;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    // New fields to match the design
    @Column(name = "species")
    private String species; // "Dog" or "Cat"
    
    @Column(name = "gender")
    private String gender; // "Male" or "Female"
    
    @Column(name = "location")
    private String location; // e.g., "Los Angeles, CA"
    
    // Constructors
    public Cat() {
    }
    
    public Cat(String name, String description, Integer age, String imageUrl, String species, String gender, String location) {
        this.name = name;
        this.description = description;
        this.age = age;
        this.imageUrl = imageUrl;
        this.species = species;
        this.gender = gender;
        this.location = location;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Integer getAge() {
        return age;
    }
    
    public void setAge(Integer age) {
        this.age = age;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public String getSpecies() {
        return species;
    }
    
    public void setSpecies(String species) {
        this.species = species;
    }
    
    public String getGender() {
        return gender;
    }
    
    public void setGender(String gender) {
        this.gender = gender;
    }
    
    public String getLocation() {
        return location;
    }
    
    public void setLocation(String location) {
        this.location = location;
    }
}
