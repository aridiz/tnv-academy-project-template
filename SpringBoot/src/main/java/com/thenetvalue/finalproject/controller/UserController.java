package com.thenetvalue.finalproject.controller;

import com.thenetvalue.finalproject.controller.exceptions.UserRegistrationException;
import com.thenetvalue.finalproject.model.User;
import com.thenetvalue.finalproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.net.URI;
import java.util.Map;
@CrossOrigin
@RestController
//@RequestMapping("/users")
public class UserController {
    private UserService userService;                       //managing Service level
    //Constructor
    @Autowired                                              //dependency injection
    public UserController(UserService userService) {                //Constructor
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");
        try {
            User resultUser = userService.login(username, password);
            // if login works returns 200 OK with the user in the response body
            return ResponseEntity.ok().body(resultUser);
        } catch (AuthenticationException e) {
            // if login fails returns 401 Unauthorized
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User body) {
        try {
            User user = userService.register(body);
            URI uri = URI.create("/user/" + user.getId()); //TODO check if needed
            return ResponseEntity.created(uri).body(body); //returns 201 if registration is successful
//            return ResponseEntity.ok().build(); // return 200 OK if registration is successful
        } catch (UserRegistrationException u) {
            return ResponseEntity.badRequest().body("Failed to register user"); // return 400 Bad Request with error message
        }
    }
}
