const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

router.get('/data', recommendationController.getRecommendations);
router.get('/hair-issues/:hairIssue', recommendationController.getRecommendationByHairIssue);
router.get('/random-hair-issues/:hairIssue', recommendationController.getRandomRecommendationByHairIssue);


module.exports = router;