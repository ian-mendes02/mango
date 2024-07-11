await pool.query(
        `CREATE TABLE menu_items (
            id SERIAL PRIMARY KEY,
            title VARCHAR(72) NOT NULL,
            price NUMERIC(5,2) NULL DEFAULT NULL,
            description TEXT NULL DEFAULT NULL,
            categories VARCHAR(28) NOT NULL,
            options TEXT NULL DEFAULT NULL,
            showinreduced BOOLEAN NOT NULL DEFAULT TRUE
        )`
    );