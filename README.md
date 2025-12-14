# 🐔 Farm Egg Tracker

A modern, high-tech web application for tracking chicken and duck egg production on your farm. This project features a stunning **Space/Glassmorphism UI** with animated backgrounds and neon effects.

![Application Screenshot](https://github.com/PLOHA/farm-egg-tracker/raw/main/screenshot.png)
*(Note: You can add a screenshot here later)*

## ✨ Features

-   **Dashboard**:
    -   View Daily, Monthly, and Yearly egg production reports.
    -   **Reactor Core Summary**: A central, animated widget displaying total counts.
    -   **Dynamic Filtering**: Filter data easily with a modern UI.
-   **Check Date Page**:
    -   Convert years between Buddhist Era (B.E.) and Christian Era (C.E.).
    -   Intelligent detection logic (> 2400 = B.E.).
    -   Beautiful neon result cards.
-   **Modern UI/UX**:
    -   **Glassmorphism**: Translucent cards with blur effects.
    -   **Space Background**: Animated stars and deep space parallax effect.
    -   **Outfit Font**: Clean, modern typography.
    -   **Responsive Design**: Works great on different screen sizes.

## 🛠️ Tech Stack

-   **Frontend**: Angular 19, Angular Material, SCSS
-   **Backend**: ASP.NET Core 8 Web API
-   **Database**: SQL Server (Entity Framework Core)

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18+)
-   .NET 8 SDK
-   SQL Server

### 1. Backend Setup
1.  Navigate to the `FarmEggTracker.API` folder (or open `FarmEggTracker.sln` in Visual Studio).
2.  Update the **Connection String** in `appsettings.json` to match your SQL Server instance.
3.  Run Entity Framework migrations (if needed):
    ```powershell
    dotnet ef database update
    ```
4.  Run the API project.

### 2. Frontend Setup
1.  Navigate to the UI folder:
    ```bash
    cd farm-egg-tracker-ui
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    ng serve
    ```
4.  Open your browser and navigate to `http://localhost:4200/`.

## 👨‍💻 Author

Developed by **PLOHA**.
