package org.example.mazadat.DTOOUT;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SellerTeamMemberDTO {
    private Integer sellerId;
    private String username;
    private String email;
    private Boolean isAdmin;
    private Boolean payoutVerified;
    private Double rating;
}

