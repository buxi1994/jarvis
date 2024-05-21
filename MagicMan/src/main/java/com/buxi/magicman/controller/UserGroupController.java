package com.buxi.magicman.controller;

import com.buxi.magicman.database.mapper.ToolsInfoMapper;
import com.buxi.magicman.database.mapper.UserGroupInfoMapper;
import com.buxi.magicman.entity.UserGroupInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/magicman/scene")
public class UserGroupController {
    @Autowired
    private UserGroupInfoMapper userGroupInfoMapper;
    @Autowired
    private ToolsInfoMapper toolsInfoMapper;

    @GetMapping("/group/info")
    public UserGroupInfo queryUserGroup(@RequestParam(required = false,defaultValue= "1") Integer page, @RequestParam(required = false) Integer pageSize) throws MalformedURLException {
        int total = userGroupInfoMapper.queryAllUserGroup();
        if (pageSize == null) {
            pageSize = total;
        }
        int startIndex = (page-1)* pageSize;
        List<UserGroupInfo.Item> list = userGroupInfoMapper.queryUserGroup(startIndex,pageSize);
        if (list.size() == 0 && page != 1) {
            page = 1;
            list = userGroupInfoMapper.queryUserGroup(0,pageSize);
        }
        UserGroupInfo userGroupInfo = new UserGroupInfo();
        userGroupInfo.setDataList(list);
        userGroupInfo.setTotal(total);
        userGroupInfo.setPage(page);
        userGroupInfo.setPageSize(pageSize);
        return userGroupInfo;
    }

    @PostMapping("/submit/group")
    public Boolean submitUserGroup(@RequestBody UserGroupInfo.Item requestBody){
        return userGroupInfoMapper.submitUserGroup(requestBody.getName(), requestBody.getCreator(), requestBody.getDescription());
    }

    @PostMapping("/update/group")
    public Boolean updateUserGroup(@RequestBody UserGroupInfo.Item requestBody){
        return userGroupInfoMapper.updateUserGroup(requestBody.getId(), requestBody.getName(),requestBody.getCreator(), requestBody.getDescription());
    }

    @DeleteMapping("/delete/group")
    public boolean deleteUserGroup(@RequestBody List<Long> idList) {
        String idListStr = idList.stream()
                .map(String::valueOf)
                .collect(Collectors.joining(","));
        List<UserGroupInfo.Item> items = userGroupInfoMapper.queryUserGroupByIds(idListStr);
        boolean deleted = userGroupInfoMapper.deleteUserGroupByIds(idListStr);
        toolsInfoMapper.resetToolsGroupId(idListStr);
        return deleted;
    }
}
