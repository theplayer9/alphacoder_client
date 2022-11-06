import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/userContext";
import Landing from "../Editor/components/Landing";

const Problem = () => {
  const [allQuestion, setAllQuestion] = useState([]);

  const [loading, setLoading] = useState(true);
  const FETCH_URI =
    "https://alphacoder-server-production-c02a.up.railway.app/sheets/blind75sheet";
  const [token] = useUserAuth();
  const router = useNavigate();

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
    console.log(data);

    if (response.status === 200) {
      const filtered = data.sheet_data.filter(
        (e) => e["Id"].toString() === userId
      );
      console.log({ filtered });
      setAllQuestion(filtered);

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllQuestion();
  }, []);

  const { userId } = useParams();
  return (
    <div className="bg-primary text-text">
      <div>
        {allQuestion.map((e) => {
          return (
            <div key={e.Id} className="h-full text-xl py-2 px-5 border-b-2 ">
              <div dangerouslySetInnerHTML={{ __html: e.problem }}></div>
            </div>
          );
        })}
      </div>
      <div>
        <Landing />
      </div>
    </div>
  );
};

export default Problem;
