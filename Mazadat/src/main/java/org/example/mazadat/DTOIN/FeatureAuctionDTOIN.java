package org.example.mazadat.DTOIN;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class FeatureAuctionDTOIN {

    @NotNull(message = "Feature end date must be provided")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm", shape = com.fasterxml.jackson.annotation.JsonFormat.Shape.STRING)
    private LocalDateTime featuredEndDate;

}

