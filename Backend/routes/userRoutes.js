const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  changeUserRole,
  like,
  dislike,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', protect, authorize(['admin']), getAllUsers);
router.delete('/:id', protect, authorize(['admin']), deleteUser);
router.put('/:id/role', protect, authorize(['admin']), changeUserRole);

router.get('/me', protect, getUserProfile);
router.put('/me', protect, updateUserProfile);

router.put('/like', protect, like);
router.put('/dislike', protect, dislike);

module.exports = router;