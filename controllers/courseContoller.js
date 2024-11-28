import fs from "fs"


const db = "./models/db.json"


const read = () =>{
    const rawData = fs.readFileSync(db);
    const data = JSON.parse(rawData);
    return data.courses
}

const write = (courses) => {
    const data = {courses}
    fs.writeFileSync(db,JSON.stringify(data,null,2))
}


const getCourses = (req,res) =>{
    let courses = read()

    res.status(200).json(courses)
}

const getCoursesById = (req,res) => {
    const id = parseInt(req.params.id)

    let courses = read();
    const course = courses.find(course => course.id == id);

    if(!course){
        return res.status(404).json({error:"Invalid ID"})
    }

    res.status(200).json({course})
}

const updateCourse = (req,res) =>{
    const id = Number(req.params.id);
    const {title, level} = req.body

    const courses = read();
    const course = courses.find(course => course.id == id)

    if(!course){
        return res.status(404).json({error:"course not found"})
    }
    
    course.title = title;
    course.level = level

    write(courses)

    res.status(200).send(course)

}

const filterCourse = (req,res) => {
    let courses = read();

    if(req.query.level){
        courses = courses.filter(course => String(course.level) == req.query.level)
    }
    
    res.status(200).json({courses})


}

const PaginatedCourse = (req,res) => {

    let courses = read();

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;
    const start = (page-1)*limit;
    const end = start+limit

    courses = courses.slice(start,end)

    res.status(200).json({courses})

}



export {read,getCourses, getCoursesById, updateCourse, filterCourse, PaginatedCourse}