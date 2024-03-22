package com.buxi.magicman.database.mapper;

import com.buxi.magicman.entity.FeedbackInfo;
import com.buxi.magicman.entity.ToolsInfo;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface FeedbackInfoMapper {
    // @Select("SELECT * FROM feedback LIMIT #{startIndex},#{pageSize}")
    @Select("SELECT * FROM feedback WHERE #{status} = 'all' OR status = #{status} LIMIT #{startIndex},#{pageSize}")
    List<FeedbackInfo.Item> queryAllFeedback(@Param("startIndex") int startIndex, @Param("pageSize") int pageSize,@Param("status") String status);

    @Select("SELECT COUNT(*) FROM feedback WHERE #{status} = 'all' OR status = #{status}")
    int queryAllFeedbackSummary(@Param("status") String status);

    @Insert("INSERT INTO feedback (title, creator, description) VALUES (#{title}, #{creator}, #{description})")
    boolean submitFeedBack(@Param("title") String title, @Param("creator") String creator, @Param("description") String description);

    @Update("UPDATE feedback SET editor = #{editor}, comment = #{comment}, status = #{status} WHERE id = #{id};")
    boolean updateFeedBack(@Param("id") long id, @Param("editor") String editor, @Param("comment") String comment,@Param("status") FeedbackInfo.status status);
}
