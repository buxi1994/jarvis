package com.buxi.magicman;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan
public class MagicManApplication {

    public static void main(String[] args) {
        SpringApplication.run(MagicManApplication.class, args);
    }

}
