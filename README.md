# LoomWARE 3000

This repository contains a **full-stack application** using:

- **NestJS** – Backend API (`/api/*`)  
- **Next.js** – Frontend React app  
- **MySQL 8** – Database  
- **Redis 7** – Caching/session store  
- **Nginx** – Reverse proxy for single-domain routing  

Everything is containerized with **Docker** and orchestrated with **docker-compose**.
---

## Features

- Single domain setup: `/` serves the frontend, `/api/*` serves the backend API  
- NestJS backend API with Dockerized MySQL and Redis  
- Next.js frontend with SSR, hydration, and per-page SCSS  
- Easy development and production setup  
- Fully isolated containers for frontend, backend, database, and proxy  

---

## Project Structure

