# TaskMaster - Modern Todo Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern and feature-rich task management application built with React, TypeScript, and Tailwind CSS. This application helps users manage their tasks efficiently with a beautiful and intuitive interface.

## Features

### Task Management
- Create, edit, and delete tasks
- Set task priorities (High, Medium, Low)
- Add due dates to tasks
- Mark tasks as complete/incomplete
- Task filtering and sorting

### Analytics Dashboard
- Total tasks overview
- Completion statistics
- Priority distribution
- Overdue tasks tracking
- Completion rate percentage

### User Interface
- Modern dark theme design
- Responsive layout for all devices
- Intuitive task input form
- Real-time task updates
- Clean and organized task list

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Date Picker**: React DatePicker
- **State Management**: React Hooks (useState, useMemo)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone [https://github.com/sumancoder-cloud/taskmaster.git](https://github.com/sumancoder-cloud/TO-DO-LIST)
cd taskmaster
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
taskmaster/
├── src/
│   ├── components/         # React components
│   │   ├── TodoList.tsx   # Main todo list component
│   │   └── TodoItem.tsx   # Individual todo item component
│   ├── types/             # TypeScript type definitions
│   │   └── todo.ts        # Todo interface definitions
│   ├── assets/            # Static assets
│   └── App.tsx           # Root component
├── public/               # Public assets
├── package.json         # Project dependencies
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## Features in Detail

### Task Management
- Create new tasks with title, priority, and due date
- Edit existing tasks
- Delete tasks
- Mark tasks as complete/incomplete
- Filter tasks by priority and status

### Analytics
- Real-time task statistics
- Visual representation of task distribution
- Progress tracking
- Priority-based task organization

### User Experience
- Responsive design for all screen sizes
- Dark theme for reduced eye strain
- Intuitive task input interface
- Smooth animations and transitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](License.md) file for details.

## Acknowledgments

- React Team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Heroicons for the beautiful icons
- React DatePicker for the date selection component
