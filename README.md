# Authlogin
## React + ASP.NET Core (No EF) + MYSql

## Quick start
1. Create DB and Tables.
2. Backend:
- Authlogin:
- `cd Authlogin`
- `dotnet add package BCrypt.Net-Next  `
- `dotnet add package  Dapper`
- `dotnet add package  Microsoft.AspNetCore.Authentication.JwtBearer`
- `dotnet add package Microsoft.AspNetCore.OpenApi`
- `dotnet add package MySqlConnector`
- `dotnet run`
- Default HTTPS URL shown by `dotnet run` (e.g. https://localhost:7055)
  3. Frontend:
- `cd frontend`
- `npm install`
- `npm run dev`
- Open `http://localhost:5173/`
**CORS:** The backend allows `http://localhost:5173/` by default for development. For production configure strict origins.
## Api
- register manager : POST `https://localhost:7055/api/auth/register/manager`
- View All Managers : GET `https://localhost:7055/api/users/managers`
- register Employee : POST `https://localhost:7055/api/auth/register/with-role`
- View All Employees : GET `https://localhost:7055/api/users/employees`
- Login : POST `https://localhost:7055/api/auth/login`
- Forgot : POST `https://localhost:7055/api/auth/forgot` // make token
- Reset : POST `https://localhost:7055/api/auth/reset` // provide token then reset password  
