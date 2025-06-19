const express = require('express');
const router = express.Router();
const pool = require('../db'); // Make sure your db is set up correctly

router.post('/submit', async (req, res) => {
  try {
    const {
      firebase_uid, // Make sure to send this from frontend or lookup by email
      fullName,
      nationality,
      dob,
      pob,
      email,
      phone,
      address,
      rank,
      passportNo,
      passportIssue,
      passportExpiry,
      seamanBookNo,
      sidNo,
      usVisaType,
      height,
      weight,
      shoeSize,
      education,
      license,
      licenseIssue,
      licenseExpiry,
      nextOfKin,
      family
    } = req.body;

    // 1. Get user_id from firebase_uid
    const userResult = await pool.query(
      'SELECT id FROM users WHERE firebase_uid = $1',
      [firebase_uid]
    );

    let userId;

    if (userResult.rows.length === 0) {
      const insertUser = await pool.query(
        'INSERT INTO users (firebase_uid, email) VALUES ($1, $2) RETURNING id',
        [firebase_uid, email]
      );
      userId = insertUser.rows[0].id;
    } else {
      userId = userResult.rows[0].id;
    }

    // 2. Upsert profile
    const existingProfile = await pool.query(
      'SELECT id FROM profiles WHERE user_id = $1',
      [userId]
    );

    if (existingProfile.rows.length > 0) {
      await pool.query(
        `UPDATE profiles SET
          full_name = $1,
          nationality = $2,
          dob = $3,
          pob = $4,
          phone = $5,
          address = $6,
          rank = $7,
          passport_no = $8,
          passport_issue = $9,
          passport_expiry = $10,
          seaman_book_no = $11,
          sid_no = $12,
          us_visa_type = $13,
          height = $14,
          weight = $15,
          shoe_size = $16,
          education = $17,
          license = $18,
          license_issue = $19,
          license_expiry = $20,
          next_of_kin = $21,
          family = $22
        WHERE user_id = $23`,
        [
          fullName, nationality, dob, pob, phone, address, rank,
          passportNo, passportIssue, passportExpiry,
          seamanBookNo, sidNo, usVisaType,
          height, weight, shoeSize, education, license,
          licenseIssue, licenseExpiry, nextOfKin, family,
          userId
        ]
      );
    } else {
      await pool.query(
        `INSERT INTO profiles (
          user_id, full_name, nationality, dob, pob, phone, address, rank,
          passport_no, passport_issue, passport_expiry,
          seaman_book_no, sid_no, us_visa_type,
          height, weight, shoe_size, education, license,
          license_issue, license_expiry, next_of_kin, family
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8,
          $9, $10, $11,
          $12, $13, $14,
          $15, $16, $17, $18, $19,
          $20, $21, $22, $23
        )`,
        [
          userId, fullName, nationality, dob, pob, phone, address, rank,
          passportNo, passportIssue, passportExpiry,
          seamanBookNo, sidNo, usVisaType,
          height, weight, shoeSize, education, license,
          licenseIssue, licenseExpiry, nextOfKin, family
        ]
      );
    }

    res.json({ message: 'Profile saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save profile' });
  }
});

module.exports = router;
