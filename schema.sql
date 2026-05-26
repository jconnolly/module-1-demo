CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255),
    email_address VARCHAR(255) UNIQUE,
    account_status VARCHAR(50) DEFAULT 'pending',
    internal_clearance_level INT DEFAULT 1 
);