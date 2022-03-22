package com.s2m.jhtest.web.rest;

import com.s2m.jhtest.domain.VehicleColor;
import com.s2m.jhtest.repository.VehicleColorRepository;
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
 * REST controller for managing {@link com.s2m.jhtest.domain.VehicleColor}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VehicleColorResource {

    private final Logger log = LoggerFactory.getLogger(VehicleColorResource.class);

    private static final String ENTITY_NAME = "vehicleColor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VehicleColorRepository vehicleColorRepository;

    public VehicleColorResource(VehicleColorRepository vehicleColorRepository) {
        this.vehicleColorRepository = vehicleColorRepository;
    }

    /**
     * {@code POST  /vehicle-colors} : Create a new vehicleColor.
     *
     * @param vehicleColor the vehicleColor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vehicleColor, or with status {@code 400 (Bad Request)} if the vehicleColor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vehicle-colors")
    public ResponseEntity<VehicleColor> createVehicleColor(@Valid @RequestBody VehicleColor vehicleColor) throws URISyntaxException {
        log.debug("REST request to save VehicleColor : {}", vehicleColor);
        if (vehicleColor.getId() != null) {
            throw new BadRequestAlertException("A new vehicleColor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VehicleColor result = vehicleColorRepository.save(vehicleColor);
        return ResponseEntity.created(new URI("/api/vehicle-colors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vehicle-colors} : Updates an existing vehicleColor.
     *
     * @param vehicleColor the vehicleColor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vehicleColor,
     * or with status {@code 400 (Bad Request)} if the vehicleColor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vehicleColor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vehicle-colors")
    public ResponseEntity<VehicleColor> updateVehicleColor(@Valid @RequestBody VehicleColor vehicleColor) throws URISyntaxException {
        log.debug("REST request to update VehicleColor : {}", vehicleColor);
        if (vehicleColor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VehicleColor result = vehicleColorRepository.save(vehicleColor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, vehicleColor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /vehicle-colors} : get all the vehicleColors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vehicleColors in body.
     */
    @GetMapping("/vehicle-colors")
    public List<VehicleColor> getAllVehicleColors() {
        log.debug("REST request to get all VehicleColors");
        return vehicleColorRepository.findAll();
    }

    /**
     * {@code GET  /vehicle-colors/:id} : get the "id" vehicleColor.
     *
     * @param id the id of the vehicleColor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vehicleColor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vehicle-colors/{id}")
    public ResponseEntity<VehicleColor> getVehicleColor(@PathVariable Long id) {
        log.debug("REST request to get VehicleColor : {}", id);
        Optional<VehicleColor> vehicleColor = vehicleColorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vehicleColor);
    }

    /**
     * {@code DELETE  /vehicle-colors/:id} : delete the "id" vehicleColor.
     *
     * @param id the id of the vehicleColor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vehicle-colors/{id}")
    public ResponseEntity<Void> deleteVehicleColor(@PathVariable Long id) {
        log.debug("REST request to delete VehicleColor : {}", id);
        vehicleColorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
