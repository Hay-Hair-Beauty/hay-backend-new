const Article = require('../models/articleModel');

const createArticle = async (title, content, imagePath) => {
  return await Article.create(title, content, imagePath);
};

const getAllArticles = async () => {
  return await Article.findAll();
};

const getArticleById = async (id) => {
  return await Article.findById(id);
};

const updateArticle = async (id, title, content, imagePath) => {
  await Article.update(id, title, content, imagePath);
};

const deleteArticle = async (id) => {
  await Article.delete(id);
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
};
