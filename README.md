# Image Upload and Processing Service

A Node.js backend web service that allows users to upload images, store them in AWS S3, and process them. The service uses Express.js, TypeScript, and Postgres for managing image metadata, with AWS ECS and Terraform for deployment.

## Features

### Level 1: API and Database
- Upload images to AWS S3.
- Store image metadata in Postgres using TypeORM.
- Add comments to images.

### Level 2: Image Processing
- Respond to new image upload events.
- Notify users via email when images are processed.
- Error handling for image processing failures.

### Level 3: Deployment
- Dockerize the service.
- Deploy to AWS ECS with Terraform.

## Technologies Used
- **Node.js** and **TypeScript**
- **Express.js** for API development
- **Postgres** for database
- **TypeORM** as the ORM
- **AWS S3** for image storage
- **AWS ECS** and **Terraform** for infrastructure
- **Docker** for containerization

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/image-service.git
cd image-service
