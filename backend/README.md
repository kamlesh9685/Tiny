TinyLink backend (Express + MongoDB)
- Set MONGODB_URI in .env or use default local MongoDB.
- Run: npm install && npm run dev (requires nodemon) or npm start
- Exposes API endpoints required by the spec:
  POST /api/links
  GET /api/links
  GET /api/links/:code
  DELETE /api/links/:code
  GET /:code (redirect)
  GET /healthz
