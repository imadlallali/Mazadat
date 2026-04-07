package org.example.mazadat.DTOIN;

import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuctionHouseDTOIN {

    @Size(min = 3, max = 100)
    private String name;
    @Size(min = 3, max = 255)
    private String location;
    @Size(min = 3, max = 255)
    private String description;

    @Pattern(regexp = "^$|^SA[0-9A-Z]{22}$", message = "IBAN must start with SA and contain 24 characters")
    private String iban;

    @Size(max = 255)
    private String settingsNote;
}
