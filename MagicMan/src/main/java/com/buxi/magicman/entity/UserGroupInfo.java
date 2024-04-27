package com.buxi.magicman.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;


@Data
public class UserGroupInfo {
    @Data
    public static class Item {
        private long id;
        private String name;
        private String creator;
        private String description;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
        private Timestamp createTime;
    }

    private int total;
    private int page;
    private int pageSize;
    private List<Item> dataList;
}
