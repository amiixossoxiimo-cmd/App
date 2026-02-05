package com.purrfectmatch.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "animals")
public class Animal {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Species species;
    
    private String breed;
    
    private Integer age;
    
    @Enumerated(EnumType.STRING)
    private Gender gender;
    
    @Enumerated(EnumType.STRING)
    private Size size;
    
    private BigDecimal weight;
    
    private String color;
    
    private String location;
    
    @Column(length = 2000)
    private String description;
    
    @Column(name = "personality_traits", length = 1000)
    private String personalityTraits;
    
    @Column(name = "good_with_kids")
    private Boolean goodWithKids;
    
    @Column(name = "good_with_dogs")
    private Boolean goodWithDogs;
    
    @Column(name = "good_with_cats")
    private Boolean goodWithCats;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "energy_level")
    private EnergyLevel energyLevel;
    
    @Column(name = "special_needs", length = 1000)
    private String specialNeeds;
    
    @Column(name = "vaccination_status")
    private Boolean vaccinationStatus = false;
    
    @Column(name = "spayed_neutered")
    private Boolean spayedNeutered = false;
    
    @Column(name = "adoption_fee")
    private BigDecimal adoptionFee;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.AVAILABLE;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "date_added")
    private LocalDateTime dateAdded;
    
    @Column(name = "date_adopted")
    private LocalDateTime dateAdopted;
    
    @Column(name = "created_by_user_id")
    private Long createdByUserId;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Enums
    public enum Species {
        DOG("Dog"), CAT("Cat"), OTHER("Other");
        private final String displayName;
        Species(String displayName) { this.displayName = displayName; }
        public String getDisplayName() { return displayName; }
    }
    
    public enum Gender {
        MALE("Male"), FEMALE("Female"), UNKNOWN("Unknown");
        private final String displayName;
        Gender(String displayName) { this.displayName = displayName; }
        public String getDisplayName() { return displayName; }
    }
    
    public enum Size {
        SMALL("Small"), MEDIUM("Medium"), LARGE("Large"), XLARGE("X-Large");
        private final String displayName;
        Size(String displayName) { this.displayName = displayName; }
        public String getDisplayName() { return displayName; }
    }
    
    public enum EnergyLevel {
        LOW("Low"), MEDIUM("Medium"), HIGH("High");
        private final String displayName;
        EnergyLevel(String displayName) { this.displayName = displayName; }
        public String getDisplayName() { return displayName; }
    }
    
    public enum Status {
        AVAILABLE("Available"),
        PENDING("Pending"),
        ADOPTED("Adopted"),
        ON_HOLD("On Hold"),
        MEDICAL_HOLD("Medical Hold");
        private final String displayName;
        Status(String displayName) { this.displayName = displayName; }
        public String getDisplayName() { return displayName; }
    }
    
    // Constructors
    public Animal() {
        this.dateAdded = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public Species getSpecies() { return species; }
    public void setSpecies(Species species) { this.species = species; }
    
    public String getBreed() { return breed; }
    public void setBreed(String breed) { this.breed = breed; }
    
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    
    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }
    
    public Size getSize() { return size; }
    public void setSize(Size size) { this.size = size; }
    
    public BigDecimal getWeight() { return weight; }
    public void setWeight(BigDecimal weight) { this.weight = weight; }
    
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getPersonalityTraits() { return personalityTraits; }
    public void setPersonalityTraits(String personalityTraits) { this.personalityTraits = personalityTraits; }
    
    public Boolean getGoodWithKids() { return goodWithKids; }
    public void setGoodWithKids(Boolean goodWithKids) { this.goodWithKids = goodWithKids; }
    
    public Boolean getGoodWithDogs() { return goodWithDogs; }
    public void setGoodWithDogs(Boolean goodWithDogs) { this.goodWithDogs = goodWithDogs; }
    
    public Boolean getGoodWithCats() { return goodWithCats; }
    public void setGoodWithCats(Boolean goodWithCats) { this.goodWithCats = goodWithCats; }
    
    public EnergyLevel getEnergyLevel() { return energyLevel; }
    public void setEnergyLevel(EnergyLevel energyLevel) { this.energyLevel = energyLevel; }
    
    public String getSpecialNeeds() { return specialNeeds; }
    public void setSpecialNeeds(String specialNeeds) { this.specialNeeds = specialNeeds; }
    
    public Boolean getVaccinationStatus() { return vaccinationStatus; }
    public void setVaccinationStatus(Boolean vaccinationStatus) { this.vaccinationStatus = vaccinationStatus; }
    
    public Boolean getSpayedNeutered() { return spayedNeutered; }
    public void setSpayedNeutered(Boolean spayedNeutered) { this.spayedNeutered = spayedNeutered; }
    
    public BigDecimal getAdoptionFee() { return adoptionFee; }
    public void setAdoptionFee(BigDecimal adoptionFee) { this.adoptionFee = adoptionFee; }
    
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public LocalDateTime getDateAdded() { return dateAdded; }
    public void setDateAdded(LocalDateTime dateAdded) { this.dateAdded = dateAdded; }
    
    public LocalDateTime getDateAdopted() { return dateAdopted; }
    public void setDateAdopted(LocalDateTime dateAdopted) { this.dateAdopted = dateAdopted; }
    
    public Long getCreatedByUserId() { return createdByUserId; }
    public void setCreatedByUserId(Long createdByUserId) { this.createdByUserId = createdByUserId; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
