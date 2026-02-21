import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "./users";
import Bg from "./assets/bg.jpg";
import "./index.css"; // imported for styling the date input in the appointments (both online and offline)

function Dashboard() {

  const navigate = useNavigate();
  

  const [showModel, setShowModel] = useState(false);
  const [showOnlineAppointment, setShowOnlineAppointment] = useState(false);
  const [showOfflineAppointment, setShowOfflineAppointment] = useState(false);

  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState(""); //mobile = a box, setMobile = hand that puts new value inside the box
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userPhone = localStorage.getItem("userPhone");        
    if (!isLoggedIn || !userPhone) {
      navigate("/");
      return;
    }

    const currentUser = users.find((u) => u.phone === userPhone);
    if(currentUser){
        setUserName(currentUser.name);
    }
  }, [navigate]);

  useEffect(() => {
    if(showModel){
      const storedPhone = localStorage.getItem("userPhone");
      if(storedPhone){
        setMobile(storedPhone);
      }
    }
  }, [showModel])

  useEffect(() => {
    if(showOnlineAppointment){
      const storedPhone = localStorage.getItem("userPhone");
      if(storedPhone){
        setMobile(storedPhone);
      }
    }
  }, [showOnlineAppointment])

  useEffect(() => {
    if(showOfflineAppointment){
      const storedPhone = localStorage.getItem("userPhone");
      if(storedPhone){
        setMobile(storedPhone);
      }
    }
  }, [showOfflineAppointment])

  const [appointments, setAppointments] = useState([]);
  const [showMySchedule, setShowMySchedule] = useState(false); // for MySchedule
  const handleRemoveAppointment = (id) => {
    setAppointments((prev) =>
      prev.filter((appt) => appt.id !== id)
    );
  };

  const [showMyDoctorDetails, setShowMyDoctorDetails] = useState(false); // for MyDoctorDetails
  const [showMyMediactions, setShowMyMedications] = useState(false); // for MyMedications
  const [showMyPrescription, setShowMyPrescription] = useState(false); // for MyDoctorDetails

  
  return(
    <div style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
    }}>
      {/* CALL BACK BUTTON  */}
      <div onClick={() => { setShowModel(true) }}
          style={{
            position: "fixed",
            top: "85vh",
            right: "5vw",
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "20px",
            fontWeight: "250px",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.5)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0)"
          }}
        >
          📞︎ CALL BACK
      </div>

      <div style={{
        width: "100vw",
        height: "10vh",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white", 
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
        zIndex: 100,
      }}>
        <h2 style={{color: "black", width: "36vw", margin: "3vh 3vw 0 5vw"}}>Welcome to MediConnect, {userName ? `${userName}` : ""}</h2>
        <FeatureCard1 title="Online Appointment" onClick={() => setShowOnlineAppointment(true)} />
        <FeatureCard1 title="Offline Appointment" onClick={() => setShowOfflineAppointment(true)} />
        <FeatureCard1 title="Medicine Inventory" onClick={() => navigate("/medicineInventory")} />
        <button onClick={() => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userPhone");
            navigate("/");
        }} style={{
                width: "6vw",
                height: "5vh",
                margin: "2.5vh 0vw 0vh 2vw",
                paddingTop: "0.5rem",
                border: "none",
        }} onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.5)"
          }}
          onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0)"
        }}>
            Logout
        </button>
      </div>
      <div style={{
        minHeight: "90vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{minHeight: "50vh", width: "100vw", position: "relative", }}>
           <div style={{minHeight: "45vh", width: "100vw",position: "absolute", backgroundImage: `url(${Bg})`,backgroundSize: "cover", backgroundPosition: "center",}}></div>
           <div style={{minHeight: "10vh", width: "80vw",position: "absolute", backgroundColor: "white", margin: "40vh 0vw 0vh 10vw",border: "solid 1px black", display: "flex", flexDirection: "row", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", zIndex: 100,}}>
            <FeatureCard title="My Schedule" onClick={() => setShowMySchedule(true)} />
            <div style={{minHeight: "10vh", width: "1px", backgroundColor: "black"}}></div>
            <FeatureCard title="My Doctor Details" onClick={() => setShowMyDoctorDetails(true)} />
            <div style={{minHeight: "10vh", width: "1px", backgroundColor: "black"}}></div>
            <FeatureCard title="My Medications" onClick={() => setShowMyMedications(true)} />
            <div style={{minHeight: "10vh", width: "1px", backgroundColor: "black"}}></div>  
            <FeatureCard title="My Prescription" onClick={() => setShowMyPrescription(true)} />
           </div>
        </div>
        <div style={{minHeight: "45vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center"}}>
           <h3 style={{color: "black", marginTop: "5vh", margin: "5rem 0 0rem 0" }}>About MediConnect</h3>
           <p style={{color: "black", textAlign: "center"}}>MediConnect is a web-based patient portal designed to streamline healthcare access and management. <br/>It enables secure login for both patients and doctors through role-based authentication. <br/>Users can view appointments, medical reports, prescriptions, and personal profile details. <br/>The application features a modern dashboard interface with interactive feature cards.<br/>Built using React, it provides a scalable foundation for future backend and database integration.</p>
        </div>
      </div>

    {/*CALL BACK POPUP*/}  
    {showModel && (
      <>
    {/* Blur Background */}
    <div
      onClick={() => setShowModel(false)}
      style={{
        position: "fixed",
        inset: 0,
        backdropFilter: "blur(3px)",
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 100,
      }}
    ></div>
    {/* Modal Box */}
    <div
      style={{
        position: "fixed",
        width: "20vw",
        minHeight: "15vh",
        backgroundColor: "white",
        margin: "38vh 37vw",
        padding: "2rem",
        borderRadius: "14px",
        zIndex: 101,
        boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
        textAlign: "center",
      }}
    >
      <h3 style={{marginTop: "0rem", marginBottom: "1rem", color: "black"}}>Request Call Back</h3>
      <input
        type="text"
        placeholder="Enter mobile number"
        value={mobile}
        onChange={(e) => {
          const value = e.target.value
          if (/^\d{0,10}$/.test(value)) {
            setMobile(value);
          }
        }}
        style={{
          width: "18.5vw",
          padding: "10px",
          marginBottom: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          backgroundColor: "white",
          color: "black",
        }}
      />
      <button
        onClick={() => {
          alert("Request Raised");
          setMobile("");
          setShowModel(false);
        }}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#5395f8",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </div>
    </>
    )}

    {/*ONLINE APPOINTMENT*/}
    {showOnlineAppointment && (
      <>
    {/* Blur Background */}
    <div
      onClick={() => setShowOnlineAppointment(false)}
      style={{
        position: "fixed",
        inset: 0,
        backdropFilter: "blur(3px)",
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 200,
      }}
    ></div>
    {/* Modal Box */}
    <div
      style={{
        position: "fixed",
        width: "20vw",
        minHeight: "35vh",
        backgroundColor: "white",
        margin: "23vh 37vw",
        padding: "2rem",
        borderRadius: "14px",
        zIndex: 201,
        boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
        textAlign: "center",
      }}
    >
      <h3 style={{marginTop: "0rem", marginBottom: "1rem", color: "black"}}>Online Appointment</h3>
      <label htmlFor="mobile" style={{display: "block", color: "black", textAlign: "left", fontSize: "12px", margin: "0 0 2px 4px"}}>Enter Mobile</label>
      <input
        type="text"
        value={mobile}
        onChange={(e) => {
          const value = e.target.value
          if (/^\d{0,10}$/.test(value)) {
            setMobile(value);
          }
        }}
        style={{
          width: "18.5vw",
          padding: "10px",
          marginBottom: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          backgroundColor: "white",
          color: "black",
        }}
      />
      <label htmlFor="mobile" style={{display: "block", color: "black", textAlign: "left", fontSize: "12px", margin: "0 0 2px 4px"}}>Enter Name</label>
      <input
        type="text"
        value={userName}
        onChange={(e) => {
          const value = e.target.value
          setUserName(value);
        }}
        style={{
          width: "18.5vw",
          padding: "10px",
          marginBottom: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          backgroundColor: "white",
          color: "black",
        }}
      />
      <label htmlFor="mobile" style={{display: "block", color: "black", textAlign: "left", fontSize: "12px", margin: "0 0 2px 4px"}}>Enter Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{
          width: "18.5vw",
          padding: "10px",
          marginBottom: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          backgroundColor: "white",
          color: "black",
        }}
      />
      <label htmlFor="mobile" style={{display: "block", color: "black", textAlign: "left", fontSize: "12px", margin: "0 0 2px 4px"}}>Enter Time</label>
      <select value={time} onChange={(e) => setTime(e.target.value)}
        style={{
          width: "20vw",
          padding: "10px",
          marginBottom: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          backgroundColor: "white",
          color: "black",
        }}>
          <option value="-">--:--</option>
          <option value="10:00">10:00</option>
          <option value="12:00">12:00</option>
          <option value="14:00">14:00</option>
          <option value="16:00">16:00</option>
          <option value="18:00">18:00</option>
        </select>
      
      <button
        onClick={() => {
          if(date === "" || time === "" || userName === "" || mobile === ""){
            alert("Please fill all the details");
            return;
          }
          const newAppointment = {
            id: Date.now(),
            name: userName,
            mobile,
            date,
            time,
            type: "Online"
          };

          setAppointments((prev) => [...prev, newAppointment]);

          alert("Request Raised, scheduled appointment will be shown in My Schedule section.");
          setDate("");
          setTime("");
          setShowModel(false);
        }}
        style={{
          marginTop: "2vh",
          width: "100%",
          padding: "10px",
          backgroundColor: "#5395f8",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.5)"
        }}
        onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0)"
        }}
      >
        Submit
      </button>
    </div>
    </>
    )}

    {/*OFFLINE APPOINTMENT*/}
    {showOfflineAppointment && (
      <>
    {/* Blur Background */}
    <div
      onClick={() => setShowOfflineAppointment(false)}
      style={{
        position: "fixed",
        inset: 0,
        backdropFilter: "blur(3px)",
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 200,
      }}
    ></div>
    {/* Modal Box */}
    <div
      style={{
        position: "fixed",
        width: "20vw",
        minHeight: "35vh",
        backgroundColor: "white",
        margin: "23vh 37vw",
        padding: "2rem",
        borderRadius: "14px",
        zIndex: 201,
        boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
        textAlign: "center",
      }}
    >
      <h3 style={{marginTop: "0rem", marginBottom: "1rem", color: "black"}}>Offline Appointment</h3>
      <label htmlFor="mobile" style={{display: "block", color: "black", textAlign: "left", fontSize: "12px", margin: "0 0 2px 4px"}}>Enter Mobile</label>
      <input
        type="text"
        value={mobile}
        onChange={(e) => {
          const value = e.target.value
          if (/^\d{0,10}$/.test(value)) {
            setMobile(value);
          }
        }}
        style={{
          width: "18.5vw",
          padding: "10px",
          marginBottom: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          backgroundColor: "white",
          color: "black",
        }}
      />
      <label htmlFor="mobile" style={{display: "block", color: "black", textAlign: "left", fontSize: "12px", margin: "0 0 2px 4px"}}>Enter Name</label>
      <input
        type="text"
        value={userName}
        onChange={(e) => {
          const value = e.target.value
          setUserName(value);
        }}
        style={{
          width: "18.5vw",
          padding: "10px",
          marginBottom: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          backgroundColor: "white",
          color: "black",
        }}
      />
      <label htmlFor="mobile" style={{display: "block", color: "black", textAlign: "left", fontSize: "12px", margin: "0 0 2px 4px"}}>Enter Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{
          width: "18.5vw",
          padding: "10px",
          marginBottom: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          backgroundColor: "white",
          color: "black",
        }}
      />
      <label htmlFor="mobile" style={{display: "block", color: "black", textAlign: "left", fontSize: "12px", margin: "0 0 2px 4px"}}>Enter Time</label>
      <select value={time} onChange={(e) => setTime(e.target.value)}
        style={{
          width: "20vw",
          padding: "10px",
          marginBottom: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          backgroundColor: "white",
          color: "black",
        }}>
          <option value="-">--:--</option>
          <option value="10:00">10:00</option>
          <option value="12:00">12:00</option>
          <option value="14:00">14:00</option>
          <option value="16:00">16:00</option>
          <option value="18:00">18:00</option>
        </select>
      
      <button
        onClick={() => {
          if(date === "" || time === "" || userName === "" || mobile === ""){
            alert("Please fill all the details");
            return;
          }

          const newAppointment = {
            id: Date.now(),
            name: userName,
            mobile,
            date,
            time,
            type: "Offline"
          };

          setAppointments((prev) => [...prev, newAppointment]);

          alert("Request Raised, scheduled appointment will be shown in My Schedule section.");
          setDate("");
          setTime("");
          setShowModel(false);
        }}
        style={{
          marginTop: "2vh",
          width: "100%",
          padding: "10px",
          backgroundColor: "#5395f8",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.5)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0)"
        }}
      >
        Submit
      </button>
    </div>
    </>
    )}

    {/* MY SCHEDULE POPUP */}
    {showMySchedule && (
      <>
        {/* Blur Background */}
        <div
          onClick={() => setShowMySchedule(false)}
          style={{
            position: "fixed",
            inset: 0,
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 400
          }}
        />

        {/* Schedule Modal */}
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "25vw",
            maxHeight: "60vh",
            overflowY: "auto",
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            zIndex: 401,
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            color: "black",
          }}
        >
          <h3 style={{ textAlign: "center"}}>📅 My Schedule</h3>

          {appointments.length === 0 ? (
            <p style={{ textAlign: "center" }}>No appointments scheduled.</p>
          ) : (
            appointments.map((appt) => (
              <div
                key={appt.id}
                style={{
                  borderBottom: "1px solid #ddd",
                  marginBottom: "10px",
                  paddingBottom: "8px"
                }}
              >
                <div>
                  <p><strong>{appt.type} Appointment</strong></p>
                  <p>{appt.date} at {appt.time}</p>
                  <p>{appt.name} ({appt.mobile})</p>
                </div>

                <button
                  onClick={() => handleRemoveAppointment(appt.id)}
                  style={{
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                  
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  Cancel
                </button>
              </div>
            ))
          )}

          <button
            onClick={() => setShowMySchedule(false)}
            style={{ marginTop: "10px", marginLeft:"9vw", width: "30%", padding: "8px", backgroundColor: "#5395f8", color: "white", border: "none", borderRadius: "4px" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.5)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0)"
            }}
          >
            Close
          </button>
        </div>
      </>
    )}

    {/* MY DOCTOR DETAILS POPUP */}
    {showMyDoctorDetails && (
      <>
        {/* Blur Background */}
        <div
          onClick={() => setShowMyDoctorDetails(false)}
          style={{
            position: "fixed",
            inset: 0,
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 400
          }}
        />

        {/* Schedule Modal */}
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "25vw",
            maxHeight: "60vh",
            overflowY: "auto",
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            zIndex: 401,
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            color: "black",
            textAlign: "center",
          }}
        >
          <h3 style={{ textAlign: "center"}}>🩺 My Doctor Details</h3>

          <div><b>Dr. XYZ ABCD</b></div>
          <div><b>Email:</b> xyz100@gmail.com</div>
          <div><b>OPD Hours:</b> 10:00 to 13:00</div>
          <div><b>IPD Hours:</b> 14:00 to 17:00</div>


          <button
            onClick={() => setShowMyDoctorDetails(false)}
            style={{ marginTop: "20px",  width: "30%", padding: "8px", backgroundColor: "#5395f8", color: "white", border: "none", borderRadius: "4px" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.5)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0)"
            }}
          >
            Close
          </button>
        </div>
      </>
    )}

    {/* MY MEDIACTIONS POPUP */}
    {showMyMediactions && (
      <>
        {/* Blur Background */}
        <div
          onClick={() => setShowMyMedications(false)}
          style={{
            position: "fixed",
            inset: 0,
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 400
          }}
        />

        {/* Schedule Modal */}
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "25vw",
            maxHeight: "60vh",
            overflowY: "auto",
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            zIndex: 401,
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            color: "black",
          }}
        >
          <h3 style={{ textAlign: "center"}}>💊 My Medications</h3>

          <div style={{marginBottom: "10px"}}><b>Ibuprofen 400mg</b><br />Morning (Before Breakfast) <br /> Night (Before Dinner)</div>
          <div style={{marginBottom: "10px"}}><b>Metformin 500mg</b><br />Morning (After Breakfast) <br /> Night (After Dinner)</div>
          <div style={{marginBottom: "10px"}}><b>Rantac 150mg</b><br />Afternoon (After Lunch)</div>

          <button
            onClick={() => setShowMyMedications(false)}
            style={{ marginTop: "20px", marginLeft: "9vw",  width: "30%", padding: "8px", backgroundColor: "#5395f8", color: "white", border: "none", borderRadius: "4px" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.5)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0)"
            }}
          >
            Close
          </button>
        </div>
      </>
    )}

    {/* MY PRESCRIPTION POPUP */}
    {showMyPrescription && (
      <>
        {/* Blur Background */}
        <div
          onClick={() => setShowMyPrescription(false)}
          style={{
            position: "fixed",
            inset: 0,
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 400
          }}
        />

        {/* Schedule Modal */}
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "25vw",
            maxHeight: "60vh",
            overflowY: "auto",
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            zIndex: 401,
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            color: "black",
          }}
        >
          <h3 style={{ textAlign: "center"}}>📋 My Prescription</h3>

          <div style={{marginBottom: "10px"}}><b>Disease Diagnosed:</b> qwertyuiop syndrome</div>
          <div style={{marginBottom: "10px"}}><b>Symptoms:</b> 1234567890, zxcvbnm, asdfghjkl</div>
          
          <div style={{marginBottom: "10px"}}><b>Prescribed Medications:</b><br />Ibuprofen 400mg<br />Metformin 500mg<br />Rantac 150mg  </div>

          <button
            onClick={() => setShowMyPrescription(false)}
            style={{ marginTop: "20px", marginLeft: "9vw",  width: "30%", padding: "8px", backgroundColor: "#5395f8", color: "white", border: "none", borderRadius: "4px" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.5)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0)"
            }}
          >
            Close
          </button>
        </div>
      </>
    )}


    </div>
  ) 
}

    function FeatureCard1({ title, onClick }) {
      return (
        <div
          onClick={onClick}
          style={{width: "15vw",
                  height: "7vh", 
                  border: "none",
                  paddingTop: "0.5rem",
                  marginTop: "1.5vh",
                  backgroundColor: "white",
                  color: "#5A5A5A",
                  fontSize: "18px",
                  cursor: "pointer",
          }}
          onMouseEnter={(e) => {e.currentTarget.style.color = "#5395f8"}}
          onMouseLeave={(e) => {e.currentTarget.style.color = "#5A5A5A"}}
        >
          <h4 style={{ margin: "0.5rem 0", textAlign: "center"}}>{title}</h4>
        </div>
  );
}

function FeatureCard({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: "20vw",
        Height: "10vh",
        padding: "1.5rem",
        backgroundColor: "white",
        color: "#5A5A5A",
        cursor: "pointer",
        border: "none",
        transition: "background-Color 0.5s ease, color 1s ease",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor ="#5395f8";
        e.currentTarget.style.color ="white";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor ="white";
        e.currentTarget.style.color ="#5A5A5A";
      }}
    >
      <h4 style={{ margin: "0.5rem 0", textAlign: "center"}}>{title}</h4>
    </div>
  );
}

export default Dashboard;