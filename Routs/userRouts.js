import e from "express";
import user from "../Models/user.js";
const router = e.Router();
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, address, mobileNo } = req.body
        if (!username || !email || !password || !address || !mobileNo) {
            return res.status(404).json({ message: "All fields are required" });
        }
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exist" })
        }
        const newUser = new user({
            username,
            email,
            password,
            address,
            mobileNo,
        });

        await newUser.save();
        res.status(201).json({ message: "User register Successfully", user: newUser });
    } catch (e) {
        console.error("Error registering user:", e);
        res.status(500).json({ message: "Server error", e });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const login = await user.findOne({ email, password });
        if (login) {
            res.status(201).json({ message: "Login Successfully", user: login });
        } else {
            res.status(404).json({ message: "User Not found" })
        }

    } catch (e) {
        res.json({ message: "Error During Logging", e });
        console.log(e)
    }
});
router.get('/all-users', async (req, res) => {
    try {
        const allUser = await user.find({});
        if (!allUser) {
            res.status(400).json({ message: "No user Available" });
        } else {
            res.status(201).json({ message: "successfully fetch users ", allUser: allUser })
        }
    } catch (e) {
        res.status(500).json({ message: "error while fetching users: ", e })
        console.log(e);
    }
});
router.get('/user/:mobileNo', async (req, res) => {
    try {
        const mobileNo = req.params.mobileNo;
        const allUser = await user.find({ mobileNo: mobileNo });
        if (!allUser) {
            res.status(400).json({ message: "No user Available" });
        } else {
            res.status(201).json({ message: "successfully fetch users ", allUser: allUser })
        }
    } catch (e) {
        res.status(500).json({ message: "error while fetching users: ", e })
        console.log(e);
    }
});
router.post('/save/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { contactId } = req.body; 
        const userExist = await user.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
        const contactUser = await user.findById(contactId);
        if (!contactUser) {
            return res.status(404).json({ message: "Contact user not found" });
        }
        if (userExist.contacts.includes(contactId)) {
            return res.status(400).json({ message: "Contact already added" });
        }
        userExist.contacts.push(contactId);
        await userExist.save();
        res.status(200).json({ message: "Contact added successfully", user: userExist });
    } catch (e) {
        console.error("Error while saving user contact:", e);
        res.status(500).json({ message: "Error while saving user contact", error: e.message });
    }
});
export default router;