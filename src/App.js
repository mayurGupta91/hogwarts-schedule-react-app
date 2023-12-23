// ScheduleTodayPage.js

import React from 'react';
import AttendanceGrid from './AttendanceGrid';
import ScheduleGrid from './ScheduleGrid';

import { TEACHERS, STUDENTS, handleStudentsSubTeachers } from './constants';

const ScheduleTodayPage = () => {
    const [teacherAttendance, setTeacherAttendance] = React.useState({});
    const [studentSubTeachers, setStudentSubTeachers] = React.useState([]);

    const handleTeacherAttendanceChange = (teacher, status) => {
        const newAttendance = {
            ...teacherAttendance,
            [teacher]: status,
        };
        setTeacherAttendance(newAttendance);
        setStudentSubTeachers(handleStudentsSubTeachers(studentSubTeachers, newAttendance, teacher, status));
    };

    React.useEffect(() => {
        // Initialize teacherAttendance with 'Present' for all teachers
        const initialTeacherAttendance = {};
        for (const teacher in TEACHERS) {
            initialTeacherAttendance[teacher] = 'Present';
        }
        setTeacherAttendance(initialTeacherAttendance);

        // Initialize studentSubTeachers with the original data
        setStudentSubTeachers(handleStudentsSubTeachers(STUDENTS, initialTeacherAttendance));
    }, []);

    return (
        <div className="wrapper">
            <h1>Schedule Today</h1>
            <div style={{ display: 'flex' }}>
                {/* Attendance Section */}
                <div style={{ flex: 1, marginRight: 60, borderRight: '2px solid #fff' }}>
                    <h2>Attendance</h2>
                    <AttendanceGrid
                        teachers={TEACHERS}
                        teacherAttendance={teacherAttendance}
                        onAttendanceChange={handleTeacherAttendanceChange}
                    />
                </div>

                {/* Current Schedule Section */}
                <div style={{ flex: 1, marginLeft: 20 }}>
                    <h2>Current Schedule</h2>
                    <ScheduleGrid teachers={TEACHERS} students={studentSubTeachers} />
                </div>
            </div>
        </div>
    );
};

export default ScheduleTodayPage;
