import "./App.css";
import "antd/dist/antd.css";

import {
  Table,
  Button,
  InputNumber,
  Divider,
  Select,
  Form,
  Input,
  Space,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [childCount, setChildCount] = useState();
  const [isCitizen, setIsCitizen] = useState();
  const [hasLicense, setHasLicense] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [name, setName] = useState();
  const [citizenId, setCitizenId] = useState();
  const { Option } = Select;

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Nat",
      dataIndex: "nat",
      key: "nat",
    },
  ];

  const onChildCountChange = (value) => {
    console.log("c value: " + value);
    setChildCount(value);
  };
  const handleLicenseChange = (value) => {
    console.log("l value: " + value);
    setHasLicense(value);
  };
  const handleCitizenChange = (value) => {
    console.log("citizen value: " + value);
    setIsCitizen(value);
  };
  const onNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const onCitizenIDChange = (e) => {
    console.log(e);
    setCitizenId(e);
  };

  const fetchData = () => {
    return axios.get("https://randomuser.me/api/").then((response) => {
      let mappedResponse = response.data.results.map((item) => {
        return {
          key: item.key,
          email: item.email,
          gender: item.gender,
          nat: item.nat,
        };
      });
      setDataSource(mappedResponse);
    });
  };

  const addCitizenRequest = {
    name: name,
    hasLicense: hasLicense === "yes" ? 1 : 0,
    isCitizen: isCitizen === "yes" ? 1 : 0,
  };
  const addCitizen = () => {
    axios
      .post("https://localhost:8080/citizen/add", addCitizenRequest)
      .then(response => console.log(response));
  };

  const updateCitizenRequest = {
    id: citizenId,
    name: name,
    hasLicense: hasLicense === "yes" ? 1 : 0,
    isCitizen: isCitizen === "yes" ? 1 : 0,
  };
  const updateCitizen = () => {
    axios.post("https://localhost:8080/citizen/add",updateCitizenRequest)
    .then(response => console.log(response));
  };

  const getById = () => {
    axios
      .get("https://localhost:8080/citizen/?{citizenId}")
      .then((response) => {
        let mappedResponse = response.map((item) => {
          return {
            key: item.key,
            email: item.email,
            gender: item.gender,
            nat: item.nat,
          };
        });
        setDataSource(mappedResponse);
      });
  };

  return (
    <div className="App">
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 12 }}
        layout="horizontal"
      >
        <Divider plain>Search Citizen</Divider>
        <Space>
          <Form.Item wrapperCol={{ span: 2 }} label={"Number Of Children"}>
            <InputNumber min={0} max={10} onChange={onChildCountChange} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 2 }} label={"Is Citizen"}>
            <Select style={{ width: 90 }} onChange={handleCitizenChange}>
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12 }} label={"Name"}>
            <Input onChange={onNameChange} tyle={{ width: 200 }} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 2 }} label={"Has Driving License"}>
            <Select style={{ width: 90 }} onChange={handleLicenseChange}>
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
        </Space>
        <Space>
          <Button type="primary" onClick={fetchData}>
            Search Citizen
          </Button>
        </Space>
        <Divider plain>Data Table</Divider>
        <Table columns={columns} dataSource={dataSource} />
        <Divider plain>Get Citizen By Id</Divider>
        <Space>
          <InputNumber
            min={0}
            onChange={onCitizenIDChange}
            placeholder={"Citizen ID"}
          />
          <Button type="primary" onClick={getById}>
            Get Citizen By Id
          </Button>
        </Space>
        <Divider plain>Add/Update Citizen</Divider>
        <Space>
          <Form.Item>
            <InputNumber
              min={0}
              onChange={onCitizenIDChange}
              placeholder={"Citizen ID"}
            />
          </Form.Item>
          <Form.Item>
            <Select
              style={{ width: 90 }}
              onChange={handleCitizenChange}
              placeholder="Is Citizen"
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Input
              onChange={onNameChange}
              style={{ width: 90 }}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item>
            <Select
              style={{ width: 90 }}
              onChange={handleLicenseChange}
              placeholder="Has Driving License"
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={addCitizen}
              disabled={citizenId != null}
            >
              Add Citizen
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={updateCitizen}
              disabled={citizenId == null}
            >
              Update Citizen
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </div>
  );
}

export default App;
