package com.buxi.magicman.database.mapper;

import com.buxi.magicman.entity.ToolsInfo;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * 数据库操作
 *
 * @author Mr.Li
 */
@Mapper
public interface ToolsInfoMapper {

    @Select("SELECT * FROM tools")
    List<ToolsInfo.Item> queryAllToolsInfo();

    @Select("SELECT COUNT(*) FROM tools")
    int queryAllToolsSummary();

    @Insert("INSERT INTO tools (name, description, type,image_url)\n" +
            "VALUES (#{name}, #{description}, #{type},#{imageUrl})")
    boolean addTool(@Param("name") String name, @Param("description") String description, @Param("type") ToolsInfo.Type type, @Param("imageUrl") String imageUrl);

    @Delete("DELETE FROM tools WHERE id IN (${idListStr})")
    boolean deleteTools(@Param("idListStr") String idListStr);
}