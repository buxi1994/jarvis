package com.buxi.magicman.entity;

import lombok.Data;

import java.sql.Timestamp;
import java.util.List;


@Data
public class ToolsInfo {
    public static enum Type {
        action,
        link
    }

    @Data
    public static class Item {
        private long id;
        private String name;
        private String description;
        private Type type;
        private String imageUrl;
        private Timestamp createTime;
    }

    private int total;
    private int page = 1;
    private int pageSize = 20;
    private List<Item> dataList;
}
