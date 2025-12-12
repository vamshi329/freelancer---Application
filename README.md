# 🚀 ProLancer - Full-Stack Freelancing Platform

A comprehensive freelancing marketplace built with React.js frontend and Node.js backend, featuring real-time communication and complete project management capabilities.

![ProLancer](https://img.shields.io/badge/ProLancer-Freelancing%20Platform-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248)
![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-010101)

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🎯 For Freelancers
- **Browse Projects**: Filter available projects by skills and categories
- **Submit Proposals**: Create detailed proposals with custom budgets and timelines
- **Project Management**: Track current and completed projects
- **Profile Management**: Update skills, portfolio, and personal information
- **Real-time Updates**: Get instant notifications for project updates
- **Funds Management**: Track earnings and completed project payments

### 💼 For Clients
- **Post Projects**: Create new projects with detailed requirements and budgets
- **Review Applications**: Manage and evaluate freelancer proposals
- **Project Monitoring**: Track project progress and milestones
- **Payment Management**: Approve completed work and release payments
- **Communication**: Real-time chat with hired freelancers

### 👨‍💼 For Administrators
- **Dashboard Overview**: Monitor all platform activity and statistics
- **User Management**: View and manage all registered users
- **Project Oversight**: Track all projects and applications
- **Analytics**: Access platform performance metrics

## 🛠️ Technology Stack

### Frontend
- **React.js 18.2.0** - Modern UI framework
- **React Router** - Client-side routing
- **Socket.io-client** - Real-time communication
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library
- **CSS3** - Styling with responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Socket.io** - Real-time bidirectional communication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Database Schema
- **Users** - Authentication and role management
- **Freelancers** - Skills, portfolio, and project history
- **Projects** - Project details, requirements, and status
- **Applications** - Proposal and bidding system
- **Chats** - Real-time messaging system

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/ProLancer.git
cd ProLancer
```

### Step 2: Install Dependencies

#### Frontend Setup
```bash
cd client
npm install
```

#### Backend Setup
```bash
cd ../server
npm install
```

### Step 3: Environment Configuration

Create `.env` file in the server directory:
```env
PORT=6002
MONGODB_URI=mongodb://localhost:27017/Freelancing
JWT_SECRET=your_jwt_secret_here
```

### Step 4: Database Setup
1. Start MongoDB service
2. The application will automatically create the database and collections

### Step 5: Run the Application

#### Start Backend Server
```bash
cd server
npm start
```
Server will run on: `http://localhost:6002`

#### Start Frontend Application
```bash
cd client
npm start
```
Application will run on: `http://localhost:3000`

## 📱 Usage

### Getting Started
1. Open your browser and navigate to `http://localhost:3000`
2. Register as a new user (Freelancer, Client, or Admin)
3. Complete your profile setup
4. Start exploring the platform!

### For Freelancers
1. **Browse Projects**: Visit "All Projects" to find opportunities
2. **Submit Proposals**: Click on projects to submit detailed proposals
3. **Manage Applications**: Track your submitted applications
4. **Work on Projects**: Access assigned projects and submit work

### For Clients
1. **Post Projects**: Create new projects with requirements
2. **Review Applications**: Evaluate freelancer proposals
3. **Hire Freelancers**: Accept the best proposals
4. **Monitor Progress**: Track project development and approve submissions

### For Administrators
1. **Dashboard**: Monitor platform statistics
2. **User Management**: Oversee all registered users
3. **Project Oversight**: Track all projects and applications

## 📁 Project Structure

```
ProLancer/
├── client/                          # React Frontend
│   ├── public/                      # Static files
│   │   ├── components/              # Reusable components
│   │   ├── pages/                   # Page components
│   │   │   ├── admin/              # Admin pages
│   │   │   ├── client/             # Client pages
│   │   │   ├── freelancer/         # Freelancer pages
│   │   │   └── Landing.jsx         # Landing page
│   │   ├── context/                # React context
│   │   ├── styles/                 # CSS files
│   │   └── App.js                  # Main app component
│   └── package.json
├── server/                          # Node.js Backend
│   ├── index.js                    # Main server file
│   ├── Schema.js                   # MongoDB schemas
│   ├── SocketHandler.js            # Socket.io handlers
│   └── package.json
├── README.md
└── .gitignore
```

## 🔌 API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login

### Freelancer
- `GET /fetch-freelancer/:id` - Get freelancer profile
- `POST /update-freelancer` - Update freelancer profile

### Projects
- `GET /fetch-projects` - Get all projects
- `GET /fetch-project/:id` - Get specific project
- `POST /new-project` - Create new project

### Applications
- `POST /make-bid` - Submit project proposal
- `GET /fetch-applications` - Get all applications
- `GET /accept-application/:id` - Accept application
- `GET /reject-application/:id` - Reject application

### Project Management
- `POST /submit-project` - Submit completed project
- `GET /approve-submission/:id` - Approve project submission
- `GET /reject-submission/:id` - Reject project submission

## 🔧 Development

### Running in Development Mode
```bash
# Frontend (with hot reload)
cd client
npm start

# Backend (with nodemon for auto-restart)
cd server
npm run dev
```

### Building for Production
```bash
# Frontend build
cd client
npm run build

# Backend (production)
cd server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React.js community for the amazing framework
- MongoDB for the robust database solution
- Socket.io for real-time communication capabilities
- All contributors and users of this platform

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact: [your-email@example.com]

---

**Made with ❤️ for the freelancing community**
