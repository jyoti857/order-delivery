import styles from "../styles/UserRegister.module.css";
import Image from "next/image";
export interface UserRegisterProps {}

const UserRegister: React.FC<UserRegisterProps> = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Image
          src="/pacira.png"
          // style={{ flex: 0.1 }}
          alt="Pacria Logo"
          width={192}
          height={176}
          className={styles.image}
        />
        <Image
          src="/image_1.png"
          // style={{ flex: 0.1 }}
          alt="Pacria Logo"
          width={472}
          height={386}
          className={styles.image}
        />
      </div>
      <div className={styles.formContainer}>
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
                  />
                </div>
                <div style={{ flex: 0.48 }}>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                  />
                </div>
              </div>
            </div>
            <div className={styles.inputP}>
              <label className={styles.label}>Phone number</label>
              <input
                className={styles.input}
                type="number"
                placeholder="Phone Number"
                name="phoneNumber"
              />
            </div>
            <div className={styles.inputP}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Email"
                name="phoneNumber"
              />
            </div>
            <div className={styles.inputP}>
              <label className={styles.label}>Create password</label>
              <input
                className={styles.input}
                type="text"
                placeholder="password"
                name="min 8 characters"
              />
            </div>
            <div className={styles.inputP}>
              <label className={styles.label}>Confirm password</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Confirm password"
                name="phoneNumber"
              />
            </div>
            <button className={styles.register_btn}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
