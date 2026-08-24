import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});

async function testDatabase(){
    try{
        const connection = await db.getConnection();
        console.log('MYSQL connected');
        connection.release();
    }
    catch(err){
        console.log(err);
    }
}

testDatabase();

const PORT = process.env.PORT || 5000;

const deleteOldNotifications = async () => {

    try {

        await db.execute(`
            DELETE FROM notification
            WHERE is_read = 1
            AND created_at < NOW() - INTERVAL 30 DAY
        `);

        console.log('Old notifications deleted');

    }
    catch (error) {

        console.error(
            'Unable to delete old notifications:',
            error
        );

    }

};


app.post('/register/hotel', async(req, res)=>{
    try{
        const {organization_name, 
            owner, 
            email, 
            phone_number, 
            password, 
            address, 
            city} = req.body;

        const passHashed = await bcrypt.hash(password, 12);

        const sql = `INSERT INTO hotel (organization_name, 
        owner, 
        email, 
        phone_number, 
        password, 
        address, 
        city) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`

        const [result] = await db.execute(sql, [organization_name, 
            owner, email, 
            phone_number, 
            passHashed, 
            address, 
            city]);

        res.status(201).json({
            message: 'Hotel registered successfully',
            hotelID: result.insertId
        })
    }
    catch(error){
        console.error(error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                message: 'Email already registered'
            })
        }

        res.status(500).json({
            message: 'Registration failed'
        })
    }
});

app.post('/register/charity', async(req, res)=>{
    try{
        const {organization_name, 
            contact_person, 
            email, 
            phone_number, 
            password, 
            address, 
            city,
            people_served,
            type_charity} = req.body;

        const passHashed = await bcrypt.hash(password, 12);

        const sql = `INSERT INTO charity (organization_name, 
        contact_person, 
        email, 
        phone_number, 
        password, 
        address, 
        city,
        people_served,
        type_charity) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

        const [result] = await db.execute(sql, [organization_name, 
            contact_person, email, 
            phone_number, 
            passHashed, 
            address, 
            city,
            people_served,
            type_charity]);

        res.status(201).json({
            message: 'Charity registered successfully',
            charityId: result.insertId
        })
    }
    catch(error){
        console.error(error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                message: 'Email already registered'
            })
        }

        res.status(500).json({
            message: 'Registration failed'
        })
    }
});

app.post('/register/volunteer', async(req, res)=>{
    try{
        const {name,
            email, 
            phone_number, 
            password,
            city,
            availability} = req.body;

        const passHashed = await bcrypt.hash(password, 12);

        const sql = `INSERT INTO volunteer (name,
            email, 
            phone_number, 
            password,
            city,
            availability) 
            VALUES (?, ?, ?, ?, ?, ?)`

        const [result] = await db.execute(sql, [name,
        email, 
        phone_number, 
        passHashed,
        city,
        availability]);

        res.status(201).json({
            message: 'Volunteer registered successfully',
            volunteerId: result.insertId
        })
    }
    catch(error){
        console.error(error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                message: 'Email already registered'
            })
        }

        res.status(500).json({
            message: 'Registration failed'
        })
    }
});

app.post('/login', async(req, res)=>{
    try{
        const {phone, password, role} = req.body;

        let table;

        if(role === 'hotel'){
            table = 'hotel';
        }
        else if(role === 'charity'){
            table = 'charity';
        }
        else if(role === 'volunteer'){
            table = 'volunteer';
        }
        else{
            return res.status(400).json({
                message: 'Invalid role'
            });
        }

        const sql = `SELECT * FROM ${table} WHERE phone_number = ?`;

        const [rows] = await db.execute(sql, [phone]);

        if(rows.length === 0){
            return res.status(401).json({
                message: 'Invalid phone number or password'
            });
        }

        const user = rows[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!passwordMatch){
            return res.status(401).json({
                message: 'Invalid phone number or password'
            });
        }

        // Remove password before sending user data
        const { password: _, ...userData } = user;

        res.status(200).json({
            message: 'User logged in successfully',
            userId: user.id,
            role: role,
            user: userData
        });
    }
    catch(error){
        console.error(error);

        res.status(500).json({
            message: 'Login failed'
        });
    }
});

app.post('/food/add', async (req, res) => {

    try {

        const {
            hotel_id,
            food_name,
            quantity,
            description,
            pickup_location,
            available_until
        } = req.body;


        // 1. Add food
        const sql = `
            INSERT INTO food_donation
            (
                hotel_id,
                food_name,
                quantity,
                description,
                pickup_location,
                available_until
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;


        const [result] = await db.execute(
            sql,
            [
                hotel_id,
                food_name,
                quantity,
                description,
                pickup_location,
                available_until
            ]
        );


        const foodId = result.insertId;


        // 2. Get all charities
        const [charities] = await db.execute(
            `SELECT id FROM charity`
        );


        // 3. Create notification for every charity
        for (const charity of charities) {

            await db.execute(
                `
                INSERT INTO notification
                (
                    user_id,
                    user_role,
                    message,
                    type,
                    food_id,
                    is_read
                )
                VALUES (?, ?, ?, ?, ?, ?)
                `,
                [
                    charity.id,
                    'charity',
                    `New food donation "${food_name}" is available.`,
                    'NEW_FOOD',
                    foodId,
                    0
                ]
            );

        }


        // 4. Response
        res.status(201).json({

            message: 'Food added successfully',

            foodId: foodId

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: 'Unable to add food'

        });

    }

});

app.get('/food', async (req, res) => {

    try {

        const deleteSql = `
            DELETE FROM food_donation
            WHERE available_until < NOW()
        `;

        await db.execute(deleteSql);

        const sql = `
            SELECT
                fd.id,
                fd.hotel_id,
                fd.food_name,
                fd.quantity,
                fd.description,
                fd.pickup_location,
                fd.available_until,
                fd.charity_id,
                fd.volunteer_id,
                fd.status,
                fd.created_at,

                h.organization_name AS hotel_name,
                h.phone_number AS hotel_phone,

                c.organization_name AS charity_name,
                c.phone_number AS charity_phone,
                c.address AS charity_address

            FROM food_donation fd

            JOIN hotel h
                ON fd.hotel_id = h.id

            LEFT JOIN charity c
                ON fd.charity_id = c.id

            ORDER BY fd.created_at DESC
        `;

        const [rows] = await db.execute(sql);

        res.status(200).json(rows);

    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Unable to fetch food'
        });

    }

});

app.post('/food/request', async (req, res) => {

    try {

        const { food_id, charity_id } = req.body;


        // 1. Get food + hotel + charity information
        const [foodRows] = await db.execute(
            `
            SELECT
                fd.hotel_id,
                fd.food_name,
                h.organization_name AS hotel_name,
                c.organization_name AS charity_name
            FROM food_donation fd

            JOIN hotel h
                ON fd.hotel_id = h.id

            JOIN charity c
                ON c.id = ?

            WHERE fd.id = ?
            `,
            [charity_id, food_id]
        );


        if (foodRows.length === 0) {

            return res.status(404).json({
                message: 'Food not found'
            });

        }


        const food = foodRows[0];


        // 2. Request the food
        const sql = `
            UPDATE food_donation
            SET
                charity_id = ?,
                status = 'REQUESTED'
            WHERE id = ?
            AND status = 'AVAILABLE'
        `;


        const [result] = await db.execute(
            sql,
            [charity_id, food_id]
        );


        if (result.affectedRows === 0) {

            return res.status(400).json({
                message: 'Food is no longer available'
            });

        }


        // 3. Notify HOTEL
        await db.execute(
            `
            INSERT INTO notification
            (
                user_id,
                user_role,
                message,
                type,
                food_id,
                is_read
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                food.hotel_id,
                'hotel',
                `${food.charity_name} has requested your ${food.food_name}.`,
                'FOOD_REQUESTED',
                food_id,
                0
            ]
        );


        // 4. Get all volunteers
        const [volunteers] = await db.execute(
            `SELECT id FROM volunteer`
        );


        // 5. Notify ALL volunteers
        for (const volunteer of volunteers) {

            await db.execute(
                `
                INSERT INTO notification
                (
                    user_id,
                    user_role,
                    message,
                    type,
                    food_id,
                    is_read
                )
                VALUES (?, ?, ?, ?, ?, ?)
                `,
                [
                    volunteer.id,
                    'volunteer',
                    `${food.food_name} has been requested and is ready for pickup.`,
                    'PICKUP_AVAILABLE',
                    food_id,
                    0
                ]
            );

        }


        // 6. Send response
        res.status(200).json({

            message: 'Food requested successfully'

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: 'Unable to request food'

        });

    }

});

app.post('/food/pick-up', async (req, res) => {

    try {

        const { food_id, volunteer_id } = req.body;


        // 1. Get food information
        const [foodRows] = await db.execute(
            `
            SELECT
                fd.hotel_id,
                fd.charity_id,
                fd.food_name,
                h.organization_name AS hotel_name,
                c.organization_name AS charity_name
            FROM food_donation fd

            JOIN hotel h
                ON fd.hotel_id = h.id

            JOIN charity c
                ON fd.charity_id = c.id

            WHERE fd.id = ?
            `,
            [food_id]
        );


        if (foodRows.length === 0) {

            return res.status(404).json({
                message: 'Food not found'
            });

        }


        const food = foodRows[0];


        // 2. Update food
        const sql = `
            UPDATE food_donation
            SET
                volunteer_id = ?,
                status = 'PICKED_UP'
            WHERE id = ?
            AND status = 'REQUESTED'
        `;


        const [result] = await db.execute(
            sql,
            [volunteer_id, food_id]
        );


        if (result.affectedRows === 0) {

            return res.status(400).json({
                message: 'You can not pickup now'
            });

        }


        // 3. Notify HOTEL
        await db.execute(
            `
            INSERT INTO notification
            (
                user_id,
                user_role,
                message,
                type,
                food_id,
                is_read
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                food.hotel_id,
                'hotel',
                `A volunteer has been assigned to deliver ${food.food_name}.`,
                'VOLUNTEER_ASSIGNED',
                food_id,
                0
            ]
        );


        // 4. Notify CHARITY
        await db.execute(
            `
            INSERT INTO notification
            (
                user_id,
                user_role,
                message,
                type,
                food_id,
                is_read
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                food.charity_id,
                'charity',
                `A volunteer has been assigned to deliver ${food.food_name}.`,
                'VOLUNTEER_ASSIGNED',
                food_id,
                0
            ]
        );


        // 5. Response
        res.status(200).json({

            message: 'Food picked-up successfully'

        });

    }
    catch (error) {

        console.error(error);

        res.status(500).json({

            message: 'Unable to pickup food'

        });

    }

});

app.get('/notifications', async (req, res) => {

    try {

        const { user_id, role } = req.query;

        if (!user_id || !role) {
            return res.status(400).json({
                message: 'User ID and role are required'
            });
        }

        const sql = `
            SELECT
                id,
                user_id,
                user_role,
                message,
                type,
                food_id,
                is_read,
                created_at
            FROM notification
            WHERE user_id = ?
            AND user_role = ?
            ORDER BY created_at DESC
        `;

        const [rows] = await db.execute(
            sql,
            [user_id, role]
        );

        res.status(200).json(rows);

    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Unable to fetch notifications'
        });

    }

});

app.listen(PORT, ()=>{
    console.log(`Server connnected on port ${PORT}`);
})