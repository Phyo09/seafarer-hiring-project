CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firebase_uid TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL
);

CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  full_name TEXT,
  nationality TEXT,
  experience TEXT
);
ALTER TABLE profiles
ADD COLUMN dob DATE,
ADD COLUMN pob TEXT,
ADD COLUMN form_type TEXT,
ADD COLUMN rank TEXT,
ADD COLUMN phone TEXT,
ADD COLUMN address TEXT,
ADD COLUMN passport_no TEXT,
ADD COLUMN passport_issue DATE,
ADD COLUMN passport_expiry DATE,
ADD COLUMN seaman_book_no TEXT,
ADD COLUMN sid_no TEXT,
ADD COLUMN us_visa_type TEXT,
ADD COLUMN height TEXT,
ADD COLUMN weight TEXT,
ADD COLUMN shoe_size TEXT,
ADD COLUMN education TEXT,
ADD COLUMN license TEXT,
ADD COLUMN license_issue DATE,
ADD COLUMN license_expiry DATE,
ADD COLUMN next_of_kin TEXT,
ADD COLUMN family TEXT,
ADD COLUMN company TEXT;


CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  type TEXT CHECK (type IN ('passport', 'certificate')),
  name TEXT,
  file_path TEXT,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
