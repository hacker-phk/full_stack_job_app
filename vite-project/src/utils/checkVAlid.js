function validatePhoneNumber(phone) {
    // Regular expression for a 10-digit phone number
    const phoneRegex = /^[0-9]{10}$/;
  
    // Test if the phone number matches the regular expression
    if (phoneRegex.test(phone)) {
      return true; // Valid phone number
    } else {
      return false; // Invalid phone number
    }
  }
  