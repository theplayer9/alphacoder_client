import React, { useState, useEffect } from "react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Img1 from "../../../Assets/StructureImg/img1.svg";
import Img2 from "../../../Assets/StructureImg/img2.svg";
import Img3 from "../../../Assets/StructureImg/img3.svg";
import Img4 from "../../../Assets/StructureImg/img4.svg";
import Img5 from "../../../Assets/StructureImg/img5.svg";
import { useUserAuth } from "../../../context/userContext";
import BasicInfo from "./BasicInfo";

const DashData = () => {
  const [allQuestion, setAllQuestion] = useState([]);
  const [count, setCount] = useState({});
  const [loading, setLoading] = useState(true);
  const FETCH_URI =
    "https://alphacoder-server-production-c02a.up.railway.app/sheet";
  const [token] = useUserAuth();

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
    const data = await response.text();
    const objectData = [];
    const mainData = JSON.parse(data);
    objectData.push(mainData);
    const easycount = mainData.all_data.filter(
      (item) => item.Level === "easy"
    ).length;
    const mediumcount = mainData.all_data.filter(
      (item) => item.Level === "medium"
    ).length;
    const hardcount = mainData.all_data.filter(
      (item) => item.Level === "hard"
    ).length;
    const emptycount = mainData.all_data.filter(
      (item) => item.Level === ""
    ).length;
    const questioncount = {
      easy: easycount,
      medium: mediumcount,
      hard: hardcount,
      empty: emptycount,
    };
    if (response.status === 200) {
      setAllQuestion(mainData);
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
        <div className="w-screen h-screen bg-primary">Loading</div>
      ) : (
        <div className="w-screen h-full bg-primary text-text">
          <div className="w-full h-[600px] md:h-[400px] flex flex-col md:flex-row gap-5 md:gap-3 md:px-4 items-center md:items-start pt-24">
            <BasicInfo allQuestion={allQuestion} count={count} />
            <div className="w-[90%] h-56 md:h-64 bg-primary-light shadow-light-shadow rounded-lg"></div>
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
                  <h1 className="pb-2 font-head font-semibold">Fraz's Sheet</h1>
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
          <div className="w-full md:px-4 overflow-x-scroll w-full h-[700px] bg-primary-light flex flex-nowrap scroll-smooth justify-center ">
            <div className="w-full md:px-4 lex overflow-x-scroll w-full h-[700px] bg-primary-light">
              {/* <input type="search"></input> */}
              {/* <div className="flex w-full h-[700px] bg-primary-light"> */}
              {/* <div className="flex overflow-x-scroll"> */}
              <div className="flex  scroll-smooth justify-center ">
                <table className=" overflow-x-scroll w-full">
                  <thead>
                    <tr className="flex w-full justify-between">
                      <th>Title</th>
                      <th>Solution</th>
                      <th>Difficulty</th>
                      <th>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allQuestion.all_data.map((question, i) => (
                      <tr key={i} id={i} className="lex w-full justify-between">
                        <td>{question.Name.substring(0, 25)}...</td>
                        <td>
                          {question.Link === "" ? (
                            <InsertDriveFileIcon className=" text-red-700"></InsertDriveFileIcon>
                          ) : (
                            <InsertDriveFileIcon className="text-green-600 "></InsertDriveFileIcon>
                          )}
                        </td>
                        <td>
                          {question.Level === ""
                            ? "Not Available"
                            : question.Level}
                        </td>
                        <td>{question.Category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashData;
