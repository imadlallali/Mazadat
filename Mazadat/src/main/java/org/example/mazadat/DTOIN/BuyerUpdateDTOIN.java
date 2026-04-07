package org.example.mazadat.DTOIN;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BuyerUpdateDTOIN {

    @Size(min = 3, max = 30, message = "Username must be from 3 to 30 char long")
    private String username;

    @Email(message = "Email must be valid")
    private String email;

    @Pattern(regexp = "^$|^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$",
            message = "Password must be 8-32 chars with uppercase, lowercase, digit, and special character")
    private String password;

    @Pattern(regexp = "^$|^\\+9665\\d{8}$", message = "Phone number must match Saudi format: +9665XXXXXXXX")
    private String phoneNumber;
}

