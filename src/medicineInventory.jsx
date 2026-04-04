import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { users } from "./users";
import { useEffect } from "react";

function medicineInventory() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userPhone = localStorage.getItem("userPhone");
    if (!isLoggedIn || !userPhone) {
      navigate("/");
      return;
    }
  }, [navigate]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // show 8 rows per page
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Paracetamol 500mg", category: "Tablet", price: 25, stock: 150, manufacturer: "Cipla" },
    { id: 2, name: "Amoxicillin 250mg", category: "Capsule", price: 85, stock: 60, manufacturer: "Sun Pharma" },
    { id: 3, name: "Ibuprofen 400mg", category: "Tablet", price: 40, stock: 120, manufacturer: "Dr. Reddy's" },
    { id: 4, name: "Azithromycin 500mg", category: "Tablet", price: 110, stock: 45, manufacturer: "Lupin" },
    { id: 5, name: "Cetirizine 10mg", category: "Tablet", price: 18, stock: 200, manufacturer: "Cipla" },
    { id: 6, name: "Metformin 500mg", category: "Tablet", price: 55, stock: 90, manufacturer: "Sun Pharma" },
    { id: 7, name: "Insulin Injection", category: "Injection", price: 350, stock: 30, manufacturer: "Novo Nordisk" },
    { id: 8, name: "ORS Sachet", category: "Powder", price: 20, stock: 300, manufacturer: "Dabur" },
    { id: 9, name: "Cough Syrup (100ml)", category: "Syrup", price: 95, stock: 75, manufacturer: "Zydus" },
    { id: 10, name: "Vitamin D3 Capsules", category: "Capsule", price: 120, stock: 50, manufacturer: "Himalaya" },
    { id: 11, name: "Calcium Tablets", category: "Tablet", price: 65, stock: 110, manufacturer: "Abbott" },
    { id: 12, name: "Saline 500ml", category: "IV Fluid", price: 150, stock: 40, manufacturer: "Baxter" },
    { id: 13, name: "Pantoprazole 40mg", category: "Tablet", price: 75, stock: 95, manufacturer: "Sun Pharma" },
    { id: 14, name: "Diclofenac Gel", category: "Topical", price: 130, stock: 70, manufacturer: "Volini" },
    { id: 15, name: "Aspirin 75mg", category: "Tablet", price: 35, stock: 140, manufacturer: "Bayer" },
    { id: 16, name: "Montelukast 10mg", category: "Tablet", price: 95, stock: 80, manufacturer: "Cipla" },
    { id: 17, name: "Dolo 650mg", category: "Tablet", price: 30, stock: 210, manufacturer: "Micro Labs" },
    { id: 18, name: "Betadine Solution", category: "Antiseptic", price: 120, stock: 55, manufacturer: "Win Medicare" },
    { id: 19, name: "Omez Capsule", category: "Capsule", price: 60, stock: 100, manufacturer: "Dr. Reddy's" },
    { id: 20, name: "Zincovit Syrup", category: "Syrup", price: 150, stock: 65, manufacturer: "Apex Laboratories" },
    { id: 21, name: "Combiflam", category: "Tablet", price: 45, stock: 175, manufacturer: "Sanofi" },
    { id: 22, name: "Crocin Advance", category: "Tablet", price: 28, stock: 220, manufacturer: "GSK" },
    { id: 23, name: "Rantac 150mg", category: "Tablet", price: 50, stock: 85, manufacturer: "Lupin" },
    { id: 24, name: "Vicks Vaporub", category: "Topical", price: 80, stock: 90, manufacturer: "Procter & Gamble" },
    { id: 25, name: "Dextrose 5% (500ml)", category: "IV Fluid", price: 180, stock: 35, manufacturer: "Baxter" },
  ]);


  const totalPages = Math.ceil(medicines.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = medicines.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const [cart, setCart] = useState([]);// for storing the medicines added to the cart
  const handleCart = (medicine) => {
    if (medicine.stock > 0) {
      setCart((prevCart) => [...prevCart, medicine]);// add the selected medicine to the cart
      setMedicines((prevMedicines) =>
        prevMedicines.map((m) =>
          m.id === medicine.id ? { ...m, stock: m.stock - 1 } : m
        )
      );
    }
  }

  const handleResetCart = () => {
    // restore stock
    setMedicines((prevMedicines) => {
      let updatedMedicines = [...prevMedicines];
      cart.forEach((cartItem) => {
        updatedMedicines = updatedMedicines.map((m) =>
          m.id === cartItem.id ? { ...m, stock: m.stock + 1 } : m
        );
      });
      return updatedMedicines;
    });
    setCart([]);
  }
  const [showCart, setShowCart] = useState(false); //for cart popup

  return (
    <div style={{ width: "100vw", minHeight: "100vh", background: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)", fontFamily: "'Inter', 'Roboto', 'Segoe UI', sans-serif", padding: "0px", margin: "0px" }}>
      <div style={
        {
          width: "100vw",
          height: "10vh",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 5vw",
          boxSizing: "border-box"
        }}>
        <h2 style={{ color: "#881337", fontSize: "1.5rem", fontWeight: "800", margin: 0 }}>Medicine Inventory</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            style={{
              height: "6vh",
              padding: "0 1.5rem",
              borderRadius: "0.5rem",
              backgroundColor: "#e11d48",
              color: "white",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onClick={() => setShowCart(true)}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#be123c"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#e11d48"}
          >
            🛒 Cart ({cart.length})
          </button>

          <button
            style={{
              height: "6vh",
              padding: "0 1.5rem",
              borderRadius: "0.5rem",
              backgroundColor: "#f1f5f9",
              color: "#475569",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onClick={() => navigate("/dashboard")}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e2e8f0";
              e.currentTarget.style.color = "#0f172a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f1f5f9";
              e.currentTarget.style.color = "#475569";
            }}
          >Home
          </button>
        </div>
      </div>
      {showCart && (
        <>
          {/* Blur Background */}
          <div
            onClick={() => setShowCart(false)}
            style={{
              position: "fixed",
              inset: 0,
              backdropFilter: "blur(4px)",
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: 300
            }}
          />

          {/* Cart Modal */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "40vw",
              maxHeight: "60vh",
              overflowY: "auto",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              padding: "2rem",
              borderRadius: "16px",
              zIndex: 301,
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              color: "#0f172a",
            }}
          >
            <h3>🛒 Your Cart</h3>

            {cart.length === 0 ? (
              <p>No items added.</p>
            ) : (
              Object.values(cart.reduce((acc, item) => {
                if (acc[item.id]) {
                  acc[item.id].qty += 1;
                } else {
                  acc[item.id] = { ...item, qty: 1 };
                }
                return acc;
              }, {})).map((medicine) => (
                <div
                  key={medicine.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    paddingBottom: "5px",
                  }}
                >
                  <span>{medicine.name} (x{medicine.qty})</span>
                  <span>₹{medicine.price * medicine.qty}</span>
                </div>
              ))
            )}
            <hr />
            {/* TOTAL BILL */}
            <h4>
              Total: ₹
              {cart.reduce((sum, medicine) => sum + medicine.price, 0)}
            </h4>
            <button
              onClick={() => setShowCart(false)}
              style={{
                marginTop: "15px",
                padding: "8px 16px"
              }}
            >
              Close
            </button>
            <button
              disabled={cart.length === 0}
              onClick={handleResetCart}
              style={{
                marginTop: "15px",
                padding: "8px 16px",
                marginLeft: "10px"
              }}
            >
              Reset Cart
            </button>
            <button
              disabled={cart.length === 0}
              onClick={
                () => {
                  alert("Order Placed Successfully!, collect your medicines from the pharmacy counter in 24 hours and pay the bill amount there. Thank you for using MediConnect!");
                  setCart([]);
                  setShowCart(false);
                }
              }
              style={{
                marginTop: "15px",
                padding: "8px 16px",
                marginLeft: "19.5vw"
              }}
            >
              Place Order
            </button>
          </div>
        </>
      )}

      <div
        style={{
          width: "80vw",
          height: "8vh",
          borderBottom: "2px solid #e2e8f0",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          color: "#475569",
          fontSize: "0.875rem",
          display: "flex",
          flexDirection: "row",
          marginLeft: "10vw",
          marginTop: "2vh",
          textAlign: "center",
          alignItems: "center",
          fontWeight: "700",
          letterSpacing: "0.05em",
          borderRadius: "12px 12px 0 0"
        }}
      >
        <p style={{ width: "11.4vw" }}>S NO.</p>
        <p style={{ width: "11.4vw" }}>TITLE</p>
        <p style={{ width: "10.4vw" }}>PRICE</p>
        <p style={{ width: "11.4vw" }}>CATEGORY</p>
        <p style={{ width: "11.4vw" }}>STOCK</p>
        <p style={{ width: "11.4vw" }}>MANUFACTURER</p>
        <p style={{ width: "11.4vw" }}></p>
      </div>

      <div style={{
        minHeight: "50vh",
        width: "100vw",
      }}>
        {currentItems.map((medicine) => (
          <FeatureCard
            key={medicine.id}
            id={medicine.id}
            title={medicine.name}
            price={medicine.price}
            category={medicine.category}
            stock={medicine.stock}
            manufacturer={medicine.manufacturer}
            onClick={() => handleCart(medicine)}
          />
        ))}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          marginTop: "20px"
        }}>

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            style={{
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "0.5rem",
              backgroundColor: currentPage === 1 ? "#cbd5e1" : "white",
              color: currentPage === 1 ? "#94a3b8" : "#1e293b",
              fontWeight: "600",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}
          >
            Prev
          </button>

          <span style={{ fontWeight: "600", color: "#475569" }}>Page {currentPage} of {totalPages}</span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            style={{
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "0.5rem",
              backgroundColor: currentPage === totalPages ? "#cbd5e1" : "white",
              color: currentPage === totalPages ? "#94a3b8" : "#1e293b",
              fontWeight: "600",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}
          >
            Next
          </button>

        </div>
      </div>
    </div>
  );
}

function FeatureCard({ id, title, price, category, stock, manufacturer, onClick }) {  //onClick: add the medicine to the card and compute cost too
  return (
    <div
      style={{
        width: "80vw",
        minHeight: "8vh",
        borderBottom: "1px solid #e2e8f0",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        color: "#1e293b",
        fontSize: "1rem",
        display: "flex",
        flexDirection: "row",
        marginLeft: "10vw",
        textAlign: "center",
        alignItems: "center",
        transition: "backgroundColor 0.2s ease"
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "white"}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)"}
    >
      <p style={{ width: "11.4vw" }}>{id}</p>
      <p style={{ width: "11.4vw", fontWeight: "500" }}>{title}</p>
      <p style={{ width: "10.4vw", color: "#16a34a", fontWeight: "600" }}>₹{price}</p>
      <p style={{ width: "11.4vw" }}>{category}</p>
      <p style={{ width: "11.4vw" }}>{stock}</p>
      <p style={{ width: "11.4vw" }}>{manufacturer}</p>
      <div style={{ width: "11.4vw", display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => {
            if (stock > 0) {
              onClick();
            }
          }}
          disabled={stock === 0}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            backgroundColor: stock === 0 ? "#cbd5e1" : "#e11d48",
            color: "white",
            border: "none",
            fontWeight: "600",
            cursor: stock === 0 ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (stock > 0) e.currentTarget.style.backgroundColor = "#be123c";
          }}
          onMouseLeave={(e) => {
            if (stock > 0) e.currentTarget.style.backgroundColor = "#e11d48";
          }}
        >
          {stock === 0 ? "Out" : "Add"}
        </button>
      </div>
    </div>
  );
}

export default medicineInventory;
