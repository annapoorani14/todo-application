package com.example.Helloworld.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloworldController {
    @GetMapping("/h")
    String sayHelloworld(){
        return "Hello World";
    }
}
