const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle, searchArticles } = require('../controllers/articleController');

const router = express.Router();

router.get('/', getAllArticles);
router.get('/search', searchArticles);
router.get('/single/:id', getArticleById);


router.post('/', protect, authorize(['admin', 'employee']), createArticle);
router.put('/:id', protect, authorize(['admin', 'employee']), updateArticle);
router.delete('/:id', protect, authorize(['admin', 'employee']), deleteArticle);

module.exports = router;
