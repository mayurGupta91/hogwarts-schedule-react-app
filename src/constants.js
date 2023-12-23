//constanst.js

// Sample subjects data with professors and standyProfessor

export const TEACHERS = {
    'Professor Dumbledore': {
        isHeadmaster: true,
    },
    'Minerva McGonagall': {
        isHeadmistress: true,
    },
    'Rubeus Hagrid': {
        standyProfessorFor: ['Potions Master'],
    },
    'Alastor Moody': {
        standyProfessorFor: ['Defense Against the Dark Arts'],
    },
    'Horace Slughorn': {},
    'Severus Snape': {},
    'Remus Lupin': {},
    'Gilderoy Lockhart ': {},
};

// Sample student data with one subject

export const STUDENTS = [
    {
        name: 'Harry Potter',
        subjects: {
            'Potions Master': 'Horace Slughorn',
        },
    },
    {
        name: 'Hermione Granger',
        subjects: {
            'Potions Master': '',
        },
    },
    {
        name: 'Ron Weasley',
        subjects: {
            'Potions Master': 'Severus Snape',
        },
    },
    {
        name: 'Draco Malfoy',
        subjects: {
            'Potions Master': 'Horace Slughorn',
        },
    },
    {
        name: 'Padma Patil',
        subjects: {
            'Potions Master': '',
        },
    },
    {
        name: 'Luna Lovegood',
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
