# Personal Portfolio Website

A modern, responsive portfolio website built with React and Vite, showcasing professional experience, projects, skills, and contact information.

## Features

- 📱 Fully Responsive Design
- 🎨 Modern UI/UX
- 🚀 Fast Performance with Vite
- 📂 Multiple Portfolio Sections
- 📧 Contact Form
- 📄 Downloadable Resume
- 🎯 Skills Showcase
- 💼 Project Gallery
- 🌟 Experience Timeline

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14.0 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Abhishek-Sharma-069/my-portfolio
cd my-portfolio
```

2. Install the dependencies:
```bash
npm install
```

## Development

To start the development server:
```bash
npm run dev
```
This will start the development server at `http://localhost:5173`

## Building for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:
```bash
npm run preview
```

## Project Structure

```
my-portfolio/
├── public/                # Public assets
├── src/                  # Source files
│   ├── assets/          # Static assets
│   │   ├── images/      # Image assets
│   │   │   ├── Abhishek_img.jpg
│   │   │   ├── Abhishek_img.png
│   │   │   ├── coding.svg
│   │   │   ├── contact_illustration.svg
│   │   │   ├── data_science.svg
│   │   │   ├── dev_illustration.svg
│   │   │   ├── experience.svg
│   │   │   ├── feeling-proud.svg
│   │   │   ├── fullstack.svg
│   │   │   ├── hello.svg
│   │   │   ├── mindmap.svg
│   │   │   └── undraw_building-a-website_1wrp.svg
│   │   ├── projectCard/ # Project images
│   │   │   ├── chatbot.jpg
│   │   │   └── project_image.jpg
│   │   └── resume/     # Resume files
│   │       └── Abhishek_Sharma_Resume.pdf
│   ├── components/     # React components
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── Landing.jsx
│   │   ├── Navbar.jsx
│   │   ├── Preloader.jsx
│   │   ├── Projects.jsx
│   │   ├── Resume.jsx
│   │   └── Skills.jsx
│   ├── data/          # Data files
│   │   ├── contactData.json
│   │   ├── experienceData.json
│   │   ├── indexData.js
│   │   ├── projectsData.json
│   │   └── skillsData.json
│   ├── utils/         # Utility functions
│   ├── App.css        # Global styles
│   ├── App.jsx        # Main App component
│   ├── index.css      # Index styles
│   ├── index.js       # Entry point
│   └── main.jsx       # Main React entry file
├── eslint.config.js   # ESLint configuration
├── index.html         # Main HTML file
├── package.json       # Project dependencies
├── README.md          # Project documentation
└── vite.config.js     # Vite configuration
```

## Customization

To customize this portfolio for your own use:

1. Update Personal Information:
   - Edit the data files in `src/data/` directory
   - Replace images in `src/assets/images/`
   - Update resume in `src/assets/resume/`

2. Modify Styling:
   - Global styles are in `src/App.css`
   - Component-specific styles are in their respective files

3. Content Sections:
   - Each section (About, Projects, Skills, etc.) can be modified in their respective components in `src/components/`
   - Data for each section is stored in `src/data/` directory

## Technologies Used

- React.js
- Vite
- CSS3
- JavaScript (ES6+)
- Various React libraries (see package.json for full list)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

If you have any questions or want to reach out, please open an issue or contact me through the portfolio contact form.

## Acknowledgments

- Thanks to Vite for the excellent build tooling
- All the open-source libraries that made this project possible
