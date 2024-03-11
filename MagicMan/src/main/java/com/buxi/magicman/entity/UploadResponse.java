package com.buxi.magicman.entity;

import lombok.Data;
import lombok.Getter;

@Data
public class UploadResponse {
    private int code;
    private String message;
    private Data data;
    @lombok.Data
    public static class Data {
        private String src;
        private String fileName;
    }

    public enum Code {
        SUCCESS(200, "Success"),
        FILE_NOT_FOUND(404, "File not found"),
        FILE_EXIST(491, "File already exists"),
        SERVER_ERROR(500, "Internal server error");
        @Getter
        private int code;
        @Getter
        private String message;

        Code(int code, String message) {
            this.code = code;
            this.message = message;
        }
    }
}
