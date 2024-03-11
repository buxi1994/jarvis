package com.buxi.magicman.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;


@Data
public class ToolsInfo {
    public static enum Type {
        action,
        link,
        recommend
    }

    @Data
    public static class Item {
        private long id;
        private String name;
        private String description;
        private Type type;
        private String imageUrl;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
        private Timestamp createTime;
    }

    private int total;
    private int page = 1;
    private int pageSize = 20;
    private List<Item> dataList;
}
