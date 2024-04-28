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
    @Select("SELECT tools.id,tools.name,user_group.id as group_id,user_group.name as group_name,tools.description,tools.type,image_url,tools.relation,tools.create_time FROM tools " +
            "LEFT JOIN user_group ON tools.group_id = user_group.id "+
            "WHERE FIND_IN_SET(type,  #{type}) > 0 AND relation LIKE CONCAT('%', #{relation}, '%') AND (#{groupId} is null OR group_id = #{groupId}) LIMIT #{startIndex},#{pageSize}")
    List<ToolsInfo.Item> queryAllToolsInfo(@Param("startIndex") int startIndex,@Param("pageSize") int pageSize,@Param("type") String type,@Param("relation") String relation,@Param("groupId") Long groupId);

    @Select("SELECT COUNT(*) FROM tools WHERE FIND_IN_SET(type,  #{type}) > 0 AND (#{groupId} is null OR group_id = #{groupId})")
    int queryAllToolsSummary(@Param("type") String type,@Param("groupId") Long groupId);

    @Insert("INSERT INTO tools (name, description, type,image_url,relation,group_id)\n" +
            "VALUES (#{name}, #{description}, #{type},#{imageUrl},#{relation},#{groupId})")
    boolean addTool(@Param("name") String name, @Param("description") String description, @Param("type") ToolsInfo.Type type, @Param("imageUrl") String imageUrl, @Param("relation") String relation, @Param("groupId") Long groupId);

    @Update("UPDATE tools SET name = #{name}, description = #{description}, type = #{type}, image_url = #{imageUrl},relation = #{relation},group_id = #{groupId}  WHERE id = #{id};")
    boolean updateTool(@Param("name") String name, @Param("description") String description, @Param("type") ToolsInfo.Type type, @Param("imageUrl") String imageUrl, @Param("id") long id, @Param("relation") String relation,@Param("groupId") Long groupId);

    @Update("UPDATE tools SET group_id = null WHERE id IN (${groupIdList})")
    boolean resetToolsGroupId(@Param("groupIdList") String groupIdList);

    @Delete("DELETE FROM tools WHERE id IN (${idListStr})")
    boolean deleteTools(@Param("idListStr") String idListStr);

    @Select("SELECT * FROM tools WHERE id IN (${idListStr})")
    List<ToolsInfo.Item> willDeleteToolsInfo(@Param("idListStr") String idListStr);
}