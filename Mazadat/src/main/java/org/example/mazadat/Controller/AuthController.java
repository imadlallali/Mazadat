package org.example.mazadat.Controller;

import lombok.RequiredArgsConstructor;
import org.example.mazadat.Api.ApiResponse;
import org.example.mazadat.Model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    @GetMapping("/ping")
    public ResponseEntity<?> ping(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse("Unauthorized"));
        }

        Map<String, Object> data = new HashMap<>();
        data.put("role", user.getRole());
        data.put("username", user.getUsername());
        data.put("id", user.getId());

        return ResponseEntity.ok(new ApiResponse("Authenticated", data));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(new ApiResponse("Logged out successfully"));
    }
}

