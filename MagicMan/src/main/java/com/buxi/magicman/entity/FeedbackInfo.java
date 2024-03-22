package com.buxi.magicman.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class FeedbackInfo {
    public static enum status {
        pending,
        defer,
        done
    }

    @Data
    public static class Item {
        private long id;
        private String title;
        private String creator;
        private String description;
        private FeedbackInfo.status status;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
        private Timestamp createTime;
        // 修改人
        private String editor;
        // 修改添加备注
        private String comment;
    }

    private int total;
    private int page;
    private int pageSize;
    private List<FeedbackInfo.Item> dataList;
}
