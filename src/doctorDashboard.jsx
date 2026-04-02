import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "./users";
import Bg from "./assets/bg.jpg";
import "./index.css"; // imported for styling the date input in the appointments (both online and offline)

function Dashboard() {

  const navigate = useNavigate();
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

  const [showOPD, setShowOPD] = useState(false);
  const [showIPD, setShowIPD] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false); // for Emergency Appointments
  const [showLeave, setShowLeave] = useState(false); // for Leave Application
  const [showLeaveStatus, setShowLeaveStatus] = useState(false); // for Leave Status
  const [leave, setLeave] = useState([]);

  const [userName, setUserName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleRemoveLeave = (id) => {
    setLeave((prev) =>
      prev.filter((lea) => lea.id !== id)
    );
  };
  
  return(
    <div style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
    }}>
      {/* NO CALL BACK BUTTON IN DOCTOR'S DASHBOARD*/}
      

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
        <FeatureCard1 title="OPD Schedule" onClick={() => setShowOPD(true)} />
        <FeatureCard1 title="IPD Schedule" onClick={() => setShowIPD(true)} />
        <FeatureCard1 title="Medicine Inventory" onClick={() => navigate("/doctorMedicineInventory")} />
        <button onClick={() => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userPhone");
            navigate("/doctorlogin");
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
           <div style={{minHeight: "10vh", width: "60vw",position: "absolute", backgroundColor: "white", margin: "40vh 0vw 0vh 20vw",border: "solid 1px black", display: "flex", flexDirection: "row", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", zIndex: 100,}}>
            <FeatureCard title="Emergency Appointments" onClick={() => setShowEmergency(true)} />
            <div style={{minHeight: "10vh", width: "1px", backgroundColor: "black"}}></div>
            <FeatureCard title="Apply Leave" onClick={() => setShowLeave(true)} />
            <div style={{minHeight: "10vh", width: "1px", backgroundColor: "black"}}></div>
            <FeatureCard title="Leave Status" onClick={() => setShowLeaveStatus(true)} />
           </div>
        </div>
        <div style={{minHeight: "45vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center"}}>
           <h3 style={{color: "black", marginTop: "5vh", margin: "5rem 0 0rem 0" }}>About MediConnect</h3>
           <p style={{color: "black", textAlign: "center"}}>MediConnect is a web-based patient portal designed to streamline healthcare access and management. <br/>It enables secure login for both patients and doctors through role-based authentication. <br/>Users can view appointments, medical reports, prescriptions, and personal profile details. <br/>The application features a modern dashboard interface with interactive feature cards.<br/>Built using React, it provides a scalable foundation for future backend and database integration.</p>
        </div>
      </div>

    

    {/*OPD POPUP*/}
    {showOPD && (
      <>
    {/* Blur Background */}
    <div
      onClick={() => setShowOPD(false)}
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
        minHeight: "20vh",
        backgroundColor: "white",
        margin: "38vh 37vw",
        padding: "2rem",
        borderRadius: "14px",
        zIndex: 201,
        boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
        color: "black"
      }}
    >
        <h3 style={{marginTop: "0rem", marginBottom: "1rem", textAlign: "center",}}>OPD Schedule</h3>
        <div style={{marginBottom: "10px"}}><b>Mr. asdfgh</b><br />OPD: 44A</div>
        <div style={{marginBottom: "10px"}}><b>Ms. zxcvb</b><br />OPD: 17C</div>

    </div>
    </>
    )}

    {/*IPD POPUP*/}
      {showIPD && (
        <>
      {/* Blur Background */}
      <div
        onClick={() => setShowIPD(false)}
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
          minHeight: "20vh",
          backgroundColor: "white",
          margin: "38vh 37vw",
          padding: "2rem",
          borderRadius: "14px",
          zIndex: 201,
          boxShadow: "0 15px 40px rgba(0,0,0,0.25)",

          color: "black",
        }}
      >
        <h3 style={{marginTop: "0rem", marginBottom: "1rem", textAlign: "center",}}>IPD Schedule</h3>
        <div style={{marginBottom: "10px"}}><b>Mr. ghjkl</b><br />IPD: 44A <br />Disease: Liver Disfunction</div>
        <div style={{marginBottom: "10px"}}><b>Mr. vbnm</b><br />IPD: 91N <br />Disease: Blood Infection</div>
      </div>
      </>
    )}

    {/* EMERGENCY APPOINTMENT POPUP */}
    {showEmergency && (
      <>
        {/* Blur Background */}
        <div
          onClick={() => setShowEmergency(false)}
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
          <h3 style={{ textAlign: "center"}}>🚑 Emergency Appointments</h3>
          <div style={{marginBottom: "10px"}}><b>Mr. QWERT</b><br />OT: 244D <br /> Car Accident</div>
          <div style={{marginBottom: "10px"}}><b>Mrs. asdfgh</b><br />ICU: 11F <br /> Cardiac Arrest</div>
          
        </div>
      </>
    )}

    {/* LEAVE APPLICATION POPUP */}
    {showLeave && (
      <>
        {/* Blur Background */}
        <div
          onClick={() => setShowLeave(false)}
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
            width: "20vw",
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
          <h3 style={{ textAlign: "center"}}>📄 Apply Leave</h3>
          <label htmlFor="mobile" style={{display: "block", color: "black", textAlign: "left", fontSize: "12px", margin: "0 0 2px 4px"}}>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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
          <label htmlFor="mobile" style={{display: "block", color: "black", textAlign: "left", fontSize: "12px", margin: "0 0 2px 4px"}}>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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
              if(startDate >= endDate){
                alert("Enter correct Details.");
                return;
              }
              const newLeave = {
                id: Date.now(),
                startDate,
                endDate,
              };

              setLeave((prev) => [...prev, newLeave]);

              alert("Request Raised, approval pending.");
              setStartDate("");
              setEndDate("");
            }}
            style={{
              marginTop: "2vh",
              width: "40%",
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

    {/* LEAVE STATUS POPUP */}
    {showLeaveStatus && (
      <>
        {/* Blur Background */}
        <div
          onClick={() => setShowLeaveStatus(false)}
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
            width: "20vw",
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
          <h3 style={{ textAlign: "center"}}>📄 Leave Status</h3>

          {leave.length === 0 ? (
            <p style={{ textAlign: "center" }}>No applied leaves.</p>
          ) : (
            leave.map((lea) => (
              <div
                key={lea.id}
                style={{
                  borderBottom: "1px solid #ddd",
                  marginBottom: "10px",
                  paddingBottom: "8px"
                }}
              >
                <div>
                  <p>{lea.startDate} to {lea.endDate}</p>
                  <p>Status: Pending</p>
                </div>

                <button
                  onClick={() => handleRemoveLeave(lea.id)}
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
            onClick={() => setShowLeaveStatus(false)}
            style={{ marginTop: "10px", marginLeft:"7vw", width: "30%", padding: "8px", backgroundColor: "#5395f8", color: "white", border: "none", borderRadius: "4px" }}
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