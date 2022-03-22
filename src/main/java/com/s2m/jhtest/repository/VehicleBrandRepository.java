package com.s2m.jhtest.repository;

import com.s2m.jhtest.domain.VehicleBrand;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the VehicleBrand entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VehicleBrandRepository extends JpaRepository<VehicleBrand, Long> {
}
