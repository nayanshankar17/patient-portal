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
    const medicines = [
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
    ];


    const totalPages = Math.ceil(medicines.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = medicines.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    const [cart, setCart] = useState([]);// for storing the medicines added to the cart
    const handleCart = (medicine) => {
      setCart((prevCart) => [...prevCart, medicine]);// add the selected medicine to the cart
    }
    const [showCart, setShowCart] = useState(false); //for cart popup

    return (
        <div style={{width: "100vw", height: "100vh", backgroundColor: "white", padding: "0px", margin: "0px"}}>
            <div style ={
                {width: "100vw", 
                height: "10vh", 
                backgroundColor: "#5395f8",
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
                }}>
                    <h2 style={{color: "black", marginLeft: "11vw"}}>Medicine Inventory</h2>
                    <button
                      style={{
                        height: "5vh",
                        marginLeft: "51.5vw",
                        padding: "6px 12px"
                      }}
                      onClick={() => setShowCart(true)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.5)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0)"
                      }}
                    >
                      🛒 Cart ({cart.length})
                    </button>

                    <button
                      style={{
                        height: "5vh",
                        marginLeft: "1.5vw",
                        padding: "6px 12px"
                      }}
                      onClick={() => navigate("/dashboard")}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.5)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0)"
                      }}
                        >Home
                    </button>
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
                    backgroundColor: "white",
                    padding: "2rem",
                    borderRadius: "12px",
                    zIndex: 301,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                    color: "black",
                  }}
                >
                  <h3>🛒 Your Cart</h3>

                  {cart.length === 0 ? (
                    <p>No items added.</p>
                  ) : (
                    cart.map((medicine) => (
                      <div
                        key={medicine.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                          paddingBottom: "5px",
                        }}
                      >
                        <span>{medicine.name}</span>
                        <span>₹{medicine.price}</span>
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
                    onClick={() => setCart([])}
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
              style={{width: "80vw",
                      height: "8vh",
                      borderBottom: "black 1px solid",
                      backgroundColor: "white",
                      color: "black",
                      fontSize: "18px",
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "10vw",
                      textAlign: "center",
                      alignItems: "center",
                      fontWeight: "bold"
              }}
            >
              <p style={{width: "11.4vw"}}>S NO.</p>
              <p style={{width: "11.4vw"}}>TITLE</p>
              <p style={{width: "10.4vw"}}>PRICE</p>
              <p style={{width: "11.4vw"}}>CATEGORY</p>
              <p style={{width: "11.4vw"}}>STOCK</p>
              <p style={{width: "11.4vw"}}>MANUFACTURER</p>
              <p style={{width: "11.4vw"}}></p>
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
                  gap: "10px",
                  marginTop: "20px"
                }}>
                  
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    style={{border: "none"}}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.5)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0)"
                    }}
                  >
                    Prev
                  </button>

                  <span>Page {currentPage} of {totalPages}</span>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    style={{border: "none"}}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.5)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0)"
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
      style={{width: "80vw",
              height: "8vh",
              borderBottom: "black 1px solid",
              backgroundColor: "white",
              color: "black",
              fontSize: "18px",
              display: "flex",
              flexDirection: "row",
              marginLeft: "10vw",
              textAlign: "center",
              alignItems: "center",
      }}
    >
      <p style={{width: "20vw"}}>{id}</p>
      <p style={{width: "20vw"}}>{title}</p>
      <p style={{width: "20vw"}}>{price}</p>
      <p style={{width: "20vw"}}>{category}</p>
      <p style={{width: "20vw"}}>{stock}</p>
      <p style={{width: "20vw"}}>{manufacturer}</p>
      <button
        onClick={() => {
          if(stock > 0) {
            onClick();
          }
        }}
        disabled={stock === 0}
        style={{
            paddingTop: "8px",
            marginLeft: "8vw",
            height:"5vh"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "0.9";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
      >
        Add
      </button>
    </div>
  );
}

export default medicineInventory;
