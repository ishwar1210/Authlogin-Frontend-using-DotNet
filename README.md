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

## Login page
<img width="1908" height="857" alt="image" src="https://github.com/user-attachments/assets/f70dae19-5f3b-4d5a-8611-498994502bbd" />

### Forgot Password
<img width="1918" height="863" alt="image" src="https://github.com/user-attachments/assets/f4caab94-396b-48c5-924b-0c0543da5f04" />
<img width="1919" height="875" alt="image" src="https://github.com/user-attachments/assets/a386a5b6-558e-473b-a7a4-2bb3d37c112c" />


### Admin Dashborad
<img width="1913" height="873" alt="image" src="https://github.com/user-attachments/assets/00b9aa8f-340e-41ff-83e5-f4e9538e5eab" />

### Create Manager 
<img width="1918" height="864" alt="image" src="https://github.com/user-attachments/assets/112f15b1-a0c1-46e0-b2a9-a1652dc16da1" />

### View All Managers
<img width="1919" height="866" alt="image" src="https://github.com/user-attachments/assets/7b26c593-a477-4fc6-9262-d50571f4b358" />

### Manager Dashborad
<img width="1919" height="870" alt="image" src="https://github.com/user-attachments/assets/1f58c866-83df-446e-a785-30a4dcd434de" />

### Create Employees
<img width="1919" height="869" alt="image" src="https://github.com/user-attachments/assets/81a7db8c-50db-4ea7-a94b-622bf1f53b2d" />

### View All Employees
<img width="1919" height="869" alt="image" src="https://github.com/user-attachments/assets/d1594b0a-2936-425b-b0b8-13b6a3aed7ff" />

### Employee Dashborad
<img width="1919" height="870" alt="image" src="https://github.com/user-attachments/assets/db7c4c14-ac80-4ec2-a05e-478457224ac8" />
