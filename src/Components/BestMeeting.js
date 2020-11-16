import React from "react";
import axios from "axios";

const BestMeeting = () => {
  // Constants that would be put in an .env or gitIgnored file
  const URL = "api.candidate.schoolfamilymedia.com";
  const API_KEY = "f82c3a91-fe2a-4cb3-998a-776063275d59";
  const GETPOLL = `assessments/poll/5faec042447f254bbda26ffa?apiKey=`;

  // Retrieves the polling data
  const getData = async () => {
    const result = await axios.get(`http://${URL}/${GETPOLL}${API_KEY}`);
    console.log(result.data);
  };

  getData();

  return (
    <div>
      <h1>Best Meetings</h1>
    </div>
  );
};

export default BestMeeting;
