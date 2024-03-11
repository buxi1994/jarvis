package com.buxi.magicman.database.mapper;

import com.buxi.magicman.entity.ToolsInfo;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Optional;

/**
 * 数据库操作
 *
 * @author Mr.Li
 */
@Mapper
public interface ToolsInfoMapper {

    @Select("SELECT * FROM tools WHERE FIND_IN_SET(type,  #{type}) > 0 LIMIT #{startIndex},#{pageSize}")
    List<ToolsInfo.Item> queryAllToolsInfo(@Param("startIndex") int startIndex,@Param("pageSize") int pageSize,@Param("type") String type);

    @Select("SELECT COUNT(*) FROM tools WHERE FIND_IN_SET(type,  #{type}) > 0")
    int queryAllToolsSummary(@Param("type") String type);

    @Insert("INSERT INTO tools (name, description, type,image_url)\n" +
            "VALUES (#{name}, #{description}, #{type},#{imageUrl})")
    boolean addTool(@Param("name") String name, @Param("description") String description, @Param("type") ToolsInfo.Type type, @Param("imageUrl") String imageUrl);

    @Update("UPDATE tools SET name = #{name}, description = #{description}, type = #{type}, image_url = #{imageUrl} WHERE id = #{id};")
    boolean updateTool(@Param("name") String name, @Param("description") String description, @Param("type") ToolsInfo.Type type, @Param("imageUrl") String imageUrl, @Param("id") long id);

    @Delete("DELETE FROM tools WHERE id IN (${idListStr})")
    boolean deleteTools(@Param("idListStr") String idListStr);
}