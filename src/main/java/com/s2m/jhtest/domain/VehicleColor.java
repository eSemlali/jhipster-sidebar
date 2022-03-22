package com.s2m.jhtest.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A VehicleColor.
 */
@Entity
@Table(name = "vehicle_color")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class VehicleColor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, max = 500)
    @Column(name = "name", length = 500, nullable = false)
    private String name;

    @NotNull
    @Size(min = 6, max = 6)
    @Column(name = "hex_color", length = 6, nullable = false)
    private String hexColor;

    @NotNull
    @Column(name = "enabled", nullable = false)
    private Boolean enabled;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public VehicleColor name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHexColor() {
        return hexColor;
    }

    public VehicleColor hexColor(String hexColor) {
        this.hexColor = hexColor;
        return this;
    }

    public void setHexColor(String hexColor) {
        this.hexColor = hexColor;
    }

    public Boolean isEnabled() {
        return enabled;
    }

    public VehicleColor enabled(Boolean enabled) {
        this.enabled = enabled;
        return this;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VehicleColor)) {
            return false;
        }
        return id != null && id.equals(((VehicleColor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "VehicleColor{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", hexColor='" + getHexColor() + "'" +
            ", enabled='" + isEnabled() + "'" +
            "}";
    }
}
