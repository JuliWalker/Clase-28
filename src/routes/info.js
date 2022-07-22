import { Router } from "express"; 

const router = Router();

const dirActual = process.cwd()
const IDprocess = process.pid
const versionNode = process.version
const procesTitle = process.title
const sistOper = process.platform
const memory = process.memoryUsage()

const obj = {"dirActual":dirActual, "IDprocess":IDprocess, "versionNode":versionNode, "procesTitle":procesTitle, "sistOper":sistOper, "memory":memory}

router.get('/', (req,res)=>{
    try {
        res.json(obj);
    } catch (error) {
        console.log(error)
    }    
});

export default router;