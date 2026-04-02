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

    // NO CART FUNCTIONALITY FOR DOCTOR, ONLY VIEWING THE MEDICINE INVENTORY

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
                        marginLeft: "60vw",
                        padding: "6px 12px"
                      }}
                      onClick={() => navigate("/doctorDashboard")}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.5)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0)"
                      }}
                        >Home
                    </button>
            </div>
            
            
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
              <p style={{width: "13.4vw"}}>S NO.</p>
              <p style={{width: "13vw"}}>TITLE</p>
              <p style={{width: "14vw"}}>PRICE</p>
              <p style={{width: "13vw"}}>CATEGORY</p>
              <p style={{width: "13vw"}}>STOCK</p>
              <p style={{width: "13vw"}}>MANUFACTURER</p>
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

function FeatureCard({ id, title, price, category, stock, manufacturer}) {  //no onclick for doctor
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
      
    </div>
  );
}

export default medicineInventory;
