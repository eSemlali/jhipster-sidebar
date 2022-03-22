package com.s2m.jhtest.web.rest;

import com.s2m.jhtest.JhtestApp;
import com.s2m.jhtest.domain.VehicleColor;
import com.s2m.jhtest.repository.VehicleColorRepository;

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
 * Integration tests for the {@link VehicleColorResource} REST controller.
 */
@SpringBootTest(classes = JhtestApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class VehicleColorResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_HEX_COLOR = "AAAAAA";
    private static final String UPDATED_HEX_COLOR = "BBBBBB";

    private static final Boolean DEFAULT_ENABLED = false;
    private static final Boolean UPDATED_ENABLED = true;

    @Autowired
    private VehicleColorRepository vehicleColorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVehicleColorMockMvc;

    private VehicleColor vehicleColor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VehicleColor createEntity(EntityManager em) {
        VehicleColor vehicleColor = new VehicleColor()
            .name(DEFAULT_NAME)
            .hexColor(DEFAULT_HEX_COLOR)
            .enabled(DEFAULT_ENABLED);
        return vehicleColor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VehicleColor createUpdatedEntity(EntityManager em) {
        VehicleColor vehicleColor = new VehicleColor()
            .name(UPDATED_NAME)
            .hexColor(UPDATED_HEX_COLOR)
            .enabled(UPDATED_ENABLED);
        return vehicleColor;
    }

    @BeforeEach
    public void initTest() {
        vehicleColor = createEntity(em);
    }

    @Test
    @Transactional
    public void createVehicleColor() throws Exception {
        int databaseSizeBeforeCreate = vehicleColorRepository.findAll().size();
        // Create the VehicleColor
        restVehicleColorMockMvc.perform(post("/api/vehicle-colors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vehicleColor)))
            .andExpect(status().isCreated());

        // Validate the VehicleColor in the database
        List<VehicleColor> vehicleColorList = vehicleColorRepository.findAll();
        assertThat(vehicleColorList).hasSize(databaseSizeBeforeCreate + 1);
        VehicleColor testVehicleColor = vehicleColorList.get(vehicleColorList.size() - 1);
        assertThat(testVehicleColor.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testVehicleColor.getHexColor()).isEqualTo(DEFAULT_HEX_COLOR);
        assertThat(testVehicleColor.isEnabled()).isEqualTo(DEFAULT_ENABLED);
    }

    @Test
    @Transactional
    public void createVehicleColorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vehicleColorRepository.findAll().size();

        // Create the VehicleColor with an existing ID
        vehicleColor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVehicleColorMockMvc.perform(post("/api/vehicle-colors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vehicleColor)))
            .andExpect(status().isBadRequest());

        // Validate the VehicleColor in the database
        List<VehicleColor> vehicleColorList = vehicleColorRepository.findAll();
        assertThat(vehicleColorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleColorRepository.findAll().size();
        // set the field null
        vehicleColor.setName(null);

        // Create the VehicleColor, which fails.


        restVehicleColorMockMvc.perform(post("/api/vehicle-colors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vehicleColor)))
            .andExpect(status().isBadRequest());

        List<VehicleColor> vehicleColorList = vehicleColorRepository.findAll();
        assertThat(vehicleColorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHexColorIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleColorRepository.findAll().size();
        // set the field null
        vehicleColor.setHexColor(null);

        // Create the VehicleColor, which fails.


        restVehicleColorMockMvc.perform(post("/api/vehicle-colors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vehicleColor)))
            .andExpect(status().isBadRequest());

        List<VehicleColor> vehicleColorList = vehicleColorRepository.findAll();
        assertThat(vehicleColorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEnabledIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleColorRepository.findAll().size();
        // set the field null
        vehicleColor.setEnabled(null);

        // Create the VehicleColor, which fails.


        restVehicleColorMockMvc.perform(post("/api/vehicle-colors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vehicleColor)))
            .andExpect(status().isBadRequest());

        List<VehicleColor> vehicleColorList = vehicleColorRepository.findAll();
        assertThat(vehicleColorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVehicleColors() throws Exception {
        // Initialize the database
        vehicleColorRepository.saveAndFlush(vehicleColor);

        // Get all the vehicleColorList
        restVehicleColorMockMvc.perform(get("/api/vehicle-colors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vehicleColor.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].hexColor").value(hasItem(DEFAULT_HEX_COLOR)))
            .andExpect(jsonPath("$.[*].enabled").value(hasItem(DEFAULT_ENABLED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getVehicleColor() throws Exception {
        // Initialize the database
        vehicleColorRepository.saveAndFlush(vehicleColor);

        // Get the vehicleColor
        restVehicleColorMockMvc.perform(get("/api/vehicle-colors/{id}", vehicleColor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(vehicleColor.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.hexColor").value(DEFAULT_HEX_COLOR))
            .andExpect(jsonPath("$.enabled").value(DEFAULT_ENABLED.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingVehicleColor() throws Exception {
        // Get the vehicleColor
        restVehicleColorMockMvc.perform(get("/api/vehicle-colors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVehicleColor() throws Exception {
        // Initialize the database
        vehicleColorRepository.saveAndFlush(vehicleColor);

        int databaseSizeBeforeUpdate = vehicleColorRepository.findAll().size();

        // Update the vehicleColor
        VehicleColor updatedVehicleColor = vehicleColorRepository.findById(vehicleColor.getId()).get();
        // Disconnect from session so that the updates on updatedVehicleColor are not directly saved in db
        em.detach(updatedVehicleColor);
        updatedVehicleColor
            .name(UPDATED_NAME)
            .hexColor(UPDATED_HEX_COLOR)
            .enabled(UPDATED_ENABLED);

        restVehicleColorMockMvc.perform(put("/api/vehicle-colors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedVehicleColor)))
            .andExpect(status().isOk());

        // Validate the VehicleColor in the database
        List<VehicleColor> vehicleColorList = vehicleColorRepository.findAll();
        assertThat(vehicleColorList).hasSize(databaseSizeBeforeUpdate);
        VehicleColor testVehicleColor = vehicleColorList.get(vehicleColorList.size() - 1);
        assertThat(testVehicleColor.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testVehicleColor.getHexColor()).isEqualTo(UPDATED_HEX_COLOR);
        assertThat(testVehicleColor.isEnabled()).isEqualTo(UPDATED_ENABLED);
    }

    @Test
    @Transactional
    public void updateNonExistingVehicleColor() throws Exception {
        int databaseSizeBeforeUpdate = vehicleColorRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVehicleColorMockMvc.perform(put("/api/vehicle-colors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vehicleColor)))
            .andExpect(status().isBadRequest());

        // Validate the VehicleColor in the database
        List<VehicleColor> vehicleColorList = vehicleColorRepository.findAll();
        assertThat(vehicleColorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVehicleColor() throws Exception {
        // Initialize the database
        vehicleColorRepository.saveAndFlush(vehicleColor);

        int databaseSizeBeforeDelete = vehicleColorRepository.findAll().size();

        // Delete the vehicleColor
        restVehicleColorMockMvc.perform(delete("/api/vehicle-colors/{id}", vehicleColor.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VehicleColor> vehicleColorList = vehicleColorRepository.findAll();
        assertThat(vehicleColorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
