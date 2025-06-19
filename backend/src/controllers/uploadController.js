const pool = require('../config/db');

exports.uploadDocument = async (req, res) => {
  const { type, firebase_uid } = req.body;
  const file = req.file;
  const name = req.body.name || type;

  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const userResult = await pool.query('SELECT id FROM users WHERE firebase_uid = $1', [firebase_uid]);
    const user_id = userResult.rows[0]?.id;

    if (!user_id) return res.status(404).json({ error: 'User not found' });
    
    // Check if doc of same type exists
    const oldDoc = await pool.query(
      'SELECT * FROM documents WHERE user_id = $1 AND type = $2',
      [user_id, type]
    );
    
    if (oldDoc.rowCount > 0) {
      const oldFilePath = oldDoc.rows[0].file_path;
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath); // delete file
      await pool.query('DELETE FROM documents WHERE user_id = $1 AND type = $2', [user_id, type]); // delete db row
    }

    await pool.query(
      'INSERT INTO documents (user_id, type, name, file_path) VALUES ($1, $2, $3, $4)',
      [user_id, type, name, file.path]
    );    

    res.status(200).json({ message: 'Document uploaded' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDocuments = async (req, res) => {
  const { firebase_uid } = req.params;

  try {
    const userResult = await pool.query('SELECT id FROM users WHERE firebase_uid = $1', [firebase_uid]);

    if (userResult.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user_id = userResult.rows[0].id;

    const docs = await pool.query('SELECT type, file_path FROM documents WHERE user_id = $1', [user_id]);

    res.status(200).json(docs.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
const fs = require('fs');
const path = require('path');

exports.deleteDocument = async (req, res) => {
  const { firebase_uid, type } = req.params;

  try {
    const userResult = await pool.query('SELECT id FROM users WHERE firebase_uid = $1', [firebase_uid]);
    const user_id = userResult.rows[0]?.id;

    const docResult = await pool.query(
      'SELECT * FROM documents WHERE user_id = $1 AND type = $2',
      [user_id, type]
    );

    const filePath = docResult.rows[0]?.file_path;
    if (filePath) fs.unlinkSync(path.resolve(filePath));

    await pool.query('DELETE FROM documents WHERE user_id = $1 AND type = $2', [user_id, type]);

    res.status(200).json({ message: 'Document deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
