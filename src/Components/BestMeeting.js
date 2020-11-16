import React, { useEffect, useState } from "react";
import axios from "axios";

const BestMeeting = () => {
  const [polls, setPolls] = useState({});

  // WE NEED THE AVAILABILITY, STATE, AND EMAIL

  /*
    LOOP THROUGH DATA
    PUT DATA INTO AN OBJECT SO IT LOOKS LIKE THIS 
    *********************************************
    MA : { 
        7/20/2020: [EMAIL1, EMAIL2, EMAIL3],
        7/22/2020: [EMAIL1, EMAIL4]
    }
    *********************************************
    THEN CREATE A FUNCTION THAT CHECKS EACH KEYS VALUE ON THAT STATE OBJECT AND RETURNS THE LONGEST ONES
    THEN CREATE A POST REQUEST THAT HAS ALL THE STATES WITH THE  BEST MEETING TIMES IN THEM 
  */

  // Constants that would be put in an .env or gitIgnored file
  const URL = "api.candidate.schoolfamilymedia.com";
  const API_KEY = "f82c3a91-fe2a-4cb3-998a-776063275d59";
  const GETPOLL = `assessments/poll/5faec042447f254bbda26ffa?apiKey=`;

  // Retrieves the polling data
  const getData = async () => {
    const result = await axios.get(`http://${URL}/${GETPOLL}${API_KEY}`);
    setPolls(result.data);
  };

  // Gets called anytime any data is changed
  useEffect(() => {
    getData();
  }, []);

  const table = {};

  // Adds the states to the table;
  function addToStatesToTable(p) {
    for (let i = 0; i < p.length; i++) {
      if (!table.hasOwnProperty(p[i].state)) {
        table[p[i].state] = {};
      }
    }
  }

  function hasDate(p) {
    // Looping through polls data
    for (let i = 0; i < p.length; i++) {
      // Looping through availability of each person in polls data
      for (let j = 0; j < p[i].availability.length; j++) {
        // If the data is not under the state then it will be added with an empty array
        if (!table[p[i].state][p[i].availability[j]]) {
          table[p[i].state][p[i].availability[j]] = [];
        }
        // if the state is in the table object and the data is there as well we will push the email to the date
        if (table[p[i].state][p[i].availability[j]]) {
          table[p[i].state][p[i].availability[j]].push(p[i].email);
        }
      }
    }
  }

  addToStatesToTable(polls);
  hasDate(polls);
  console.log(table);

  return (
    <div>
      <h1>Best Meetings</h1>
    </div>
  );
};

export default BestMeeting;
