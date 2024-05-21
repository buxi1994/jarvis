package com.buxi.magicman.database.mapper;

import com.buxi.magicman.entity.ToolsInfo;
import com.buxi.magicman.entity.UserGroupInfo;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserGroupInfoMapper {
    @Select("SELECT * FROM user_group LIMIT #{startIndex},#{pageSize}")
    List<UserGroupInfo.Item> queryUserGroup(@Param("startIndex") int startIndex, @Param("pageSize") int pageSize);

    @Select("SELECT COUNT(*) FROM user_group")
    int queryAllUserGroup();

    @Insert("INSERT INTO user_group (name, creator, description) VALUES (#{name}, #{creator}, #{description})")
    boolean submitUserGroup(@Param("name") String name, @Param("creator") String creator, @Param("description") String description);

    @Update("UPDATE user_group SET name = #{name}, creator = #{creator}, description = #{description} WHERE id = #{id};")
    boolean updateUserGroup(@Param("id") long id, @Param("name") String name, @Param("creator") String creator, @Param("description") String description);

    @Select("SELECT * FROM user_group WHERE id IN (${idListStr})")
    List<UserGroupInfo.Item> queryUserGroupByIds(@Param("idListStr") String idListStr);

    @Delete("DELETE FROM user_group WHERE id IN (${idListStr})")
    boolean deleteUserGroupByIds(@Param("idListStr") String idListStr);
}
