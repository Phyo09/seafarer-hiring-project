const pool = require('../config/db');

exports.uploadDocument = async (req, res) => {
  const { type, firebase_uid } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const userResult = await pool.query('SELECT id FROM users WHERE firebase_uid = $1', [firebase_uid]);
    const user_id = userResult.rows[0]?.id;

    if (!user_id) return res.status(404).json({ error: 'User not found' });

    await pool.query(
      'INSERT INTO documents (user_id, type, file_path) VALUES ($1, $2, $3)',
      [user_id, type, file.path]
    );

    res.status(200).json({ message: 'Document uploaded' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
