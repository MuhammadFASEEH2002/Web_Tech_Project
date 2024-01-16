import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/pdfs')
    },
    filename: (req, file, cb) => { cb(null, req.body.filename) }
})

const uploadMiddleWare = multer({ storage})

export default uploadMiddleWare