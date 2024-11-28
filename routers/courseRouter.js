import express from "express"
import { filterCourse, getCourses , getCoursesById, PaginatedCourse, updateCourse} from "../controllers/courseController.js";
import { authorized } from "../middlewares/authmiddleware.js";

const router = express.Router();


router.get("/getcourses",getCourses)
router.get("/getcourses/:id", getCoursesById)
router.put("/update/:id",authorized,updateCourse)
router.get("/courses?", filterCourse)
router.get("/page?",PaginatedCourse)


export {router}