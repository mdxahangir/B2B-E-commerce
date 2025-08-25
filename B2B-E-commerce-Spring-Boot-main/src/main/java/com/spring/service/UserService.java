//package com.spring.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.spring.model.User;
//import com.spring.repository.UserRepository;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Service
//public class UserService {
//    private final UserRepository userRepository;
//
//    @Autowired
//    public UserService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    public User registerUser(User user) {
//        user.setCreatedAt(LocalDateTime.now());
//        return userRepository.save(user);
//    }
//
//    public User login(String email, String password) {
//        List<User> users = userRepository.findByEmailAndPassword(email, password);
//        if (!users.isEmpty()) {
//            return users.get(0);
//        }
//        return null;
//    }
//
//    public boolean emailExists(String email) {
//        return userRepository.existsByEmail(email);
//    }
//}
