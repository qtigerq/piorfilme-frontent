# About

This project was developed as part of a frontend technical challenge for Outsera.

---

# Autor

Tiago Bruno de Melo - Software Engineer

---

# Worst Movie from Golden Raspberry Awards

An Angular project for displaying and managing data related to the worst movies.
It uses PrimeNG for UI components, Bootstrap for layout, and communicates with an external backend API.

---

## Technologies Used

- Angular ^20.3.0
- PrimeNG ^20.2.0
- PrimeIcons ^7.0.0
- Bootstrap ^5.3.8
- RxJS ~7.8.0
- Karma + Jasmine (for unit testing)
- Docker (used 28.0.4)  
- Docker Compose (used 2.34.0)  

---

## Node Version Requirement

This project requires:

- **Node.js >= 22.20.0**
- **npm >= 10.9.3**
- **Angular CLI = 20.3.4**

> Using older versions of Node may cause build or dependency errors.
> Recommended: Use **nvm** to manage Node versions.


## How to Run the Project (With or without Docker) ###


#### 1. Clone the Repository
```
- git clone https://github.com/qtigerq/piorfilme-frontent.git
```
```
- cd piorfilme-frontend
```

### Without Docker

#### 2A. Install Dependencies and Build  
```
- npm install  
```

#### 3A. Run the Application  
```
- ng serve
```
The application will start on: http://localhost:4200  


### With docker  

#### 2B. Run Application via Docker Compose  
```
- docker compose up --build
```
The application will start on: http://localhost:4200  


#### Running Tests  
```
- npm test  
```
