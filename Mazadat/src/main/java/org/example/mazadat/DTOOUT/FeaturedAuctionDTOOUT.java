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
public class FeaturedAuctionDTOOUT {

    private Integer id;
    private String title;
    private Double startingPrice;
    private Double currentPrice;
    private String sellerName;
    private String auctionHouseName;
    private Integer auctionHouseId;
    private LocalDateTime featuredEndDate;
    private Boolean isActivelyFeatured;
    private Integer bidCount;

}

