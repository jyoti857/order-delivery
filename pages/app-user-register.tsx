import styles from "../styles/UserRegister.module.css";
import Image from "next/image";
import React from "react";
export interface UserRegisterProps {}

const UserRegister: React.FC<UserRegisterProps> = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState<number | string>();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [serverMessage, setServerMessage] = React.useState("");
  const handleCreateUser = async (e: any) => {
    e.preventDefault();
    const body =
      password !== confirmPassword
        ? setServerMessage("Password does not match")
        : password.length < 4
        ? setServerMessage("password minimum 4 chars")
        : email.includes("@") &&
          email.includes(".") &&
          !email.includes("@.") &&
          !email.includes(".@") &&
          email.indexOf("@") < email.indexOf(".") &&
          email.split(".")[1].trim() !== "" &&
          (() => {
            let flag = true;
            [
              "!",
              "#",
              ",",
              "$",
              "%",
              "^",
              "*",
              "(",
              ")",
              "{",
              "}",
              '"',
              "'",
              "/",
            ].forEach((s) => {
              if (email.indexOf(s) !== -1) {
                flag = false;
                console.log("index of ---> ", email.indexOf(s), s);
              }
            });
            return flag;
          })()
        ? {
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            confirmPassword,
          }
        : setServerMessage("email format is not correct");
    const serverResponse = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await serverResponse.json();
    console.log("user details sent ", data);
    setServerMessage(data.message);
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  const ServerMessage = () => {
    setTimeout(() => {
      setServerMessage("");
    }, 3000);
    return (
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 230,
          height: 40,
          backgroundColor: "#0c0850",
          color: "white",
          fontSize: 18,
          fontWeight: 400,
          flex: 1,
          textAlign: "center",
          borderRadius: 7,
          paddingTop: 6,
        }}
      >
        {serverMessage}
      </div>
    );
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: 190,
            height: 130,
            alignSelf: "center",
            marginBottom: 30,
          }}
        >
          <Image
            src="/pacira.png"
            alt="Pacria Logo"
            width={192}
            height={176}
            className={styles.image}
            // objectPosition="contain"
          />
        </div>
        <Image
          src="/image_1.png"
          alt="Pacria Logo"
          width={472}
          height={386}
          className={styles.image}
        />
      </div>
      <div className={styles.formContainer}>
        {serverMessage ? <ServerMessage /> : ""}
        <div className={styles.card}>
          <div className={styles.heading}>Purchaser Registration</div>
          <div>
            <div className={styles.inputP}>
              <label className={styles.label}>Purchaser name</label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // width: "100%",
                }}
              >
                <div style={{ flex: 0.48 }}>
                  <input
                    style={{ width: "100%" }}
                    className={styles.input}
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={firstName}
                    onChange={(e: any) => setFirstName(e.target.value)}
                  />
                </div>
                <div style={{ flex: 0.48 }}>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={lastName}
                    onChange={(e: any) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.inputP}>
              <label className={styles.label}>Phone number</label>
              <input
                className={styles.inputNumber}
                type="number"
                placeholder="Phone Number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e: any) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className={styles.inputP}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputP}>
              <label className={styles.label}>Create password</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Password"
                name="min 8 characters"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.inputP}>
              <label className={styles.label}>Confirm password</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Confirm password"
                name="phoneNumber"
                value={confirmPassword}
                onChange={(e: any) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className={styles.register_btn} onClick={handleCreateUser}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;

// export const getServerSideProps = ({context}: any) => {
//   console.log("context ---> ", context)
//   const user = "ds"
//   return {props: {context}}
// }
