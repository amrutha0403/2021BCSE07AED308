// API endpoint for registration
const url = "http://20.244.56.144/test/auth";

// Data to be sent for registration
const data = {
    companyName:"Alliance University",
    clientID: '6b878938-828c-474e-b232-0c68bbfb51b8', 
    clientSecret: 'luRNudOUenXDtFDE',
    ownerName:"KOLA AMRUTHA HARSHINI",
    ownerEmail: "akolabtech21@ced.alliance.edu.in",
    rollNo:"2021BCSE07AED308",
  
};

// Making the POST request
fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
.then(response => {
  if (response.ok) {
    return response.json();
  } else {
    return response.text().then(text => {
      throw new Error(`${response.status}: ${text}`);
    });
  }
})
.then(result => {
  console.log("Registration successful!", result.token_type);
})
.catch(error => {
  console.error("Failed to register:", error.message);
});
