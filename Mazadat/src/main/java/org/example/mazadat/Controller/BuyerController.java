package org.example.mazadat.Controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.mazadat.Api.ApiResponse;
import org.example.mazadat.DTOIN.BuyerDTOIN;
import org.example.mazadat.DTOIN.BuyerUpdateDTOIN;
import org.example.mazadat.Model.User;
import org.example.mazadat.Service.BuyerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/buyer")
@RequiredArgsConstructor
public class BuyerController {

    private final BuyerService buyerService;


    @PostMapping("/add")
    public ResponseEntity<?> addBuyer(@Valid @RequestBody BuyerDTOIN buyerDTOIN) {
        buyerService.addBuyer(buyerDTOIN);
        return ResponseEntity.status(HttpStatus.CREATED.value()).body(new org.example.mazadat.Api.ApiResponse("Buyer created successfully"));
    }

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentBuyer(@AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.OK.value()).body(buyerService.getCurrentBuyer(user.getId()));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateBuyer(@Valid @RequestBody BuyerUpdateDTOIN buyerDTOIN, @AuthenticationPrincipal User user) {
        buyerService.updateBuyer(buyerDTOIN, user.getId());
        return ResponseEntity.status(HttpStatus.OK.value()).body(new ApiResponse("Buyer updated successfully"));
    }
}
