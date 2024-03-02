package com.buxi.magicman.entity;

import lombok.Data;

@Data
public class SceneUrlInfo {
    private long id;

    // 场景信息
    private String sceneUrl;

    private String sceneDescription;

    private String sceneKeyWord;

    // 推荐信息
    private String recommendedUrl;

    private String recommendedName;

    private String recommendedType;

    // 用户信息
    private String creator;

    private long createTime;
}
