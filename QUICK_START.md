# Mazadat - Quick Reference Guide

## ⚡ Quick Start (Choose One Method)

### Method 1: Batch File (Easiest for Windows)
```bash
run.bat
```
This opens both services in separate command windows.

### Method 2: PowerShell Script
```powershell
powershell -ExecutionPolicy Bypass -File run.ps1
```

### Method 3: Manual (Two Terminals)

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

---

## 🌐 Access URLs

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:5173 | 5173 |
| Backend API | http://localhost:8080 | 8080 |
| API Base | http://localhost:8080/api/v1 | 8080 |

---

## 🔧 Common Commands

### Frontend Commands
```bash
cd frontend

npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linter
```

### Backend Commands
```bash
cd Mazadat

mvnw clean           # Clean build artifacts
mvnw compile         # Compile code
mvnw test            # Run tests
mvnw package         # Package application
mvnw spring-boot:run # Run the application
```

---

## 🗄️ Database Setup

```bash
# Connect to MySQL
mysql -u root -p

# Create database
CREATE DATABASE mazadat CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Verify
SHOW DATABASES;
```

### Update Database Password (if needed)
Edit: `Mazadat/src/main/resources/application.properties`
```properties
spring.datasource.password=YOUR_PASSWORD
```

---

## 🐛 Troubleshooting

### Port Already in Use

**For Backend (8080):**
Edit: `Mazadat/src/main/resources/application.properties`
```properties
server.port=8081
```

**For Frontend (5173):**
```bash
cd frontend
npm run dev -- --port 5174
```

### Clear Dependencies

**Frontend:**
```bash
cd frontend
rm -r node_modules package-lock.json
npm install
npm run dev
```

**Backend:**
```bash
cd Mazadat
mvnw clean install
mvnw spring-boot:run
```

### Test Connectivity

```bash
# Test backend
curl http://localhost:8080/api/v1/auction/get/all

# Test frontend
curl http://localhost:5173
```

---

## 📊 Service Status

### Backend Signs of Life
- Console shows "Tomcat started on port 8080"
- No error messages about database connection
- Can visit: http://localhost:8080/api/v1/auction/get/all

### Frontend Signs of Life
- Console shows "VITE vX.X.X ready in XXX ms"
- Shows "ready on http://localhost:5173"
- Page loads without errors

---

## 🔐 Authentication Test

The frontend expects authentication in this format:
```javascript
// In browser storage
localStorage.user = {
  token: "your_auth_token",
  // other user data
}
```

API calls include:
```
Authorization: Basic {token}
```

---

## 📁 Key Configuration Files

| File | Purpose | Port |
|------|---------|------|
| `Mazadat/src/main/resources/application.properties` | Backend config | 8080 |
| `Mazadat/src/main/java/org/example/mazadat/Config/WebConfig.java` | CORS config | - |
| `frontend/vite.config.ts` | Frontend config & proxy | 5173 |
| `frontend/src/services/apiClient.js` | API base URL | - |

---

## 🔗 API Examples

### Get All Auctions (Public)
```bash
curl http://localhost:8080/api/v1/auction/get/all
```

### Register as Buyer (Public)
```bash
curl -X POST http://localhost:8080/api/v1/buyer/add \
  -H "Content-Type: application/json" \
  -d '{
    "buyerName": "John Doe",
    "buyerEmail": "john@example.com",
    "buyerPhone": "0501234567"
  }'
```

### Create Auction (Authenticated)
```bash
curl -X POST http://localhost:8080/api/v1/auction/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic YOUR_TOKEN" \
  -d '{
    "auctionTitle": "Item Name",
    "auctionDescription": "Description",
    "auctionStartingPrice": 100
  }'
```

---

## 📝 Logs & Debugging

### View Backend Logs
Logs appear in the terminal running `mvnw spring-boot:run`

### View Frontend Logs
1. Open browser (F12)
2. Go to Console tab
3. Check Network tab for API requests

### Enable Debug Mode

**Backend:**
Add to `Mazadat/src/main/resources/application.properties`:
```properties
logging.level.root=DEBUG
logging.level.org.springframework=DEBUG
```

---

## 💾 Database Notes

- Database: `mazadat`
- Host: `localhost:3306`
- User: `root`
- Password: (configured in application.properties)
- Auto-create tables: Yes (Hibernate DDL enabled)

---

## 📦 Dependencies

### Backend (Maven)
- Spring Boot 3.5.11
- Spring Security
- Spring Data JPA
- MySQL Connector
- Lombok

### Frontend (npm)
- React 19.2.4
- Vite 6.4.1
- TypeScript 5.7.3
- TailwindCSS 3.4.19
- React Router 7.13.2
- React Hook Form 7.54.1
- i18next 26.0.3

---

## 🌍 Environment Details

- **OS:** Windows
- **Java Version Required:** 17+
- **Node Version Required:** 18+
- **npm Version Required:** 9+
- **MySQL Version Required:** 8.0+

---

## ✅ Pre-flight Checklist

Before running:
- [ ] Java 17+ installed: `java -version`
- [ ] Node.js 18+ installed: `node -v`
- [ ] npm installed: `npm -v`
- [ ] MySQL 8.0+ running: `mysql -u root -p -e "SELECT 1;"`
- [ ] Database created: `mysql -u root -p -e "SHOW DATABASES;"`
- [ ] Ports 8080 and 5173 are free
- [ ] MySQL password updated in `application.properties` (if needed)

---

## 🚀 After Integration

1. **Both services running?** Yes ✓
2. **Can access frontend?** Yes, at http://localhost:5173 ✓
3. **Can access backend?** Yes, at http://localhost:8080 ✓
4. **APIs working?** Check Network tab in DevTools ✓
5. **CORS errors?** Resolved with WebConfig ✓

---

## 📞 Need Help?

See detailed guides:
- `SETUP_GUIDE.md` - Complete setup instructions
- `INTEGRATION_REPORT.md` - Technical integration details
- `README.md` - Project overview

---

**Last Updated:** April 2026
**Status:** ✅ Integration Complete

