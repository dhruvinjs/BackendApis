import { Router } from "express";
import {addExpense, apiDetails, categoriesExp, getPastOneMonth, getPastThreeMonths, loginUser, regUser, removeExp, updateExp, viewAllCategories, weeklyExp } from "../controllers/user-controller.js";
import { verifyToken } from "../middleware/verify-middleware.js";



const routers=Router();
routers.get('/',apiDetails)
routers.post("/user/registerUser",regUser)

// routers.post('/loginUser',loginUser)
routers.route('/user/login').post(loginUser)
routers.post('/expense/addExp',verifyToken,addExpense)
routers.post('/expense/updExp',verifyToken,updateExp)
routers.delete('/expense/delExp',verifyToken,removeExp)
routers.get('/expense/weeklyExp',verifyToken,weeklyExp)
routers.get('/expense/monthlyExp',verifyToken,getPastOneMonth)
routers.get('/expense/threemonthlyExp',verifyToken,getPastThreeMonths)
routers.post('/expense/categoryExp',verifyToken,categoriesExp)
routers.get('/expense/allCategories',verifyToken,viewAllCategories)
export default routers


