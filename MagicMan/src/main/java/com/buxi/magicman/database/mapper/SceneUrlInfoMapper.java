package com.buxi.magicman.database.mapper;

import com.buxi.magicman.entity.SceneUrlInfo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 数据库操作
 *
 * @author Mr.Li
 */
public interface SceneUrlInfoMapper {

    @Select("SELECT * FROM scene_url_info")
    List<SceneUrlInfo> queryAllSceneInfo();

    @Select("SELECT * FROM scene_url_info WHERE id = #{id}")
    List<SceneUrlInfo> querySceneInfo(long id);

    @Insert("INSERT INTO scene_url_info (scene_url, scene_description, scene_key_word, " +
            "recommended_url, recommended_name, recommended_type, creator, create_time) " +
            "VALUES (#{sceneUrl}, #{sceneDescription}, #{sceneKeyWord}, " +
            "#{recommendedUrl}, #{recommendedName}, #{recommendedType}, #{creator}, #{createTime})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void createSceneRecommendedInfo(@Param("sceneUrlInfo") SceneUrlInfo sceneUrlInfo);
}
