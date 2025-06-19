const pool = require('../config/db');

exports.saveProfile = async (req, res) => {
  const { firebase_uid, email, full_name, nationality, experience } = req.body;
  console.log('Received profile:', req.body); // ✅ Add this line

  try {
      // Ensure user exists or create
    let user = await pool.query('SELECT * FROM users WHERE firebase_uid = $1', [firebase_uid]);

    if (user.rowCount === 0) {
      await pool.query('INSERT INTO users (firebase_uid, email) VALUES ($1, $2)', [firebase_uid, email]);
    }

    const userIdResult = await pool.query('SELECT id FROM users WHERE firebase_uid = $1', [firebase_uid]);
    const user_id = userIdResult.rows[0].id;
    
    if (!user_id) return res.status(404).json({ error: 'User not found after creation' });

    // Upsert profile
    const existing = await pool.query('SELECT * FROM profiles WHERE user_id = $1', [user_id]);

    if (existing.rowCount === 0) {
      await pool.query(
        'INSERT INTO profiles (user_id, full_name, nationality, experience) VALUES ($1, $2, $3, $4)',
        [user_id, full_name, nationality, experience]
      );
    } else {
      await pool.query(
        'UPDATE profiles SET full_name = $1, nationality = $2, experience = $3 WHERE user_id = $4',
        [full_name, nationality, experience, user_id]
      );
    }

    res.status(200).json({ message: 'Profile saved' });
  } catch (err) {
      console.error('Error saving profile:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  const { firebase_uid } = req.params;

  try {
    const userResult = await pool.query('SELECT id FROM users WHERE firebase_uid = $1', [firebase_uid]);

    if (userResult.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user_id = userResult.rows[0].id;

    const profileResult = await pool.query('SELECT * FROM profiles WHERE user_id = $1', [user_id]);

    if (profileResult.rowCount === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(profileResult.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

