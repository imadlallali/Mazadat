package org.example.mazadat.Service;

import lombok.RequiredArgsConstructor;
import org.example.mazadat.Api.ApiException;
import org.example.mazadat.DTOIN.BuyerDTOIN;
import org.example.mazadat.DTOIN.BuyerUpdateDTOIN;
import org.example.mazadat.Model.Buyer;
import org.example.mazadat.Model.User;
import org.example.mazadat.Repository.BuyerRepository;
import org.example.mazadat.Repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class BuyerService {

    private final BuyerRepository buyerRepository;
    private final UserRepository userRepository;


    public void addBuyer(BuyerDTOIN buyerDTOIN){

        if (userRepository.existsByUsername(buyerDTOIN.getUsername())) {
            throw new ApiException("Username already exists");
        }
        if (userRepository.existsByEmail(buyerDTOIN.getEmail())) {
            throw new ApiException("Email already exists");
        }

        User user = new User();
        user.setUsername(buyerDTOIN.getUsername());
        user.setEmail(buyerDTOIN.getEmail());
        String hashedPassword = new BCryptPasswordEncoder().encode(buyerDTOIN.getPassword());
        user.setPassword(hashedPassword);
        user.setPhoneNumber(buyerDTOIN.getPhoneNumber());
        user.setRole("BUYER");

        Buyer buyer = new Buyer();
        buyer.setUser(user);

        userRepository.save(user);
        buyerRepository.save(buyer);

    }

    public Buyer getCurrentBuyer(Integer buyerId) {
        Buyer buyer = buyerRepository.findById(buyerId).orElse(null);
        if (buyer == null) {
            throw new ApiException("Buyer not found");
        }
        return buyer;
    }

    public void updateBuyer(BuyerUpdateDTOIN buyerDTOIN, Integer buyerId) {
        Buyer buyer = buyerRepository.findById(buyerId).orElse(null);
        if (buyer == null) {
            throw new ApiException("Buyer not found");
        }

        User user = buyer.getUser();

        boolean hasAnyField = false;

        if (StringUtils.hasText(buyerDTOIN.getUsername())) {
            User userWithSameUsername = userRepository.findUserByUsername(buyerDTOIN.getUsername());
            if (userWithSameUsername != null && !userWithSameUsername.getId().equals(user.getId())) {
                throw new ApiException("Username already exists");
            }
            user.setUsername(buyerDTOIN.getUsername());
            hasAnyField = true;
        }

        if (StringUtils.hasText(buyerDTOIN.getEmail())) {
            User userWithSameEmail = userRepository.findUserByEmail(buyerDTOIN.getEmail());
            if (userWithSameEmail != null && !userWithSameEmail.getId().equals(user.getId())) {
                throw new ApiException("Email already exists");
            }
            user.setEmail(buyerDTOIN.getEmail());
            hasAnyField = true;
        }

        if (StringUtils.hasText(buyerDTOIN.getPhoneNumber())) {
            user.setPhoneNumber(buyerDTOIN.getPhoneNumber());
            hasAnyField = true;
        }

        if (StringUtils.hasText(buyerDTOIN.getPassword())) {
            user.setPassword(new BCryptPasswordEncoder().encode(buyerDTOIN.getPassword()));
            hasAnyField = true;
        }

        if (!hasAnyField) {
            throw new ApiException("No fields provided for update");
        }

        userRepository.save(user);
        buyerRepository.save(buyer);
    }
}
