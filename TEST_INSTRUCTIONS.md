# Where Next - Test Instructions

## Quick Test
1. Run: `docker-compose up -d`
2. Wait 30 seconds for startup
3. Test endpoints:
   - Backend: `curl http://localhost:4000/health`
   - Frontend: `curl -I http://localhost:3000`
   - PostgreSQL: `docker exec where_next-postgres-1 psql -U admin -d wherenext -c "SELECT 1;"`

## Access URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- PostgreSQL: port 5432

## Architecture
- PostgreSQL:15-alpine (database)
- Node.js Backend (REST API)
- React Frontend (nginx)
