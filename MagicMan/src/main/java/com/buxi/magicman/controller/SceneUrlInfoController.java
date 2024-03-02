package com.buxi.magicman.controller;

import com.buxi.magicman.database.mapper.SceneUrlInfoMapper;
import com.buxi.magicman.entity.SceneUrlInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SceneUrlInfoController {
    @Autowired
    private SceneUrlInfoMapper sceneUrlInfoMapper;
    @GetMapping("/magicman/scene/urlinfo")
    public List<SceneUrlInfo> querySceneUrlInfo(){
        return sceneUrlInfoMapper.queryAllSceneInfo();
    }
}
