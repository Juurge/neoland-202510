MyHouseFinance
Introduction

A web application to manage household finances in a simple and visual way.
Users can register, log in and manage their personal income and expenses, inspired by a family finance Excel sheet but with a modern interface and secure authentication.

Functional description
Use cases
User
register
login
logout
persist session with JWT
create movements
update movements
delete movements
list personal movements
filter movements by month
view financial summary
view recent movements
UI/UX design
Figma

Application designed previously in Figma before implementation.

Technical description
Blocks
App (React)
API (Express)
DB (MongoDB)
Packages
api
routers
handlers
logic
middlewares
mongoose
app
views
components
logic
data
com
errors
validate
regex
Data Model
UserData
id (unique, string)
name (required, string)
email (required, unique, string)
password (required, hashed, string)
MovementData
id (unique, string)
user (UserData.id, string)
name (required, string)
amount (required, number)
date (required, date)
type (required, string, income | expense)
category (required, string)
frequency (required, string, one-time | fixed)
API Endpoints
Users
Register
POST /users
Authenticate
POST /users/auth
Movements
Retrieve user movements
GET /movements
Create movement
POST /movements
Update movement
PUT /movements/:movementId
Delete movement
DELETE /movements/:movementId
Authentication

Authentication is implemented using JWT.

Protected routes require:

Authorization: Bearer TOKEN

The backend validates the token using an auth middleware and automatically retrieves the authenticated user id.

Testing

Automated backend tests implemented with:

Mocha
Chai

Tested logic:

authenticateUser
registerUser
createMovement
retrieveMovements
updateMovement
deleteMovement

Run tests with:

npm test
Techs
Frontend
HTML
JavaScript
Tailwind
React
Vite
Backend
Node.js
Express
MongoDB
Mongoose
BCrypt
JWT
Testing
Mocha
Chai
Tools
Git
GitHub
Markdown
VSCode
Figma
Project structure
project/
├── app/
├── api/
├── com/
Running the project
Start MongoDB
mongod
Start API
node api/index.js
Start frontend
npm run dev
Current features
JWT authentication
Protected routes
Ownership validation
Password hashing
Persistent session
CRUD movements
Monthly history filter
Dashboard summary
Backend tests
Shared validation package
Error handling middleware
Tracking

TFG / Bootcamp final project.