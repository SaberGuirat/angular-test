const router = require("express").Router();
const userCtrl = require("../controllers/user.controller");

// add user Route
router.post("/add", userCtrl.addUser);

// get all users Route
router.get("/all", userCtrl.getAllUsers);

// get single user by id
router.get("/:id", userCtrl.getUserInfo);

// update user route
router.put("/:id", userCtrl.updateUser);

//delete user Route
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
