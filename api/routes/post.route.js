const Router = require('express').Router
const postController = require('../controllers/post.controller')
const router = new Router()
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/all', postController.getAll)
router.get('/:id', postController.get)
router.post('/', authMiddleware.isBlogger, postController.create)
router.put('/:id', authMiddleware.isBlogger, postController.update)
router.delete('/:id', authMiddleware.isBlogger, postController.delete)

router.get('/group/all', postController.getAllGroups)
router.post('/group', authMiddleware.isBlogger, postController.createGroup)
router.delete('/group/:id', authMiddleware.isBlogger, postController.deleteGroup)

module.exports = router
