const express = require("express");
const {
  getAllMedicines,
  addMedicine,
  getMedicine,
  changeMedicineQuantity,
  removeMedicine,
} = require("../controllers/medicineController");
const medicineRouter = express.Router();
medicineRouter.get("/get/all", getAllMedicines);

medicineRouter.post("/search", getMedicine);

medicineRouter.post("/add", addMedicine);

medicineRouter.put("/change/quantity", changeMedicineQuantity);

medicineRouter.delete("/delete", removeMedicine);

module.exports = medicineRouter;
