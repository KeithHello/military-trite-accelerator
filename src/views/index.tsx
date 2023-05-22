import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, message } from "antd";
import SendForm from "../components/send-form";
import { checkUser, checkUserProfile } from "../utils/validation";
import { ageCalculate } from "../utils/age-calculate";
import { sendMailInterval } from "../utils/nodemailer";

const View = () => {
  // Router
  const navigate = useNavigate();

  // API data
  const [userData, setUserData] = useState<UserData[]>([]);
  const [userProfilesData, setUserProfilesData] = useState<UserProfiles[]>([]);
  const [user, setUser] = useState<UserData>();
  const [userProfile, setUserProfile] = useState<UserProfiles>();

  // Input data
  const [form] = Form.useForm();

  useEffect(() => {
    // get data from API
    axios.get("https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
    axios.get("https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json")
      .then((res) => {
        setUserProfilesData(res.data);
      })
      .catch((err) => console.log(err));

    // Every 15 seconds send mail
    const intervalId = setInterval(() => {
      // if (user && userProfile) sendMailInterval(user.username, userProfile.address, form.getFieldValue("wish"));
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  // send data to API
  const handleSend = () => {
    const data = form.getFieldsValue();

    // check if user exists
    const user = checkUser(data.username, userData);

    if (!user) {
      message.error("User does not exist");
      navigate("/error");
      return;
    }

    setUser(user);

    // check if user profile exists
    const userProfile = checkUserProfile(user.uid, userProfilesData);

    if (!userProfile) {
      message.error("User profile does not exist");
      navigate("/error");
      return;
    }

    setUserProfile(userProfile);

    // calculate user age
    const userAge = ageCalculate(userProfile.birthdate);

    // check whether user is younger than 10
    if (Number.isNaN(userAge) || userAge >= 10) {
      message.error("User is older than 10 or birth date is invalid");
      navigate("/error");
      return;
    }

    message.success('Your wish is sent to Santa!');
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