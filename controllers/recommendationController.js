const recommendationService = require('../services/recommendationService');

exports.getRecommendations = async (req, res) => {
  try {
    const recommendations = await recommendationService.getRecommendationData();
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
};


exports.getRecommendationByHairIssue = async (req, res) => {
  const { hairIssue } = req.params;
  try {
    const recomendations = await recommendationService.getRecommendationByHairIssue(hairIssue);
    res.json(recomendations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recommendation by hair issue' });
  }
};

exports.getRandomRecommendationByHairIssue = async (req, res) => {
  const { hairIssue } = req.params;
  try {
    const recommendations = await recommendationService.getRecommendationByHairIssue(hairIssue);
    if (recommendations.length === 0) {
      return res.status(404).json({ error: 'No recommendations found for the given hair issue' });
    }
    const randomRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
    res.json(randomRecommendation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch random recommendation by hair issue' });
  }
};