package com.s2m.jhtest.web.rest;

import com.s2m.jhtest.domain.VehicleBrand;
import com.s2m.jhtest.repository.VehicleBrandRepository;
import com.s2m.jhtest.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.s2m.jhtest.domain.VehicleBrand}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VehicleBrandResource {

    private final Logger log = LoggerFactory.getLogger(VehicleBrandResource.class);

    private static final String ENTITY_NAME = "vehicleBrand";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VehicleBrandRepository vehicleBrandRepository;

    public VehicleBrandResource(VehicleBrandRepository vehicleBrandRepository) {
        this.vehicleBrandRepository = vehicleBrandRepository;
    }

    /**
     * {@code POST  /vehicle-brands} : Create a new vehicleBrand.
     *
     * @param vehicleBrand the vehicleBrand to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vehicleBrand, or with status {@code 400 (Bad Request)} if the vehicleBrand has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vehicle-brands")
    public ResponseEntity<VehicleBrand> createVehicleBrand(@Valid @RequestBody VehicleBrand vehicleBrand) throws URISyntaxException {
        log.debug("REST request to save VehicleBrand : {}", vehicleBrand);
        if (vehicleBrand.getId() != null) {
            throw new BadRequestAlertException("A new vehicleBrand cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VehicleBrand result = vehicleBrandRepository.save(vehicleBrand);
        return ResponseEntity.created(new URI("/api/vehicle-brands/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vehicle-brands} : Updates an existing vehicleBrand.
     *
     * @param vehicleBrand the vehicleBrand to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vehicleBrand,
     * or with status {@code 400 (Bad Request)} if the vehicleBrand is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vehicleBrand couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vehicle-brands")
    public ResponseEntity<VehicleBrand> updateVehicleBrand(@Valid @RequestBody VehicleBrand vehicleBrand) throws URISyntaxException {
        log.debug("REST request to update VehicleBrand : {}", vehicleBrand);
        if (vehicleBrand.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VehicleBrand result = vehicleBrandRepository.save(vehicleBrand);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, vehicleBrand.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /vehicle-brands} : get all the vehicleBrands.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vehicleBrands in body.
     */
    @GetMapping("/vehicle-brands")
    public List<VehicleBrand> getAllVehicleBrands() {
        log.debug("REST request to get all VehicleBrands");
        return vehicleBrandRepository.findAll();
    }

    /**
     * {@code GET  /vehicle-brands/:id} : get the "id" vehicleBrand.
     *
     * @param id the id of the vehicleBrand to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vehicleBrand, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vehicle-brands/{id}")
    public ResponseEntity<VehicleBrand> getVehicleBrand(@PathVariable Long id) {
        log.debug("REST request to get VehicleBrand : {}", id);
        Optional<VehicleBrand> vehicleBrand = vehicleBrandRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vehicleBrand);
    }

    /**
     * {@code DELETE  /vehicle-brands/:id} : delete the "id" vehicleBrand.
     *
     * @param id the id of the vehicleBrand to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vehicle-brands/{id}")
    public ResponseEntity<Void> deleteVehicleBrand(@PathVariable Long id) {
        log.debug("REST request to delete VehicleBrand : {}", id);
        vehicleBrandRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
