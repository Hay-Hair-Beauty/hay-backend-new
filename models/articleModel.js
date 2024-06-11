const { Firestore } = require('@google-cloud/firestore');
const firestore = require('../config/firestore');

const Article = {
  create: async (title, content, imagePath) => {
    try {
      const docRef = firestore.collection('articles').doc();
      const data = {
        title,
        content,
        image: imagePath,
        createdAt: Firestore.FieldValue.serverTimestamp(),
        updatedAt: Firestore.FieldValue.serverTimestamp(),
      };
      await docRef.set(data);
      console.log('Document successfully written with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error creating document in Firestore:', error);
      throw error;
    }
  },
  
  findAll: async () => {
    try {
      const snapshot = await firestore.collection('articles').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching documents from Firestore:', error);
      throw error;
    }
  },

  findById: async (id) => {
    try {
      const doc = await firestore.collection('articles').doc(id).get();
      if (!doc.exists) {
        console.log('No such document!');
        return null;
      }
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('Error fetching document from Firestore:', error);
      throw error;
    }
  },

  update: async (id, title, content, imagePath) => {
    try {
      const docRef = firestore.collection('articles').doc(id);
      const data = {
        title,
        content,
        image: imagePath,
        updatedAt: Firestore.FieldValue.serverTimestamp(),
      };
      await docRef.update(data);
      console.log('Document successfully updated');
    } catch (error) {
      console.error('Error updating document in Firestore:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const docRef = firestore.collection('articles').doc(id);
      await docRef.delete();
      console.log('Document successfully deleted');
    } catch (error) {
      console.error('Error deleting document from Firestore:', error);
      throw error;
    }
  }
};

module.exports = Article;
