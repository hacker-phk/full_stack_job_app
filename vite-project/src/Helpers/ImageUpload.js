import axios from "axios";


const isValidImageType = (file) => {
    const validTypes = ['image/png', 'image/jpeg'];
    return file && validTypes.includes(file.type);
  };
const handleImageChange =async (e, setImage, setImageError) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      if (!isValidImageType(file)) {

        setImageError("Please upload a valid image file (PNG or JPG/JPEG only).");
        setImage(null); // Reset image state
      } else {
        setImageError("");
        const temp=new FormData();
        temp.append("photo", file);
        const response = await axios.post(
          "http://localhost:5000/upload",
          temp,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        console.log(response.data); // Clear any error
        setImage(response.data); // Update image state
      }
    }
  };
  export default handleImageChange;