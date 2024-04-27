import React, { useState, useEffect } from "react";
import { Input, Row, Col, Button, Tabs, Select } from "antd";
import axios from "axios";
import JsonEditorComponent from "./JsonEditorComponent";
import { GetRequest,parseKeyValueToObj } from "./util/util";

function ApiComponent() {
  const { Option } = Select;
  const { TextArea } = Input;
  const [url, setUrl] = useState("");
  // "http://v0.yiketianqi.com/free/v2030"
  // const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts");
  // {city:'嘉定',cityid:'101020500',appid:'99111117',appsecret:'rxLX7Uu6'}
  // const [data, setData] = useState("");
  const [params, setParams] = useState("");
  const [header, setHeader] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [response, setResponse] = useState("");
  const [requestType, setRequestType] = useState("Get");

  useEffect(() => {
    const obj = GetRequest(url, "");
    setParams(obj.params);
  }, [url]);

  useEffect(() => {
    const obj = GetRequest(url, params);
    setUrl(obj.url);
  }, [params]);

  const tabs = [
    {
      key: "1",
      label: "Params",
      children: (
        <TextArea
          value={params}
          autoSize
          placeholder="格式参考：&#10;name=Jane&#10;age=10"
          onChange={(e) => {
            return setParams(e.target.value);
          }}
        />
      ),
    },
    {
      key: "2",
      label: "Headers",
      children: (
        <TextArea
          autoSize
          value={header}
          placeholder="格式参考：&#10;User-Agent=PostmanRuntime/7.37.3&#10;Accept=*/*&#10;Accept-Encoding=gzip, deflate, br&#10;Connection=keep-alive"
          onChange={(e) => setHeader(JSON.parse(e.target.value))}
        />
      ),
    },
    {
      key: "3",
      label: "Body",
      children: (
        <TextArea
          autoSize
          value={requestBody}
          placeholder="格式参考：&#10;name=Jane&#10;age=10"
          onChange={(e) => setRequestBody(e.target.value)}
        />
      ),
    },
  ];

  const selectBefore = (
    <Select
      defaultValue={requestType}
      onChange={(value)=>setRequestType(value)}
      style={{ width: 90 }}
    >
      <Option value="Get">Get</Option>
      <Option value="Post">Post</Option>
      <Option value="Put">Put</Option>
      <Option value="Delete">Delete</Option>
    </Select>
  );

  const handleGet = async () => {
    try {
      const result = await axios.get(url);
      setRequestBody("");
      setResponse(result.data);
    } catch (error) {
      setResponse(error.message);
    }
  };

  const handlePost = async () => {
    try {
      const postData = parseKeyValueToObj(requestBody);
      const result = await axios.post(url, postData);
      setResponse(result.data);
    } catch (error) {
      setResponse(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await axios.delete(url);
      setRequestBody("");
      setResponse(result.data);
    } catch (error) {
      setResponse(error.message);
    }
  };

  const handlePut = async () => {
    try {
      const putData = parseKeyValueToObj(requestBody);
      const result = await axios.put(url, putData);
      setResponse(result.data);
    } catch (error) {
      setResponse(error.message);
    }
  };

  const handleSend = () => {
    switch (requestType) {
      case "Get":
        handleGet();
        break;
      case "Post":
        handlePost();
        break;
      case "Put":
        handlePut();
        break;
      case "Delete":
        handleDelete();
        break;
      default:
        break;
    }
  };

  return (
    <Row style={{padding:"10px 20px",height:"calc(100% - 20px)"}}>
      <Col span={11}>
        <h2>Request:</h2>
        <div style={{ marginBottom: 16 }}>
          <Input
            addonBefore={selectBefore}
            addonAfter={
              <Button type="link" onClick={handleSend}>
                Send
              </Button>
            }
            defaultValue=""
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <Tabs defaultActiveKey="1" items={tabs}/>
      </Col>
      <Col span={1}></Col>
      <Col span={12}>
        <h2>Response:</h2>
        <JsonEditorComponent json={response} />
      </Col>
    </Row>
  );
}

export default ApiComponent;
