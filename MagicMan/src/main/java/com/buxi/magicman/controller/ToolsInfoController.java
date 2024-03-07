package com.buxi.magicman.controller;

import com.buxi.magicman.database.mapper.ToolsInfoMapper;
import com.buxi.magicman.entity.ToolsInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/magicman/scene")
public class ToolsInfoController {
    @Autowired
    private ToolsInfoMapper toolsInfoMapper;

    @GetMapping("/toolsinfo")
    public ToolsInfo queryToolsInfo(){
        List<ToolsInfo.Item> list = toolsInfoMapper.queryAllToolsInfo();
        int total = toolsInfoMapper.queryAllToolsSummary();
        ToolsInfo toolsInfo = new ToolsInfo();
        toolsInfo.setDataList(list);
        toolsInfo.setTotal(total);
        return toolsInfo;
    }

    @PostMapping("/add/tool")
    public boolean addTool(@RequestBody ToolsInfo.Item requestBody){
        return toolsInfoMapper.addTool(requestBody.getName(),requestBody.getDescription(),requestBody.getType(),requestBody.getImageUrl());
    }

    @DeleteMapping("/delete/tools")
    public boolean deleteTools(@RequestBody List<Long> idList){
        String idListStr = idList.stream()
                .map(String::valueOf)
                .collect(Collectors.joining(","));
        return toolsInfoMapper.deleteTools(idListStr);
    }
}
