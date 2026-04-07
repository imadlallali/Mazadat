# Mazadat - Frontend & Backend Integration Setup Guide

This guide will help you run the Mazadat application with both frontend and backend on localhost.

## Prerequisites

Before you start, ensure you have the following installed:
- **Java 17+** (for Spring Boot backend)
- **Node.js 18+** and npm (for React frontend)
- **MySQL 8.0+** (for database)
- **Git** (optional, for version control)

## Backend Setup (Spring Boot)

### 1. Database Setup
First, you need to create the MySQL database:

```bash
mysql -u root -p
```

Then execute:
```sql
CREATE DATABASE mazadat CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

If you have a password for MySQL root user, update the `application.properties` file:

**File:** `Mazadat/src/main/resources/application.properties`
```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### 2. Build the Backend

Navigate to the backend directory and build with Maven:

```bash
cd Mazadat
mvnw clean package -DskipTests
```

Or if you prefer to skip building and run directly:
```bash
cd Mazadat
mvnw spring-boot:run
```

The backend will start on **http://localhost:8080**

### 3. Verify Backend is Running

You should see logs indicating:
- Tomcat started on port 8080
- Database connection successful
- Spring Security configured

## Frontend Setup (React + Vite)

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Development Server

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on **http://localhost:5173** by default.

You can access it at: **http://localhost:5173**

### 3. Build for Production (Optional)

```bash
npm run build
```

## API Integration Details

### API Base URL
The frontend is configured to communicate with the backend at:
```
http://localhost:8080/api/v1
```

All API requests from the frontend will be automatically routed to this URL.

### CORS Configuration
The backend has been configured to accept requests from:
- `http://localhost:5173`
- `http://localhost:3000`
- `http://127.0.0.1:5173`
- `http://127.0.0.1:3000`

This allows the frontend to make cross-origin requests to the backend.

### Development Proxy
The Vite development server is configured with a proxy that forwards `/api` requests to the backend:
- Frontend requests to `/api/*` → Backend `http://localhost:8080/api/*`

## Running Both Services Together

### Option 1: Using Two Terminal Windows (Recommended)

**Terminal 1 - Backend:**
```bash
cd Mazadat
mvnw spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Using Terminal Tabs/Panes

Use Windows Terminal, PowerShell, or your IDE's terminal to open tabs/panes and run both commands above.

## Testing the Integration

### 1. Check Backend Health
Open browser and visit: `http://localhost:8080/api/v1/auction/get/all`

You should see a JSON response (may be empty if no auctions exist).

### 2. Check Frontend
Open browser and visit: `http://localhost:5173`

You should see the Mazadat application loaded.

### 3. Test API Call
1. Open browser DevTools (F12)
2. Go to the Network tab
3. Try logging in or creating an auction
4. You should see API requests going to `http://localhost:8080/api/v1/*`

## Troubleshooting

### Port Already in Use
If port 8080 (backend) or 5173 (frontend) is already in use:

**Backend:** Modify `application.properties`:
```properties
server.port=8081
```

**Frontend:** Set environment variable or modify vite.config.ts:
```bash
# Windows PowerShell
$env:VITE_PORT=5174; npm run dev
```

### Database Connection Error
- Verify MySQL is running: `mysql -u root -p -e "SELECT 1;"`
- Check database exists: `SHOW DATABASES;`
- Verify credentials in `application.properties`
- Make sure port 3306 is not blocked

### CORS Errors
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Check browser console for detailed error
- Verify backend CORS configuration in `WebConfig.java`

### Frontend Build Issues
- Delete `node_modules` and `package-lock.json`: `rm -r node_modules package-lock.json`
- Reinstall: `npm install`

### Backend Build Issues
- Clean build: `mvnw clean package`
- Check Java version: `java -version` (should be 17+)
- Check Maven: `mvnw -version`

## Project Structure

```
Mazadat/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service calls
│   │   ├── hooks/           # Custom React hooks
│   │   └── i18n/            # Internationalization
│   ├── vite.config.ts       # Vite configuration (includes proxy)
│   └── package.json
│
└── Mazadat/                 # Spring Boot backend
    ├── src/main/java/       # Java source code
    │   └── org/example/mazadat/
    │       ├── Controller/   # REST controllers
    │       ├── Service/      # Business logic
    │       ├── Repository/   # Data access layer
    │       ├── Model/        # Entity classes
    │       └── Config/       # Configuration (CORS, Security)
    ├── src/main/resources/
    │   └── application.properties  # Configuration
    └── pom.xml              # Maven dependencies
```

## API Endpoints

All endpoints are prefixed with `/api/v1/`

### Public Endpoints (No Authentication)
- `GET /auction/get/all` - Get all auctions
- `GET /bid/get/all` - Get all bids
- `GET /seller/get/all` - Get all sellers
- `GET /auctionhouse/get/all` - Get all auction houses
- `GET /receipt/get/all` - Get all receipts
- `POST /buyer/add` - Register as buyer
- `POST /seller/add` - Register as seller

### Authenticated Endpoints
- `POST /auction/add` - Create auction (seller)
- `POST /bid/add` - Place bid (buyer)
- `POST /receipt/generate/{id}` - Generate receipt (buyer)
- And more...

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Cannot find module" in frontend | Run `npm install` |
| Backend won't start | Check Java version, MySQL running, port available |
| CORS error in browser | Clear cache, hard refresh, check WebConfig.java |
| API calls return 401 Unauthorized | Check authentication token, verify user is logged in |
| Database connection failed | Verify MySQL running, credentials correct, database exists |

## Development Tips

1. **Hot Reload:** Both frontend and backend support hot reload
   - Frontend: Changes to React files auto-update in browser
   - Backend: Use IDE with Spring Boot run configuration or mvnw

2. **Logging:** Backend logs are printed to console - check for errors

3. **Network Tab:** Use browser DevTools Network tab to inspect API calls

4. **API Testing:** Use Postman or VS Code REST Client to test endpoints directly

## Next Steps

1. Start both services following "Running Both Services Together"
2. Test API integration following "Testing the Integration"
3. Create your first auction or bid
4. Check browser console and network tabs for any errors

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review backend logs in terminal for stack traces
3. Check browser console (F12) for frontend errors
4. Verify all prerequisites are installed correctly

---

**Last Updated:** April 2026
**Project:** Mazadat Auction Marketplace

