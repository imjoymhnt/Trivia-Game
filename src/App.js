import React, { useState, useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";
import axios from "axios";
import { Form, Input, Button, Row, Col } from "antd";
import Swal from "sweetalert2";

function App() {
  var [count, setCount] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const onFinish = (values) => {
    if (values["Answer"].toLowerCase() === answer.toLocaleLowerCase()) {
      Swal.fire("Wow!! 😎", "You're Genious!!", "success").then((result) => {
        if (result.isConfirmed) {
          setCount(count + 1);
        }
      });
    } else {
      Swal.fire("Sorry 😟", "Your Answer is Wrong!!", "error").then(
        (result) => {
          if (result.isConfirmed) {
            setCount(count + 1);
          }
        }
      );
    }
    setAnswer("");
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("https://jservice.io/api/random");
      setQuestion(data[0]["question"]);
      setAnswer(data[0]["answer"]);
    };
    fetchData();
  }, [count]);

  // console.log(answer);

  return (
    <div className="App">
      <h1>Trivia</h1>
      <hr />

      <br />
      <br />
      <br />
      <Row>
        <Col span={12} offset={6}>
          <h2>
            <strong>Question: </strong>
            {question ? question : null}?
          </h2>
          <h3></h3>

          <Form onFinish={onFinish} name="basic">
            <Form.Item
              label="Answer"
              name="Answer"
              width={250}
              rules={[
                {
                  required: true,
                  message: "Please input your Answer!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default App;
