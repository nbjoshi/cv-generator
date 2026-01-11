# CV-Generator - Abandoned till further notice... Reason being, I should've used something like Supabase to store all my data rather than running MySQL locally and then dockerizing it, which would take a lot more effort. Also, the formatting for resume should've used Latex rather than putting text onto a canvas and then converting to a PDF. The project wasn't an overall failure. I got some experience with FastAPI and JWT before joining App Team Carolina as a backend dev. 

## Overview

CV-Generator is a web-based application that allows users to create and customize professional CVs effortlessly. Users can input their personal details, education, work experience, and skills to generate a polished CV in a variety of templates. The application ensures a smooth and user-friendly experience with a focus on flexibility and customizability.

## Features

- **Dynamic Inputs**: Add or remove sections like education, work experience, and skills.
- **Format**: Have your resume pre-formatted to match UNC's Kenan Flagler's Pre-Business Resume template.
- **Export Options**: Download your CV as a PDF
- **User Authentication**: Securely save your CV drafts for future edits.

## Technologies Used

- **Frontend**: React, CSS
- **Backend**: FastAPI
- **Database**: MySQL
- **Authentication**: JSON Web Tokens (JWT)
- **PDF Generation**: jsPDF
