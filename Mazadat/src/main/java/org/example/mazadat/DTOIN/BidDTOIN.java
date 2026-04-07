package org.example.mazadat.DTOIN;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Digits;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BidDTOIN {

    @NotNull(message = "Auction ID must exist")
    private Integer auctionId;

    @NotNull(message = "Amount must exist")
    @Positive(message = "Amount must be positive")
    @Digits(integer = 12, fraction = 0, message = "Bid amount must be a whole number")
    private Double amount;
}