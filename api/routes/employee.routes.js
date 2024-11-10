import express from "express";
import { addEmployee, getEmployees, updateEmployee,checkEmail ,deleteEmployee} from "../controllers/employeeController.js";


const router = express.Router();

router.get("/", getEmployees);  
router.post("/",addEmployee);  
router.post("/edit", updateEmployee);  
router.delete("/delete/:id", deleteEmployee);  
router.post("/checkemail",checkEmail);
  

export default router;