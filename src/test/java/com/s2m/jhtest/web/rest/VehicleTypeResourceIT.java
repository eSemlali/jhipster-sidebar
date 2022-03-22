package com.s2m.jhtest.web.rest;

import com.s2m.jhtest.JhtestApp;
import com.s2m.jhtest.domain.VehicleType;
import com.s2m.jhtest.repository.VehicleTypeRepository;

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
 * Integration tests for the {@link VehicleTypeResource} REST controller.
 */
@SpringBootTest(classes = JhtestApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class VehicleTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ENABLED = false;
    private static final Boolean UPDATED_ENABLED = true;

    @Autowired
    private VehicleTypeRepository vehicleTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVehicleTypeMockMvc;

    private VehicleType vehicleType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VehicleType createEntity(EntityManager em) {
        VehicleType vehicleType = new VehicleType()
            .name(DEFAULT_NAME)
            .enabled(DEFAULT_ENABLED);
        return vehicleType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VehicleType createUpdatedEntity(EntityManager em) {
        VehicleType vehicleType = new VehicleType()
            .name(UPDATED_NAME)
            .enabled(UPDATED_ENABLED);
        return vehicleType;
    }

    @BeforeEach
    public void initTest() {
        vehicleType = createEntity(em);
    }

    @Test
    @Transactional
    public void createVehicleType() throws Exception {
        int databaseSizeBeforeCreate = vehicleTypeRepository.findAll().size();
        // Create the VehicleType
        restVehicleTypeMockMvc.perform(post("/api/vehicle-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vehicleType)))
            .andExpect(status().isCreated());

        // Validate the VehicleType in the database
        List<VehicleType> vehicleTypeList = vehicleTypeRepository.findAll();
        assertThat(vehicleTypeList).hasSize(databaseSizeBeforeCreate + 1);
        VehicleType testVehicleType = vehicleTypeList.get(vehicleTypeList.size() - 1);
        assertThat(testVehicleType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testVehicleType.isEnabled()).isEqualTo(DEFAULT_ENABLED);
    }

    @Test
    @Transactional
    public void createVehicleTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vehicleTypeRepository.findAll().size();

        // Create the VehicleType with an existing ID
        vehicleType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVehicleTypeMockMvc.perform(post("/api/vehicle-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vehicleType)))
            .andExpect(status().isBadRequest());

        // Validate the VehicleType in the database
        List<VehicleType> vehicleTypeList = vehicleTypeRepository.findAll();
        assertThat(vehicleTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleTypeRepository.findAll().size();
        // set the field null
        vehicleType.setName(null);

        // Create the VehicleType, which fails.


        restVehicleTypeMockMvc.perform(post("/api/vehicle-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vehicleType)))
            .andExpect(status().isBadRequest());

        List<VehicleType> vehicleTypeList = vehicleTypeRepository.findAll();
        assertThat(vehicleTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEnabledIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleTypeRepository.findAll().size();
        // set the field null
        vehicleType.setEnabled(null);

        // Create the VehicleType, which fails.


        restVehicleTypeMockMvc.perform(post("/api/vehicle-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vehicleType)))
            .andExpect(status().isBadRequest());

        List<VehicleType> vehicleTypeList = vehicleTypeRepository.findAll();
        assertThat(vehicleTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVehicleTypes() throws Exception {
        // Initialize the database
        vehicleTypeRepository.saveAndFlush(vehicleType);

        // Get all the vehicleTypeList
        restVehicleTypeMockMvc.perform(get("/api/vehicle-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vehicleType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].enabled").value(hasItem(DEFAULT_ENABLED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getVehicleType() throws Exception {
        // Initialize the database
        vehicleTypeRepository.saveAndFlush(vehicleType);

        // Get the vehicleType
        restVehicleTypeMockMvc.perform(get("/api/vehicle-types/{id}", vehicleType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(vehicleType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.enabled").value(DEFAULT_ENABLED.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingVehicleType() throws Exception {
        // Get the vehicleType
        restVehicleTypeMockMvc.perform(get("/api/vehicle-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVehicleType() throws Exception {
        // Initialize the database
        vehicleTypeRepository.saveAndFlush(vehicleType);

        int databaseSizeBeforeUpdate = vehicleTypeRepository.findAll().size();

        // Update the vehicleType
        VehicleType updatedVehicleType = vehicleTypeRepository.findById(vehicleType.getId()).get();
        // Disconnect from session so that the updates on updatedVehicleType are not directly saved in db
        em.detach(updatedVehicleType);
        updatedVehicleType
            .name(UPDATED_NAME)
            .enabled(UPDATED_ENABLED);

        restVehicleTypeMockMvc.perform(put("/api/vehicle-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedVehicleType)))
            .andExpect(status().isOk());

        // Validate the VehicleType in the database
        List<VehicleType> vehicleTypeList = vehicleTypeRepository.findAll();
        assertThat(vehicleTypeList).hasSize(databaseSizeBeforeUpdate);
        VehicleType testVehicleType = vehicleTypeList.get(vehicleTypeList.size() - 1);
        assertThat(testVehicleType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testVehicleType.isEnabled()).isEqualTo(UPDATED_ENABLED);
    }

    @Test
    @Transactional
    public void updateNonExistingVehicleType() throws Exception {
        int databaseSizeBeforeUpdate = vehicleTypeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVehicleTypeMockMvc.perform(put("/api/vehicle-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vehicleType)))
            .andExpect(status().isBadRequest());

        // Validate the VehicleType in the database
        List<VehicleType> vehicleTypeList = vehicleTypeRepository.findAll();
        assertThat(vehicleTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVehicleType() throws Exception {
        // Initialize the database
        vehicleTypeRepository.saveAndFlush(vehicleType);

        int databaseSizeBeforeDelete = vehicleTypeRepository.findAll().size();

        // Delete the vehicleType
        restVehicleTypeMockMvc.perform(delete("/api/vehicle-types/{id}", vehicleType.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VehicleType> vehicleTypeList = vehicleTypeRepository.findAll();
        assertThat(vehicleTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
