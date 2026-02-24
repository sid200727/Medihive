🏥 Medical Records Management System

A secure, role-based Medical Records Management System designed to store, manage, and retrieve patient medical records with controlled access and cloud-based file storage.

📌 Project Overview

The Medical Records Management System is a full-stack web application that enables healthcare institutions to securely manage patient data, medical records, and associated documents.

The system ensures:
	•	Secure authentication (JWT-based)
	•	Role-Based Access Control (RBAC)
	•	Structured database management
	•	Cloud storage integration (AWS S3)
	•	Audit logging for transparency and compliance

🎯 Problem Statement

Healthcare systems require secure and structured digital platforms to:
	•	Store sensitive medical records
	•	Provide controlled access to doctors and administrators
	•	Maintain audit logs for accountability
	•	Handle large medical files (reports, scans, prescriptions)

This project addresses these requirements through a scalable and modular architecture.

🏗️ System Architecture

The system follows a layered architecture:
Architecture Highlights
	•	REST-based API communication
	•	JWT Authentication
	•	Role-Based Access Control (Admin / Doctor / Patient)
	•	Separation of concerns (UI, Business Logic, Data Layer)
	•	Secure file upload & retrieval via AWS S3
🛠️ Tech Stack

Frontend
	•	React.js
	•	Tailwind CSS
	•	Axios (API handling)
	•	JWT Token Management

Backend
	•	Django
	•	Django REST Framework
	•	JWT Authentication
	•	Role-Based Access Control (RBAC)

Database
	•	PostgreSQL

Cloud Storage
	•	AWS S3 (for storing medical files)

👥 User Roles

🛡 Admin
	•	Manage users
	•	Monitor system activity
	•	Access audit logs

👨‍⚕️ Doctor
	•	View assigned patient records
	•	Upload medical documents
	•	Update patient information

🧑 Patient
	•	View personal medical records
	•	Access uploaded documents

🔐 Security Features
	•	JWT-based Authentication
	•	Role-Based Access Control (RBAC)
	•	Secure token validation
	•	Protected API routes
	•	Audit logging of user activities
	•	Cloud file access control via AWS

🗂️ Project Structure:

📁 Frontend Structure (React)
📁 Backend Structure (Django)
🗄️ Database Schema (Core Tables)
	•	Users
	•	Patients
	•	MedicalRecords
	•	AuditLogs

Relationships:
	•	One User → Many Records
	•	One Patient → Many Medical Records
	•	Records linked via Foreign Keys
  🔄 System Workflow
	1.	User logs in
	2.	JWT token generated
	3.	Token stored securely in frontend
	4.	API requests include token
	5.	Backend validates token & role
	6.	Database queried
	7.	If file requested → retrieved from AWS S3
	8.	Response returned to frontend
