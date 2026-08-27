import express from 'express';
import cookieParser from "cookie-parser";
import * as helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { getProductReviews } from './controllers/get-reviews';
import { writeProductReview } from './controllers/add-review';

const app = express();

app.set('trust proxy', 1);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 150,
    standardHeaders: 'draft-8',
    legacyHeaders: true,
    ipv6Subnet: 60,
})

// Security middleware
app.use(limiter);
app.use(helmet.default({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
// Other middleware
app.use(cookieParser());
app.use(express.json());
// File middleware
app.use('/uploads', express.static('uploads'));

const allowedOrigins = [
  'https://nile-bridge.vercel.app',
  'http://localhost:5173'
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin) return callback(null, true);

    // Normalize origin by removing potential trailing slashes
    const normalizedOrigin = origin.replace(/\/$/, '');

    if (allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS globally before defined routes
app.use(cors(corsOptions));

app.get('/get', getProductReviews);
app.post('/write', writeProductReview);

export default app;
