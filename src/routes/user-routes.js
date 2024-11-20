import { Router } from "express";
import {addExpense, categoriesExp, getPastOneMonth, getPastThreeMonths, loginUser, regUser, removeExp, updateExp, weeklyExp } from "../controllers/user-controller.js";
import { verifyToken } from "../middleware/verify-middleware.js";



const routers=Router();

routers.post("/registerUser",regUser)

// routers.post('/loginUser',loginUser)
routers.route('/logUser').post(loginUser)
routers.post('/addExp',verifyToken,addExpense)
routers.post('/updExp',verifyToken,updateExp)
routers.delete('/delExp',verifyToken,removeExp)
routers.get('/weeklyExp',verifyToken,weeklyExp)
routers.get('/monthlyExp',verifyToken,getPastOneMonth)
routers.get('/threemonthlyExp',verifyToken,getPastThreeMonths)
routers.post('/categoryExp',verifyToken,categoriesExp)

export default routers
