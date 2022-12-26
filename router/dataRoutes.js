import express from 'express'
const router=express.Router();
import {addData,getData,deleteData,updateData,getDataById} from '../controller/dataController.js';

router.post("/", addData)
router.get('/',getData)
router.delete('/:id',deleteData)
router.put('/:id',updateData)
router.get('/:id',getDataById)
export default router;