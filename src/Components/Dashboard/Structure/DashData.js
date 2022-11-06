import React, { useState, useEffect } from "react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Img1 from "../../../Assets/StructureImg/img1.svg";
import Img2 from "../../../Assets/StructureImg/img2.svg";
import Img3 from "../../../Assets/StructureImg/img3.svg";
import Img4 from "../../../Assets/StructureImg/img4.svg";
import Img5 from "../../../Assets/StructureImg/img5.svg";
import { useUserAuth } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import BasicInfo from "./BasicInfo";
import Select from "react-select";

const DashData = () => {
  const [allQuestion, setAllQuestion] = useState([]);
  const [count, setCount] = useState({});
  const [loading, setLoading] = useState(true);
  const FETCH_URI =
    "https://alphacoder-server-production-c02a.up.railway.app/sheets/blind75sheet";
  const [token] = useUserAuth();
  const router = useNavigate();

  const difficulty = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];
  const status = [
    { value: "solved", label: "Solved" },
    { value: "unsolved", label: "Unsolved" },
  ];

  const category = [
    { value: "array", label: "Array" },
    { value: "heap", label: "Heap" },
    { value: "linkedlist", label: "Linked List" },
    { value: "binarytrees", label: "Binary Trees" },
    { value: "searching&sorting", label: "Searching & Sorting" },
    { value: "string", label: "String" },
    { value: "greedy", label: "Greedy" },
    { value: "backtracking", label: "Backtracking" },
    { value: "stacks&queues", label: "Stacks & Queues" },
    { value: "graph", label: "Graph" },
    { value: "dynamicprogramming", label: "Dynamic Programming" },
    { value: "matrix", label: "Matrix" },
  ];

  const fetchAllQuestion = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Token: token,
      },
    };
    const response = await fetch(FETCH_URI, requestOptions);
    const data = await response.json();

    const easycount = data.sheet_data.filter(
      (item) => item.Level === "easy"
    ).length;
    const mediumcount = data.sheet_data.filter(
      (item) => item.Level === "medium"
    ).length;
    const hardcount = data.sheet_data.filter(
      (item) => item.Level === "hard"
    ).length;
    const emptycount = data.sheet_data.filter(
      (item) => item.Level === ""
    ).length;
    const questioncount = {
      easy: easycount,
      medium: mediumcount,
      hard: hardcount,
      empty: emptycount,
    };
    if (response.status === 200) {
      setAllQuestion(data.sheet_data);
      setCount(questioncount);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllQuestion();
  }, []);
  console.log("all", allQuestion, "easy", count);
  console.log(typeof allQuestion);
  return (
    <>
      {loading === true ? (
        <div className="w-screen h-screen flex justify-center items-center text-text bg-primary">
          Loading...
        </div>
      ) : (
        <div className="w-screen bg-primary flex justify-center">
          <div className="w-[80%] h-full  bg-primary text-text">
            <div className="w-full h-[600px] md:h-[400px] flex flex-col md:flex-row gap-5 md:gap-3 md:px-4 items-center md:items-start pt-24">
              <BasicInfo allQuestion={allQuestion} count={count} />
              <div className="w-[90%] h-56 md:h-64 w-full flex justify-center items-center text-text  bg-primary-light shadow-light-shadow rounded-lg">
                No Previous Record
              </div>
            </div>
            <div className="flex w-full h-[250px] lg:justify-center">
              <div className="flex overflow-x-scroll md:w-full ">
                <div className="flex flex-nowrap md:w-full md:justify-between gap-4 px-5 scroll-smooth">
                  <div className=" flex-col w-56 h-56 bg-primary-light shadow-light-shadow rounded-md flex justify-center items-center overflow-hidden cursor-pointer">
                    <img src={Img1} className="w-48" />
                    <h1 className="pb-2 font-head font-semibold">
                      Blind75 Sheet
                    </h1>
                  </div>
                  <div className=" flex-col w-56 h-56 bg-primary-light shadow-light-shadow rounded-md flex justify-center items-center overflow-hidden cursor-pointer">
                    <img src={Img2} className="w-48" />
                    <h1 className="pb-2 font-head font-semibold">
                      Fraz's Sheet
                    </h1>
                  </div>
                  <div className=" flex-col w-56 h-56 bg-primary-light shadow-light-shadow rounded-md flex justify-center items-center overflow-hidden cursor-pointer">
                    <img src={Img3} className="w-48" />
                    <h1 className="pb-2 font-head font-semibold">
                      Apna College's Sheet
                    </h1>
                  </div>
                  <div className=" flex-col w-56 h-56 bg-primary-light shadow-light-shadow rounded-md flex justify-center items-center overflow-hidden cursor-pointer">
                    <img src={Img4} className="w-48" />
                    <h1 className="pb-2 font-head font-semibold">
                      Love Babar's Sheet
                    </h1>
                  </div>
                  <div className=" flex-col w-56 h-56 bg-primary-light shadow-light-shadow rounded-md flex justify-center items-center overflow-hidden cursor-pointer">
                    <img src={Img5} className="w-48" />
                    <h1 className="pb-2 font-head font-semibold">
                      Striver's Sheet
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="  overflow-x-auto md:overflow-x-hidden w-full h-[700px] bg-primary-light ">
              <div className="md:px-4 absolute w-[80%] bg-primary-color h-20 fixed">
                <div className="flex justify-between h-[100%] items-center ">
                  <div>
                    <Select
                      className="w-40  text-primary "
                      options={difficulty}
                      placeholder={<div>Difficulty</div>}
                    />{" "}
                  </div>
                  <div>
                    <Select
                      className="w-40 text-primary "
                      options={category}
                      placeholder={<div>Category</div>}
                    />{" "}
                  </div>
                  <div>
                    <Select
                      className="w-40 text-primary "
                      options={status}
                      placeholder={<div>Status</div>}
                    />{" "}
                  </div>
                  <div>
                    <input
                      type="search"
                      placeholder="&nbsp;search"
                      className=" placeholder-primary-color h-10 focus:placeholder-primary text-primary"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:px-4 mt-[80px]  h-[700px] bg-primary-light">
                <div className="flex scroll-smooth justify-center">
                  <table className="flex flex-col items-center w-full ">
                    <tr className="flex h-16 mt-2 items-center w-full  shadow-light-shadow px-5 justify-between  bg-primary text-xl">
                      <th>QId</th>
                      <th>Title</th>
                      <th>Solution</th>
                      <th>Difficulty</th>
                      <th>Category</th>
                    </tr>

                    {allQuestion.map((question, i) => (
                      <tr
                        key={i}
                        id={i}
                        className="flex w-[98%] hover:cursor-pointer  h-16 items-center shadow-light-shadow mt-4 bg-primary gap-y-3 justify-between border-b-2 rounded-md px-2 "
                      >
                        <td className="w-[5%]">{question.Id}</td>
                        <td
                          className="w-[35%] pr-5  hover:underline "
                          onClick={() => router(`/Problem/${question.Id}`)}
                        >
                          {question.Name}
                        </td>
                        <td className="w-[20%]">
                          {question.Link === "" ? (
                            <InsertDriveFileIcon className=" hover:cursor-text text-red-700" />
                          ) : (
                            <a href={question.Link}>
                              <InsertDriveFileIcon className="text-green-600 " />
                            </a>
                          )}
                        </td>
                        <td className="w-[5%]">
                          {question.Level === "" ? (
                            <span className="text-empty">Unspecified</span>
                          ) : question.Level === "easy" ? (
                            <span className="text-easy">Easy</span>
                          ) : question.Level === "medium" ? (
                            <span className="text-medium">Medium</span>
                          ) : (
                            <span className="text-hard">Hard</span>
                          )}
                        </td>
                        <td className="w-[25%] flex justify-end">
                          {question.Category}
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
                {/* </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashData;
