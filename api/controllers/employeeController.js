import Employee from "../models/Employee.model.js";
const addEmployee = async (req, res) => {
    const{name,
        email,
        mobile,
        designation,
        gender,
        courses,
        image,}=req.body;
        
    try {
        
        const preparedObject={
            name,email,mobileNo:mobile,designation,gender,courses,imgUpload:image.filename
        
        }
        try{
            const exists=await Employee.findOne({email})
            if(exists){
                return res.status(400).send({message:"Email Already exist"})
            }
            else{
                const employee = await Employee.create(preparedObject);
                res.status(201).json({message:"Employee added successfully"});
            }
           
        }
        catch(e){
            res.send(400).send({message:"Email Already exist"})
        }

    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
}
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateEmployee = async (req, res) => {
    const{Id,name,
        email,
        mobile,
        designation,
        gender,
        courses,
        image,}=req.body;

    try {
        const preparedObject={
            name,email,mobileNo:mobile,designation,gender,courses,imgUpload:image.filename
        }
        const previousEmployee = await Employee.findById(Id);

        if (!previousEmployee) {
           return res.status(404).json({ message: 'Employee not found' });
        }
        if(previousEmployee.email!==email){
            const exists=await Employee.findOne({email})
            if(exists){
                return res.status(400).send({message:"Email Already exist"})
            }
        }
        const employee = await Employee.findByIdAndUpdate(Id, preparedObject);
        
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const checkEmail=async(req, res,next)=>{
    const {email}=req.body;

    const employee=await Employee.findOne({email})
    if(employee){
        res.status(400).
        send({message:"user already exist"});
        return;
    }
next();
}
const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    console.log(id);
  
    try {
      
      const employee = await Employee.findById(id);
        // console.log(employee);
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      await Employee.findByIdAndDelete(id);
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export { addEmployee, getEmployees, updateEmployee,checkEmail ,deleteEmployee};