const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
var instance = null;

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hm_db",
    port: "3306"
});

conn.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to database');
    }
});

class dbConn {
    static dbConnInstance() {
        return instance ? instance : new dbConn();
    }

    async getProductsCategory() {
        try {
            const query = "SELECT product_id, name, category, picture, stock, price, discount FROM products;";
            const results = await this.executeQuery(query);
            return results;
        } catch (error) {
            console.error('Error fetching data by category:', error.message);
            throw error;
        }
    }

    async getProductType(type) {
        try {
            const query = "SELECT id, name, image, category, old_price, current_price FROM products WHERE type = ? AND avaliable = 1;";
            const results = await this.executeQuery(query, [type]);
            return results;
        } catch (error) {
            console.error('Error fetching data by type:', error.message);
            throw error;
        }
    }

    async getProduct(id) {
        try {
            const query = "SELECT name, image, old_price, current_price FROM products WHERE id = ? AND avaliable = 1;";
            const results = await this.executeQuery(query, [id]);
            return results;
        } catch (error) {
            console.error('Error fetching product:', error.message);
            throw error;
        }
    }

    executeQuery(query, params = []) {
        return new Promise((resolve, reject) => {
            conn.query(query, params, (err, results) => {
                if (err) {
                    reject(new Error(err.message));
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = dbConn;
