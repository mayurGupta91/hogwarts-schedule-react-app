//constanst.js

import Dumbledore from './images/Professor-Dumbledore.jpeg';
import Minerva from './images/Minerva-McGonagall.jpeg';
import Rubeus from './images/Rubeus-Hagrid.jpeg';
import Alastor from './images/Alastor-Moody.jpeg';
import Horace from './images/Horace-Slughorn.jpeg';
import Severus from './images/Severus-Snape.jpeg';
import Remus from './images/Remus-Lupin.jpeg';
import Gilderoy from './images/Gilderoy-Lockhart.jpeg';
import Harry_Potter from './images/Harry_Potter_poster.jpg';
import Hermione_Granger from './images/Hermione_Granger_poster.jpg';
import Ron_Weasley from './images/Ron_Weasley_poster.jpg';
import Draco_Mal from './images/Draco_Mal.jpeg';
import PadmaPatil from './images/PadmaPatil.png';
import LunaLovegood from './images/LunaLovegood.jpeg';

// Sample subjects data with professors and standyProfessor

export const TEACHERS = {
    'Professor Dumbledore': {
        isHeadmaster: true,
        imgSrc: Dumbledore,
    },
    'Minerva McGonagall': {
        isHeadmistress: true,
        imgSrc: Minerva,
    },
    'Rubeus Hagrid': {
        standyProfessorFor: ['Potions Master'],
        imgSrc: Rubeus,
    },
    'Alastor Moody': {
        standyProfessorFor: ['Defense Against the Dark Arts'],
        imgSrc: Alastor,
    },
    'Horace Slughorn': { imgSrc: Horace },
    'Severus Snape': { imgSrc: Severus },
    'Remus Lupin': { imgSrc: Remus },
    'Gilderoy Lockhart ': { imgSrc: Gilderoy },
};

// Sample student data with one subject

export const STUDENTS = [
    {
        name: 'Harry Potter',
        imgSrc: Harry_Potter,
        subjects: {
            'Potions Master': 'Horace Slughorn',
        },
    },
    {
        name: 'Hermione Granger',
        imgSrc: Hermione_Granger,
        subjects: {
            'Potions Master': '',
        },
    },
    {
        name: 'Ron Weasley',
        imgSrc: Ron_Weasley,
        subjects: {
            'Potions Master': 'Severus Snape',
        },
    },
    {
        name: 'Draco Malfoy',
        imgSrc: Draco_Mal,
        subjects: {
            'Potions Master': 'Horace Slughorn',
        },
    },
    {
        name: 'Padma Patil',
        imgSrc: PadmaPatil,
        subjects: {
            'Potions Master': '',
        },
    },
    {
        name: 'Luna Lovegood',
        imgSrc: LunaLovegood,
        subjects: {
            'Potions Master': 'Severus Snape',
        },
    },
];

export const findAvailableTeacher = (subject, updatedAttendance) => {
    let standbyProfessor = null;

    // Find standby professor for the given subject
    for (const teacher in TEACHERS) {
        const { standyProfessorFor = [] } = TEACHERS[teacher];
        if (standyProfessorFor.includes(subject)) {
            standbyProfessor = teacher;
            break;
        }
    }

    // If standby professor is available, return it
    if (standbyProfessor && updatedAttendance[standbyProfessor] === 'Present') {
        return standbyProfessor;
    }

    // Find headmistress and headmaster
    let headmistress = null;
    let headmaster = null;
    for (const teacher in TEACHERS) {
        if (TEACHERS[teacher].isHeadmistress) {
            headmistress = teacher;
        } else if (TEACHERS[teacher].isHeadmaster) {
            headmaster = teacher;
        }
    }

    // If headmistress is available, return it
    if (headmistress && updatedAttendance[headmistress] === 'Present') {
        return headmistress;
    }

    // If headmaster is available, return it
    if (headmaster && updatedAttendance[headmaster] === 'Present') {
        return headmaster;
    }

    return ''; // Return empty string if no teacher is available
};

export const handleStudentsSubTeachers = (oldState, newAttendance, teacher = '', status = '') => {
    const updatedStudentSubTeachers = oldState.map(student => {
        const subjects = { ...student.subjects };

        for (const subject in subjects) {
            const allocatedTeacher = subjects[subject];
            const availableTeacher = findAvailableTeacher(subject, newAttendance);

            if (!allocatedTeacher) {
                // Auto-assign teacher if not allocated
                subjects[subject] = availableTeacher || 'Not Assigned';
            } else if (allocatedTeacher === teacher && status === 'Absent') {
                // Auto-assign higher-up teacher if allocated teacher is absent
                subjects[subject] = findAvailableTeacher(subject, newAttendance) || 'Not Assigned';
            } else if (allocatedTeacher && status === 'Present') {
                // Reassign teacher if previously marked as absent and now present
                subjects[subject] = findAvailableTeacher(subject, newAttendance);
            }
        }

        return { ...student, subjects };
    });
    return updatedStudentSubTeachers;
};
