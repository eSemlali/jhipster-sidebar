package com.s2m.jhtest.web.rest;

import com.s2m.jhtest.JhtestApp;
import com.s2m.jhtest.domain.VehicleBrand;
import com.s2m.jhtest.repository.VehicleBrandRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link VehicleBrandResource} REST controller.
 */
@SpringBootTest(classes = JhtestApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class VehicleBrandResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ENABLED = false;
    private static final Boolean UPDATED_ENABLED = true;

    @Autowired
    private VehicleBrandRepository vehicleBrandRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVehicleBrandMockMvc;

    private VehicleBrand vehicleBrand;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VehicleBrand createEntity(EntityManager em) {
        VehicleBrand vehicleBrand = new VehicleBrand()
            .name(DEFAULT_NAME)
            .enabled(DEFAULT_ENABLED);
        return vehicleBrand;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VehicleBrand createUpdatedEntity(EntityManager em) {
        VehicleBrand vehicleBrand = new VehicleBrand()
            .name(UPDATED_NAME)
            .enabled(UPDATED_ENABLED);
        return vehicleBrand;
    }

    @BeforeEach
    public void initTest() {
        vehicleBrand = createEntity(em);
    }

    @Test
    @Transactional
    public void createVehicleBrand() throws Exception {
        int databaseSizeBeforeCreate = vehicleBrandRepository.findAll().size();
        // Create the VehicleBrand
        restVehicleBrandMockMvc.perform(post("/api/vehicle-brands")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vehicleBrand)))
            .andExpect(status().isCreated());

        // Validate the VehicleBrand in the database
        List<VehicleBrand> vehicleBrandList = vehicleBrandRepository.findAll();
        assertThat(vehicleBrandList).hasSize(databaseSizeBeforeCreate + 1);
        VehicleBrand testVehicleBrand = vehicleBrandList.get(vehicleBrandList.size() - 1);
        assertThat(testVehicleBrand.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testVehicleBrand.isEnabled()).isEqualTo(DEFAULT_ENABLED);
    }

    @Test
    @Transactional
    public void createVehicleBrandWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vehicleBrandRepository.findAll().size();

        // Create the VehicleBrand with an existing ID
        vehicleBrand.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVehicleBrandMockMvc.perform(post("/api/vehicle-brands")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vehicleBrand)))
            .andExpect(status().isBadRequest());

        // Validate the VehicleBrand in the database
        List<VehicleBrand> vehicleBrandList = vehicleBrandRepository.findAll();
        assertThat(vehicleBrandList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleBrandRepository.findAll().size();
        // set the field null
        vehicleBrand.setName(null);

        // Create the VehicleBrand, which fails.


        restVehicleBrandMockMvc.perform(post("/api/vehicle-brands")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vehicleBrand)))
            .andExpect(status().isBadRequest());

        List<VehicleBrand> vehicleBrandList = vehicleBrandRepository.findAll();
        assertThat(vehicleBrandList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEnabledIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleBrandRepository.findAll().size();
        // set the field null
        vehicleBrand.setEnabled(null);

        // Create the VehicleBrand, which fails.


        restVehicleBrandMockMvc.perform(post("/api/vehicle-brands")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vehicleBrand)))
            .andExpect(status().isBadRequest());

        List<VehicleBrand> vehicleBrandList = vehicleBrandRepository.findAll();
        assertThat(vehicleBrandList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVehicleBrands() throws Exception {
        // Initialize the database
        vehicleBrandRepository.saveAndFlush(vehicleBrand);

        // Get all the vehicleBrandList
        restVehicleBrandMockMvc.perform(get("/api/vehicle-brands?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vehicleBrand.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].enabled").value(hasItem(DEFAULT_ENABLED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getVehicleBrand() throws Exception {
        // Initialize the database
        vehicleBrandRepository.saveAndFlush(vehicleBrand);

        // Get the vehicleBrand
        restVehicleBrandMockMvc.perform(get("/api/vehicle-brands/{id}", vehicleBrand.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(vehicleBrand.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.enabled").value(DEFAULT_ENABLED.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingVehicleBrand() throws Exception {
        // Get the vehicleBrand
        restVehicleBrandMockMvc.perform(get("/api/vehicle-brands/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVehicleBrand() throws Exception {
        // Initialize the database
        vehicleBrandRepository.saveAndFlush(vehicleBrand);

        int databaseSizeBeforeUpdate = vehicleBrandRepository.findAll().size();

        // Update the vehicleBrand
        VehicleBrand updatedVehicleBrand = vehicleBrandRepository.findById(vehicleBrand.getId()).get();
        // Disconnect from session so that the updates on updatedVehicleBrand are not directly saved in db
        em.detach(updatedVehicleBrand);
        updatedVehicleBrand
            .name(UPDATED_NAME)
            .enabled(UPDATED_ENABLED);

        restVehicleBrandMockMvc.perform(put("/api/vehicle-brands")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedVehicleBrand)))
            .andExpect(status().isOk());

        // Validate the VehicleBrand in the database
        List<VehicleBrand> vehicleBrandList = vehicleBrandRepository.findAll();
        assertThat(vehicleBrandList).hasSize(databaseSizeBeforeUpdate);
        VehicleBrand testVehicleBrand = vehicleBrandList.get(vehicleBrandList.size() - 1);
        assertThat(testVehicleBrand.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testVehicleBrand.isEnabled()).isEqualTo(UPDATED_ENABLED);
    }

    @Test
    @Transactional
    public void updateNonExistingVehicleBrand() throws Exception {
        int databaseSizeBeforeUpdate = vehicleBrandRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVehicleBrandMockMvc.perform(put("/api/vehicle-brands")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vehicleBrand)))
            .andExpect(status().isBadRequest());

        // Validate the VehicleBrand in the database
        List<VehicleBrand> vehicleBrandList = vehicleBrandRepository.findAll();
        assertThat(vehicleBrandList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVehicleBrand() throws Exception {
        // Initialize the database
        vehicleBrandRepository.saveAndFlush(vehicleBrand);

        int databaseSizeBeforeDelete = vehicleBrandRepository.findAll().size();

        // Delete the vehicleBrand
        restVehicleBrandMockMvc.perform(delete("/api/vehicle-brands/{id}", vehicleBrand.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VehicleBrand> vehicleBrandList = vehicleBrandRepository.findAll();
        assertThat(vehicleBrandList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
