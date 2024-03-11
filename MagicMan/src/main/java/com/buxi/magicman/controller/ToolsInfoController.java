package com.buxi.magicman.controller;

import com.buxi.magicman.database.mapper.ToolsInfoMapper;
import com.buxi.magicman.entity.ToolsInfo;
import com.buxi.magicman.entity.UploadResponse;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/magicman/scene")
public class ToolsInfoController {
    @Autowired
    private ToolsInfoMapper toolsInfoMapper;

    @GetMapping("/toolsinfo")
    // public ToolsInfo queryToolsInfo(@Param("page") int page,@Param("pageSize") int pageSize) {
    public ToolsInfo queryToolsInfo(@RequestParam(required = false) Integer page,@RequestParam(required = false) Integer pageSize,@RequestParam(required = true) String type) {
        List<ToolsInfo.Item> list;
        if (page != null && pageSize != null) {
            int startIndex = (page-1)* pageSize;
            list = toolsInfoMapper.queryAllToolsInfo(startIndex,pageSize,type);
        }
        int total = toolsInfoMapper.queryAllToolsSummary(type);
        list = toolsInfoMapper.queryAllToolsInfo(0,total,type);
        ToolsInfo toolsInfo = new ToolsInfo();
        toolsInfo.setDataList(list);
        toolsInfo.setTotal(total);
        return toolsInfo;
    }

    @PostMapping("/add/tool")
    public boolean addTool(@RequestBody ToolsInfo.Item requestBody) {
        String imageUrl = requestBody.getImageUrl() != null ? requestBody.getImageUrl() : null;
        return toolsInfoMapper.addTool(requestBody.getName(), requestBody.getDescription(), requestBody.getType(),imageUrl );
    }

    @PostMapping("/update/tool")
    public boolean updateTool(@RequestBody ToolsInfo.Item requestBody) {
        return toolsInfoMapper.updateTool(requestBody.getName(), requestBody.getDescription(), requestBody.getType(), requestBody.getImageUrl(),requestBody.getId());
    }

    @DeleteMapping("/delete/tools")
    public boolean deleteTools(@RequestBody List<Long> idList) {
        String idListStr = idList.stream()
                .map(String::valueOf)
                .collect(Collectors.joining(","));
        return toolsInfoMapper.deleteTools(idListStr);
    }

    @PostMapping("/upload/tool/icon")
    public UploadResponse uploadImage(@RequestParam("file") MultipartFile file) {
        String uploadDir = "D:/resources/"; // Specify the directory where you want to save the uploaded images
        File directory = new File(uploadDir);
        UploadResponse response = new UploadResponse();

        if (!directory.exists()) {
            directory.mkdirs();
        }
        if (file.isEmpty()) {
            response.setCode(UploadResponse.Code.SUCCESS.getCode());
            response.setMessage(UploadResponse.Code.SUCCESS.getMessage());
            return response;
        }
        try {
            // 生成唯一的UUID作为文件名的一部分
            String uniqueID = UUID.randomUUID().toString();
            String originalFileName = file.getOriginalFilename();
            // 获取原始文件名的扩展名
            String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
            // 构建唯一的文件名
            String uniqueFileName = uniqueID + fileExtension;
            File newFile = new File(uploadDir + uniqueFileName);
            if (newFile.exists()) {
                response.setCode(UploadResponse.Code.FILE_EXIST.getCode());
                response.setMessage(UploadResponse.Code.FILE_EXIST.getMessage());
                return response;
            }
            file.transferTo(newFile);
            response.setCode(UploadResponse.Code.SUCCESS.getCode());
            response.setMessage(UploadResponse.Code.SUCCESS.getMessage());
            UploadResponse.Data data = new UploadResponse.Data();
            data.setSrc("http://localhost:8090//magicman/scene/tools/images/" + uniqueFileName);
            data.setFileName(uniqueFileName);
            response.setData(data);
            return response;
        } catch (IOException e) {
            response.setCode(UploadResponse.Code.SERVER_ERROR.getCode());
            response.setMessage(UploadResponse.Code.SERVER_ERROR.getMessage());
            return response;
        }
    }

    @GetMapping("/tools/images/{imageName}")
    public ResponseEntity<FileSystemResource> GetImage(@PathVariable String imageName) {
        try {
            String imagePath = "D:/resources/" + imageName;
            FileSystemResource resource = new FileSystemResource(imagePath);

            // Set the response headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG); // Set the content type based on the image type

            return new ResponseEntity<>(resource, headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}