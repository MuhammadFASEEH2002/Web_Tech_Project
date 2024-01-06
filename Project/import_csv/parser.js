import fs  from 'fs'
import XLSX from 'xlsx';

const workbook = XLSX.readFile('Data.xlsx');
const sheetName = workbook.SheetNames[0]; 

const worksheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

console.log(jsonData);

let outJson = [];
let temp = null;
for (let i = 0; i < jsonData.length; i++) {
    const row = jsonData[i];
    if(row.length == 1){
      temp = getSemesterInfo(row[0])
    }else{
       if(row[0] !== 'S.#'){
         const obj = { ...temp };
         
          obj.teacher =  row[2];

          let course = getCourseInfo(row[1]);

          obj.crhr = course.creditHours
          obj.code = course.coursecode
          obj.course = course.coursename

          outJson.push(obj)

       }
    }
    
}

fs.writeFileSync('out.json',JSON.stringify(outJson) , 'utf-8')

function getSemesterInfo(val = ""){
    const temp = val.split("-");
    const semester = Number(temp?.[0]?.replaceAll('BSCS','')?.trim());
    const section = temp?.[1]?.replaceAll('Section','')?.trim();
    return { 
        semester,
        section
    }
}
function getCourseInfo(val = ""){
    const temps = val.split(" ");
    const coursecode = temps[0];
    const creditHours = temps[temps.length - 2]+ temps[temps.length - 1]


    temps.pop()
    temps.pop()
    temps.shift()

    const coursename = temps.join(" ");

    return {
        coursecode,
        creditHours,
        coursename
    }
}