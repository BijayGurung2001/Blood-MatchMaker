const express= require('express');
const bodyparser= require('body-parser');
const cors= require('cors');
const bcrypt=require('bcrypt')
const db=require('../server/src/models/db')

const app=express();

app.use(cors())
app.use(bodyparser.json());


app.post('/signup', async (req, res) => {
    const { fullname, email, dob, bloodtype, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (fullname, email, dob, bloodtype, password) VALUES (?,?,?,?,?)';
    db.query(sql, [fullname, email, dob, bloodtype, hashpassword], (error, results) => {
        if (error) {
            console.error('Error inserting user:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results) {
            res.status(201).json({ message: 'User registered successfully' });
        }
    });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received email:', email);
  console.log('Received password:', password);
  
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (error, result) => {
    if (error) {
      console.error('Database query error:', error);
      return res.status(500).json({ message: 'Error in searching data' });
    }
    if (result.length === 0) {
      console.log('No user found with this email');
      return res.status(400).json({ error: 'No user found' });
    }

    const user = result[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isPasswordMatch);

    if (isPasswordMatch) {
      console.log("user found");
      res.status(200).json({
        message: 'Login successful',
        user: {
          id:user.id,
          fullname: user.fullname,
          email: user.email,
          dob: user.dob,
          bloodtype: user.bloodtype
        }
      });
    } else {
      console.log('Incorrect password');
      res.status(400).json({ error: 'Incorrect password' });
    }
  });
});

  
  app.get('/history', (req, res) => {
    const email = req.query.email;
    const sql = 'SELECT * FROM history WHERE email = ?';
    db.query(sql, [email], (err, results) => {
      if (err) {
        return res.status(500).send('Error fetching history');
      }
      res.json(results);
    });
  });
  
  app.get('/bloodbanks', (req, res) => {
    const sql = 'SELECT * FROM bloodbanks ORDER BY RAND() LIMIT 10';
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).send('Error fetching blood banks');
      }
      res.json(results);
    });
  });
  
  app.get('/search', (req, res) => {
    const term = req.query.term;
    const sql = 'SELECT * FROM bloodbanks WHERE name LIKE ? OR address LIKE ?';
    db.query(sql, [`%${term}%`, `%${term}%`], (err, results) => {
      if (err) {
        return res.status(500).send('Error searching');
      }
      res.json(results);
    });
  });
    

  // Update user location endpoint
  app.post('/update-location', (req, res) => {
    const { userId, latitude, longitude } = req.body;
  
  
    const sql = 'UPDATE users SET latitude = ?, longitude = ? WHERE id = ?';
    db.query(sql, [latitude, longitude, userId], (error, result) => {
      if (error) {
        console.error('Error updating location:', error);
        return res.status(500).json({ message: 'Error updating location' });
      }
      res.status(200).json({ message: 'Location updated successfully' });
    });
  });
  app.post('/search', (req, res) => {
    const { bloodType, quantity } = req.body;
    console.log('Blood Type:', bloodType);
    console.log('Quantity:', quantity);
  
    // Ensure bloodType is a valid column name and properly escaped
    const validBloodTypes = [
      'o+plasma', 'o+redcell', 'o-plasma', 'o-redcell',
      'a+plasma', 'a+redcell', 'a-plasma', 'a-redcell',
      'b+plasma', 'b+redcell', 'b-plasma', 'b-redcell',
      'ab+plasma', 'ab+redcell', 'ab-plasma', 'ab-redcell'
    ];
  
    if (!validBloodTypes.includes(bloodType)) {
      return res.status(400).send('Invalid blood type');
    }
  
    const sql = `
      SELECT 
        orgdetails.orgname, 
        orgdetails.orgaddress, 
        orgdetails.orgcontact, 
        orgdetails.orgemail, 
        orgdetails.latitude, 
        orgdetails.longitude,
        \`bloodstorage\`.\`${bloodType}\` AS availableQuantity
      FROM orgdetails 
      INNER JOIN bloodstorage 
      ON orgdetails.org_id = bloodstorage.org_id 
      WHERE \`bloodstorage\`.\`${bloodType}\` >= ?`;
  
    db.query(sql, [quantity], (err, results) => {
      if (err) {
        console.error('Error searching:', err);
        return res.status(500).send('Error searching');
      }
      res.json(results);
    });
  });
  
  
  

  app.post('/orgsignup', async (req, res) => {
    const orgdetails = req.body;
    console.log({ orgdetails });
    try {
        const hashpassword = await bcrypt.hash(orgdetails.orgpassword, 10);
        console.log(orgdetails)
        const sqlquery = 'INSERT INTO orgdetails (orgname, orgaddress, orgcontact, orgemail, orgpassword) VALUES (?,?,?,?,?)'
        db.query(sqlquery, [orgdetails.orgname, orgdetails.orgaddress, orgdetails.orgcontact, orgdetails.orgemail, hashpassword], (error, result) => {
            if (error) {
                res.status(400).json({ message: 'Problem in inserting org details in database' });
                return;
            }
            console.log('success org data input');
            res.status(200).json({ message: 'Successfully inserted into database' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/orglogin', async (req, res) => {
  const { email, password } = req.body;
console.log(email)
  const sqlquery = 'SELECT * FROM orgdetails WHERE orgemail = ?';

  db.query(sqlquery, [email], (error, result) => {
    if (error) {
      console.log('error in searching data in orglogin');
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (result.length === 0) {
      console.log("no user found in org database");
      return res.status(401).json({ message: "no user found" });
    } else {
      const user = result[0];
      bcrypt.compare(password, user.orgpassword, (err, passwordMatch) => {
        if (err) {
          console.log('error in comparing passwords');
          return res.status(500).json({ message: 'Internal server error' });
        }
        if (passwordMatch) {
          console.log("password match");
          return res.status(200).json({ user });
        }
        console.log("password incorrect");
        return res.status(401).json({ message: "password incorrect" });
      });
    }
  });
});

app.post('/orgprofile', async (req, res) => {
  const { id } = req.body;
  const sqlquery = 'SELECT * FROM orgdetails WHERE org_id = ?';
  db.query(sqlquery, [id], (error, result) => {
    if (error) {
      console.error('Error fetching org profile:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.status(200).json({ org: result[0] });
  });
});
app.post('/orginventory', async (req, res) => {
  const { id } = req.body;
  console.log(id)
  const sqlquery = 'SELECT * FROM bloodstorage WHERE org_id = ?';
  db.query(sqlquery, [id], (error, result) => {
    if (error) {
      console.error('Error fetching blood storage data:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'No blood storage data found' });
    }
    res.status(200).json(result);
    console.log(result);
  });
});




app.post('/updateinventory', async (req, res) => {
  const { id, bloodData } = req.body;
  const sqlquery = `
    UPDATE bloodstorage 
    SET 
      \`o+plasma\` = ?, \`o+redcell\` = ?, \`o-plasma\` = ?, \`o-redcell\` = ?, 
      \`a+plasma\` = ?, \`a+redcell\` = ?, \`a-plasma\` = ?, \`a-redcell\` = ?, 
      \`b+plasma\` = ?, \`b+redcell\` = ?, \`b-plasma\` = ?, \`b-redcell\` = ?, 
      \`ab+plasma\` = ?, \`ab+redcell\` = ?, \`ab-plasma\` = ?, \`ab-redcell\` = ? 
    WHERE org_id = ?`;
  const values = [
    bloodData['o+plasma'], bloodData['o+redcell'], bloodData['o-plasma'], bloodData['o-redcell'],
    bloodData['a+plasma'], bloodData['a+redcell'], bloodData['a-plasma'], bloodData['a-redcell'],
    bloodData['b+plasma'], bloodData['b+redcell'], bloodData['b-plasma'], bloodData['b-redcell'],
    bloodData['ab+plasma'], bloodData['ab+redcell'], bloodData['ab-plasma'], bloodData['ab-redcell'],
    id
  ];
  db.query(sqlquery, values, (error, result) => {
    if (error) {
      console.error('Error updating blood storage data:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json({ message: 'Inventory updated successfully' });
  });
});


app.listen(5000, (err)=>{
if(err){
    console.log(err)
}else{
    console.log('server is running at 5000')
}
})