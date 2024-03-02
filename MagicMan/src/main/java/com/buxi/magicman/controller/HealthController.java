package com.buxi.magicman.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/magicman/healthcheck")
    public String healthCheck(){
        return "Hello, Magic Man";
    }
}
