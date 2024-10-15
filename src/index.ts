// index.ts
import createServer from './server';
import sequelize from './util/db';

const PORT = 8080;

const app = createServer();

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');

    sequelize
      .sync({ force: false })
      .then(() => {
        console.log(
          "User table has been created (if it didn't already exist)."
        );
        app.listen(PORT, () => {
          console.log('Server running on port', PORT);
        });
      })
      .catch((err) => {
        console.error('Error creating the table:', err);
      });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.get('/', (req, res) => {
  res.send(`Serving on port ${PORT}`);
});
