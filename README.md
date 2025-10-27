# LoomWARE 3000

This repository contains a **full-stack application** using:

- **NestJS** – Backend API (`/api/*`)  
- **Next.js** – Frontend React app  
- **MySQL 8** – Database  
- **Redis 7** – Caching/session store  
- **Nginx** – Reverse proxy for single-domain routing  

Everything is containerized with **Docker** and orchestrated with **docker-compose**.  

---

## Getting started

To run the project locally, simply run **make init** in root of the project. Makefile will take care of everything else:
- Copy .env.example to .env, with default values
- Build the docker container and run it
- Default entry point for the app is http://localhost for **frontend** and http://localhost/api for **backend**

---

## Features

- Single domain setup: `/` serves the frontend, `/api/*` serves the backend API  
- NestJS backend API with Dockerized MySQL and Redis  
- Next.js frontend with SSR, hydration, and per-page SCSS  
- Easy development and production setup  
- Fully isolated containers for frontend, backend, database, and proxy  

---

## Project Structure

