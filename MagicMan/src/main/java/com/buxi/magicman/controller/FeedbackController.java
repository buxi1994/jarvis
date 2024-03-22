package com.buxi.magicman.controller;

import com.buxi.magicman.database.mapper.FeedbackInfoMapper;
import com.buxi.magicman.entity.FeedbackInfo;
import org.intellij.lang.annotations.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.yaml.snakeyaml.util.EnumUtils;

import java.net.MalformedURLException;
import java.util.List;

@RestController
@RequestMapping("/magicman/scene")
public class FeedbackController {
    @Autowired
    private FeedbackInfoMapper feedbackInfoMapper;

    @GetMapping("/feedback/info")
    public FeedbackInfo queryAllFeedBack(@RequestParam(required = true) Integer page, @RequestParam(required = true) Integer pageSize,@RequestParam(required = false,defaultValue = "all") String status) throws MalformedURLException {
        int total = feedbackInfoMapper.queryAllFeedbackSummary(status);
        int startIndex = (page-1)* pageSize;
        List<FeedbackInfo.Item> list;
        list = feedbackInfoMapper.queryAllFeedback(startIndex,pageSize,status);
        if (list.size() == 0 && page != 1) {
            page = 1;
            list = feedbackInfoMapper.queryAllFeedback(0,pageSize,status);
        }
        FeedbackInfo feedbackInfo = new FeedbackInfo();
        feedbackInfo.setDataList(list);
        feedbackInfo.setTotal(total);
        feedbackInfo.setPage(page);
        feedbackInfo.setPageSize(pageSize);
        return feedbackInfo;
    }

    @PostMapping("/submit/feedback")
    public Boolean submitFeedBack(@RequestBody FeedbackInfo.Item requestBody){
        return feedbackInfoMapper.submitFeedBack(requestBody.getTitle(), requestBody.getCreator(), requestBody.getDescription());
    }

    @PostMapping("/update/feedback")
    public Boolean updateFeedBack(@RequestBody FeedbackInfo.Item requestBody){
        return feedbackInfoMapper.updateFeedBack(requestBody.getId(), requestBody.getEditor(), requestBody.getComment(),requestBody.getStatus());
    }
}
