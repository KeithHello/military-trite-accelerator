import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, message } from "antd";
import SendForm from "../components/send-form";
import { checkUser, checkUserProfile } from "../utils/validation";
import { ageCalculate } from "../utils/age-calculate";

const View = () => {
  // Router
  const navigate = useNavigate();

  // API data
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [userProfilesData, setUserProfilesData] = useState<UserProfile[]>([]);

  // Input data
  const [form] = Form.useForm();

  useEffect(() => {
    // get data from API
    axios.get("https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json")
      .then((res) => {
        setUsersData(res.data);
      })
      .catch((err) => console.log(err));
    axios.get("https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json")
      .then((res) => {
        setUserProfilesData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Every 15 seconds send mail
    const intervalId = setInterval(() => {
      const [user, userProfile] = handleData();

      if (user && user.username && userProfile && userProfile.address && form.getFieldValue("wish")) {
        axios.post("/send", {
          username: user.username,
          address: userProfile.address,
          wish: form.getFieldValue("wish"),
        })
          .then((res) => {
            message.info("Mail sent");
            console.log("Mail sent for user: " + user.username);
          })
          .catch((err) => console.log(err));
      }
    }, 15000);

    return () => clearInterval(intervalId);
  }, [usersData, userProfilesData, form.getFieldValue("username")]);

  // get data from API
  const handleData = () : [UserData | null, UserProfile | null] => {
    // check if user exists
    const user = checkUser(form.getFieldValue("username"), usersData);

    if (!user) {
      return [null, null];
    }

    // check if user profile exists
    const userProfile = checkUserProfile(user.uid, userProfilesData);

    if (!userProfile) {
      return [user, null];
    }

    return [user, userProfile];
  };


  // send data to API
  const handleSend = () => {
    const [user, userProfile] = handleData();

    // check if user exists or user profile exists
    if (!user || !userProfile) {
      !user ? message.error("User does not exist") : message.error("User profile does not exist");
      navigate("/error");
      return;
    };

    // calculate user age
    const userAge = ageCalculate(userProfile.birthdate);

    // check whether user is younger than 10
    if (Number.isNaN(userAge) || userAge >= 10) {
      message.error("User is older than 10 or birth date is invalid");
      navigate("/error");
      return;
    }

    message.success('Your wish is received by Santa!');
    navigate("/success");
  };

  return (
    <div>
      <header>
        <h1>A letter to Santa</h1>
      </header>

      <main>
        <p className="bold">Ho ho ho, what you want for Christmas?</p>

        <SendForm form={form} handleSend={handleSend} />
      </main>

      <footer>
        Made with <a href="https://glitch.com">Glitch</a>!
      </footer>
    </div>
  );
};

export default View;