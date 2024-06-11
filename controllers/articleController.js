const ArticleService = require('../services/articleService');
const { uploadToGCS } = require('../utils/gcsHelper');

const createArticle = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  let imagePath = null;

  if (req.file) {
    try {
      imagePath = await uploadToGCS(req.file);
    } catch (error) {
      console.error('Failed to upload image to GCS:', error);
      return res.status(500).json({ error: 'Failed to upload image to GCS' });
    }
  }

  try {
    const id = await ArticleService.createArticle(title, content, imagePath);
    console.log('Article created with ID:', id);
    res.status(201).json({ id, title, content, image: imagePath });
  } catch (error) {
    console.error('Failed to create article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const articles = await ArticleService.getAllArticles();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get articles' });
  }
};

const getArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticleService.getArticleById(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get article' });
  }
};

const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  let imagePath = null;

  if (req.file) {
    try {
      imagePath = await uploadToGCS(req.file);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to upload image to GCS' });
    }
  }

  try {
    await ArticleService.updateArticle(id, title, content, imagePath);
    res.json({ message: 'Article updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update article' });
  }
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    await ArticleService.deleteArticle(id);
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article' });
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
};
