package org.example.mazadat.DTOOUT;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BidDTOOUT {

    private Integer id;
    private Integer auctionId;
    private String auctionTitle;
    private Double amount;
    private Double startingPrice;
    private LocalDateTime placedAt;
    private Integer buyerId;
    private LocalDateTime auctionEndDate;  // ✅ NEW: For checking if auction has ended
    private String auctionStatus;          // ✅ NEW: For frontend validation

}

