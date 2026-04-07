package org.example.mazadat.Controller;

import lombok.RequiredArgsConstructor;
import org.example.mazadat.Model.User;
import org.example.mazadat.Service.ReceiptService;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/receipt")
@RequiredArgsConstructor
public class ReceiptController {

    private final ReceiptService receiptService;

    @PostMapping("/generate/{auctionId}")
    public ResponseEntity<?> generateReceipt(@PathVariable Integer auctionId, @AuthenticationPrincipal User user){
        byte[] pdfBytes = receiptService.generateReceiptPDF(auctionId, user.getId());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_PDF);
        headers.setContentDisposition(
            ContentDisposition.builder("attachment")
                .filename("receipt_" + auctionId + ".pdf")
                .build()
        );
        headers.setContentLength(pdfBytes.length);

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

}