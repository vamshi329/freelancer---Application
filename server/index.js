import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { Application, Chat, Freelancer, Project, User } from './Schema.js';
import { Server } from 'socket.io';
import http from 'http';
import SocketHandler, { userSocketMap } from './SocketHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();




const allowedOrigins = [
  'http://localhost:3000',
  'https://freelancer-application-2xi6wd3k3-vamsis-projects-af515472.vercel.app?_vercel_share=tf7UyH3JDV4pJDymaXufmSPkhe07ddBm',
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight

app.use(express.json());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// ---------- DO NOT SERVE REACT FROM RENDER (Vercel handles frontend) ----------
// Remove any express.static + catch‑all for ../../clients/client/build
// so this backend is pure API only.

// If you ever run frontend + backend together locally you can wrap it:
// if (process.env.SERVE_CLIENT === 'true') { ...express.static & app.get('*')... }

const server = http.createServer(app);

// ---------- Socket.IO ----------
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected');
  SocketHandler(socket);
});

const PORT = process.env.PORT || 10000;

// ---------- MongoDB ----------
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/Freelancing';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // ---------- AUTH ----------
    app.post('/register', async (req, res) => {
      try {
        const { username, email, password, usertype } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
          username,
          email,
          password: passwordHash,
          usertype,
        });

        const user = await newUser.save();

        if (usertype === 'freelancer') {
          const newFreelancer = new Freelancer({
            userId: user._id,
          });
          await newFreelancer.save();
        }

        res.status(200).json(user);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.post('/login', async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User does not exist' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ msg: 'Invalid credentials' });

        res.status(200).json(user);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // ---------- Freelancer ----------
    app.get('/fetch-freelancer/:id', async (req, res) => {
      try {
        const id = req.params.id;
        let freelancer = await Freelancer.findOne({ userId: id });
        if (!freelancer) {
          try {
            freelancer = await Freelancer.findOne({
              userId: mongoose.Types.ObjectId(id),
            });
          } catch (e) {}
        }
        res.status(200).json(freelancer);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.post('/update-freelancer', async (req, res) => {
      const { freelancerId, updateSkills, description } = req.body;
      try {
        const freelancer = await Freelancer.findById(freelancerId);

        const skills = updateSkills.split(',');

        freelancer.skills = skills;
        freelancer.description = description;

        await freelancer.save();

        res.status(200).json(freelancer);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // ---------- Projects ----------
    app.get('/fetch-project/:id', async (req, res) => {
      try {
        const project = await Project.findById(req.params.id);
        res.status(200).json(project);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.get('/fetch-projects', async (req, res) => {
      try {
        const projects = await Project.find();
        res.status(200).json(projects);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.post('/new-project', async (req, res) => {
      const {
        title,
        description,
        budget,
        skills,
        clientId,
        clientName,
        clientEmail,
      } = req.body;
      try {
        const projectSkills = skills.split(',');
        const newProject = new Project({
          title,
          description,
          budget,
          skills: projectSkills,
          clientId,
          clientName,
          clientEmail,
          postedDate: new Date(),
        });
        await newProject.save();
        res.status(200).json({ message: 'Project added' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // ---------- Bids / Applications ----------
    app.post('/make-bid', async (req, res) => {
      const {
        clientId,
        freelancerId,
        projectId,
        proposal,
        bidAmount,
        estimatedTime,
      } = req.body;
      console.log('make-bid request:', req.body);

      try {
        const freelancer = await User.findById(freelancerId);
        const freelancerData = await Freelancer.findOne({
          $or: [
            { userId: freelancerId },
            {
              userId: mongoose.Types.ObjectId.isValid(freelancerId)
                ? new mongoose.Types.ObjectId(freelancerId)
                : null,
            },
          ],
        });
        const project = await Project.findById(projectId);
        const client = await User.findById(clientId);

        if (!freelancer)
          return res
            .status(400)
            .json({ error: 'Freelancer user not found' });
        if (!freelancerData)
          return res
            .status(400)
            .json({ error: 'Freelancer profile not found' });
        if (!project)
          return res.status(400).json({ error: 'Project not found' });
        if (!client)
          return res.status(400).json({ error: 'Client not found' });

        const newApplication = new Application({
          projectId,
          clientId,
          clientName: client.username,
          clientEmail: client.email,
          freelancerId,
          freelancerName: freelancer.username,
          freelancerEmail: freelancer.email,
          freelancerSkills: freelancerData.skills,
          title: project.title,
          description: project.description,
          budget: project.budget,
          requiredSkills: project.skills,
          proposal,
          bidAmount,
          estimatedTime,
        });

        await newApplication.save();
        res.status(200).json({ message: 'Bid placed' });
      } catch (err) {
        console.error('make-bid error:', err);
        res.status(500).json({ error: err.message });
      }
    });

    app.get('/fetch-applications', async (req, res) => {
      try {
        const applications = await Application.find();
        res.status(200).json(applications);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.get('/approve-application/:id', async (req, res) => {
      try {
        const application = await Application.findById(req.params.id);
        const project = await Project.findById(application.projectId);
        const freelancer = await Freelancer.findOne({
          userId: application.freelancerId,
        });
        const user = await User.findById(application.freelancerId);

        application.status = 'Accepted';
        await application.save();

        const remainingApplications = await Application.find({
          projectId: application.projectId,
          status: 'Pending',
        });

        remainingApplications.map(async (appli) => {
          appli.status = 'Rejected';
          await appli.save();
        });

        project.freelancerId = freelancer.userId;
        project.freelancerName = user.email;
        project.budget = application.bidAmount;
        project.status = 'Assigned';

        freelancer.currentProjects.push(project._id);

        await project.save();
        await freelancer.save();

        const freelancerSocketId = userSocketMap[freelancer.userId];
        if (freelancerSocketId && io) {
          io.to(freelancerSocketId).emit('bid-approved', {
            projectId: project._id,
          });
        }

        res.status(200).json({ message: 'Application approved!!' });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
      }
    });

    app.get('/reject-application/:id', async (req, res) => {
      try {
        const application = await Application.findById(req.params.id);
        application.status = 'Rejected';
        await application.save();
        res.status(200).json({ message: 'Application rejected!!' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // ---------- Submission ----------
    app.post('/submit-project', async (req, res) => {
      const {
        clientId,
        freelancerId,
        projectId,
        projectLink,
        manualLink,
        submissionDescription,
      } = req.body;
      try {
        const project = await Project.findById(projectId);

        project.projectLink = projectLink;
        project.manulaLink = manualLink;
        project.submissionDescription = submissionDescription;
        project.submission = true;

        await project.save();
        res.status(200).json({ message: 'Project added' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.get('/approve-submission/:id', async (req, res) => {
      try {
        const project = await Project.findById(req.params.id);
        const freelancer = await Freelancer.findOne({
          userId: project.freelancerId,
        });

        project.submissionAccepted = true;
        project.status = 'Completed';

        freelancer.currentProjects.pop(project._id);
        freelancer.completedProjects.push(project._id);
        freelancer.funds =
          parseInt(freelancer.funds) + parseInt(project.budget);

        await project.save();
        await freelancer.save();

        res.status(200).json({ message: 'submission approved' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.get('/reject-submission/:id', async (req, res) => {
      try {
        const project = await Project.findById(req.params.id);

        project.submission = false;
        project.projectLink = '';
        project.manulaLink = '';
        project.submissionDescription = '';

        await project.save();

        res.status(200).json({ message: 'submission approved' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // ---------- Misc ----------
    app.get('/fetch-users', async (req, res) => {
      try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.get('/fetch-chats/:id', async (req, res) => {
      try {
        const chats = await Chat.findById(req.params.id);
        console.log(chats);
        res.status(200).json(chats);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // ---------- Start server ----------
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((e) => console.log(`Error in db connection ${e}`));
